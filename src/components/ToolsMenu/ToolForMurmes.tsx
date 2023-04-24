import React from "react";
import { MdOutlineLanguage } from "react-icons/md";
import FullButton from "./FullButton";
import { Input } from "antd";

const ToolForMurmes = () => {
  return (
    <div className="flex flex-col w-full space-y-3">
      <div className="bg-[#0f0a19] flex flex-col w-full rounded-xl items-center p-3 space-y-3">
        <div className="flex w-full justify-between items-end text-[#696969] text-base">
          <div className="flex items-center space-x-1 font-medium text-white">
            <MdOutlineLanguage />
            <div>ADD REQUIRE</div>
          </div>
        </div>
        <div className="w-full border-2 border-[#1b1524] rounded-xl text-base">
          <Input size="large" placeholder="Register for Task Conditions" />
        </div>
        <FullButton label="Add" fn={() => []} />
      </div>
    </div>
  );
};
export default ToolForMurmes;
