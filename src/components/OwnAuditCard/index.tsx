import { OwnAudit } from "../../types/baseTypes";
import { shortenText } from "../../utils/tools";
import { CircleFlag } from "react-circle-flags";
import React, { useContext } from "react";
import { ApplicationContext } from "../../context/ApplicationContext";
import { GlobalContext } from "../../context/GlobalContext";

const auditCardItem = (label: string, info: string) => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-sm text-[#696969]">{label}</div>
      <div className="text-base font-semibold text-black">{info}</div>
    </div>
  );
};

const OwnAuditCard = (audit: OwnAudit, key: React.Key) => {
  const { preSettlement, updateDefaultWithdrawReward } =
    useContext(ApplicationContext);
  const { showWithdrawRewardModal } = useContext(GlobalContext);

  const withdrawRewardHandle = (platform: string) => {
    updateDefaultWithdrawReward(platform);
    showWithdrawRewardModal();
  };

  return (
    <div
      className="flex flex-col p-3 items-center justify-center rounded-md shadow-md w-[300px] h-[180px] bg-gray-50 mt-5 mx-5"
      key={key}
    >
      <div className="absolute bottom-[50px] blur-[50px] w-[100px] h-[50px] bg-gradient-to-r from-purple-400 to-blue-400 rounded-full " />
      <div className="flex flex-row items-center justify-center">
        <div className="flex h-11 rounded-full shadow-md">
          <CircleFlag countryCode={audit.language} />
        </div>
        <div className="flex flex-col items-start ml-3">
          <div className="text-lg font-medium text-black">
            #{audit.subtitleId}
          </div>
          <div className="flex test-sm bg-gray-100 px-2 rounded-md text-[#696969]">
            {audit.cid ? shortenText(audit.cid) : ""}
          </div>
        </div>
      </div>
      <div className="flex w-full flex-row justify-between items-center my-3">
        {auditCardItem("Attitude", audit.attitude)}
        <div className="w-[2px] rounded-lg bg-gray-100 h-[30px]" />
        {auditCardItem("State", audit.state)}
        <div className="w-[2px] rounded-lg bg-gray-100 h-[30px]" />
        {auditCardItem("Apply ID", audit.applyId)}
      </div>
      <div className="flex w-full justify-between text-white font-semibold text-base">
        <div
          className="flex w-1/2 py-1.5 rounded-lg bg-gradient-to-r cursor-pointer from-purple-400 to-purple-200 hover:brightness-110 mr-1 items-center justify-center"
          onClick={() => preSettlement(audit.type, audit.applyId)}
        >
          Pre settlement
        </div>
        <div
          className="flex w-1/2 py-1.5 rounded-lg ml-1 items-center justify-center bg-gradient-to-r cursor-pointer from-blue-200 to-blue-400 hover:brightness-110"
          onClick={() => withdrawRewardHandle(audit.platform)}
        >
          Settlement
        </div>
      </div>
    </div>
  );
};

export default OwnAuditCard;
