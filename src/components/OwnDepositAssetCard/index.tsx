import React, { useContext } from "react";
import { Tooltip } from "antd";
import { shortenAddress, bignumberConvert } from "../../utils/tools";
import { DECIMALS_18, RANDOM_AVATAR_API } from "../../utils/constants";
import { ApplicationContext } from "../../context/ApplicationContext";
import { useAccount } from "wagmi";
import { getNetwork } from "@wagmi/core";
import { GlobalContext } from "../../context/GlobalContext";
import { ZIMU_TOKEN } from "../../utils/contracts";

const tokenCardItem = (label: string, info: string) => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-sm text-[#696969]">{label}</div>
      <div className="text-base font-semibold text-black">{info}</div>
    </div>
  );
};

const DepositAssetCard = () => {
  const { isConnected } = useAccount();
  const { chain } = getNetwork();
  const { showDespoitAssetModal } = useContext(GlobalContext);
  const { updateDefaultWithdrawOrDespoit, personalDID } =
    useContext(ApplicationContext);

  const despoitAssetManageHandle = (manage: string) => {
    updateDefaultWithdrawOrDespoit("", manage);
    showDespoitAssetModal();
  };

  return (
    <div className="flex flex-col p-3 items-center justify-center rounded-3xl shadow-md w-[300px] h-[180px] own-card mt-5 mx-5">
      <div className="flex flex-row items-center justify-center">
        <img
          src={RANDOM_AVATAR_API}
          className="flex rounded-full w-[50px] shadow"
        />
        <div className="flex flex-col items-start ml-3">
          <div className="text-lg font-medium text-black">Deposit-Zimu</div>
          <Tooltip title={ZIMU_TOKEN[isConnected ? chain!.id : 5]}>
            <div className="flex test-sm rounded-xl text-[#696969]">
              {ZIMU_TOKEN[isConnected ? chain!.id : 5]
                ? shortenAddress(ZIMU_TOKEN[isConnected ? chain!.id : 5])
                : ""}
            </div>
          </Tooltip>
        </div>
      </div>
      <div className="flex w-full flex-row justify-between items-center my-3">
        {tokenCardItem("Reputation", personalDID.reputation)}
        <div className="w-[2px] rounded-xl bg-gray-100 h-[30px]" />
        <Tooltip title={bignumberConvert(personalDID.despoit, "0", 0)}>
          {tokenCardItem(
            "Deposit",
            bignumberConvert(personalDID.despoit, DECIMALS_18, 2)
          )}
        </Tooltip>
        <div className="w-[2px] rounded-xl bg-gray-100 h-[30px]" />
        <Tooltip title={bignumberConvert(personalDID.needed, "0", 0)}>
          {tokenCardItem(
            "Needed",
            bignumberConvert(personalDID.needed, DECIMALS_18, 2)
          )}
        </Tooltip>
      </div>
      <div className="flex w-full justify-between text-white font-semibold text-base">
        <div
          className="flex w-1/2 py-1.5 rounded-xl bg-gradient-to-r cursor-pointer from-purple-400 to-purple-200 hover:brightness-110 mr-1 items-center justify-center"
          onClick={() => despoitAssetManageHandle("DESPOIT")}
        >
          Despoit
        </div>
        <div
          className="flex w-1/2 py-1.5 rounded-xl ml-1 items-center justify-center bg-gradient-to-r cursor-pointer from-blue-200 to-blue-400 hover:brightness-110"
          onClick={() => despoitAssetManageHandle("WITHDRAW")}
        >
          Withdraw
        </div>
      </div>
    </div>
  );
};

export default DepositAssetCard;
