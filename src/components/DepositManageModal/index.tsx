import React, { useState, useContext, useEffect } from "react";
import { Form, Spin, Input } from "antd";
import { PrimaryButton } from "..";
import { GlobalContext } from "../../context/GlobalContext";
import { ApplicationContext } from "../../context/ApplicationContext";
import { BsDatabaseAdd, BsDatabaseDash } from "react-icons/bs";
import { useAccount } from "wagmi";

const DepositManageModal = () => {
  const [form] = Form.useForm();
  const { address, isConnected } = useAccount();
  const { isLoading, hideDepositAssetModal } = useContext(GlobalContext);
  const { depoitZimuManage } = useContext(ApplicationContext);
  const [txType, setTxType] = useState("");

  const onFinish = () => {
    const values = form.getFieldsValue();
    depoitZimuManage(values.address, values.amount);
  };

  useEffect(() => {
    if (isConnected) {
      form.setFieldsValue({
        address: address,
      });
    } else {
      form.setFieldsValue(null);
    }
  }, []);

  return (
    <Spin spinning={isLoading} size="large">
      <div className="flex flex-col w-full">
        <div className="text-xl font-semibold">
          Increase or Withdraw Deposit
        </div>
        <div>Renewal of Pledged Tokens in Murmes.</div>
        <div className="flex font-medium border-gray-200 text-lg mt-6 mb-5 cursor-pointer space-x-1">
          <div
            className={`flex items-center justify-center w-1/2 py-2 hover:bg-[#00BEA1] hover:text-white rounded-l-xl border space-x-3 ${
              txType === "support" && "border-[#00BEA1]"
            }`}
            onClick={() => setTxType("support")}
          >
            <BsDatabaseAdd />
            <div>Increase</div>
          </div>
          <div
            className={`flex items-center justify-center w-1/2 py-2  hover:bg-[#FF6347] hover:text-white rounded-r-xl border space-x-3 ${
              txType === "oppose" && "border-[#FF6347]"
            }`}
            onClick={() => setTxType("oppose")}
          >
            <BsDatabaseDash />
            <div>Withdraw</div>
          </div>
        </div>
        <div className="text-xl font-semibold">Amount</div>
        <div className="normal border border-gray-200 mb-6 mt-2 rounded-xl text-base">
          <Input
            placeholder="Number of Tokens Increased or Withdrawn"
            min={0}
            style={{ width: "100%", color: "black" }}
          />
        </div>
        <div className="flex items-center justify-center space-x-3">
          <PrimaryButton
            label="Submit"
            bgColor="#00BEA1"
            textColor="#fff"
            fn={() => []}
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
