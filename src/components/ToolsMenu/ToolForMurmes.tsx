import React from "react";
import { MdOutlineLanguage, MdOutlineLockReset } from "react-icons/md";
import FullButton from "./FullButton";
import { Input, DatePicker } from "antd";
import { timestampToDay } from "../../utils/tools";

// const onFinish = () => {
//   const values = form.getFieldsValue();
//   if (values.day) {
//     values.day = timestampToDay(values.day.valueOf());
//     withdrawReward(values as RealWithdrawRewardTransaction);
//   }
// };

const ToolForMurmes = () => {
  return (
    <div className="flex flex-col w-full space-y-3 styled">
      <div className="bg-[#0f0a19] flex flex-col w-full rounded-xl items-center p-3 space-y-3">
        <div className="flex w-full justify-between items-end text-[#696969] text-base">
          <div className="flex items-center space-x-1 font-medium text-white">
            <MdOutlineLanguage />
            <div>ADD REQUIRE</div>
          </div>
        </div>
        <Input
          size="large"
          placeholder="Register for Task Conditions"
          style={{ color: "white" }}
        />
        <FullButton label="Add" fn={() => []} />
      </div>
      <div className="bg-[#0f0a19] flex flex-col w-full rounded-xl items-center p-3 space-y-3">
        <div className="flex w-full justify-between items-end text-[#696969] text-base">
          <div className="flex items-center space-x-1 font-medium text-white">
            <MdOutlineLockReset />
            <div>WITHDRAW TOKENS</div>
          </div>
          <div className="text-sm text-[#696969]">Locked: {"0"}</div>
        </div>
        <div className="flex flex-col bg-[#1b1524] p-2 w-full rounded-xl text-white space-y-2">
          <div className="flex items-center space-x-2">
            <div className="text-sm my-2">SOURCE:</div>
            <Input
              placeholder="Platorm or Token Address"
              style={{ color: "white" }}
            />
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-sm my-2">LOCKIN:</div>
            <DatePicker
              style={{ width: "100%" }}
              placeholder="Select the Date that Tokens are Locked"
              onChange={(date) => {
                let base = date?.valueOf();
                if (base) {
                  base = timestampToDay(base);
                  console.log(base);
                }
              }}
            />
          </div>
        </div>
        <Input
          size="large"
          placeholder="Number of Tokens to Withdraw"
          style={{ color: "white" }}
        />
        <FullButton label="Withdraw" fn={() => []} />
      </div>
    </div>
  );
};
export default ToolForMurmes;
