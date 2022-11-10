import React from "react";
import { Application } from "../../types/baseTypes";
import { CircleFlag } from "react-circle-flags";

const ApplyCard = (apply: Application, key: React.Key): React.ReactElement => {
  return (
    <div
      className="flex flex-col bg-white rounded-[12px] w-[300px] items-center justify-center"
      key={key}
    >
      <div
        className="flex text-[white] font-base font-medium h-[30px]  w-full items-center rounded-t-[12px] justify-center"
        style={{ background: "#48a8ff" }}
      >
        Apply ID: {apply.applyId}
      </div>
      <div className="flex flex-row w-full p-[10px] items-center h-[135px]">
        <div className="flex rounded-full h-[90px]">
          <CircleFlag countryCode="cn" />
        </div>
        <div className="flex flex-col items-start justify-between ml-[15px] w-[180px]">
          <div className="flex w-full font-medium font-base items-end justify-between text-xl">
            Source
            <div className="text-base text-gray-400">#{apply.vidoId}</div>
          </div>
          <div className="flex">
            Plarform:
            <div className="font-medium ml-[5px]">{apply.platformName}</div>
          </div>
          <div className="flex">
            Amount:
            <div className="font-medium ml-[5px]">{apply.amount}</div>
          </div>
          <div className="flex">
            Type: <div className="font-medium ml-[5px]">{apply.payType}</div>
          </div>
          <div className="flex">
            Applicant:
            <div className="font-medium ml-[5px]">{apply.applicant}</div>
          </div>
        </div>
      </div>
      <div className="flex font-base font-semibold text-white h-[30px] w-full items-center rounded-b-[12px] justify-center border-t px-[10px] hover:bg-[#48a8ff] cursor-pointer">
        Upload Subtitle
      </div>
    </div>
  );
};

export default ApplyCard;
