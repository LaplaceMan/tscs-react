import React, { useContext } from "react";
import { OwnToken } from "../../types/baseTypes";
import { Tooltip } from "antd";
import {
  shortenAddress,
  bignumberConvert,
  personalAssetBalanceOptimize,
} from "../../utils/tools";
import {
  DECIMALS_18,
  DECIMALS_6,
  RANDOM_AVATAR_API,
} from "../../utils/constants";
import { ApplicationContext } from "../../context/ApplicationContext";
import { GlobalContext } from "../../context/GlobalContext";
import { useAccount } from "wagmi";

const tokenCardItem = (label: string, info: string) => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-sm text-[#696969]">{label}</div>
      <div className="text-base font-semibold text-black">{info}</div>
    </div>
  );
};

const TokenCard = (token: OwnToken) => {
  const { updateDefaultTokenTransaction } = useContext(ApplicationContext);
  const { showTokenTransactionModal } = useContext(GlobalContext);
  const { address, isConnected } = useAccount();

  const tokenTransactionHandle = (
    name: string,
    symbol: string,
    decimals: number,
    type: string,
    address_: string,
    tokenId: string,
    operation: string
  ) => {
    const user = window.location.pathname.slice(10);
    updateDefaultTokenTransaction({
      name: name,
      symbol: symbol,
      decimals: decimals,
      type: type,
      address: address_,
      tokenId: tokenId,
      from: isConnected ? address! : user,
      amount: "",
      operation: operation,
    });
    showTokenTransactionModal();
  };

  return (
    <div className="flex flex-col p-3 items-center justify-center rounded-3xl shadow-md w-[300px] h-[180px] own-card mt-5 mx-5">
      <div className="flex flex-row items-center justify-center">
        <img
          src={RANDOM_AVATAR_API}
          className="flex rounded-full w-[50px] shadow"
        />
        <div className="flex flex-col items-start ml-3">
          <div className="text-lg font-medium text-black">{token.name}</div>
          <Tooltip title={token.address}>
            <div className="flex test-sm rounded-xl text-[#696969]">
              {token.address ? shortenAddress(token.address) : ""}
            </div>
          </Tooltip>
        </div>
      </div>
      <div className="flex w-full flex-row justify-between items-center my-3">
        <Tooltip title={bignumberConvert(token.balance, "0", 0)}>
          {tokenCardItem(
            "Balance",
            token.type == "ERC-20"
              ? bignumberConvert(token.balance, DECIMALS_18, 2)
              : personalAssetBalanceOptimize(
                  bignumberConvert(token.balance, DECIMALS_6, 2)
                )
          )}
        </Tooltip>
        <div className="w-[2px] rounded-xl bg-gray-100 h-[30px]" />
        {tokenCardItem("Type", token.type)}
        <div className="w-[2px] rounded-xl bg-gray-100 h-[30px]" />
        {tokenCardItem("Issuer", token.issuser)}
      </div>
      <div className="flex w-full justify-between text-white font-semibold text-base">
        <div
          className="flex w-1/2 py-1.5 rounded-xl bg-gradient-to-r cursor-pointer from-purple-400 to-purple-200 hover:brightness-110 mr-1 items-center justify-center"
          onClick={() =>
            tokenTransactionHandle(
              token.name,
              token.symbol,
              token.decimals,
              token.type,
              token.address,
              token.tokenId,
              "TRANSFER"
            )
          }
        >
          Transfer
        </div>
        <div
          className="flex w-1/2 py-1.5 rounded-xl ml-1 items-center justify-center bg-gradient-to-r cursor-pointer from-blue-200 to-blue-400 hover:brightness-110"
          onClick={() =>
            tokenTransactionHandle(
              token.name,
              token.symbol,
              token.decimals,
              token.type,
              token.address,
              token.tokenId,
              "APPROVE"
            )
          }
        >
          Approve
        </div>
      </div>
    </div>
  );
};

export default TokenCard;
