import React, { useContext, useEffect } from "react";
import { Form, Input, Spin } from "antd";
import { GlobalContext } from "../../context/GlobalContext";
import { ApplicationContext } from "../../context/ApplicationContext";
import { BASE_RATE } from "../../utils/constants";
import { ethers } from "ethers";
import { RealUpdateApplictaionTransaction } from "../../types/formTypes";
import { PrimaryButton } from "..";

const UpdateTaskModal = () => {
  const [form] = Form.useForm();
  const { isLoading, hideUpdateTaskModal, isUpdateTaskModalOpen } =
    useContext(GlobalContext);
  const { defaultUpdateTaskData, updateTask } = useContext(ApplicationContext);

  const onFinish = () => {
    const values = form.getFieldsValue();
    const date = values.deadline.valueOf();
    values.deadline = parseInt((date / 1000).toString());
    updateTask(values as RealUpdateApplictaionTransaction);
  };

  useEffect(() => {
    if (isUpdateTaskModalOpen) {
      if (defaultUpdateTaskData) {
        form.setFieldsValue({ taskId: defaultUpdateTaskData });
      }
    }
  }, [defaultUpdateTaskData]);

  return (
    <Spin spinning={isLoading} size="large">
      <div className="flex w-full">
        <Form
          form={form}
          layout="vertical"
          preserve={false}
          onFinish={onFinish}
          className="w-full"
        >
          <div className="flex flex-col p-5 bg-gray-200 rounded-xl text-center">
            <div className="text-xl font-bold">Update Task State</div>
            <div>Make Your Tasks More Visible and Accessible</div>
          </div>
          <div className="text-lg font-semibold mt-3">Task ID</div>
          <Form.Item name="taskId" required>
            <Input
              placeholder="ID of The Task to Be Updated"
              style={{ width: "100%" }}
              disabled={defaultUpdateTaskData ? true : false}
              size="large"
            />
          </Form.Item>
          <div className="text-lg font-semibold">Increase Amount</div>
          <Form.Item name="amount" required>
            <Input
              placeholder="Payment Amount or Proportion"
              style={{ width: "100%" }}
              size="large"
            />
          </Form.Item>
          <div className="text-lg font-semibold">Extended Days</div>
          <Form.Item name="extended" required>
            <Input
              placeholder="The Base Unit is Day"
              style={{ width: "100%" }}
              size="large"
            />
          </Form.Item>
          <div className="flex items-center justify-center space-x-3">
            <PrimaryButton
              label="Update"
              bgColor="#00BEA1"
              textColor="#fff"
              fn={() => []}
            />
            <PrimaryButton
              label="Cancel"
              bgColor="#1C1C1C"
              textColor="#fff"
              fn={hideUpdateTaskModal}
            />
          </div>
        </Form>
      </div>
    </Spin>
  );
};

export default UpdateTaskModal;
