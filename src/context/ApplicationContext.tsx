import React, { useState, useContext } from "react";
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
  RealUpdateApplictaionTransaction,
  RealWithdrawRewardTransaction,
  RealTokenTransaction,
} from "../types/formTypes";
import { ethers } from "ethers";
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
import { SUPPORT_NETWORK } from "../utils/constants";
import { bignumberConvert, timestamp } from "../utils/tools";
import { message } from "antd";
import {
  getNetwork,
  readContract,
  getProvider,
  prepareWriteContract,
  writeContract,
} from "@wagmi/core";

export const ApplicationContext = React.createContext<ApplicationContent>(
  {} as ApplicationContent
);

export const ApplicationProvider = ({ children }: any) => {
  const { setLoadingState } = useContext(GlobalContext);
  const { regiserLanguages } = useContext(DataContext);
  const [personalDID, setPersonalDID] = useState<PersonalPageData>(
    defaultPersonalPageData
  );
  const [defaultUploadSubtitleData, setDefaultUploadSubtitleData] = useState({
    applyId: "0",
    language: "0",
  });
  const [defaultAuditSubtitleData, setDefaultAuditSubtitleData] =
    useState<Subtitle>(defaultSubtitle);
  const [defaultTokenTransactionData, setDefaultTokenTransactionData] =
    useState<TokenTransaction>(defaultTokenTransaction);
  const [defaultUpdateApplicationData, setDefaultUpdateApplication] =
    useState<UpdateApplication>(defaultUpdateApplication);
  const [defaultWithdrawOrDespoitData, setDefaultWithdrawOrDespoitData] =
    useState({ platform: "", manage: "" });

  const { chain } = getNetwork();
  const provider = getProvider();

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

  const getPersonalPageData = async (address: string) => {
    if (provider) {
      if (chain && SUPPORT_NETWORK.includes(chain.id)) {
        const userBaseData = (await readContract({
          address: SUBTITLE_SYSTEM[chain.id] as `0x${string}`,
          abi: SUBTITLE_SYSTEM_ABI,
          functionName: "getUserBaseInfo",
          args: [address],
        })) as Array<ethers.BigNumber>;
        const zimuBalance = (await readContract({
          address: ZIMU_TOKEN[chain.id] as `0x${string}`,
          abi: ZIMU_TOKEN_ABI,
          functionName: "balanceOf",
          args: [address],
        })) as ethers.BigNumber;
        const vtBalance = (await readContract({
          address: VIDEO_TOKEN[chain.id] as `0x${string}`,
          abi: ERC1155_ABI,
          functionName: "balanceOf",
          args: [address, 0],
        })) as ethers.BigNumber;
        const neededDepositZimu = (await readContract({
          address: ACCESS_STRATEGY[chain.id] as `0x${string}`,
          abi: ACCESS_ABI,
          functionName: "deposit",
          args: [userBaseData[0]],
        })) as ethers.BigNumber;
        const reputation = bignumberConvert(userBaseData[0], "10", 1);
        setPersonalDID({
          reputation: reputation,
          despoit: userBaseData[1],
          zimu: zimuBalance,
          vt0: vtBalance,
          needed: neededDepositZimu,
        });
      }
    }
  };

  const submitApplication = async (params: Submit) => {
    if (provider) {
      if (chain && SUPPORT_NETWORK.includes(chain.id)) {
        let amount;
        if (params.strategy == 0) {
          amount = ethers.utils.parseUnits(params.amount.toString(), 18);
        } else {
          amount = params.amount;
        }
        const config = await prepareWriteContract({
          address: SUBTITLE_SYSTEM[chain.id] as `0x${string}`,
          abi: SUBTITLE_SYSTEM_ABI,
          functionName: "submitApplication",
          args: [
            params.platform,
            params.videoId,
            params.strategy,
            amount,
            params.language,
            params.deadline,
            params.source,
          ],
        });
        setLoadingState(true);
        writeContract(config)
          .then(async ({ hash, wait }) => {
            await wait();
            message.success("Success: " + hash);
            setLoadingState(false);
          })
          .catch((err) => {
            console.log(err);
            setLoadingState(false);
          });
      }
    }
  };

  const uploadSubtitle = async (params: Upload) => {
    if (provider) {
      if (chain && SUPPORT_NETWORK.includes(chain.id)) {
        const config = await prepareWriteContract({
          address: SUBTITLE_SYSTEM[chain.id] as `0x${string}`,
          abi: SUBTITLE_SYSTEM_ABI,
          functionName: "uploadSubtitle",
          args: [
            params.applyId,
            params.cid,
            params.language,
            params.fingerprint,
          ],
        });
        setLoadingState(true);
        writeContract(config)
          .then(async ({ hash, wait }) => {
            await wait();
            message.success("Success: " + hash);
            setLoadingState(false);
          })
          .catch((err) => {
            console.log(err);
            setLoadingState(false);
          });
      }
    }
  };

  const auditSubtitle = async (params: Audit) => {
    if (provider) {
      if (chain && SUPPORT_NETWORK.includes(chain.id)) {
        const config = await prepareWriteContract({
          address: SUBTITLE_SYSTEM[chain.id] as `0x${string}`,
          abi: SUBTITLE_SYSTEM_ABI,
          functionName: "evaluateSubtitle",
          args: [params.subtitleId, params.attitude],
        });
        setLoadingState(true);
        writeContract(config)
          .then(async ({ hash, wait }) => {
            await wait();
            message.success("Success: " + hash);
            setLoadingState(false);
          })
          .catch((err) => {
            console.log(err);
            setLoadingState(false);
          });
      }
    }
  };

  const tokenTransaction = async (params: RealTokenTransaction) => {
    if (provider) {
      if (chain && SUPPORT_NETWORK.includes(chain.id)) {
        let config;
        if (params.type == "ERC-20") {
          const amount = ethers.utils.parseUnits(params.amount.toString(), 18);
          if (defaultTokenTransactionData.operation == "TRANSFER") {
            config = await prepareWriteContract({
              address: params.address as `0x${string}`,
              abi: ERC20_ABI,
              functionName: "transfer",
              args: [params.to, amount],
            });
          } else {
            // defaultTokenTransactionData.operation == "APPROVE"
            config = await prepareWriteContract({
              address: params.address as `0x${string}`,
              abi: ERC20_ABI,
              functionName: "approve",
              args: [params.to, amount],
            });
          }
        } else if (params.type == "ERC-1155") {
          const amount = ethers.utils.parseUnits(params.amount.toString(), 6);
          if (defaultTokenTransactionData.operation == "TRANSFER") {
            config = await prepareWriteContract({
              address: params.address as `0x${string}`,
              abi: ERC1155_ABI,
              functionName: "safeTransferFrom",
              args: [params.from, params.to, params.tokenId, amount, ""],
            });
          } else {
            // defaultTokenTransactionData.operation == "APPROVE"
            const isTrue = params.amount > 0 ? "true" : "false";
            config = await prepareWriteContract({
              address: params.address as `0x${string}`,
              abi: ERC1155_ABI,
              functionName: "setApprovalForAll",
              args: [params.to, isTrue],
            });
          }
        } else {
          // ERC-721
          // defaultTokenTransactionData.operation == "TRANSFER"
          config = await prepareWriteContract({
            address: params.address as `0x${string}`,
            abi: ERC721_ABI,
            functionName: "transferFrom",
            args: [params.from, params.to, params.tokenId],
          });
        }
        setLoadingState(true);
        writeContract(config)
          .then(async ({ hash, wait }) => {
            await wait();
            message.success("Success: " + hash);
            setLoadingState(false);
          })
          .catch((err) => {
            console.log(err);
            setLoadingState(false);
          });
      }
    }
  };

  const preSettlement = async (type: string, applyId: string) => {
    if (provider) {
      if (chain && SUPPORT_NETWORK.includes(chain.id)) {
        let config;
        if (type == "OT0") {
          config = await prepareWriteContract({
            address: SUBTITLE_SYSTEM[chain.id] as `0x${string}`,
            abi: SUBTITLE_SYSTEM_ABI,
            functionName: "preExtract0",
            args: [applyId],
          });
        } else {
          config = await prepareWriteContract({
            address: SUBTITLE_SYSTEM[chain.id] as `0x${string}`,
            abi: SUBTITLE_SYSTEM_ABI,
            functionName: "preExtractOther",
            args: [applyId],
          });
        }
        setLoadingState(true);
        writeContract(config)
          .then(async ({ hash, wait }) => {
            await wait();
            message.success("Success: " + hash);
            setLoadingState(false);
          })
          .catch((err) => {
            console.log(err);
            setLoadingState(false);
          });
      }
    }
  };

  const updateApplication = async (
    params: RealUpdateApplictaionTransaction
  ) => {
    if (provider) {
      if (chain && SUPPORT_NETWORK.includes(chain.id)) {
        let config, amount;
        if (defaultUpdateApplicationData.payType == "OT0") {
          amount = ethers.utils.parseUnits(params.amount.toString(), 18);
        } else {
          amount = ethers.utils.parseUnits(params.amount.toString(), 6);
        }
        if (params.type == "Recover") {
          config = await prepareWriteContract({
            address: SUBTITLE_SYSTEM[chain.id] as `0x${string}`,
            abi: SUBTITLE_SYSTEM_ABI,
            functionName: "recover",
            args: [params.applyId, amount, params.deadline],
          });
        } else {
          // params.type == "Update"
          let deadline = params.deadline - timestamp();
          if (deadline < 0) {
            deadline = timestamp() + 864000;
          }
          config = await prepareWriteContract({
            address: SUBTITLE_SYSTEM[chain.id] as `0x${string}`,
            abi: SUBTITLE_SYSTEM_ABI,
            functionName: "updateApplication",
            args: [params.applyId, amount, deadline],
          });
        }
        setLoadingState(true);
        writeContract(config)
          .then(async ({ hash, wait }) => {
            await wait();
            message.success("Success: " + hash);
            setLoadingState(false);
          })
          .catch((err) => {
            console.log(err);
            setLoadingState(false);
          });
      }
    }
  };

  const withdrawReward = async (params: RealWithdrawRewardTransaction) => {
    if (provider) {
      if (chain && SUPPORT_NETWORK.includes(chain.id)) {
        const config = await prepareWriteContract({
          address: SUBTITLE_SYSTEM[chain.id] as `0x${string}`,
          abi: SUBTITLE_SYSTEM_ABI,
          functionName: "withdraw",
          args: [params.platform, [params.day]],
        });
        setLoadingState(true);
        writeContract(config)
          .then(async ({ hash, wait }) => {
            await wait();
            message.success("Success: " + hash);
            setLoadingState(false);
          })
          .catch((err) => {
            console.log(err);
            setLoadingState(false);
          });
      }
    }
  };

  const depoitZimuManage = async (address: string, amount: number) => {
    if (provider) {
      if (chain && SUPPORT_NETWORK.includes(chain.id)) {
        let config;
        const realAmount = ethers.utils.parseUnits(amount.toString(), 18);
        if (defaultWithdrawOrDespoitData.manage == "DESPOIT") {
          config = await prepareWriteContract({
            address: SUBTITLE_SYSTEM[chain.id] as `0x${string}`,
            abi: SUBTITLE_SYSTEM_ABI,
            functionName: "userJoin",
            args: [address, realAmount],
          });
        } else {
          // defaultWithdrawOrDespoitData.manage == "WITHDRAW"
          config = await prepareWriteContract({
            address: SUBTITLE_SYSTEM[chain.id] as `0x${string}`,
            abi: SUBTITLE_SYSTEM_ABI,
            functionName: "withdrawDeposit",
            args: [realAmount],
          });
        }
        setLoadingState(true);
        writeContract(config)
          .then(async ({ hash, wait }) => {
            await wait();
            message.success("Success: " + hash);
            setLoadingState(false);
          })
          .catch((err) => {
            console.log(err);
            setLoadingState(false);
          });
      }
    }
  };

  return (
    <ApplicationContext.Provider
      value={{
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
