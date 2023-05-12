import React, { useState, useContext } from "react";
import { ApplicationContent } from "../types/contextTypes";
import {
  Submit,
  Upload,
  Audit,
  TokenTransaction,
  RealUpdateApplictaionTransaction,
  RealWithdrawRewardTransaction,
  RealTokenTransaction,
} from "../types/formTypes";
import { ethers } from "ethers";
import {
  MURMES_PROTOCOL,
  MURMES_PROTOCOL_ABI,
  ERC20_ABI,
  ERC1155_ABI,
  ERC721_ABI,
  TEST_TOKEN,
  TEST_TOKEN_ABI,
  PLATFORM_TOKEN,
  ACCESS_STRATEGY,
  ACCESS_ABI,
  AUTHORITY_STRATEGY,
  AUTHORITY_ABI,
  PLATFORM_MANAGER,
  PLATFROM_ABI,
  LENS_PROTOCOL,
  LENS_ABI,
} from "../utils/contracts";
import { GlobalContext } from "./GlobalContext";
import { SUPPORT_NETWORK } from "../utils/constants";
import { bignumberConvert, timestamp } from "../utils/tools";
import { message } from "antd";
import {
  getNetwork,
  readContract,
  prepareWriteContract,
  writeContract,
} from "@wagmi/core";

import { DECIMALS_18 } from "../utils/constants";

export const ApplicationContext = React.createContext<ApplicationContent>(
  {} as ApplicationContent
);

