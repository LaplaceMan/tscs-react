import React, { useState, useEffect, useContext } from "react";
import {
  ApplicationContent,
  Subtitle,
  defaultSubtitle,
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
import { ethers, BigNumber } from "ethers";
import {
  SUBTITLE_SYSTEM,
  SUBTITLE_SYSTEM_ABI,
  ERC20_ABI,
  ERC1155_ABI,
  ERC721_ABI,
} from "../utils/contracts";
import { GlobalContext } from "./GlobalContext";
const { ethereum } = window as any;

const getContract = (address: string, abi: any): ethers.Contract => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(address, abi, signer);
  return contract;
};

export const ApplicationContext = React.createContext<ApplicationContent>({
  userDID: { reputation: "0", deposit: "0" },
  defaultUploadSubtitleData: { applyId: "0", language: 1 },
  updateDefaultUploadSubtitleData: () => {},
  defaultAuditSubtitleData: defaultSubtitle,
  updateDefaultAuditSubtitleData: () => {},
  submitApplication: () => {},
  uploadSubtitle: () => {},
  auditSubtitle: () => {},
  tokenTransaction: () => {},
  defaultTokenTransactionData: defaultTokenTransaction,
  updateDefaultTokenTransaction: () => {},
  preSettlement: () => {},
  cancelApplication: () => {},
  updateDefaultUpdateApplication: () => {},
  defaultUpdateApplicationData: defaultUpdateApplication,
  updateDefaultWithdrawReward: () => {},
  defaultWithdrawRewardData: "",
  updateApplication: () => {},
  withdrawReward: () => {},
});

