import React, { useContext, useEffect, useState } from "react";
import type { UploadProps } from "antd";
import { Form, Input, Select, Upload } from "antd";
import { PrimaryButton, DotsContainer } from "../components";
import { BsUpload } from "react-icons/bs";
import { DataContext } from "../context/DataContext";
import { useSearchParams } from "react-router-dom";
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

const BundlrStateItem = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactElement;
}) => {
  return (
    <div className="flex flex-col justify-center w-full">
      <div className="text-base">{label}</div>
      <div className="flex text-lg font-semibold">{value}</div>
    </div>
  );
};

const Submit = () => {
  const [form] = Form.useForm();
  const { queryRequires, requires } = useContext(DataContext);
  const { chain } = getNetwork();
  const [searchParams] = useSearchParams();
  const onReset = () => {
    form.resetFields();
  };

  useEffect(() => {
    queryRequires();
    const taskId = searchParams.get("taskId");
    const require = searchParams.get("require");
    taskId && require && form.setFieldsValue({ taskId, require });
  }, [chain?.id]);

  const onFinish = () => {
    const values = form.getFieldsValue();
    console.log(values);
  };

  const uploadProps: UploadProps = {
    name: "file",
    maxCount: 1,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        console.log(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        console.log(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div className="flex items-center justify-center styled">
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
              <Input
                size="large"
                placeholder="ID of the Task to Which the Work Belongs"
              />
            </Form.Item>
            <Form.Item name="cid" label="SOURCE LINK" required>
              <Input
                size="large"
                placeholder="Storage Address for Completed Work"
              />
            </Form.Item>
            <Form.Item name="fingerprint" label="Fingerprint" required>
              <Input
                size="large"
                placeholder="Fingerprint Value for Completed Work"
              />
            </Form.Item>
            <Form.Item name="require" label="REQUIRE" required>
              <Select
                size="large"
                showSearch
                placeholder="Select a Rquire"
                // optionFilterProp="children"
                //   filterOption={(input, option) =>
                //     (option!.children as unknown as string)
                //       .toLowerCase()
                //       .includes(input.toLowerCase())
                //   }
              >
                {requires &&
                  requires.map((item, index) => (
                    <Option key={index} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Form>
          <div className="flex text-white items-center justify-center border-2 border-dashed border-[#322d3a] rounded-xl w-full py-5 mb-10 mt-5">
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
        <div className="flex flex-col items-center justify-between md:ml-10">
          <div className="flex flex-col h-full w-[550px] items-center justify-between text-white">
            <DotsContainer
              title={
                <div className="flex flex-col items-center title text-xl">
                  Upload File
                </div>
              }
              content={
                <div className="flex flex-col items-center justify-center min-h-[150px] cursor-pointer">
                  <Upload {...uploadProps}>
                    <div className="flex flex-col items-center justify-center  ">
                      <BsUpload fontSize={35} color="#edebdc" />
                      <div className="mt-5 text-lg font- text-white">
                        Click to Upload File
                      </div>
                    </div>
                  </Upload>
                </div>
              }
            />

            <DotsContainer
              title={
                <div className="flex flex-col items-center title text-xl">
                  Upload to Arwarve
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
                    label="Estimated Cost to Upload"
                    value={<>10.0</>}
                  />
                  <BundlrStateItem
                    label="Amount to Deposit"
                    value={
                      <div className="flex border border-[#322d3a] rounded-3xl p-1 w-full mt-[8px]">
                        <Input
                          placeholder="Support By Bundlr"
                          style={{
                            width: "100%",
                            fontWeight: "",
                            border: "none",
                          }}
                        />
                        <div className="flex items-center rounded-full font-semibold text-sm cursor-pointer hover:brightness-110 bg-[#edebdc] text-black px-5 -m-1">
                          Deposit
                        </div>
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
