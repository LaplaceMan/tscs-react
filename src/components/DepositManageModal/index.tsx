import React, { useState, useContext } from "react";
import { Spin, Input } from "antd";
import { PrimaryButton } from "..";
import { GlobalContext } from "../../context/GlobalContext";
import { ApplicationContext } from "../../context/ApplicationContext";
import { BsDatabaseAdd, BsDatabaseDash } from "react-icons/bs";
import { getAccount } from "@wagmi/core";

const DepositManageModal = () => {
  const { isLoading, hideDepositAssetModal } =
    useContext(GlobalContext);
  const { manageDeposit } = useContext(ApplicationContext);
  const [opData, setOpData] = useState<{op: string, amount: string}>({op: "", amount: ""});
  const account = getAccount();

  const onFinish = () => {
    if(account.address) {
      manageDeposit({op: opData.op, address: account.address, amount: opData.amount})
    }
  };


  return (
    <Spin spinning={isLoading} size="large">
      <div className="flex flex-col w-full">
        <div className="flex flex-col py-5 bg-gray-200 rounded-xl text-center">
          <div className="text-xl font-semibold">
            Increase or Withdraw Deposit
          </div>
          <div>Renewal of Pledged Tokens in Murmes</div>
        </div>

        <div className="flex font-medium border-gray-200 text-lg mt-6 mb-5 cursor-pointer space-x-1">
          <div
            className={`flex items-center justify-center w-1/2 py-2 hover:bg-[#00BEA1] hover:text-white rounded-l-xl border space-x-3 ${
              opData.op === "increase" && "border-[#00BEA1]"
            }`}
            onClick={() => setOpData({...opData, op: "increase"})}
          >
            <BsDatabaseAdd />
            <div>Increase</div>
          </div>
          <div
            className={`flex items-center justify-center w-1/2 py-2  hover:bg-[#FF6347] hover:text-white rounded-r-xl border space-x-3 ${
              opData.op === "withdraw" && "border-[#FF6347]"
            }`}
            onClick={() => setOpData({...opData, op: "withdraw"})}
          >
            <BsDatabaseDash />
            <div>Withdraw</div>
          </div>
        </div>
        <div className="text-lg font-semibold mb-2">Amount</div>

        <Input
          placeholder="Number of Tokens Increased or Withdrawn"
          style={{ width: "100%" }}
          size="large"
          onChange={(e) => setOpData({...opData, amount: e.target.value})}
        />
        <div className="flex items-center justify-center space-x-3 mt-6">
          <PrimaryButton
            label="Submit"
            bgColor="#00BEA1"
            textColor="#fff"
            fn={onFinish}
          />
          <PrimaryButton
            label="Cancel"
            bgColor="#1C1C1C"
            textColor="#fff"
            fn={hideDepositAssetModal}
          />
        </div>
      </div>
    </Spin>
  );
};

export default DepositManageModal;
