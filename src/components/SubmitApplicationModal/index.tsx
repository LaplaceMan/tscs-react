import React from "react";
import { Select, Form, Input, InputNumber, DatePicker, Spin } from "antd";
import { MdOutlineClose } from "react-icons/md";
import { GiToken } from "react-icons/gi";
import { AiFillDollarCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { ModelDataMini } from "../index";
import { useContext } from "react";
import { ApplicationContext } from "../../context/ApplicationContext";
import { WalletContext } from "../../context/WalletContext";
import { GlobalContext } from "../../context/GlobalContext";
import { DataContext } from "../../context/DataContext";
import { countryLanguageMap } from "../../utils/constants";
import { SUBTITLE_SYSTEM } from "../../utils/contracts";
const { ethereum } = window as any;
const { Option } = Select;

const SubmitApplication = () => {
  const [form] = Form.useForm();
  const { submitApplication, userDID } = useContext(ApplicationContext);
  const { hideApplicationModal, isLoading } = useContext(GlobalContext);
  const { gasPrice } = useContext(WalletContext);
  const { regiserLanguages, regiserPlatforms } = useContext(DataContext);

  const onFinish = () => {
    const values = form.getFieldsValue();
    const date = values.deadline.valueOf();
    values.deadline = parseInt((date / 1000).toString());
    submitApplication(values);
  };

  return (
    <Spin spinning={isLoading} size="large">
      <div className="flex p-5 w-full">
        <Form
          form={form}
          layout="vertical"
          requiredMark="optional"
          className="w-full"
          onFinish={onFinish}
          initialValues={{
            strategy: 0,
            language: "1",
            platform: String(SUBTITLE_SYSTEM[ethereum.chainId]).toLowerCase(),
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="text-xl font-bold">
              Submit application to use subtitle service
            </div>
            <div
              className="flex hover:text-white hover:bg-black items-center justify-center cursor-pointer mt-1 rounded-full p-0.5"
              onClick={hideApplicationModal}
            >
              <MdOutlineClose fontSize="1.25rem" />
            </div>
          </div>
          <Form.Item>
            <div className="flex bg-gray-100 rounded-md p-2 items-center justify-between">
              {ModelDataMini("DVTs Available", <GiToken />, userDID.reputation)}
              {ModelDataMini("Current Value", <AiFillDollarCircle />, 1.1)}
              {ModelDataMini("Gas Price", <SiEthereum />, gasPrice)}
            </div>
          </Form.Item>
          <Form.Item
            name="platform"
            label="Platform"
            tooltip="The platform to which the video belongs."
            required
          >
            <Select
              style={{ width: "100%" }}
              placeholder="Select a platform"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option!.children as unknown as string)
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            >
              {regiserPlatforms.length > 0 &&
                regiserPlatforms.map((item, index) => {
                  return (
                    <Option value={item.id} key={index}>
                      {item.name}
                    </Option>
                  );
                })}
            </Select>
          </Form.Item>
          <Form.Item
            name="videoId"
            label="Video ID"
            tooltip="After the platform opens the service for video, the video gets the unique ID in the platform."
            required
          >
            <InputNumber
              placeholder="If the service is not started, the ID is 0."
              min={0}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            name="source"
            label="Source Link"
            tooltip="In order to accurately locate the video, it is recommended to provide a source link."
            required
          >
            <Input placeholder="Video source link." style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="strategy" label="Payment strategy" required>
            <Select style={{ width: "100%" }}>
              <Option value={0}>One-time Payment</Option>
              <Option value={1}>Divided Payment</Option>
              <Option value={2}>One-time Mortgage Payment</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="amount"
            label="Payment amount"
            required
            tooltip="Zimu token is required for one-time payment, and VT token of future expected income is used for others. Divided payment refers to the payment proportion, with a maximum of 1000000 (100%)."
          >
            <InputNumber
              placeholder="Payment amount or proportion."
              min={0}
              style={{ width: "100%" }}
              // decimalSeparator="18"
            />
          </Form.Item>
          <Form.Item name="language" label="Language" required>
            <Select
              showSearch
              placeholder="Select a language"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option!.children as unknown as string)
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            >
              {regiserLanguages.length > 0 &&
                regiserLanguages.map((item, index) => (
                  <Option value={item.id} key={index}>
                    {countryLanguageMap[item.notes]
                      ? countryLanguageMap[item.notes]
                      : item.notes}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="deadline"
            label="Deadline"
            tooltip="If no subtitles are uploaded by the deadline, the application will be frozen."
          >
            <DatePicker
              style={{ width: "100%" }}
              placeholder="The default is to extend by 365 days."
            />
          </Form.Item>
          <div
            className="flex items-center justify-center rounded-md text-white font-medium px-[1.1rem] py-2.5 cursor-pointer bg-gradient-to-r from-purple-400 to-blue-400 hover:brightness-110"
            onClick={onFinish}
          >
            Submit
          </div>
        </Form>
      </div>
    </Spin>
  );
};

export default SubmitApplication;
