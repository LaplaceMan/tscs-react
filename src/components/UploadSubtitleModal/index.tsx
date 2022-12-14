import { Select, Form, Input, InputNumber, Spin } from "antd";
import { GiToken } from "react-icons/gi";
import { AiFillDollarCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { MdOutlineClose } from "react-icons/md";
import { ModelDataMini } from "../index";
import React, { useContext, useEffect } from "react";
import { ApplicationContext } from "../../context/ApplicationContext";
import { GlobalContext } from "../../context/GlobalContext";
import { WalletContext } from "../../context/WalletContext";
import { DataContext } from "../../context/DataContext";
import { countryLanguageMap } from "../../utils/constants";

const { Option } = Select;

const UploadSubtitle = (): React.ReactElement => {
  const [form] = Form.useForm();
  const { defaultUploadSubtitleData, uploadSubtitle } =
    useContext(ApplicationContext);
  const { isLoading, hideUploadModal } = useContext(GlobalContext);
  const { gasPrice } = useContext(WalletContext);
  const { regiserLanguages } = useContext(DataContext);
  const onFinish = () => {
    const values = form.getFieldsValue();
    uploadSubtitle(values);
  };

  useEffect(() => {
    if (defaultUploadSubtitleData.applyId != "0") {
      form.setFieldsValue({ ...defaultUploadSubtitleData });
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
          initialValues={{ language: "1" }}
          onFinish={onFinish}
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
              {ModelDataMini("ZIMUs Available", <GiToken />, 0.01)}
              {ModelDataMini("Current Value", <AiFillDollarCircle />, 1.1)}
              {ModelDataMini("Gas Price", <SiEthereum />, gasPrice)}
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
                defaultUploadSubtitleData &&
                defaultUploadSubtitleData.applyId != "0"
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
                defaultUploadSubtitleData &&
                defaultUploadSubtitleData.applyId != "0"
                  ? true
                  : false
              }
            >
              {regiserLanguages.map((item, index) => (
                <Option value={item.id} key={index}>
                  {countryLanguageMap[item.notes]
                    ? countryLanguageMap[item.notes]
                    : item.notes}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="fingerprint"
            label="Fingerprint"
            tooltip="Only Simhash fingerprint values are supported by default."
            required
          >
            <Input placeholder="Simhash fingerprint of subtitle." />
          </Form.Item>
          <Form.Item
            name="cid"
            label="Storage Link"
            tooltip="It is recommended to use IPFS and enter the CID obtained after storage."
            required
          >
            <Input placeholder="Subtitle storage link, as the tokenURI." />
          </Form.Item>
          <div
            className="flex items-center justify-center rounded-md text-white font-medium px-[1.1rem] py-2.5 cursor-pointer bg-gradient-to-r from-purple-400 to-blue-400 hover:brightness-110"
            onClick={onFinish}
          >
            Upload
          </div>
        </Form>
      </div>
    </Spin>
  );
};

export default UploadSubtitle;
