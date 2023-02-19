import React, { useContext, useState } from "react";
import {
  MdSlowMotionVideo,
  MdOutlineSwapHorizontalCircle,
} from "react-icons/md";
import { RiExchangeDollarFill, RiBitCoinLine } from "react-icons/ri";
import { ApplicationContext } from "../../context/ApplicationContext";
import { Input } from "antd";
import { bignumberConvert } from "../../utils/tools";
import { DECIMALS_6 } from "../../utils/constants";

const ToolForLens = () => {
  const {
    updateRevenueInLens,
    swapRevenueInLens,
    getLensRevenueSettlable,
    lensSettleable,
    personalDID,
  } = useContext(ApplicationContext);
  const [videoId, setVideoId] = useState("");
  const [amount, setAmount] = useState("");

  const handleVideoChange = (videoId: string) => {
    setVideoId(videoId);
    videoId != "" && getLensRevenueSettlable(videoId);
  };

  return (
    <div className="flex flex-col w-full space-y-3">
      <div className="bg-gray-100 flex flex-col w-full rounded-xl items-center p-3 space-y-3">
        <div className="flex w-full justify-between items-end text-[#696969] text-base">
          <div className="flex items-center space-x-1 font-medium">
            <RiBitCoinLine color="#b887fc" />
            <div>Update Revenue</div>
          </div>
          <div className="text-sm">Renewable: {lensSettleable}</div>
        </div>
        <Input
          size="large"
          placeholder="Video's real Id (based on profileId and pubId)"
          prefix={<MdSlowMotionVideo />}
          onChange={(e) => handleVideoChange(e.target.value)}
        />
        <div
          className="flex items-center justify-center rounded-xl text-white font-bold w-full py-2.5 cursor-pointer bg-gradient-to-r from-purple-400 to-blue-400 hover:brightness-110"
          onClick={() => updateRevenueInLens(videoId)}
        >
          Update
        </div>
      </div>
      <div className="bg-gray-100 flex flex-col w-full rounded-xl items-center p-3 space-y-3">
        <div className="flex w-full justify-between items-end text-[#696969] text-base">
          <div className="flex items-center space-x-1 font-medium">
            <RiExchangeDollarFill color="#b887fc" />
            <div>Swap Token</div>
          </div>
          <div className="text-sm">
            Swapable: {bignumberConvert(personalDID.vt1, DECIMALS_6, 2)}
          </div>
        </div>
        <Input
          size="large"
          placeholder="Number of tokens exchanged"
          prefix={<MdOutlineSwapHorizontalCircle />}
          onChange={(e) => setAmount(e.target.value)}
        />
        <div
          className="flex items-center justify-center rounded-xl text-white font-bold w-full py-2.5 cursor-pointer bg-gradient-to-r from-purple-400 to-blue-400 hover:brightness-110"
          onClick={() => swapRevenueInLens(amount)}
        >
          Swap
        </div>
      </div>
    </div>
  );
};
export default ToolForLens;
