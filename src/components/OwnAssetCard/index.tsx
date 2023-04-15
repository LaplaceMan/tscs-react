import React, { useContext } from "react";
import { OwnToken } from "../../types/baseTypes";
import { Tooltip } from "antd";
import {
  bignumberConvert,
  personalAssetBalanceOptimize,
} from "../../utils/tools";
import { DECIMALS_18, DECIMALS_6 } from "../../utils/constants";
import { ApplicationContext } from "../../context/ApplicationContext";
import { GlobalContext } from "../../context/GlobalContext";
import { useAccount } from "wagmi";

const TokenCardItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex flex-col items-center bg-[#322d3a] rounded-xl">
      <div className="text-sm text-[#00BEA1]">{label}</div>
      <div className="text-base font-semibold text-white">{value}</div>
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
    <div className="flex flex-col rounded-xl w-[300px] border border-[#322d3a]">
      <div className="flex flex-col items-center w-full bg-[#322d3a] rounded-t-xl p-2">
        <Tooltip
          title={token.address}
          className="flex items-center space-x-1 text-white"
        >
          <div>{token.icon}</div>
          <div className="text-lg font-medium">{token.name}</div>
        </Tooltip>
      </div>
      <div className="grid grid-cols-3 items-center my-3 mx-1 space-x-1">
        <Tooltip title={bignumberConvert(token.balance, "0", 0)}>
          <TokenCardItem
            label="Balance"
            value={
              token.type == "ERC-20"
                ? bignumberConvert(token.balance, DECIMALS_18, 2)
                : personalAssetBalanceOptimize(
                    bignumberConvert(token.balance, DECIMALS_6, 2)
                  )
            }
          />
        </Tooltip>
        <TokenCardItem label="Type" value={token.type} />
        <TokenCardItem label="Issuer" value={token.issuser} />
      </div>
      <div className="flex w-full justify-between font-semibold text-base space-x-2 mb-3">
        <div
          className="w-1/2 py-1.5 rounded-full bg-[#00BEA1] text-center hover:brightness-110 text-white"
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
          className="w-1/2 py-1.5 rounded-full text-center hover:brightness-110 bg-[#edebdc] text-black"
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
