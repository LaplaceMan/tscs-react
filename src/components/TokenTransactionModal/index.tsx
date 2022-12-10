import React from "react";
import { Select, Form, Input, InputNumber, Spin } from "antd";
import { GlobalContext } from "../../context/GlobalContext";
import { ApplicationContext } from "../../context/ApplicationContext";
import { useContext, useEffect } from "react";
import { MdOutlineClose } from "react-icons/md";
import { ModelDataMini } from "../index";

const { Option } = Select;

const TokenTransaction = () => {
  const { isLoading, hideTokenTransactionModal } = useContext(GlobalContext);
  const { defaultTokenTransactionData, tokenTransaction } =
    useContext(ApplicationContext);
  const [form] = Form.useForm();

  const onFinish = () => {
    const values = form.getFieldsValue();
    tokenTransaction(values);
  };

  useEffect(() => {
    if (defaultTokenTransactionData.type != "") {
      form.setFieldsValue({ ...defaultTokenTransactionData });
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
          className="w-full"
          onFinish={onFinish}
          initialValues={{ type: "ERC-20" }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="text-xl font-bold">
              Transfer or authorize your token
            </div>
            <div
              className="flex hover:text-white hover:bg-black items-center justify-center cursor-pointer mt-1 rounded-full p-0.5"
              onClick={hideTokenTransactionModal}
            >
              <MdOutlineClose fontSize="1.25rem" />
            </div>
          </div>
          <Form.Item>
            <div className="flex bg-gray-100 rounded-md p-2 items-center justify-between">
              {ModelDataMini(
                "Token Name",
                null,
                defaultTokenTransactionData.name
              )}
              {ModelDataMini(
                "Token Symbol",
                null,
                defaultTokenTransactionData.symbol
              )}
              {ModelDataMini(
                "Token Decimals",
                null,
                defaultTokenTransactionData.decimals
              )}
            </div>
          </Form.Item>
          <Form.Item name="address" label="Contract address" required>
            <Input
              placeholder="Token contract address."
              style={{ width: "100%" }}
              disabled={
                defaultTokenTransactionData &&
                defaultTokenTransactionData.address != ""
                  ? true
                  : false
              }
            />
          </Form.Item>
          <Form.Item name="type" label="Token Type" required>
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
          </Form.Item>
          <Form.Item name="from" label="Transfer from" required>
            <Input
              placeholder="Token payer address."
              style={{ width: "100%" }}
              disabled={
                defaultTokenTransactionData &&
                defaultTokenTransactionData.from != ""
                  ? true
                  : false
              }
            />
          </Form.Item>
          <Form.Item name="to" label="Transfer to" required>
            <Input
              placeholder="Token receiver address."
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item name="tokenId" label="Token id" required>
            <InputNumber
              min={0}
              placeholder="ERC-721 or ERC-1155 token id."
              style={{ width: "100%" }}
              disabled={
                defaultTokenTransactionData &&
                defaultTokenTransactionData.tokenId != ""
                  ? true
                  : false
              }
            />
          </Form.Item>
          <Form.Item name="amount" label="Transfer amount" required>
            <InputNumber
              placeholder="Amount of token transfer."
              min={0}
              style={{ width: "100%" }}
              disabled={
                defaultTokenTransactionData &&
                defaultTokenTransactionData.amount != ""
                  ? true
                  : false
              }
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

export default TokenTransaction;
