import React, { useState, useEffect, useContext } from "react";
import {
  ApplicationContent,
  Subtitle,
  defaultSubtitle,
  PersonalPageData,
  defaultPersonalPageData,
} from "../types/baseTypes";
import {
  Submit,
  Upload,
  Audit,
  TokenTransaction,
  defaultTokenTransaction,
  defaultUpdateApplication,
  UpdateApplication,
} from "../types/formTypes";
import { ethers } from "ethers";
import BigNumber from "bignumber.js";
import {
  SUBTITLE_SYSTEM,
  SUBTITLE_SYSTEM_ABI,
  ERC20_ABI,
  ERC1155_ABI,
  ERC721_ABI,
  ZIMU_TOKEN,
  ZIMU_TOKEN_ABI,
  VIDEO_TOKEN,
  ACCESS_STRATEGY,
  ACCESS_ABI,
} from "../utils/contracts";
import { GlobalContext } from "./GlobalContext";
import { DataContext } from "./DataContext";
import { DECIMALS_18, DECIMALS_6 } from "../utils/constants";
import { bignumberConvert, timestamp } from "../utils/tools";
import { message } from "antd";
const { ethereum } = window as any;

const getContract = (address: string, abi: any): ethers.Contract => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(address, abi, signer);
  return contract;
};

export const ApplicationContext = React.createContext<ApplicationContent>(
  {} as any
);

