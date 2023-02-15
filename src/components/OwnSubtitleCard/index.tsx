import React, { useContext } from "react";
import { Tooltip } from "antd";
import { CircleFlag } from "react-circle-flags";
import { OwnSubtitle } from "../../types/baseTypes";
import { shortenCID } from "../../utils/tools";
import { ApplicationContext } from "../../context/ApplicationContext";
import { GlobalContext } from "../../context/GlobalContext";

const subtitleCardItem = (label: string, info: string) => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-sm text-[#696969]">{label}</div>
      <div className="text-base font-semibold text-black">{info}</div>
    </div>
  );
};

const OwnSubtitleCard = (subtitle: OwnSubtitle, index: React.Key) => {
  const { preSettlement, updateDefaultWithdrawOrDespoit } =
    useContext(ApplicationContext);
  const { showWithdrawRewardModal } = useContext(GlobalContext);

  const withdrawRewardHandle = (platform: string) => {
    updateDefaultWithdrawOrDespoit(platform, "");
    showWithdrawRewardModal();
  };

  return (
    <div
      className="flex flex-col p-3 items-center justify-center rounded-3xl shadow-md w-[300px] h-[180px] own-card mt-5 mx-5"
      key={index}
    >
      <div className="flex flex-row items-center justify-center">
        <div className="flex h-11 rounded-full shadow-md">
          <CircleFlag countryCode={subtitle.language} />
        </div>
        <div className="flex flex-col items-start ml-3">
          <div className="text-lg font-medium text-black">
            #{subtitle.subtitleId}
          </div>
          <Tooltip title={subtitle.cid ? subtitle.cid : ""}>
            <div className="flex test-sm rounded-xl text-[#696969]">
              {subtitle.cid ? shortenCID(subtitle.cid, "personal") : ""}
            </div>
          </Tooltip>
        </div>
      </div>
      <div className="flex w-full flex-row justify-between items-center my-3">
        {subtitleCardItem("Adopt", subtitle.support)}
        <div className="w-[2px] rounded-xl bg-gray-100 h-[30px]" />
        {subtitleCardItem("Report", subtitle.oppose)}
        <div className="w-[2px] rounded-xl bg-gray-100 h-[30px]" />
        {subtitleCardItem("State", subtitle.state)}
        <div className="w-[2px] rounded-xl bg-gray-100 h-[30px]" />
        {subtitleCardItem("Apply ID", subtitle.applyId)}
      </div>
      <div className="flex w-full justify-between text-white font-semibold text-base">
        <div
          className="flex w-1/2 py-1.5 rounded-xl bg-gradient-to-r cursor-pointer from-purple-400 to-purple-200 hover:brightness-110 mr-1 items-center justify-center"
          onClick={() => preSettlement(subtitle.type, subtitle.applyId)}
        >
          Pre settlement
        </div>
        <div
          className="flex w-1/2 py-1.5 rounded-xl ml-1 items-center justify-center bg-gradient-to-r cursor-pointer from-blue-200 to-blue-400 hover:brightness-110"
          onClick={() => withdrawRewardHandle(subtitle.platform)}
        >
          Settlement
        </div>
      </div>
    </div>
  );
};

export default OwnSubtitleCard;
