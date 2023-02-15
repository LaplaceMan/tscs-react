import React, { useContext } from "react";
import { MiniShowData0Package, MiniShowData1Package } from "./MiniShowData";
import { Progress, Tooltip } from "antd";
import { CircleFlag } from "react-circle-flags";
import { Subtitle } from "../../types/baseTypes";
import { TimeRemainPercentage, shortenAddress } from "../../utils/tools";
import { ApplicationContext } from "../../context/ApplicationContext";
import { DataContext } from "../../context/DataContext";
import { GlobalContext } from "../../context/GlobalContext";

const SubtitleCard = (data: Subtitle, key: React.Key): React.ReactElement => {
  const { updateDefaultAuditSubtitleData } = useContext(ApplicationContext);
  const { queryUserData } = useContext(DataContext);
  const { showAuditModal } = useContext(GlobalContext);
  const auditSubtitleHandle = () => {
    updateDefaultAuditSubtitleData(data);
    queryUserData(data.maker);
    showAuditModal();
  };

  const AuditButton = (): React.ReactElement => {
    return (
      <div
        className="flex items-center justify-center rounded-xl text-white font-medium px-[1.1rem] py-3 cursor-pointer bg-gradient-to-r from-purple-400 to-blue-400 hover:brightness-110"
        onClick={() => auditSubtitleHandle()}
      >
        Audit
      </div>
    );
  };

  return (
    <div
      className="flex flex-row bg-[white] p-4 my-5 rounded-3xl items-center shadow hover:shadow-xl"
      key={key}
    >
      <div className="flex flex-col items-start">
        <div className="flex flex-row items-center justify-start w-full min-w-[150px]">
          <div className="flex h-11">
            <CircleFlag countryCode={data.language} />
          </div>
          <div className="flex flex-col items-start ml-3">
            <div className="flex items-end text-lg font-semibold">
              <a href={data.cid}>ST Link</a>
            </div>
            <Tooltip title={data.maker ? data.maker : ""}>
              <div className="flex text-sm text-[#696969]">
                {shortenAddress(data.maker)}
              </div>
            </Tooltip>
          </div>
        </div>
        {MiniShowData0Package(data)}
      </div>
      <div className="flex flex-col items-center justify-between ml-7">
        <div className="flex w-full flex-row items-center justify-between">
          {MiniShowData1Package(data)}
          <div className="flex ml-5">
            <AuditButton />
          </div>
        </div>
        <div className="flex w-full mt-5">
          <Progress
            percent={TimeRemainPercentage(data.start, data.deadline)}
            strokeColor="#696969"
            showInfo={false}
          />
        </div>
      </div>
    </div>
  );
};

export default SubtitleCard;
