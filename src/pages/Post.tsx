import React, { useState, useContext, useEffect } from "react";
import { Form, Input, Select, DatePicker } from "antd";
import { PrimaryButton, DotsContainer } from "../components";
import { toPng } from "html-to-image";
import { invitation, logo_single } from "../assets";
import download from "downloadjs";
import { PostTaskData, defaultPostTaskData } from "../types/baseTypes";
import dayjs from "dayjs";
import { antdDateFormat } from "../utils/tools";
import { DataContext } from "../context/DataContext";
import { getNetwork } from "@wagmi/core";
const { Option } = Select;

const UserStateItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-base">{label}</div>
      <div className="text-2xl font-semibold">{value}</div>
    </div>
  );
};

const InvitationItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-[#d982f6]">{label}</div>
      <div className="text-xl font-semibold text-[#75b0f3]">{value}</div>
    </div>
  );
};

const Post = () => {
  const [form] = Form.useForm();
  const [taskData, setTaskData] = useState<PostTaskData>(defaultPostTaskData);
  const { platforms, requires, queryRequires, queryPlatforms } =
    useContext(DataContext);
  const { chain } = getNetwork();

  useEffect(() => {
    queryRequires();
    queryPlatforms();
  }, [chain?.id]);

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = () => {
    const values = form.getFieldsValue();
    console.log(values);
    generateImg();
  };

  const generateImg = () => {
    const node = document.getElementById("invitation-letter");
    toPng(node!).then((dataUrl) => {
      download(dataUrl, "invitation-letter.png");
    });
  };

  const invitationItem1: { label: string; value: string }[] = [
    { label: "Platform", value: taskData.platform },
    {
      label: "Source ID",
      value:
        taskData.sourceId != "*" ? "#" + taskData.sourceId : taskData.sourceId,
    },
    { label: "Source Link", value: taskData.source },
    { label: "Payment", value: taskData.payment },
    { label: "Currency", value: taskData.currency },
    { label: "Amount", value: taskData.amount },
    { label: "Require", value: taskData.require },
    {
      label: "Deadline",
      value:
        taskData.deadline != "*"
          ? dayjs.unix(parseInt(taskData.deadline)).format("YYYY-MM-DD")
          : "*",
    },
    { label: "Start Time", value: dayjs().format("YYYY-MM-DD") },
  ];
  const invitationItem2: { label: string; value: string }[] = [
    { label: "Audit Module", value: taskData.audit },
    { label: "Detection Module", value: taskData.detection },
    { label: "Poster", value: "Murmes" },
  ];

  return (
    <div className="flex items-center justify-center">
      <div className="flex md:w-[1200px] md:flex-row flex-col justify-between">
        <Form
          form={form}
          layout="vertical"
          requiredMark="optional"
          className="w-full"
          onFinish={onFinish}
          id="form"
        >
          <Form.Item name="platform" label="PLATFORM" required>
            <div className="flex border border-[#322d3a] rounded-3xl p-1">
              <Select
                placeholder="Select a Platform"
                onChange={(value) =>
                  setTaskData({ ...taskData, platform: value })
                }
                // optionFilterProp="children"
                //   filterOption={(input, option) =>
                //     (option!.children as unknown as string)
                //       .toLowerCase()
                //       .includes(input.toLowerCase())
                //   }
              >
                {platforms &&
                  platforms.map((item, index) => (
                    <Option key={index} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
              </Select>
            </div>
          </Form.Item>
          <Form.Item name="sourceId" label="SOURCE ID" required>
            <div className="flex border border-[#322d3a] rounded-3xl p-1">
              <Input
                placeholder="If the Service is Not Started, the ID is 0"
                onChange={(e) =>
                  setTaskData({ ...taskData, sourceId: e.target.value })
                }
              />
            </div>
          </Form.Item>
          <Form.Item name="source" label="SOURCE LINK" required>
            <div className="flex border border-[#322d3a] rounded-3xl p-1">
              <Input
                placeholder="Provide the Source Link to Locate the Task"
                onChange={(e) =>
                  setTaskData({ ...taskData, source: e.target.value })
                }
              />
            </div>
          </Form.Item>
          <Form.Item name="payment" label="PAYMENT" required>
            <div className="flex border border-[#322d3a] rounded-3xl p-1">
              <Select
                placeholder="Select a Payment Strategy"
                onChange={(value) =>
                  setTaskData({ ...taskData, payment: value })
                }
              >
                {[
                  { value: "OT0", label: "One-time Payment" },
                  { value: "D1", label: "Divided Payment" },
                  { value: "OT2", label: "One-time Mortgage Payment" },
                ].map((item, index) => (
                  <Option value={item.value} key={index}>
                    {item.label}
                  </Option>
                ))}
              </Select>
            </div>
          </Form.Item>
          <Form.Item name="currency" label="CURRENCY">
            <div className="flex border border-[#322d3a] rounded-3xl p-1">
              <Select
                placeholder="Select a Currency"
                onChange={(value) =>
                  setTaskData({ ...taskData, currency: value })
                }
              >
                {[
                  { value: "NONE", label: "NONE" },
                  { value: "USDT", label: "USDT" },
                  { value: "USDC", label: "USDC" },
                  { value: "DAI", label: "DAI" },
                  { value: "WTOKEN", label: "WETH/WMATIC" },
                ].map((item, index) => (
                  <Option value={item.value} key={index}>
                    {item.label}
                  </Option>
                ))}
              </Select>
            </div>
          </Form.Item>
          <Form.Item name="amount" label="AMOUNT" required>
            <div className="flex border border-[#322d3a] rounded-3xl p-1">
              <Input
                placeholder="Payment Amount or Proportion"
                onChange={(e) =>
                  setTaskData({ ...taskData, amount: e.target.value })
                }
              />
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
                onChange={(value) =>
                  setTaskData({ ...taskData, require: value })
                }
              >
                {requires &&
                  requires.map((item, index) => (
                    <Option key={index} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
              </Select>
            </div>
          </Form.Item>
          <Form.Item name="deadline" label="DEADLINE">
            <div className="flex border border-[#322d3a] rounded-3xl p-1">
              <DatePicker
                style={{ width: "100%" }}
                placeholder="Default is Extend 365 Days"
                onChange={(value) =>
                  setTaskData({
                    ...taskData,
                    deadline: antdDateFormat(value?.valueOf()),
                  })
                }
              />
            </div>
          </Form.Item>
          <Form.Item name="audit" label="AUDIT MODULE" required>
            <div className="flex border border-[#322d3a] rounded-3xl p-1">
              <Select
                showSearch
                placeholder="Select a Audit Module"
                onChange={(value) => setTaskData({ ...taskData, audit: value })}
              />
            </div>
          </Form.Item>
          <Form.Item name="detection" label="DETECTION MODULE" required>
            <div className="flex border border-[#322d3a] rounded-3xl p-1">
              <Select
                showSearch
                placeholder="Select a Detection Module"
                onChange={(value) =>
                  setTaskData({ ...taskData, detection: value })
                }
              />
            </div>
          </Form.Item>
        </Form>
        <div className="flex flex-col items-center justify-between mb-[24px] md:ml-10">
          <DotsContainer
            title={
              <div className="flex flex-col items-center title text-xl text-white">
                Generate Invitation
              </div>
            }
            content={
              <div
                id="invitation-letter"
                className="flex flex-col w-[550px] h-full min-h-[650px] bg-no-repeat bg-center bg-cover items-center justify-between p-5"
                style={{ backgroundImage: `url(${invitation})` }}
              >
                <div className="flex flex-col items-center">
                  <div className="flex text-white invitation text-9xl font-semibold opacity-20">
                    MURMES
                  </div>
                  <img
                    src={logo_single}
                    style={{ width: "100px", marginTop: "-60px" }}
                  />
                </div>

                <div className="flex flex-col w-full rounded-xl bg-[rgba(255,255,255,0.15)] p-3 shadow-sm">
                  <div className="grid grid-cols-3 space-y-2">
                    {invitationItem1.map((item, index) => (
                      <InvitationItem
                        value={item.value}
                        label={item.label}
                        key={index}
                      />
                    ))}
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    {invitationItem2.map((item, index) => (
                      <InvitationItem
                        value={item.value}
                        label={item.label}
                        key={index}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-center mb-2">
                  <div className="text-base font-medium opacity-30 text-[#E066FF]">
                    You Are Invited To Submit Your Excellent Work
                  </div>
                  <div className="text-3xl invitation font-semibold opacity-50 text-white">
                    NEW TASK WITH GREAT REWARDS!
                  </div>
                </div>
              </div>
            }
          />

          <div className="flex flex-col items-center justify-center w-full mt-10">
            <div className="flex text-white items-center justify-center border-2 border-dashed border-[#322d3a] rounded-xl w-full py-5 mb-10">
              <div className="flex space-x-10 items-center justify-center">
                <UserStateItem label="Reputation" value="100.0" />
                <div
                  style={{
                    width: "2px",
                    height: "30px",
                    backgroundColor: "#322d3a",
                    borderRadius: "10px",
                  }}
                />
                <UserStateItem label="Deposit" value="100.0" />
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
        </div>
      </div>
    </div>
  );
};

export default Post;
