import React, { useContext, useEffect } from "react";
import { Select, Form, Input, Spin } from "antd";
import { GlobalContext } from "../../context/GlobalContext";
import { ApplicationContext } from "../../context/ApplicationContext";
import { RealTokenTransaction } from "../../types/formTypes";
import { PrimaryButton } from "../";
const { Option } = Select;

const TokenTransactionModal = () => {
  const { isLoading, hideTokenTransactionModal, isTokenTransactionModalOpen } =
    useContext(GlobalContext);
  const { tokenTransaction, defaultTokenTransactionData } =
    useContext(ApplicationContext);
  const [form] = Form.useForm();

  useEffect(() => {
    if (isTokenTransactionModalOpen) {
      form.setFieldsValue({ ...defaultTokenTransactionData });
    }
  }, [defaultTokenTransactionData]);

  const onFinish = () => {
    const values = form.getFieldsValue();
    tokenTransaction(values as RealTokenTransaction);
  };

  return (
    <Spin spinning={isLoading} size="large">
      <div className="flex w-full ">
        <Form
          form={form}
          layout="vertical"
          preserve={false}
          requiredMark="optional"
          className="w-full"
          onFinish={onFinish}
        >
          <div className="flex flex-col p-5 bg-gray-200 rounded-xl text-center">
            <div className="text-xl font-bold">
              {defaultTokenTransactionData?.operation}
              {!defaultTokenTransactionData && "Operate"} Your Tokens
            </div>
            <div>Operate on The Tokens You Hold</div>
          </div>
          <div className="text-lg font-semibold mt-3">Contract Address</div>
          <Form.Item name="address" required>
            <Input
              placeholder="Token Contract Address"
              style={{
                width: "100%",
              }}
              size="large"
              disabled={defaultTokenTransactionData !== null}
            />
          </Form.Item>
          <div className="text-lg font-semibold">Token Type</div>
          <Form.Item name="type" required>
            <Select
              style={{ width: "100%" }}
              size="large"
              disabled={defaultTokenTransactionData !== null}
            >
              <Option value="ERC-20">ERC-20</Option>
              <Option value="ERC-721">ERC-721</Option>
              <Option value="ERC-1155">ERC-1155</Option>
            </Select>
          </Form.Item>
          <div className="text-lg font-semibold">Transfer To</div>
          <Form.Item name="to" required>
            <Input
              placeholder="Token Receiver Address"
              style={{ width: "100%" }}
              size="large"
            />
          </Form.Item>
          <div className="text-lg font-semibold">Token ID</div>
          <Form.Item name="tokenId" required>
            <Input
              placeholder="ERC-721 or ERC-1155 token ID"
              style={{ width: "100%" }}
              size="large"
              disabled={defaultTokenTransactionData !== null}
            />
          </Form.Item>
          <div className="text-lg font-semibold">Amount</div>
          <Form.Item name="amount" required>
            <Input
              placeholder="Amount of Token Transfer"
              style={{ width: "100%" }}
              size="large"
            />
          </Form.Item>
          <div className="flex items-center justify-center space-x-3">
            <PrimaryButton
              label="Confirm"
              bgColor="#00BEA1"
              textColor="#fff"
              fn={() => []}
            />
            <PrimaryButton
              label="Cancel"
              bgColor="#1C1C1C"
              textColor="#fff"
              fn={hideTokenTransactionModal}
            />
          </div>
        </Form>
      </div>
    </Spin>
  );
};

export default TokenTransactionModal;
