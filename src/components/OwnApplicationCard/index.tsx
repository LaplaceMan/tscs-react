import React, { useContext } from "react";
import { Tooltip } from "antd";
import { CircleFlag } from "react-circle-flags";
import { OwnApplication } from "../../types/baseTypes";
import { ApplicationContext } from "../../context/ApplicationContext";
import { GlobalContext } from "../../context/GlobalContext";
import { UpdateApplication } from "../../types/formTypes";
import { shortenCID } from "../../utils/tools";

const applicationCardItem = (label: string, info: string) => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-sm text-[#696969]">{label}</div>
      <div className="text-base font-semibold text-black">{info}</div>
    </div>
  );
};

const OwnApplicationCard = (application: OwnApplication, key: React.Key) => {
  const { updateDefaultUpdateApplication } = useContext(ApplicationContext);
  const { showUpdateApplicationModal } = useContext(GlobalContext);

  const updateApplicationHandle = (params: UpdateApplication) => {
    updateDefaultUpdateApplication(params);
    showUpdateApplicationModal();
  };

  return (
    <div
      className="flex flex-col p-3 items-center justify-center rounded-md shadow-md w-[300px] h-[180px] mt-5 mx-5 own-card"
      key={key}
    >
      <div className="flex flex-row items-center justify-center">
        <div className="flex h-11 rounded-full shadow-md">
          <CircleFlag countryCode={application.language} />
        </div>
        <div className="flex flex-col items-start ml-3">
          <div className="text-lg font-medium text-black">
            {application.name}
          </div>
          <Tooltip title={application.source ? application.source : ""}>
            <div className="flex test-sm bg-gray-50 px-2 rounded-md text-[#696969]">
              {application.source
                ? shortenCID(application.source, "personal")
                : ""}
            </div>
          </Tooltip>
        </div>
      </div>
      <div className="flex w-full flex-row justify-between items-center my-3">
        {applicationCardItem("Type", application.type)}
        <div className="w-[2px] rounded-lg bg-gray-100 h-[30px]" />
        {applicationCardItem("Price", application.price)}
        <div className="w-[2px] rounded-lg bg-gray-100 h-[30px]" />
        {applicationCardItem("State", application.state)}
        <div className="w-[2px] rounded-lg bg-gray-100 h-[30px]" />
        {applicationCardItem("Apply ID", application.applyId)}
      </div>
      <div className="flex w-full justify-between text-white font-semibold text-base">
        <div
          className="flex w-1/2 py-1.5 rounded-lg bg-gradient-to-r cursor-pointer from-purple-400 to-purple-200 hover:brightness-110 mr-1 items-center justify-center"
          onClick={() =>
            updateApplicationHandle({
              payType: application.type,
              oldAmount: application.price,
              oldDeadline: application.deadline,
              applyId: application.applyId,
              type: "Update",
              amount: "",
              deadline: 0,
            })
          }
        >
          Update
        </div>
        <div
          className="flex w-1/2 py-1.5 rounded-lg ml-1 items-center justify-center bg-gradient-to-r cursor-pointer from-blue-200 to-blue-400 hover:brightness-110"
          onClick={() =>
            updateApplicationHandle({
              payType: application.type,
              oldAmount: application.price,
              oldDeadline: application.deadline,
              applyId: application.applyId,
              type: "Recover",
              amount: "",
              deadline: 0,
            })
          }
        >
          Recover
        </div>
      </div>
    </div>
  );
};

export default OwnApplicationCard;
