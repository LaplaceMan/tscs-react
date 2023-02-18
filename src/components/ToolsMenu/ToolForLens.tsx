import React from "react";
import {
  MdSlowMotionVideo,
  MdOutlineSwapHorizontalCircle,
} from "react-icons/md";
import { RiExchangeDollarFill, RiBitCoinLine } from "react-icons/ri";
import { Input } from "antd";

const ToolForLens = () => {
  return (
    <div className="flex flex-col w-full space-y-3">
      <div className="bg-gray-100 flex flex-col w-full rounded-xl items-center p-3 space-y-3">
        <div className="flex w-full justify-between items-end text-[#696969] text-base">
          <div className="flex items-center space-x-1 font-medium">
            <RiBitCoinLine color="#b887fc" />
            <div>Update Revenue</div>
          </div>
          <div className="text-sm">Renewable: 100</div>
        </div>
        <Input
          size="large"
          placeholder="Video's real Id (based on profileId and pubId)"
          prefix={<MdSlowMotionVideo />}
        />
        <div className="flex items-center justify-center rounded-xl text-white font-bold w-full py-2.5 cursor-pointer bg-gradient-to-r from-purple-400 to-blue-400 hover:brightness-110">
          Update
        </div>
      </div>
      <div className="bg-gray-100 flex flex-col w-full rounded-xl items-center p-3 space-y-3">
        <div className="flex w-full justify-between items-end text-[#696969] text-base">
          <div className="flex items-center space-x-1 font-medium">
            <RiExchangeDollarFill color="#b887fc" />
            <div>Swap</div>
          </div>
          <div className="text-sm">Swapable: 1000</div>
        </div>
        <Input
          size="large"
          placeholder="Number of tokens exchanged"
          prefix={<MdOutlineSwapHorizontalCircle />}
        />
        <div className="flex items-center justify-center rounded-xl text-white font-bold w-full py-2.5 cursor-pointer bg-gradient-to-r from-purple-400 to-blue-400 hover:brightness-110">
          Update
        </div>
      </div>
    </div>
  );
};
export default ToolForLens;
