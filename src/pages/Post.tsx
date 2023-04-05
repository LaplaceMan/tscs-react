import React from "react";
import { Form, Input, Select, DatePicker } from "antd";
import { PrimaryButton } from "../components";

const UserStateItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-base">{label}</div>
      <div className="text-2xl font-semibold">{value}</div>
    </div>
  );
};

const Post = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex md:w-[1200px] md:flex-row flex-col justify-between">
        <Form
          layout="vertical"
          requiredMark="optional"
          className="w-full"
          initialValues={{ payment: "D1" }}
        >
          <Form.Item label="PLATFORM" required>
            <div className="flex border border-[#322d3a] rounded-3xl p-1">
              <Select
                defaultValue="murmes"
                placeholder="Select a Platform"
                options={[{ value: "murmes", label: "Murmes" }]}
                // optionFilterProp="children"
                //   filterOption={(input, option) =>
                //     (option!.children as unknown as string)
                //       .toLowerCase()
                //       .includes(input.toLowerCase())
                //   }
              />
            </div>
          </Form.Item>
          <Form.Item label="SOURCE ID" required>
            <div className="flex border border-[#322d3a] rounded-3xl p-1">
              <Input placeholder="If the Service is Not Started, the ID is 0" />
            </div>
          </Form.Item>
          <Form.Item label="SOURCE LINK" required>
            <div className="flex border border-[#322d3a] rounded-3xl p-1">
              <Input placeholder="Provide the Source Link to Locate the Task" />
            </div>
          </Form.Item>
          <Form.Item label="PAYMENT" required>
            <div className="flex border border-[#322d3a] rounded-3xl p-1">
              <Select
                defaultValue="OT0"
                placeholder="Select a Payment Strategy"
                options={[
                  { value: "OT0", label: "One-time Payment" },
                  { value: "D1", label: "Divided Payment" },
                  { value: "OT2", label: "One-time Mortgage Payment" },
                ]}
              />
            </div>
          </Form.Item>
          <Form.Item label="CURRENCY">
            <div className="flex border border-[#322d3a] rounded-3xl p-1">
              <Select
                defaultValue="default"
                placeholder="Select a Currency"
                options={[
                  { value: "default", label: "Default" },
                  { value: "usdt", label: "USDT" },
                  { value: "usdc", label: "USDC" },
                  { value: "dai", label: "DAI" },
                  { value: "wtoken", label: "WETH/WMATIC" },
                ]}
              />
            </div>
          </Form.Item>
          <Form.Item label="AMOUNT" required>
            <div className="flex border border-[#322d3a] rounded-3xl p-1">
              <Input placeholder="Payment Amount or Proportion" />
            </div>
          </Form.Item>
          <Form.Item label="REQUIRE" required>
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
          <Form.Item label="DEADLINE">
            <div className="flex border border-[#322d3a] rounded-3xl p-1">
              <DatePicker
                style={{ width: "100%" }}
                placeholder="Default is Extend 365 Days"
              />
            </div>
          </Form.Item>
          <Form.Item label="AUDIT MODULE" required>
            <div className="flex border border-[#322d3a] rounded-3xl p-1">
              <Select showSearch placeholder="Select a Audit Module" />
            </div>
          </Form.Item>
          <Form.Item label="DETECTION MODULE" required>
            <div className="flex border border-[#322d3a] rounded-3xl p-1">
              <Select showSearch placeholder="Select a Detection Module" />
            </div>
          </Form.Item>
        </Form>
        <div className="flex flex-col items-center justify-between mb-[24px] md:ml-10">
          <div className="flex w-[550px] h-full min-h-[500px] bg-white"></div>
          <div className="flex text-white items-center justify-center my-10 border-2 border-dashed border-[#322d3a] rounded-xl w-full py-5">
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
            />
            <PrimaryButton label="Submit" bgColor="#00BEA1" textColor="#fff" />
          </div>
        </div>
      </div>
    </div>
  );
};

// address platform; // 所属第三方平台
// uint256 sourceId; // 在第三方平台内的ID（在Murmes内的顺位）
// uint256 requireId; // 所需条件的ID
// string source; // 源地址
// DataTypes.SettlementType settlement; // 所采用的结算策略
// uint256 amount; // 支付数目/比例
// address currency; // 支付代币类型
// address auditModule; // 所采用的审核（Item状态改变）模块
// address detectionModule; // 所采用的Item检测模块
// uint256 deadline; // 截止/有效日期
export default Post;
