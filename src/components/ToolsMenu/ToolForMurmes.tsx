import React, { useContext, useState } from "react";
import { MdOutlineLanguage, MdOutlineLockReset } from "react-icons/md";
import FullButton from "./FullButton";
import { Input, DatePicker } from "antd";
import { timestampToDay } from "../../utils/tools";
import { ApplicationContext } from "../../context/ApplicationContext";
import { getAccount } from "@wagmi/core";

const ToolForMurmes = () => {
  const [requireLabel, setRequireLabel] = useState("");
  const [lockedReward, setWithdrawReward] = useState<{platform: string; locked: string | undefined}>({ platform: "", locked: undefined });
  const { registerRequire, withdraw, getLockedReward } = useContext(ApplicationContext);
  const [date, setDate] = useState<string | undefined>(undefined);
  const account = getAccount();

  const getLockedRewardHandle = async (day: string) => {
    if (account.address && account.address != undefined) {
      const result = await getLockedReward({ address: account.address.toString(), platform: lockedReward.platform, day: day })
      setWithdrawReward({ ...lockedReward, locked: result?.toString() })
    }
  }

  const dateChangeHandle = (date: moment.Moment | null) => {
    let base = date?.valueOf();
    if (base) {
      base = timestampToDay(base);
      setDate(base.toString());
      getLockedRewardHandle(base.toString());
    }
  }

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
          onChange={(e) => { setRequireLabel(e.target.value); }}
        />
        <FullButton label="Add" fn={() => registerRequire(requireLabel)} />
      </div>
      <div className="bg-[#0f0a19] flex flex-col w-full rounded-xl items-center p-3 space-y-3">
        <div className="flex w-full justify-between items-end text-[#696969] text-base">
          <div className="flex items-center space-x-1 font-medium text-white">
            <MdOutlineLockReset />
            <div>WITHDRAW TOKENS</div>
          </div>
          <div className="text-sm text-[#696969]">Locked: {lockedReward.locked && lockedReward.locked != undefined ? lockedReward.locked : "0"}</div>
        </div>
        <div className="flex flex-col p-2 w-full rounded-xl text-white space-y-2">
          <Input
            size="large"
            placeholder="Platorm or Token Address"
            style={{ color: "white" }}
            onChange={(e) => setWithdrawReward({ ...lockedReward, platform: e.target.value })}
          />
          <DatePicker
            style={{ width: "100%" }}
            size="large"
            placeholder="Select the Date that Tokens are Locked"
            onChange={(date) => dateChangeHandle(date)} />
        </div>
        <FullButton label="Withdraw" fn={() => withdraw({platform: lockedReward.platform, day: date})} />
      </div>
    </div>
  );
};
export default ToolForMurmes;
