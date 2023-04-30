import React, { useState, useContext, useEffect } from "react";
import { Form, Spin, Input } from "antd";
import { PrimaryButton } from "..";
import { GlobalContext } from "../../context/GlobalContext";
import { ApplicationContext } from "../../context/ApplicationContext";
import { BsDatabaseAdd, BsDatabaseDash } from "react-icons/bs";
import { useAccount } from "wagmi";

const GuardManageModal = () => {
  const [form] = Form.useForm();
  const { address, isConnected } = useAccount();
  const { isLoading, hideGuardManageModal, isGuardManageModalOpen } =
    useContext(GlobalContext);
  const { depoitZimuManage } = useContext(ApplicationContext);
  const [txType, setTxType] = useState("");

  const onFinish = () => {
    const values = form.getFieldsValue();
    depoitZimuManage(values.address, values.amount);
  };

  useEffect(() => {
    if (isGuardManageModalOpen) {
      if (isConnected) {
        form.setFieldsValue({
          address: address,
        });
      } else {
        form.setFieldsValue(null);
      }
    }
  }, []);

  return (
    <Spin spinning={isLoading} size="large">
      <div className="flex flex-col w-full">
        <div className="text-xl font-semibold">Set Your Transaction Guard</div>
        <div>Customised Screening of Makers and Auditors.</div>
        <div className="text-xl font-semibold mt-5">Current Guard</div>
        <div className="normal border border-gray-200 mb-6 mt-2 rounded-xl text-base">
          <Input disabled style={{ width: "100%", color: "black" }} />
        </div>
        <div className="text-xl font-semibold">New Guard</div>
        <div className="normal border border-gray-200 mb-6 mt-2 rounded-xl text-base">
          <Input
            placeholder="Address of The Guard You Want to Set"
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
            fn={hideGuardManageModal}
          />
        </div>
      </div>
    </Spin>
  );
};

export default GuardManageModal;
