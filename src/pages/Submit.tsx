import React, { useState } from "react";
import { Form, Input, Select } from "antd";
import { PrimaryButton, DotsContainer } from "../components";

const { Option } = Select;

const UserStateItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-base">{label}</div>
      <div className="text-2xl font-semibold">{value}</div>
    </div>
  );
};

const BundlrStateItem = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactElement;
}) => {
  return (
    <div className="flex flex-col items-start justify-center">
      <div className="text-base">{label}</div>
      <div className="flex text-lg font-semibold">{value}</div>
    </div>
  );
};

const Submit = () => {
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
  };

  const onFinish = () => {
    const values = form.getFieldsValue();
    console.log(values);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex md:w-[1200px] md:flex-row flex-col justify-between">
        <div className="flex w-full flex-col items-center justify-center">
          <Form
            form={form}
            layout="vertical"
            requiredMark="optional"
            className="w-full"
            onFinish={onFinish}
            id="form"
          >
            <Form.Item name="taskId" label="TASK ID" required>
              <div className="flex border border-[#322d3a] rounded-3xl p-1">
                <Input placeholder="ID of the Task to Which the Work Belongs" />
              </div>
            </Form.Item>
            <Form.Item name="cid" label="SOURCE LINK" required>
              <div className="flex border border-[#322d3a] rounded-3xl p-1">
                <Input placeholder="Storage Address for Completed Work" />
              </div>
            </Form.Item>
            <Form.Item name="fingerprint" label="Fingerprint" required>
              <div className="flex border border-[#322d3a] rounded-3xl p-1">
                <Input placeholder="Fingerprint Value for Completed Work" />
              </div>
            </Form.Item>
            <Form.Item name="require" label="REQUIRE" required>
              <div className="flex border border-[#322d3a] rounded-3xl p-1">
                <Select
                  showSearch
                  placeholder="Select a Rquire"
                  // optionFilterProp="children"
                  //   filterOption={(input, option) =>
                  //     (option!.children as unknown as string)
                  //       .toLowerCase()
                  //       .includes(input.toLowerCase())
                  //   }
                />
              </div>
            </Form.Item>
          </Form>
          <div className="flex text-white items-center justify-center border-2 border-dashed border-[#322d3a] rounded-xl w-full py-5 mb-10 mt-5">
            <div className="flex space-x-10 items-center justify-center">
              <UserStateItem label="Repuataion" value="100.0" />
              <div
                style={{
                  width: "2px",
                  height: "30px",
                  backgroundColor: "#322d3a",
                  borderRadius: "10px",
                }}
              />
              <UserStateItem label="Despoit" value="100.0" />
              <div
                style={{
                  width: "2px",
                  height: "30px",
                  backgroundColor: "#322d3a",
                  borderRadius: "10px",
                }}
              />
              <UserStateItem label="Status" value="Normal" />
            </div>
          </div>
          <div className="flex space-x-10">
            <PrimaryButton
              label="Reset"
              bgColor="#edebdc"
              textColor="#000000"
              fn={onReset}
            />
            <PrimaryButton
              label="Submit"
              bgColor="#00BEA1"
              textColor="#fff"
              fn={onFinish}
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-between mb-[24px] md:ml-10">
          <div className="flex flex-col w-[550px] items-center justify-center text-white item-center">
            <DotsContainer
              title={
                <div className="flex flex-col items-center">
                  <div className="text-xl font-medium title">
                    Use Bundlr to Upload Files
                  </div>
                  <div>Support By Arwarve Network</div>
                </div>
              }
              content={
                <div className="flex flex-col w-full p-5 space-y-2">
                  <BundlrStateItem label="Your Balance" value={<>10.0</>} />
                  <BundlrStateItem
                    label="Your Storage Balance"
                    value={<>10.0</>}
                  />
                  <BundlrStateItem
                    label="Amount to Deposit"
                    value={
                      <div className="flex border border-[#322d3a] rounded-3xl p-1">
                        <Input />
                      </div>
                    }
                  />
                </div>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Submit;