export const ApplicationProvider = ({ children }: any) => {
  const { setLoadingState } = useContext(GlobalContext);
  const [userDID, setUserDID] = useState({ reputation: "0", deposit: "0" });
  const [defaultUploadSubtitleData, setDefaultUploadSubtitleData] = useState({
    applyId: "0",
    language: 1,
  });
  const [defaultAuditSubtitleData, setDefaultAuditSubtitleData] =
    useState(defaultSubtitle);
  const [defaultTokenTransactionData, setDefaultTokenTransactionData] =
    useState<TokenTransaction>(defaultTokenTransaction);
  const [defaultUpdateApplicationData, setDefaultUpdateApplication] =
    useState<UpdateApplication>(defaultUpdateApplication);
  const [defaultWithdrawRewardData, setDefaultWithdrawRewardData] =
    useState("");

  const updateDefaultAuditSubtitleData = (subtitle: Subtitle) => {
    setDefaultAuditSubtitleData(subtitle);
  };

  const updateDefaultUploadSubtitleData = (
    applyId: string,
    language: number
  ) => {
    setDefaultUploadSubtitleData({
      applyId: applyId,
      language: language,
    });
  };

  const updateDefaultWithdrawReward = (platform: string) => {
    setDefaultWithdrawRewardData(platform);
  };

  const updateDefaultTokenTransaction = (tx: TokenTransaction) => {
    setDefaultTokenTransactionData(tx);
  };

  const updateDefaultUpdateApplication = (update: UpdateApplication) => {
    setDefaultUpdateApplication(update);
  };

  const getUserDID = async () => {
    if (!ethereum) return alert("Please install wallet.");
    const networkId = ethereum.chainId;
    const tscs = getContract(SUBTITLE_SYSTEM[networkId], SUBTITLE_SYSTEM_ABI);
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    const address = accounts[0];
    if (address) {
      let result = await tscs.getUserBaseInfo(address);
      setUserDID({
        reputation: BigNumber.from(result[0]).div(10).toString(),
        deposit: BigNumber.from(result[1]).toString(),
      });
    }
  };

  const submitApplication = async (params: Submit) => {
    if (!ethereum) return alert("Please install wallet.");
    const networkId = ethereum.chainId;
    const tscs = getContract(SUBTITLE_SYSTEM[networkId], SUBTITLE_SYSTEM_ABI);
    let transaction = await tscs.submitApplication(
      params.platform,
      params.videoId,
      params.strategy,
      params.amount,
      params.language,
      params.deadline,
      params.source
    );
    setLoadingState(true);
    await transaction.wait();
    console.log("Success:", transaction.hash);
    setLoadingState(false);
  };

  const uploadSubtitle = async (params: Upload) => {
    if (!ethereum) return alert("Please install wallet.");
    const networkId = ethereum.chainId;
    const tscs = getContract(SUBTITLE_SYSTEM[networkId], SUBTITLE_SYSTEM_ABI);
    let transaction = await tscs.uploadSubtitle(
      params.applyId,
      params.cid,
      params.language,
      params.fingerprint
    );
    setLoadingState(true);
    await transaction.wait();
    console.log("Success:", transaction.hash);
    setLoadingState(false);
  };

  const auditSubtitle = async (params: Audit) => {
    if (!ethereum) return alert("Please install wallet.");
    const networkId = ethereum.chainId;
    const tscs = getContract(SUBTITLE_SYSTEM[networkId], SUBTITLE_SYSTEM_ABI);
    let transaction = await tscs.evaluateSubtitle(
      params.subtitleId,
      params.attitude
    );
    setLoadingState(true);
    await transaction.wait();
    console.log("Success:", transaction.hash);
    setLoadingState(false);
  };

  const tokenTransaction = async (params: any) => {
    if (!ethereum) return alert("Please install wallet.");
    let token;
    let transaction;
    if (params.type == "ERC-20") {
      token = getContract(params.address, ERC20_ABI);
      if (defaultTokenTransactionData.operation == "TRANSFER") {
        transaction = await token.transfer(params.to, params.amount);
      }
      if (defaultTokenTransactionData.operation == "APPROVE") {
        transaction = await token.approve(params.to, params.amount);
      }
    }
    if (params.type == "ERC-1155") {
      token = getContract(params.address, ERC1155_ABI);
      if (defaultTokenTransactionData.operation == "TRANSFER") {
        transaction = await token.safeTransferFrom(
          params.from,
          params.to,
          params.tokenId,
          params.amount,
          ""
        );
      }
      if (defaultTokenTransactionData.operation == "APPROVE") {
        let isTrue = params.amount > 0 ? "true" : "false";
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
    setLoadingState(false);
  };

  const preSettlement = async (type: string, applyId: string) => {
    if (!ethereum) return alert("Please install wallet.");
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
    setLoadingState(false);
  };

  const cancelApplication = async (applyId: string) => {
    if (!ethereum) return alert("Please install wallet.");
    const networkId = ethereum.chainId;
    const tscs = getContract(SUBTITLE_SYSTEM[networkId], SUBTITLE_SYSTEM_ABI);
    let transaction = await tscs.cancel(applyId);
    setLoadingState(true);
    await transaction.wait();
    console.log("Success:", transaction.hash);
    setLoadingState(false);
  };

  const updateApplication = async (params: any) => {
    if (!ethereum) return alert("Please install wallet.");
    const networkId = ethereum.chainId;
    const tscs = getContract(SUBTITLE_SYSTEM[networkId], SUBTITLE_SYSTEM_ABI);
    let transaction = await tscs.recover(
      params.applyId,
      params.amount,
      params.deadline
    );
    setLoadingState(true);
    await transaction.wait();
    console.log("Success:", transaction.hash);
    setLoadingState(false);
  };

  const withdrawReward = async (params: any) => {
    if (!ethereum) return alert("Please install wallet.");
    const networkId = ethereum.chainId;
    const tscs = getContract(SUBTITLE_SYSTEM[networkId], SUBTITLE_SYSTEM_ABI);
    let transaction = await tscs.withdraw(params.platform, [params.day]);
    setLoadingState(true);
    await transaction.wait();
    console.log("Success:", transaction.hash);
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
        cancelApplication,
        updateDefaultUpdateApplication,
        defaultUpdateApplicationData,
        updateDefaultWithdrawReward,
        defaultWithdrawRewardData,
        updateApplication,
        withdrawReward,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};
