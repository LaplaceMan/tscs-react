import React, { useState, useContext } from "react";
import { Spin, Input } from "antd";
import { PrimaryButton } from "..";
import { GlobalContext } from "../../context/GlobalContext";
import { ApplicationContext } from "../../context/ApplicationContext";

const GuardManageModal = ({
  current,
}: {
  current: string | null | undefined;
}) => {
  const { isLoading, hideGuardManageModal, isGuardManageModalOpen } =
    useContext(GlobalContext);
  const { depoitZimuManage } = useContext(ApplicationContext);

  const onFinish = () => {
    // depoitZimuManage(values.address, values.amount);
  };

  return (
    <Spin spinning={isLoading} size="large">
      <div className="flex flex-col w-full">
        <div className="flex flex-col py-5 bg-gray-200 rounded-xl text-center">
          <div className="text-xl font-semibold">
            Set Your Transaction Guard
          </div>
          <div>Customised Screening of Makers and Auditors</div>
        </div>
        <div className="text-lg font-semibold mt-5 mb-2">Current Guard</div>
        <Input
          disabled={true}
          style={{ width: "100%" }}
          size="large"
          defaultValue={
            !current || typeof current == undefined ? "None" : current
          }
        />
        <div className="text-lg font-semibold mt-6 mb-2">New Guard</div>
        <Input
          placeholder="Address of The Guard You Want to Set"
          style={{ width: "100%" }}
          size="large"
        />
        <div className="flex items-center justify-center space-x-3 mt-6">
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