export const ApplicationProvider = ({ children }: any) => {
  const { setLoadingState } = useContext(GlobalContext);
  const { regiserLanguages } = useContext(DataContext);
  const [userDID, setUserDID] = useState({ reputation: "0", deposit: "0" });
  const [personalDID, setPersonalDID] = useState<PersonalPageData>(
    defaultPersonalPageData
  );
  const [defaultUploadSubtitleData, setDefaultUploadSubtitleData] = useState({
    applyId: "0",
    language: "0",
  });
  const [defaultAuditSubtitleData, setDefaultAuditSubtitleData] =
    useState(defaultSubtitle);
  const [defaultTokenTransactionData, setDefaultTokenTransactionData] =
    useState<TokenTransaction>(defaultTokenTransaction);
  const [defaultUpdateApplicationData, setDefaultUpdateApplication] =
    useState<UpdateApplication>(defaultUpdateApplication);
  const [defaultWithdrawOrDespoitData, setDefaultWithdrawOrDespoitData] =
    useState({ platform: "", manage: "" });

  const updateDefaultAuditSubtitleData = (subtitle: Subtitle) => {
    setDefaultAuditSubtitleData(subtitle);
  };

  const updateDefaultUploadSubtitleData = (
    applyId: string,
    language: string
  ) => {
    let id = "0";
    regiserLanguages.map((item) => {
      if (item.notes == language) {
        id = item.id;
      }
    });
    setDefaultUploadSubtitleData({
      applyId: applyId,
      language: id,
    });
  };

  const updateDefaultWithdrawOrDespoit = (platform: string, manage: string) => {
    setDefaultWithdrawOrDespoitData({ platform, manage });
  };

  const updateDefaultTokenTransaction = (tx: TokenTransaction) => {
    setDefaultTokenTransactionData(tx);
  };

  const updateDefaultUpdateApplication = (update: UpdateApplication) => {
    setDefaultUpdateApplication(update);
  };

  const getUserDID = async () => {
    if (!ethereum) return message.warning("Please install wallet.");
    const networkId = ethereum.chainId;
    const tscs = getContract(SUBTITLE_SYSTEM[networkId], SUBTITLE_SYSTEM_ABI);
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    const address = accounts[0];
    if (address) {
      const result = await tscs.getUserBaseInfo(address);
      setUserDID({
        reputation: bignumberConvert(result[0], "10", 1),
        deposit: bignumberConvert(result[1], DECIMALS_18, 2),
      });
    }
  };

  const getPersonalPageData = async (address: string) => {
    if (!ethereum) return message.warning("Please install wallet.");
    const networkId = ethereum.chainId;
    const tscs = getContract(SUBTITLE_SYSTEM[networkId], SUBTITLE_SYSTEM_ABI);
    const zimu = getContract(ZIMU_TOKEN[networkId], ZIMU_TOKEN_ABI);
    const vt = getContract(VIDEO_TOKEN[networkId], ERC1155_ABI);
    const access = getContract(ACCESS_STRATEGY[networkId], ACCESS_ABI);
    const base = await tscs.getUserBaseInfo(address);
    const reputation = bignumberConvert(base[0], "10", 1);
    const zimuBalance = await zimu.balanceOf(address);
    const vtBalance = await vt.balanceOf(address, 0);
    const needed = await access.deposit(base[0]);
    setPersonalDID({
      reputation: reputation,
      despoit: base[1],
      zimu: zimuBalance,
      vt0: vtBalance,
      needed: needed,
    });
  };

  const submitApplication = async (params: Submit) => {
    if (!ethereum) message.warning("Please install wallet.");
    const networkId = ethereum.chainId;
    const tscs = getContract(SUBTITLE_SYSTEM[networkId], SUBTITLE_SYSTEM_ABI);
    let amount;
    if (params.strategy == 0) {
      amount = BigNumber(DECIMALS_18).times(params.amount).toString();
    } else {
      amount = params.amount;
    }
    const transaction = await tscs.submitApplication(
      params.platform,
      params.videoId,
      params.strategy,
      amount,
      params.language,
      params.deadline,
      params.source
    );
    setLoadingState(true);
    await transaction.wait();
    console.log("Success:", transaction.hash);
    message.success("Success: " + transaction.hash);
    setLoadingState(false);
  };

  const uploadSubtitle = async (params: Upload) => {
    if (!ethereum) return message.warning("Please install wallet.");
    const networkId = ethereum.chainId;
    const tscs = getContract(SUBTITLE_SYSTEM[networkId], SUBTITLE_SYSTEM_ABI);
    const transaction = await tscs.uploadSubtitle(
      params.applyId,
      params.cid,
      params.language,
      params.fingerprint
    );
    setLoadingState(true);
    await transaction.wait();
    console.log("Success:", transaction.hash);
    message.success("Success: " + transaction.hash);
    setLoadingState(false);
  };

  const auditSubtitle = async (params: Audit) => {
    if (!ethereum) return message.warning("Please install wallet.");
    const networkId = ethereum.chainId;
    const tscs = getContract(SUBTITLE_SYSTEM[networkId], SUBTITLE_SYSTEM_ABI);
    const transaction = await tscs.evaluateSubtitle(
      params.subtitleId,
      params.attitude
    );
    setLoadingState(true);
    await transaction.wait();
    console.log("Success:", transaction.hash);
    message.success("Success: " + transaction.hash);
    setLoadingState(false);
  };

  const tokenTransaction = async (params: any) => {
    if (!ethereum) return message.warning("Please install wallet.");
    let token;
    let transaction;
    let amount;
    if (params.type == "ERC-20") {
      amount = BigNumber(DECIMALS_18).times(params.amount).toString();
      token = getContract(params.address, ERC20_ABI);
      if (defaultTokenTransactionData.operation == "TRANSFER") {
        transaction = await token.transfer(params.to, amount);
      }
      if (defaultTokenTransactionData.operation == "APPROVE") {
        transaction = await token.approve(params.to, amount);
      }
    }
    if (params.type == "ERC-1155") {
      amount = BigNumber(DECIMALS_6).times(params.amount).toString();
      token = getContract(params.address, ERC1155_ABI);
      if (defaultTokenTransactionData.operation == "TRANSFER") {
        transaction = await token.safeTransferFrom(
          params.from,
          params.to,
          params.tokenId,
          amount,
          ""
        );
      }
      if (defaultTokenTransactionData.operation == "APPROVE") {
        const isTrue = params.amount > 0 ? "true" : "false";
        transaction = await token.setApprovalForAll(params.to, isTrue);
      }
    }
    if (params.type == "ERC-721") {
      token = getContract(params.address, ERC721_ABI);
      if (defaultTokenTransactionData.operation == "TRANSFER") {
        token.transferFrom(params.from, params.to, params.tokenId);
      }
    }
    setLoadingState(true);
    await transaction.wait();
    console.log("Success:", transaction.hash);
    message.success("Success: " + transaction.hash);
    setLoadingState(false);
  };

  const preSettlement = async (type: string, applyId: string) => {
    if (!ethereum) return message.warning("Please install wallet.");
    const networkId = ethereum.chainId;
    const tscs = getContract(SUBTITLE_SYSTEM[networkId], SUBTITLE_SYSTEM_ABI);
    let transaction;
    if (type == "OT0") {
      transaction = await tscs.preExtract0(applyId);
    } else {
      transaction = await tscs.preExtractOther(applyId);
    }
    setLoadingState(true);
    await transaction.wait();
    console.log("Success:", transaction.hash);
    message.success("Success: " + transaction.hash);
    setLoadingState(false);
  };

  const updateApplication = async (params: any) => {
    if (!ethereum) return message.warning("Please install wallet.");
    const networkId = ethereum.chainId;
    const tscs = getContract(SUBTITLE_SYSTEM[networkId], SUBTITLE_SYSTEM_ABI);
    let transaction;
    if (params.type == "Recover") {
      transaction = await tscs.recover(
        params.applyId,
        params.amount,
        params.deadline
      );
    } else if (params.type == "Update") {
      const deadline = params.deadline - timestamp();
      if (deadline > 0) {
        transaction = await tscs.updateApplication(
          params.applyId,
          params.amount,
          deadline
        );
      } else {
        message.warning("Invaild Deadline.");
      }
    }
    setLoadingState(true);
    await transaction.wait();
    console.log("Success:", transaction.hash);
    message.success("Success: " + transaction.hash);
    setLoadingState(false);
  };

  const withdrawReward = async (params: any) => {
    if (!ethereum) return message.warning("Please install wallet.");
    const networkId = ethereum.chainId;
    const tscs = getContract(SUBTITLE_SYSTEM[networkId], SUBTITLE_SYSTEM_ABI);
    const transaction = await tscs.withdraw(params.platform, [params.day]);
    setLoadingState(true);
    await transaction.wait();
    console.log("Success:", transaction.hash);
    message.success("Success: " + transaction.hash);
    setLoadingState(false);
  };

  const depoitZimuManage = async (address: string, amount: string) => {
    if (!ethereum) return message.warning("Please install wallet.");
    const networkId = ethereum.chainId;
    const tscs = getContract(SUBTITLE_SYSTEM[networkId], SUBTITLE_SYSTEM_ABI);
    let transaction;
    amount = BigNumber(DECIMALS_18).times(amount).toString();
    if (defaultWithdrawOrDespoitData.manage == "DESPOIT") {
      transaction = await tscs.userJoin(address, amount);
    }
    if (defaultWithdrawOrDespoitData.manage == "WITHDRAW") {
      transaction = await tscs.withdrawDeposit(amount);
    }
    setLoadingState(true);
    await transaction.wait();
    console.log("Success:", transaction.hash);
    message.success("Success: " + transaction.hash);
    setLoadingState(false);
  };

  useEffect(() => {
    getUserDID();
  }, []);

  return (
    <ApplicationContext.Provider
      value={{
        userDID,
        defaultUploadSubtitleData,
        updateDefaultUploadSubtitleData,
        defaultAuditSubtitleData,
        updateDefaultAuditSubtitleData,
        submitApplication,
        uploadSubtitle,
        auditSubtitle,
        defaultTokenTransactionData,
        updateDefaultTokenTransaction,
        tokenTransaction,
        preSettlement,
        updateDefaultUpdateApplication,
        defaultUpdateApplicationData,
        updateDefaultWithdrawOrDespoit,
        defaultWithdrawOrDespoitData,
        updateApplication,
        withdrawReward,
        depoitZimuManage,
        personalDID,
        getPersonalPageData,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};
