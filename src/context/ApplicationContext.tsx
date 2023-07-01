import React, { useState, useContext } from "react";
import { ApplicationContent } from "../types/contextTypes";
import {
  PostTask,
  SubmitItem,
  AuditItem,
  TokenTransaction,
  UpdateTask,
  WithdrawReward,
  RealTokenTransaction,
  GetLockedReward,
  ManageDeposit,
  PreExtract
} from "../types/formTypes";
import { ethers } from "ethers";
import {
  MURMES_PROTOCOL,
  MURMES_PROTOCOL_ABI,
  ERC20_ABI,
  ERC1155_ABI,
  ERC721_ABI,
  PLATFORM_TOKEN,
  LENS_PROTOCOL,
  LENS_ABI,
  PLATFORMS_ABI,
  PLATFORM_MANAGER,
  LENS_AUTHORITY,
  LENS_AUTHORITY_ABI,
  SETTLEMENT_MANAGER,
  SETTLEMENT_MANAGER_ABI
} from "../utils/contracts";
import { GlobalContext } from "./GlobalContext";
import { SUPPORT_NETWORK } from "../utils/constants";
import { bignumberConvert } from "../utils/tools";
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

  const [lensSettleable, setLensSettleable] = useState("0");
  const { chain } = getNetwork();

  const updateDefaultTokenTransaction = (tx: TokenTransaction) => {
    setDefaultTokenTransactionData(tx);
  };

  const updateDefaultUpdateTask = (update: string) => {
    setDefaultUpdateTaskData(update);
  };

  const postTask = async (params: PostTask) => {
    if (chain && SUPPORT_NETWORK.includes(chain.id)) {
      const config = await prepareWriteContract({
        address: MURMES_PROTOCOL[chain.id] as `0x${string}`,
        abi: MURMES_PROTOCOL_ABI,
        functionName: "postTask",
        args: [[
          params.platform,
          params.sourceId,
          params.require,
          params.source,
          params.payment,
          params.amount,
          params.currency,
          params.audit,
          params.detection,
          params.deadline,
        ]],
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

  const submitItem = async (params: SubmitItem) => {
    if (chain && SUPPORT_NETWORK.includes(chain.id)) {
      const config = await prepareWriteContract({
        address: MURMES_PROTOCOL[chain.id] as `0x${string}`,
        abi: MURMES_PROTOCOL_ABI,
        functionName: "submitItem",
        args: [[params.taskId, params.cid, params.require, params.fingerprint]],
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

  const auditItem = async (params: AuditItem) => {
    if (chain && SUPPORT_NETWORK.includes(chain.id)) {
      const config = await prepareWriteContract({
        address: MURMES_PROTOCOL[chain.id] as `0x${string}`,
        abi: MURMES_PROTOCOL_ABI,
        functionName: "auditItem",
        args: [params.itemId, params.attitude],
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

  const registerRequire = async (param: string) => {
    if (chain && SUPPORT_NETWORK.includes(chain.id)) {
      const config = await prepareWriteContract({
        address: MURMES_PROTOCOL[chain.id] as `0x${string}`,
        abi: MURMES_PROTOCOL_ABI,
        functionName: "registerRequires",
        args: [[param]],
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
  }

  const withdraw = async (params: WithdrawReward) => {
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

  const updateTask = async (params: UpdateTask) => {
    if (chain && SUPPORT_NETWORK.includes(chain.id)) {
      // if (params.payType == "OT0") {
      //   amount = ethers.utils.parseUnits(params.amount.toString(), 18);
      // } else {
      //   amount = ethers.utils.parseUnits(params.amount.toString(), 6);
      // }
      const config = await prepareWriteContract({
        address: MURMES_PROTOCOL[chain.id] as `0x${string}`,
        abi: MURMES_PROTOCOL_ABI,
        functionName: "updateTask",
        args: [params.taskId, params.amount, parseInt((Number(params.extended) * 86400).toString())],
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

  const cancelTask = async (param: string) => {
    if (chain && SUPPORT_NETWORK.includes(chain.id)) {
      const config = await prepareWriteContract({
        address: MURMES_PROTOCOL[chain.id] as `0x${string}`,
        abi: MURMES_PROTOCOL_ABI,
        functionName: "cancelTask",
        args: [param],
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

  const setGuard = async (param: string) => {
    if (chain && SUPPORT_NETWORK.includes(chain.id)) {
      const config = await prepareWriteContract({
        address: MURMES_PROTOCOL[chain.id] as `0x${string}`,
        abi: MURMES_PROTOCOL_ABI,
        functionName: "setUserGuard",
        args: [param],
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
  }

  const preExtract = async (params: PreExtract) => {
    if (chain && SUPPORT_NETWORK.includes(chain.id)) {
      let fn, id;
      if (params.payment == "OT0") {
        fn = "preExtractForNormal"
        id = params.taskId;
      } else {
        fn = "preExtractForOther"
        id = params.boxId;
      }
      const config = await prepareWriteContract({
        address: SETTLEMENT_MANAGER[chain.id] as `0x${string}`,
        abi: SETTLEMENT_MANAGER_ABI,
        functionName: fn,
        args: [id],
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

  const manageDeposit = async (params: ManageDeposit) => {
    if (chain && SUPPORT_NETWORK.includes(chain.id)) {
      let config;
      const realAmount = ethers.utils.parseUnits(params.amount.toString(), 18);
      if (params.op == "increase") {
        config = await prepareWriteContract({
          address: MURMES_PROTOCOL[chain.id] as `0x${string}`,
          abi: MURMES_PROTOCOL_ABI,
          functionName: "userJoin",
          args: [params.address, realAmount],
        });
      } else {
        // op == "withdraw"
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

  const tokenTransaction = async (params: RealTokenTransaction) => {
    if (
      chain &&
      SUPPORT_NETWORK.includes(chain.id) &&
      defaultTokenTransactionData
    ) {
      let config;
      if (params.type == "ERC-20") {
        let fn;
        const amount = ethers.utils.parseUnits(params.amount.toString(), 18);
        if (defaultTokenTransactionData.operation == "Transfer") {
          fn = "transfer";
        } else {
          // defaultTokenTransactionData.operation == "APPROVE"
          fn = "approve";
        }
        config = await prepareWriteContract({
          address: params.address as `0x${string}`,
          abi: ERC20_ABI,
          functionName: fn,
          args: [params.to, amount],
        });
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
  // For Lens
  const updateRevenueInLens = async (param: string) => {
    if (chain && SUPPORT_NETWORK.includes(chain.id)) {
      const config = await prepareWriteContract({
        address: PLATFORM_MANAGER[chain.id] as `0x${string}`,
        abi: PLATFORMS_ABI,
        functionName: "updateBoxesRevenue",
        args: [[param], [0]],
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

  const swapRevenueInLens = async (param: string) => {
    if (chain && SUPPORT_NETWORK.includes(chain.id)) {
      const config = await prepareWriteContract({
        address: LENS_AUTHORITY[chain.id] as `0x${string}`,
        abi: LENS_AUTHORITY_ABI,
        functionName: "swap",
        args: [param],
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
  // View Functions
  const getPTBalance = async (
    param: string
  ): Promise<ethers.BigNumber[] | undefined | null> => {
    if (chain && SUPPORT_NETWORK.includes(chain.id)) {
      try {
        const pt0Balance = (await readContract({
          address: PLATFORM_TOKEN[chain.id] as `0x${string}`,
          abi: ERC1155_ABI,
          functionName: "balanceOf",
          args: [param, 0],
        })) as ethers.BigNumber;
        const pt1Balance = (await readContract({
          address: PLATFORM_TOKEN[chain.id] as `0x${string}`,
          abi: ERC1155_ABI,
          functionName: "balanceOf",
          args: [param, 1],
        })) as ethers.BigNumber;
        return [pt0Balance, pt1Balance];
      } catch (err) {
        console.log("Error fetching data: ", err);
      }
    }
  };

  const getLockedReward = async (params: GetLockedReward): Promise<ethers.BigNumber | null | undefined> => {
    if (chain && SUPPORT_NETWORK.includes(chain.id)) {
      try {
        const locked = (await readContract({
          address: MURMES_PROTOCOL[chain.id] as `0x${string}`,
          abi: MURMES_PROTOCOL_ABI,
          functionName: "getUserLockReward",
          args: [params.address, params.platform, params.day],
        })) as ethers.BigNumber;
        return locked;
      } catch (err) {
        console.log("Error fetching data: ", err);
      }
    }
  }

  const getLensRevenueSettlable = async (param: string) => {
    if (chain && SUPPORT_NETWORK.includes(chain.id)) {
      const settlable = (await readContract({
        address: LENS_AUTHORITY[chain.id] as `0x${string}`,
        abi: LENS_AUTHORITY_ABI,
        functionName: "getSettlableToken",
        args: [param],
      })) as ethers.BigNumber;
      setLensSettleable(bignumberConvert(settlable, DECIMALS_18, 2));
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
        preExtract,
        updateDefaultUpdateTask,
        defaultUpdateTaskData,
        updateTask,
        withdraw,
        manageDeposit,
        getPTBalance,
        cancelTask,
        updateRevenueInLens,
        swapRevenueInLens,
        getLensRevenueSettlable,
        lensSettleable,
        registerRequire,
        getLockedReward,
        setGuard
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};
