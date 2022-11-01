import { Select, Form, Input, InputNumber, DatePicker } from "antd";
import { MdOutlineClose } from "react-icons/md";
import { GiToken } from "react-icons/gi";
import { AiFillDollarCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { ModelDataMini } from "../index";
import { useContext } from "react";
import type { DatePickerProps } from "antd";
import { ApplicationContext } from "../../context/ApplicationContext";
const { Option } = Select;
const dataChangeHandler: DatePickerProps["onChange"] = (date, dateString) => {
  console.log(date, dateString);
};
const SubmitApplication = () => {
  const [form] = Form.useForm();
  const { hideApplicationModal } = useContext(ApplicationContext);
  return (
    <div className="flex p-5 w-full">
      <Form
        form={form}
        layout="vertical"
        requiredMark="optional"
        className="w-full"
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
            {ModelDataMini("DVTs Available", <GiToken />, 0.1)}
            {ModelDataMini("Current Value", <AiFillDollarCircle />, 1.1)}
            {ModelDataMini("Transaction Fee", <SiEthereum />, 0.11)}
          </div>
        </Form.Item>
        <Form.Item
          label="Platform"
          tooltip="The name or blockchain address of the platform to which the video belongs."
        >
          <Input placeholder="Platform name or id address." />
        </Form.Item>
        <Form.Item
          label="Video ID"
          tooltip="After the platform opens the service for video, the video gets the unique ID in the platform."
        >
          <InputNumber
            placeholder="If the service is not started, the ID is 0."
            min={0}
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item label="Payment strategy" required>
          <Select defaultValue="0" style={{ width: "100%" }}>
            <Option value="0">One-time Payment</Option>
            <Option value="1">Divided Payment</Option>
            <Option value="2">One-time Mortgage Payment</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Payment amount"
          required
          tooltip="Zimu token is required for one-time payment, and VT token of future expected income is used for others. Divided payment refers to the payment proportion, with a maximum of 1000000 (100%)."
        >
          <InputNumber
            placeholder="Payment amount or proportion."
            min={1}
            style={{ width: "100%" }}
            decimalSeparator="18"
          />
        </Form.Item>
        <Form.Item label="Language" required>
          <Select
            showSearch
            defaultValue="cn"
            placeholder="Select a language"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option!.children as unknown as string)
                .toLowerCase()
                .includes(input.toLowerCase())
            }
          >
            <Option value="cn">Chinese</Option>
            <Option value="en">English</Option>
            <Option value="kr">Korean</Option>
            <Option value="jp">Japanese</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Deadline"
          tooltip="If no subtitles are uploaded by the deadline, the application will be frozen."
        >
          <DatePicker
            onChange={dataChangeHandler}
            style={{ width: "100%" }}
            placeholder="The default is to extend by 365 days."
          />
        </Form.Item>
        <div className="flex items-center justify-center rounded-md text-white font-medium px-[1.1rem] py-2.5 cursor-pointer bg-gradient-to-r from-purple-400 to-blue-400 hover:brightness-110">
          Submit
        </div>
      </Form>
    </div>
  );
};

export default SubmitApplication;
