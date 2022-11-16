import { Select, Form, Spin, DatePicker } from "antd";
import { MdOutlineClose } from "react-icons/md";
import { ModelDataMini } from "../index";
import React, { useContext, useEffect } from "react";
import { ApplicationContext } from "../../context/ApplicationContext";
import { GlobalContext } from "../../context/GlobalContext";
import { DataContext } from "../../context/DataContext";
import { ZERO_ADDRESS } from "../../utils/constants";

const { Option } = Select;

const WithdrawReward = () => {
  const [form] = Form.useForm();
  const { isLoading, hideWithdrawRewardModal } = useContext(GlobalContext);
  const { withdrawReward, defaultWithdrawRewardData } =
    useContext(ApplicationContext);
  const { queryUserLockedToken, userDayLocakedToken } = useContext(DataContext);

  const onFinish = () => {
    let values = form.getFieldsValue();
    withdrawReward(values);
  };

  useEffect(() => {
    if (defaultWithdrawRewardData != "") {
      form.setFieldsValue({ platform: defaultWithdrawRewardData });
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
            <div className="text-xl font-bold">Withdraw unlocked tokens</div>
            <div
              className="flex hover:text-white hover:bg-black items-center justify-center cursor-pointer mt-1 rounded-full p-0.5"
              onClick={hideWithdrawRewardModal}
            >
              <MdOutlineClose fontSize="1.25rem" />
            </div>
          </div>
          <Form.Item>
            <div className="flex bg-gray-100 rounded-md p-2 items-center justify-center">
              {ModelDataMini(
                "Number of locked tokens",
                null,
                userDayLocakedToken
              )}
            </div>
          </Form.Item>
          <Form.Item name="platform" label="Platform" required>
            <Select
              showSearch
              optionFilterProp="children"
              placeholder="Language of the subtitle"
              filterOption={(input, option) =>
                (option!.children as unknown as string)
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              disabled={defaultWithdrawRewardData != "" ? true : false}
            >
              <Option value={ZERO_ADDRESS}>Default</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="day"
            label="Day"
            tooltip="Extract the locked tokens on the selected date."
            required
          >
            <DatePicker
              style={{ width: "100%" }}
              onChange={(date) => {
                let base = date?.valueOf();
                if (base) {
                  base = parseInt((base / 1000).toString());
                  queryUserLockedToken(defaultWithdrawRewardData, base);
                }
              }}
            />
          </Form.Item>
          <div
            className="flex items-center justify-center rounded-md text-white font-medium px-[1.1rem] py-2.5 cursor-pointer bg-gradient-to-r from-purple-400 to-blue-400 hover:brightness-110"
            onClick={onFinish}
          >
            Confirm
          </div>
        </Form>
      </div>
    </Spin>
  );
};
export default WithdrawReward;