export const ApplicationProvider = ({ children }: any) => {
  const { setLoadingState } = useContext(GlobalContext);
  const [defaultTokenTransactionData, setDefaultTokenTransactionData] =
    useState<TokenTransaction | null>(null);
  const [defaultUpdateTaskData, setDefaultUpdateTaskData] = useState<
    string | null
  >(null);

  const [defaultWithdrawOrDepositData, setDefaultWithdrawOrDepositData] =
    useState({ platform: "", manage: "" });
  const [lensSettleable, setLensSettleable] = useState("0");

  const { chain } = getNetwork();

  const updateDefaultWithdrawOrDeposit = (platform: string, manage: string) => {
    setDefaultWithdrawOrDepositData({ platform, manage });
  };

  const updateDefaultTokenTransaction = (tx: TokenTransaction) => {
    setDefaultTokenTransactionData(tx);
  };

  const updateDefaultUpdateTask = (update: string) => {
    setDefaultUpdateTaskData(update);
  };

  const getPTBalance = async (
    address: string
  ): Promise<ethers.BigNumber[] | undefined | null> => {
    if (chain && SUPPORT_NETWORK.includes(chain.id)) {
      try {
        const pt0Balance = (await readContract({
          address: PLATFORM_TOKEN[chain.id] as `0x${string}`,
          abi: ERC1155_ABI,
          functionName: "balanceOf",
          args: [address, 0],
        })) as ethers.BigNumber;
        const pt1Balance = (await readContract({
          address: PLATFORM_TOKEN[chain.id] as `0x${string}`,
          abi: ERC1155_ABI,
          functionName: "balanceOf",
          args: [address, 1],
        })) as ethers.BigNumber;
        return [pt0Balance, pt1Balance];
      } catch (err) {
        console.log("Error fetching data: ", err);
      }
    }
  };

  const getLensRevenueSettlable = async (videoId: string) => {
    if (chain && SUPPORT_NETWORK.includes(chain.id)) {
      const settlable = (await readContract({
        address: AUTHORITY_STRATEGY[chain.id] as `0x${string}`,
        abi: AUTHORITY_ABI,
        functionName: "getSettlableInLens",
        args: [videoId],
      })) as ethers.BigNumber;
      setLensSettleable(bignumberConvert(settlable, DECIMALS_18, 2));
    }
  };

  const postTask = async (params: Submit) => {
    if (chain && SUPPORT_NETWORK.includes(chain.id)) {
      let amount;
      if (params.strategy == 0) {
        amount = ethers.utils.parseEther(params.amount);
      } else {
        amount = params.amount;
      }
      const config = await prepareWriteContract({
        address: MURMES_PROTOCOL[chain.id] as `0x${string}`,
        abi: MURMES_PROTOCOL_ABI,
        functionName: "postTask",
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
          message.error("Error: " + err);
          setLoadingState(false);
        });
    }
  };

  const submitItem = async (params: Upload) => {
    if (chain && SUPPORT_NETWORK.includes(chain.id)) {
      const config = await prepareWriteContract({
        address: MURMES_PROTOCOL[chain.id] as `0x${string}`,
        abi: MURMES_PROTOCOL_ABI,
        functionName: "submitItem",
        args: [params.applyId, params.cid, params.language, params.fingerprint],
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
          message.error("Error: " + err);
          setLoadingState(false);
        });
    }
  };

  const auditItem = async (params: Audit) => {
    if (chain && SUPPORT_NETWORK.includes(chain.id)) {
      const config = await prepareWriteContract({
        address: MURMES_PROTOCOL[chain.id] as `0x${string}`,
        abi: MURMES_PROTOCOL_ABI,
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
          message.error("Error: " + err);
          setLoadingState(false);
        });
    }
  };

  const tokenTransaction = async (params: RealTokenTransaction) => {
    if (
      chain &&
      SUPPORT_NETWORK.includes(chain.id) &&
      defaultTokenTransactionData
    ) {
      let config;
      if (params.type == "ERC-20") {
        const amount = ethers.utils.parseUnits(params.amount.toString(), 18);
        if (defaultTokenTransactionData.operation == "Transfer") {
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
        if (defaultTokenTransactionData.operation == "Transfer") {
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
          message.error("Error: " + err);
          setLoadingState(false);
        });
    }
  };

  const preSettlement = async (type: string, applyId: string) => {
    if (chain && SUPPORT_NETWORK.includes(chain.id)) {
      let config;
      if (type == "OT0") {
        config = await prepareWriteContract({
          address: MURMES_PROTOCOL[chain.id] as `0x${string}`,
          abi: MURMES_PROTOCOL_ABI,
          functionName: "preExtract0",
          args: [applyId],
        });
      } else {
        config = await prepareWriteContract({
          address: MURMES_PROTOCOL[chain.id] as `0x${string}`,
          abi: MURMES_PROTOCOL_ABI,
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
          message.error("Error: " + err);
          setLoadingState(false);
        });
    }
  };

  const updateTask = async (params: RealUpdateApplictaionTransaction) => {
    if (chain && SUPPORT_NETWORK.includes(chain.id)) {
      let amount;
      // if (defaultUpdateTaskData.payType == "OT0") {
      //   amount = ethers.utils.parseUnits(params.amount.toString(), 18);
      // } else {
      //   amount = ethers.utils.parseUnits(params.amount.toString(), 6);
      // }
      let deadline = params.deadline - timestamp();
      if (deadline < 0) {
        deadline = timestamp() + 864000;
      }
      const config = await prepareWriteContract({
        address: MURMES_PROTOCOL[chain.id] as `0x${string}`,
        abi: MURMES_PROTOCOL_ABI,
        functionName: "updateTask",
        args: [params.applyId, amount, deadline],
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
          message.error("Error: " + err);
          setLoadingState(false);
        });
    }
  };

  const cancelTask = async (taskId: string) => {
    if (chain && SUPPORT_NETWORK.includes(chain.id)) {
      const config = await prepareWriteContract({
        address: MURMES_PROTOCOL[chain.id] as `0x${string}`,
        abi: MURMES_PROTOCOL_ABI,
        functionName: "cancel",
        args: [taskId],
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
          message.error("Error: " + err);
          setLoadingState(false);
        });
    }
  };

  const withdrawReward = async (params: RealWithdrawRewardTransaction) => {
    if (chain && SUPPORT_NETWORK.includes(chain.id)) {
      const config = await prepareWriteContract({
        address: MURMES_PROTOCOL[chain.id] as `0x${string}`,
        abi: MURMES_PROTOCOL_ABI,
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
          message.error("Error: " + err);
          setLoadingState(false);
        });
    }
  };

  const depoitZimuManage = async (address: string, amount: number) => {
    if (chain && SUPPORT_NETWORK.includes(chain.id)) {
      let config;
      const realAmount = ethers.utils.parseUnits(amount.toString(), 18);
      if (defaultWithdrawOrDepositData.manage == "DEPOSIT") {
        config = await prepareWriteContract({
          address: MURMES_PROTOCOL[chain.id] as `0x${string}`,
          abi: MURMES_PROTOCOL_ABI,
          functionName: "userJoin",
          args: [address, realAmount],
        });
      } else {
        // defaultWithdrawOrDepositData.manage == "WITHDRAW"
        config = await prepareWriteContract({
          address: MURMES_PROTOCOL[chain.id] as `0x${string}`,
          abi: MURMES_PROTOCOL_ABI,
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
          message.error("Error: " + err);
          setLoadingState(false);
        });
    }
  };

  const updateRevenueInLens = async (videoId: string) => {
    if (chain && SUPPORT_NETWORK.includes(chain.id)) {
      const config = await prepareWriteContract({
        address: PLATFORM_MANAGER[chain.id] as `0x${string}`,
        abi: PLATFROM_ABI,
        functionName: "updateViewCounts",
        args: [[videoId], [0]],
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
          message.error("Error: " + err);
          setLoadingState(false);
        });
    }
  };

  const swapRevenueInLens = async (amount: string) => {
    if (chain && SUPPORT_NETWORK.includes(chain.id)) {
      const config = await prepareWriteContract({
        address: AUTHORITY_STRATEGY[chain.id] as `0x${string}`,
        abi: AUTHORITY_ABI,
        functionName: "swapInLens",
        args: [amount],
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
          message.error("Error: " + err);
          setLoadingState(false);
        });
    }
  };

  return (
    <ApplicationContext.Provider
      value={{
        postTask,
        submitItem,
        auditItem,
        defaultTokenTransactionData,
        updateDefaultTokenTransaction,
        tokenTransaction,
        preSettlement,
        updateDefaultUpdateTask,
        defaultUpdateTaskData,
        updateDefaultWithdrawOrDeposit,
        defaultWithdrawOrDepositData,
        updateTask,
        withdrawReward,
        depoitZimuManage,
        getPTBalance,
        cancelTask,
        updateRevenueInLens,
        swapRevenueInLens,
        getLensRevenueSettlable,
        lensSettleable,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};
