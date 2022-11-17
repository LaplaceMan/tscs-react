import { Form, Spin, InputNumber, Input } from "antd";
import { GlobalContext } from "../../context/GlobalContext";
import { WalletContext } from "../../context/WalletContext";
import { ApplicationContext } from "../../context/ApplicationContext";
import React, { useContext, useEffect } from "react";
import { MdOutlineClose } from "react-icons/md";

const DepositAssetManageModal = () => {
  const [form] = Form.useForm();
  const { isLoading, hideDespoitAssetModal } = useContext(GlobalContext);
  const { accountState } = useContext(WalletContext);
  const { depoitZimuManage } = useContext(ApplicationContext);

  const onFinish = () => {
    let values = form.getFieldsValue();
    depoitZimuManage(values.address, values.amount);
  };

  useEffect(() => {
    if (accountState.address != "") {
      form.setFieldsValue({ address: accountState.address });
    } else {
      form.setFieldsValue(null);
    }
  });

  return (
    <Spin spinning={isLoading} size="large">
      <div className="flex p-5 w-full">
        <Form
          form={form}
          layout="vertical"
          preserve={false}
          requiredMark="optional"
          initialValues={{ language: 1 }}
          onFinish={onFinish}
          className="w-full"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="text-xl font-bold">Withdraw unlocked tokens</div>
            <div
              className="flex hover:text-white hover:bg-black items-center justify-center cursor-pointer mt-1 rounded-full p-0.5"
              onClick={hideDespoitAssetModal}
            >
              <MdOutlineClose fontSize="1.25rem" />
            </div>
          </div>
          <Form.Item name="address" label="User address" required>
            <Input
              placeholder="Update user address of pledged Zimu tokens."
              style={{ width: "100%" }}
              disabled={accountState.address != "" ? true : false}
            />
          </Form.Item>
          <Form.Item name="amount" label="Quantity to be changed" required>
            <InputNumber
              placeholder="Pledge enough Zimu tokens to ensure your normal use."
              min={1}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <div
            className="flex items-center justify-center rounded-md text-white font-medium px-[1.1rem] py-2.5 cursor-pointer bg-gradient-to-r from-purple-400 to-blue-400 hover:brightness-110"
            onClick={onFinish}
          >
            Confirm
          </div>
        </Form>
      </div>
    </Spin>
  );
};

export default DepositAssetManageModal;
