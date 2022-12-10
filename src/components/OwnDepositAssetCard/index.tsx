import React from "react";
import { useContext } from "react";
import { Tooltip } from "antd";
import { shortenAddress, bignumberConvert } from "../../utils/tools";
import { DECIMALS_18 } from "../../utils/constants";
import { ApplicationContext } from "../../context/ApplicationContext";
import { WalletContext } from "../../context/WalletContext";
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
  const { accountState } = useContext(WalletContext);
  const { showDespoitAssetModal } = useContext(GlobalContext);
  const { updateDefaultWithdrawOrDespoit, personalDID } =
    useContext(ApplicationContext);

  const despoitAssetManageHandle = (manage: string) => {
    updateDefaultWithdrawOrDespoit("", manage);
    showDespoitAssetModal();
  };

  return (
    <div className="flex flex-col p-3 items-center justify-center rounded-md shadow-md w-[300px] h-[180px] own-card mt-5 mx-5">
      <div className="flex flex-row items-center justify-center">
        <img
          src="http://api.btstu.cn/sjtx/api.php?lx=c1&format=images"
          className="flex rounded-full w-[50px] shadow"
        />
        <div className="flex flex-col items-start ml-3">
          <div className="text-lg font-medium text-black">Deposit-Zimu</div>
          <Tooltip title={ZIMU_TOKEN[accountState.network]}>
            <div className="flex test-sm bg-gray-50 px-2 rounded-md text-[#696969]">
              {ZIMU_TOKEN[accountState.network]
                ? shortenAddress(ZIMU_TOKEN[accountState.network])
                : ""}
            </div>
          </Tooltip>
        </div>
      </div>
      <div className="flex w-full flex-row justify-between items-center my-3">
        {tokenCardItem("Reputation", personalDID.reputation)}
        <div className="w-[2px] rounded-lg bg-gray-100 h-[30px]" />
        <Tooltip title={bignumberConvert(personalDID.despoit, "0", 0)}>
          {tokenCardItem(
            "Deposit",
            bignumberConvert(personalDID.despoit, DECIMALS_18, 2)
          )}
        </Tooltip>
        <div className="w-[2px] rounded-lg bg-gray-100 h-[30px]" />
        <Tooltip title={bignumberConvert(personalDID.needed, "0", 0)}>
          {tokenCardItem(
            "Needed",
            bignumberConvert(personalDID.needed, DECIMALS_18, 2)
          )}
        </Tooltip>
      </div>
      <div className="flex w-full justify-between text-white font-semibold text-base">
        <div
          className="flex w-1/2 py-1.5 rounded-lg bg-gradient-to-r cursor-pointer from-purple-400 to-purple-200 hover:brightness-110 mr-1 items-center justify-center"
          onClick={() => despoitAssetManageHandle("DESPOIT")}
        >
          Despoit
        </div>
        <div
          className="flex w-1/2 py-1.5 rounded-lg ml-1 items-center justify-center bg-gradient-to-r cursor-pointer from-blue-200 to-blue-400 hover:brightness-110"
          onClick={() => despoitAssetManageHandle("WITHDRAW")}
        >
          Withdraw
        </div>
      </div>
    </div>
  );
};

export default DepositAssetCard;
