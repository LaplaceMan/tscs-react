import { MiniShowData0Package, MiniShowData1Package } from "./MiniShowData";
import { Progress } from "antd";
import { CircleFlag } from "react-circle-flags";
import { Subtitle } from "../../types/baseTypes";
import { TimeRemainPercentage } from "../../utils/tools";

const AuditButton = (): React.ReactElement => {
  return (
    <div className="flex items-center justify-center rounded-md text-white font-medium bg-[#696969] px-[1.1rem] py-3 cursor-pointer hover:bg-[#48a8ff]  hover:brightness-110">
      Audit
    </div>
  );
};
const SubtitleCard = (data: Subtitle, key: React.Key): React.ReactElement => {
  return (
    <div
      className="flex flex-row bg-[white] p-4 m-5 rounded-md items-center shadow hover:shadow-xl"
      key={key}
    >
      <div className="flex flex-col items-start">
        <div className="flex flex-row items-center justify-start w-full min-w-[150px]">
          <div className="flex h-11">
            <CircleFlag countryCode={data.language} />
          </div>
          <div className="flex flex-col items-start ml-3">
            <div className="flex items-end text-lg font-semibold">
              {data.videoName}
              <div className="text-sm text-[#696969] ml-1">
                #{data.subtitleId}
              </div>
            </div>
            <div className="flex text-sm text-[#696969]">{data.maker}</div>
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
            percent={TimeRemainPercentage(data.deadline, data.duration)}
            strokeColor="#696969"
            showInfo={false}
          />
        </div>
      </div>
    </div>
  );
};

export default SubtitleCard;