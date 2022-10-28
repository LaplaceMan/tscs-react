import { MiniShowData0Package, MiniShowData1Package } from "./MiniShowData";
import { Progress } from "antd";
import { useContext } from "react";
import { CircleFlag } from "react-circle-flags";
import { Application } from "../../types/baseTypes";
import { TimeRemainPercentage } from "../../utils/tools";
import { ApplicationContext } from "../../context/ApplicationContext";

const ApplyCard = (data: Application, key: React.Key): React.ReactElement => {
  const { updateDefaultUploadSubtitleData, showUploadModal } =
    useContext(ApplicationContext);

  const uploadSubtitleHandle = (applyId: number, language: string) => {
    updateDefaultUploadSubtitleData(applyId, language);
    showUploadModal();
  };

  const UploadButton = (
    applyId: number,
    language: string
  ): React.ReactElement => {
    return (
      <div
        className="flex items-center justify-center rounded-md text-white font-medium bg-[#696969] px-3 py-3 cursor-pointer hover:bg-gradient-to-r hover:from-purple-400 hover:to-blue-400"
        onClick={() => uploadSubtitleHandle(applyId, language)}
      >
        Upload
      </div>
    );
  };

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
              <div className="text-sm text-[#696969] ml-1">#{data.vidoId}</div>
            </div>
            <div className="flex text-sm text-[#696969]">{data.applicant}</div>
          </div>
        </div>
        {MiniShowData0Package(data)}
      </div>
      <div className="flex flex-col items-center justify-between ml-7">
        <div className="flex w-full flex-row items-center justify-between">
          {MiniShowData1Package(data)}
          <div className="flex ml-5">
            {UploadButton(data.applyId, data.language)}
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

export default ApplyCard;
