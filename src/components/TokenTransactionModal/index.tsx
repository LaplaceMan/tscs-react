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
  const { defaultTokenTransactionData, tokenTransaction } =
    useContext(ApplicationContext);
  const [form] = Form.useForm();

  const onFinish = () => {
    const values = form.getFieldsValue();
    tokenTransaction(values as RealTokenTransaction);
  };

  useEffect(() => {
    if (isTokenTransactionModalOpen) {
      if (defaultTokenTransactionData.type != "") {
        form.setFieldsValue({ ...defaultTokenTransactionData });
      } else {
        form.setFieldsValue(null);
      }
    }
  });

  return (
    <Spin spinning={isLoading} size="large">
      <div className="flex w-full normal">
        <Form
          form={form}
          layout="vertical"
          preserve={false}
          requiredMark="optional"
          className="w-full"
          onFinish={onFinish}
          initialValues={{ tokenType: "ERC-20" }}
        >
          <div className="text-xl font-bold">Transfer or Approve Tokens</div>
          <div>Operate on The Tokens You Hold.</div>
          <div className="text-lg font-semibold mt-3">Contract Address</div>
          <Form.Item name="address" required>
            <div className="normal border border-gray-200 mt-2 rounded-xl text-base">
              <Input
                placeholder="Token Contract Address"
                style={{ width: "100%" }}
                disabled={
                  defaultTokenTransactionData &&
                  defaultTokenTransactionData.address != ""
                    ? true
                    : false
                }
              />
            </div>
          </Form.Item>
          <div className="text-lg font-semibold">Token Type</div>
          <Form.Item name="tokenType" required>
            <div className="normal border border-gray-200 mt-2 rounded-xl text-base">
              <Select
                style={{ width: "100%" }}
                disabled={
                  defaultTokenTransactionData &&
                  defaultTokenTransactionData.type != ""
                    ? true
                    : false
                }
              >
                <Option value="ERC-20">ERC-20</Option>
                <Option value="ERC-721">ERC-721</Option>
                <Option value="ERC-1155">ERC-1155</Option>
              </Select>
            </div>
          </Form.Item>
          <div className="text-lg font-semibold">Transfer From</div>
          <Form.Item name="from" required>
            <div className="normal border border-gray-200 mt-2 rounded-xl text-base">
              <Input
                placeholder="Token Payer Address"
                style={{ width: "100%" }}
                disabled={
                  defaultTokenTransactionData &&
                  defaultTokenTransactionData.from != ""
                    ? true
                    : false
                }
              />
            </div>
          </Form.Item>
          <div className="text-lg font-semibold">Transfer To</div>
          <Form.Item name="to" required>
            <div className="normal border border-gray-200 mt-2 rounded-xl text-base">
              <Input
                placeholder="Token Receiver Address"
                style={{ width: "100%" }}
              />
            </div>
          </Form.Item>
          <div className="text-lg font-semibold">Token ID</div>
          <Form.Item name="tokenId" required>
            <div className="normal border border-gray-200 mt-2 rounded-xl text-base">
              <Input
                placeholder="ERC-721 or ERC-1155 token ID"
                style={{ width: "100%" }}
                disabled={
                  defaultTokenTransactionData &&
                  defaultTokenTransactionData.tokenId != ""
                    ? true
                    : false
                }
              />
            </div>
          </Form.Item>
          <div className="text-lg font-semibold">Amount</div>
          <Form.Item name="amount" required>
            <div className="normal border border-gray-200 mt-2 rounded-xl text-base">
              <Input
                placeholder="Amount of Token Transfer"
                style={{ width: "100%" }}
                disabled={
                  defaultTokenTransactionData &&
                  defaultTokenTransactionData.amount != ""
                    ? true
                    : false
                }
              />
            </div>
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
