import React from "react";
import { MdCheckCircleOutline, MdFingerprint } from "react-icons/md";
import { Input } from "antd";

const ToolForPersonal = () => {
  return (
    <div className="flex flex-col w-full space-y-3">
      <div className="bg-gray-100 flex flex-col w-full rounded-xl items-center p-3 space-y-3">
        <div className="flex w-full justify-between items-end text-[#696969] text-base">
          <div className="flex items-center space-x-1 font-medium">
            <MdCheckCircleOutline color="#b887fc" />
            <div>Set Guard</div>
          </div>
        </div>
        <Input
          size="large"
          placeholder="Video's real Id (based on profileId and pubId)"
          prefix={<MdFingerprint />}
        />
        <div className="flex items-center justify-center rounded-xl text-white font-bold w-full py-2.5 cursor-pointer bg-gradient-to-r from-purple-400 to-blue-400 hover:brightness-110">
          Add
        </div>
      </div>
    </div>
  );
};
export default ToolForPersonal;
