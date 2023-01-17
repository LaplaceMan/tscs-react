import { Select, Form, Input, InputNumber, Spin, Drawer } from "antd";
import { GiToken } from "react-icons/gi";
import { AiFillDollarCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { MdOutlineClose } from "react-icons/md";
import { ModelDataMini } from "../index";
import React, { useContext, useEffect, useState } from "react";
import { ApplicationContext } from "../../context/ApplicationContext";
import { GlobalContext } from "../../context/GlobalContext";
import { getGasPriceFixed } from "../../utils/tools";
import { DataContext } from "../../context/DataContext";
import { countryLanguageMap } from "../../utils/constants";
import { fetchFeeData } from "@wagmi/core";
import { simhash } from "string-similarity-algorithm";

const { TextArea } = Input;
const { Option } = Select;

const UploadSubtitle = (): React.ReactElement => {
  const [form] = Form.useForm();
  const [gasPrice, setGasPrice] = useState("");
  const [computeOpen, setComputeOpen] = useState(false);
  const [subtitleTextContent, setSubtitleTextContent] = useState({
    content: "",
    simhash: 0,
  });
  const { defaultUploadSubtitleData, uploadSubtitle } =
    useContext(ApplicationContext);
  const { isLoading, hideUploadModal } = useContext(GlobalContext);
  const { regiserLanguages } = useContext(DataContext);
  const onFinish = () => {
    const values = form.getFieldsValue();
    uploadSubtitle(values);
  };
  const showDrawer = () => {
    setComputeOpen(true);
  };

  const onClose = () => {
    setComputeOpen(false);
  };

  const subtitleContentUpdate = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let text = e.target.value.replace(
      /[&\|\\\*^%$#@\-\!0123456789,.。，“”、]/g,
      ""
    );
    text = text.replace(/\s*/g, "");
    const value = simhash(text, {
      hashType: "hashlittle",
    });
    setSubtitleTextContent({ content: e.target.value, simhash: value });
  };

  useEffect(() => {
    if (defaultUploadSubtitleData.applyId != "0") {
      form.setFieldsValue({ ...defaultUploadSubtitleData });
    } else {
      form.setFieldsValue(null);
    }
    try {
      fetchFeeData({ formatUnits: "gwei" }).then((feeData) => {
        setGasPrice(
          feeData.formatted.maxFeePerGas
            ? getGasPriceFixed(feeData.formatted.maxFeePerGas)
            : "0.00"
        );
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

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
            <div className="flex flex-row">
              <Input placeholder="Simhash fingerprint of subtitle." />
              <div
                className="flex px-2 py-1 bg-[#696969] rounded-md ml-1 text-white font-medium hover:bg-gradient-to-r from-purple-400 to-blue-400 cursor-pointer"
                onClick={showDrawer}
              >
                Compute
              </div>
              <Drawer
                title="Compute subtitle Simhash fingerprint"
                placement="right"
                onClose={onClose}
                open={computeOpen}
              >
                <div className="flex p-2 mb-2 items-center justify-center text-xl font-semibold">
                  {subtitleTextContent.simhash}
                </div>
                <TextArea
                  value={subtitleTextContent.content}
                  allowClear={true}
                  autoSize={false}
                  onChange={(e) => subtitleContentUpdate(e)}
                  placeholder="Please copy the subtitle text content here."
                  style={{ height: "85%", resize: "none" }}
                />
              </Drawer>
            </div>
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
