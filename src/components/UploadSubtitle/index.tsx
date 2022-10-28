import { Select, Form, Input, InputNumber } from "antd";
import { GiToken } from "react-icons/gi";
import { AiFillDollarCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { MdOutlineClose } from "react-icons/md";
import { ModelDataMini } from "../index";
import React, { useContext, useEffect } from "react";
import { ApplicationContext } from "../../context/ApplicationContext";
const { Option } = Select;

const UploadSubtitle = (): React.ReactElement => {
  const [form] = Form.useForm();
  const { defaultUploadSubtitleData, hideUploadModal } =
    useContext(ApplicationContext);
  useEffect(() => {
    if (defaultUploadSubtitleData.applyId) {
      form.setFieldsValue({ ...defaultUploadSubtitleData });
    } else {
      form.setFieldsValue(null);
    }
  });
  return (
    <div className="flex p-5 w-full">
      <Form
        form={form}
        layout="vertical"
        preserve={false}
        requiredMark="optional"
        className="w-full"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="text-xl font-bold">
            Upload subtitles for the video you support
          </div>
          <div
            className="flex hover:text-white hover:bg-black items-center justify-center cursor-pointer mt-1 rounded-full p-0.5"
            onClick={hideUploadModal}
          >
            <MdOutlineClose fontSize="1.25rem" />
          </div>
        </div>
        <Form.Item>
          <div className="flex bg-gray-100 rounded-md p-2 items-center justify-between">
            {ModelDataMini("ZIMUs Available", <GiToken />, 0.1)}
            {ModelDataMini("Current Value", <AiFillDollarCircle />, 1.1)}
            {ModelDataMini("Transaction Fee", <SiEthereum />, 0.11)}
          </div>
        </Form.Item>
        <Form.Item
          name="applyId"
          label="Application ID"
          tooltip="Each application has a unique ID obtained according to the order."
          required
        >
          <InputNumber
            placeholder="Please ensure that the subtitle match the application."
            min={1}
            style={{ width: "100%" }}
            disabled={
              defaultUploadSubtitleData && defaultUploadSubtitleData.applyId
                ? true
                : false
            }
          />
        </Form.Item>
        <Form.Item
          name="language"
          label="Language"
          tooltip="It should be consistent with the application."
          required
        >
          <Select
            showSearch
            optionFilterProp="children"
            placeholder="Language of the subtitle"
            filterOption={(input, option) =>
              (option!.children as unknown as string)
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            disabled={
              defaultUploadSubtitleData && defaultUploadSubtitleData.applyId
                ? true
                : false
            }
          >
            <Option value="cn">Chinese</Option>
            <Option value="en">English</Option>
            <Option value="kr">Korean</Option>
            <Option value="jp">Japanese</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Fingerprint"
          tooltip="Only Simhash fingerprint values are supported by default."
          required
        >
          <Input placeholder="Simhash fingerprint of subtitle." />
        </Form.Item>
        <Form.Item
          label="Storage Link"
          tooltip="It is recommended to use IPFS and enter the CID obtained after storage."
          required
        >
          <Input placeholder="Subtitle storage link, as the tokenURI." />
        </Form.Item>
        <div className="flex items-center justify-center rounded-md text-white font-medium bg-[#696969] px-[1.1rem] py-2.5 cursor-pointer hover:bg-gradient-to-r hover:from-purple-400 hover:to-blue-400">
          Upload
        </div>
      </Form>
    </div>
  );
};

export default UploadSubtitle;
