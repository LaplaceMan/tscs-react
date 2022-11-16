import { Select, Form, InputNumber, Spin, DatePicker } from "antd";
import { GlobalContext } from "../../context/GlobalContext";
import { ApplicationContext } from "../../context/ApplicationContext";
import React, { useContext, useEffect } from "react";
import { MdOutlineClose } from "react-icons/md";
import { ModelDataMini } from "../index";
import { timestampToDate } from "../../utils/tools";

const { Option } = Select;
const UpdateApplication = () => {
  const [form] = Form.useForm();
  const { isLoading, hideUpdateApplicationModal } = useContext(GlobalContext);
  const { defaultUpdateApplicationData, updateApplication } =
    useContext(ApplicationContext);

  const onFinish = () => {
    let values = form.getFieldsValue();
    updateApplication(values);
  };

  useEffect(() => {
    if (defaultUpdateApplicationData.applyId != "0") {
      form.setFieldsValue({ ...defaultUpdateApplicationData });
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
          initialValues={{ language: 1 }}
          onFinish={onFinish}
          className="w-full"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="text-xl font-bold">Update application status</div>
            <div
              className="flex hover:text-white hover:bg-black items-center justify-center cursor-pointer mt-1 rounded-full p-0.5"
              onClick={hideUpdateApplicationModal}
            >
              <MdOutlineClose fontSize="1.25rem" />
            </div>
          </div>
          <Form.Item>
            <div className="flex bg-gray-100 rounded-md p-2 items-center justify-between">
              {ModelDataMini(
                "Type",
                null,
                defaultUpdateApplicationData.payType
              )}
              {ModelDataMini(
                "Old Amount",
                null,
                defaultUpdateApplicationData.oldAmount
              )}
              {ModelDataMini(
                "Old deadline",
                null,
                timestampToDate(
                  Number(defaultUpdateApplicationData.oldDeadline)
                )
              )}
            </div>
          </Form.Item>
          <Form.Item
            name="applyId"
            label="Application ID"
            tooltip="Each application has a unique ID obtained according to the order."
            required
          >
            <InputNumber
              placeholder="ID of the application to be updated."
              min={1}
              style={{ width: "100%" }}
              disabled={
                defaultUpdateApplicationData.applyId != "0" ? true : false
              }
            />
          </Form.Item>
          <Form.Item
            name="amount"
            label="Payment amount"
            tooltip="Zimu token is required for one-time payment, and VT token of future expected income is used for others. Divided payment refers to the payment proportion, with a maximum of 1000000 (100%)."
            required
          >
            <InputNumber
              placeholder="Payment amount or proportion."
              min={1}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            name="deadline"
            label="Deadline"
            tooltip="If no subtitles are uploaded by the deadline, the application will be frozen."
            required
          >
            <DatePicker
              style={{ width: "100%" }}
              placeholder="The default is to extend by 365 days."
            />
          </Form.Item>
          <Form.Item name="type" label="Type" required>
            <Select
              style={{ width: "100%" }}
              disabled={defaultUpdateApplicationData.type != "" ? true : false}
            >
              <Option value="Recover">Recover</Option>
              <Option value="Update">Update</Option>
            </Select>
          </Form.Item>
          <div
            className="flex items-center justify-center rounded-md text-white font-medium px-[1.1rem] py-2.5 cursor-pointer bg-gradient-to-r from-purple-400 to-blue-400 hover:brightness-110"
            onClick={onFinish}
          >
            Update
          </div>
        </Form>
      </div>
    </Spin>
  );
};

export default UpdateApplication;
