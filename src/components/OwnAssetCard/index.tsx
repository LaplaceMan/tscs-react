import React, { useContext } from "react";
import { OwnAssetsCard } from "../../types/baseTypes";
import { Tooltip } from "antd";
import {
  shortenText,
  bignumberConvert,
  personalAssetBalanceOptimize,
  shortenItemContent,
} from "../../utils/tools";
import { GlobalContext } from "../../context/GlobalContext";
import { ApplicationContext } from "../../context/ApplicationContext";
import { DECIMALS_6 } from "../../utils/constants";

const AssetCardItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex flex-col items-center bg-[#322d3a] rounded-xl">
      <div className="text-sm text-[#00BEA1]">{label}</div>
      <div className="text-base font-semibold text-white">{value}</div>
    </div>
  );
};

const OwnAssetCard = ({ token }: { token: OwnAssetsCard }) => {
  const { showTokenTransactionModal } = useContext(GlobalContext);
  const { updateDefaultTokenTransaction } = useContext(ApplicationContext);
  
  const tokenTransactionHandle = (label: string) => {
    updateDefaultTokenTransaction({
      decimals: token.decimals,
      type: token.type,
      address: token.address,
      tokenId: token.tokenId,
      operation: label,
    });
    showTokenTransactionModal();
  };

  return (
    <div className="flex items-center justify-center">
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
          <Tooltip title={token.balance.toString()}>
            <div>
              <AssetCardItem
                label="Balance"
                value={personalAssetBalanceOptimize(
                  shortenItemContent(bignumberConvert(token.balance, DECIMALS_6, 2))
                )}
              />
            </div>
          </Tooltip>
          <AssetCardItem label="Type" value={token.type} />
          <AssetCardItem label="Issuer" value={shortenText(token.issuser, 4)} />
        </div>

        <div className="flex w-full justify-between font-semibold text-base space-x-2 px-2 mb-3">
          <div
            className="w-1/2 py-1.5 rounded-full bg-[#00BEA1] text-center hover:brightness-110 text-white cursor-pointer"
            onClick={() => tokenTransactionHandle("Transfer")}
          >
            Transfer
          </div>
          <div
            className="w-1/2 py-1.5 rounded-full text-center hover:brightness-110 bg-[#edebdc] text-black cursor-pointer"
            onClick={() => tokenTransactionHandle("Approve")}
          >
            Approve
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnAssetCard;
