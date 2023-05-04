import React from "react";
import { OwnOthersCard } from "../../types/baseTypes";
import { Tooltip } from "antd";
import { shortenItemContent } from "../../utils/tools";

const OtherCardItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <Tooltip title={value}>
      <div className="flex flex-col items-center bg-[#322d3a] rounded-xl">
        <div className="text-sm text-[#00BEA1]">{label}</div>
        <div className="text-base font-semibold text-white">
          {shortenItemContent(value)}
        </div>
      </div>
    </Tooltip>
  );
};

const OwnOtherCard = ({ other }: { other: OwnOthersCard }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col rounded-xl w-[300px] border border-[#322d3a]">
        <div className="flex flex-col items-center w-full bg-[#322d3a] rounded-t-xl p-2">
          <Tooltip
            title={other.detail}
            className="flex items-center space-x-1 text-white"
          >
            <div>{other.icon}</div>
            <div className="text-lg font-medium">{other.title}</div>
          </Tooltip>
        </div>
        <div className="grid grid-cols-3 items-center my-3 mx-1 space-x-1">
          <OtherCardItem label={other.label1} value={other.value1} />
          <OtherCardItem label={other.label2} value={other.value2} />
          <OtherCardItem label={other.label3} value={other.value3} />
        </div>
        <div className="flex w-full justify-between font-semibold text-base space-x-2 px-2 mb-3">
          <div
            className="w-1/2 py-1.5 rounded-full bg-[#00BEA1] text-center hover:brightness-110 text-white cursor-pointer"
            onClick={other.fn1}
          >
            {other.fn1Name}
          </div>
          <div
            className="w-1/2 py-1.5 rounded-full text-center hover:brightness-110 bg-[#edebdc] text-black cursor-pointer"
            onClick={other.fn2}
          >
            {other.fn2Name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnOtherCard;
