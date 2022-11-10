import React from "react";
import { Subtitle } from "../../types/baseTypes";

const ApplyLabel = ["Support", "Against", "Platform", "Uploads", "Apply ID"];
const DividerH = (): React.ReactElement => {
  return <div className="flex h-full w-0.5 bg-gray-100 rounded-full mx-3" />;
};

export const MiniShowData0 = (
  label: string,
  data: string,
  prefix: string,
  suffix: string
) => {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex text-sm text-[#696969]">{label}</div>
      <div className="flex text-base font-medium">
        {`${prefix}` + `${data}` + `${suffix}`}
      </div>
    </div>
  );
};

export const MiniShowData0Package = (data: Subtitle): React.ReactElement => {
  return (
    <div className="flex flex-row w-full h-full items-center justify-between mt-4">
      {MiniShowData0(ApplyLabel[0], data.support, "", "")}
      <DividerH />
      {MiniShowData0(ApplyLabel[1], data.oppose, "", "")}
    </div>
  );
};

export const MiniShowData1 = (
  label: string,
  data: string,
  prefix: string,
  suffix: string
) => {
  return (
    <div className="flex flex-col items-center min-w-[75px]">
      <div className="flex text-sm text-[#696969]">{label}</div>
      <div className="flex w-full items-center justify-center text-base font-semibold bg-gray-100 rounded-md p-1">
        {`${prefix}` + `${data}` + `${suffix}`}
      </div>
    </div>
  );
};

export const MiniShowData1Package = (data: Subtitle): React.ReactElement => {
  return (
    <div className="flex flex-row h-full items-center justify-between">
      {MiniShowData1(ApplyLabel[2], data.platformName, "", "")}
      <DividerH />
      {MiniShowData1(ApplyLabel[3], data.uploads.toString(), "", "")}
      <DividerH />
      {MiniShowData1(ApplyLabel[4], data.applyId.toString(), "", "")}
    </div>
  );
};
