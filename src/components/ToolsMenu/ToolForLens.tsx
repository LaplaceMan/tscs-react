import React, { useContext, useState } from "react";
import { RiExchangeDollarFill, RiBitCoinLine } from "react-icons/ri";
import { ApplicationContext } from "../../context/ApplicationContext";
import { Input } from "antd";
import { bignumberConvert } from "../../utils/tools";
import { DECIMALS_6 } from "../../utils/constants";
import FullButton from "./FullButton";

const ToolForLens = () => {
  const {
    updateRevenueInLens,
    swapRevenueInLens,
    getLensRevenueSettlable,
    lensSettleable,
  } = useContext(ApplicationContext);
  const [videoId, setVideoId] = useState("");
  const [amount, setAmount] = useState("");

  const handleVideoChange = (videoId: string) => {
    setVideoId(videoId);
    videoId != "" && getLensRevenueSettlable(videoId);
  };

  return (
    <div className="flex flex-col w-full space-y-3">
      <div className="bg-[#0f0a19] flex flex-col w-full rounded-xl items-center p-3 space-y-3">
        <div className="flex w-full justify-between items-end text-base">
          <div className="flex items-center space-x-1 font-medium text-white">
            <RiBitCoinLine />
            <div>UPDATE REVENUE</div>
          </div>
          <div className="text-sm text-[#696969]">
            Renewable: {lensSettleable}
          </div>
        </div>
        <div className="w-full border-2 border-[#1b1524] rounded-xl text-base">
          <Input
            size="large"
            placeholder="Box's Real ID (Based on ProfileId and PubId)"
            style={{ width: "100%" }}
            onChange={(e) => handleVideoChange(e.target.value)}
          />
        </div>
        <FullButton label="Update" fn={() => updateRevenueInLens(videoId)} />
      </div>
      <div className="bg-[#0f0a19] flex flex-col w-full rounded-xl items-center p-3 space-y-3">
        <div className="flex w-full justify-between items-end text-[#696969] text-base">
          <div className="flex items-center space-x-1 font-medium text-white">
            <RiExchangeDollarFill />
            <div>SWAP TOKENS</div>
          </div>
          <div className="text-sm">
            Swapable: {bignumberConvert("0", DECIMALS_6, 2)}
          </div>
        </div>
        <div className="w-full border-2 border-[#1b1524] rounded-xl text-base">
          <Input
            size="large"
            placeholder="Number of Tokens Exchanged"
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <FullButton label="Swap" fn={() => swapRevenueInLens(amount)} />
      </div>
    </div>
  );
};
export default ToolForLens;
