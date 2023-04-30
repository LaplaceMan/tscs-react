import { Select, Form, Spin, DatePicker } from "antd";
import React, { useContext, useEffect } from "react";
import { ApplicationContext } from "../../context/ApplicationContext";
import { GlobalContext } from "../../context/GlobalContext";
import { DataContext } from "../../context/DataContext";
import { ZERO_ADDRESS } from "../../utils/constants";
import { timestampToDay } from "../../utils/tools";
import { RealWithdrawRewardTransaction } from "../../types/formTypes";
import { PrimaryButton } from "../";
const { Option } = Select;

const WithdrawReward = () => {
  const [form] = Form.useForm();
  const { isLoading, hideWithdrawRewardModal, isWithdrawRewardModalOpen } =
    useContext(GlobalContext);
  const { withdrawReward, defaultWithdrawOrDepositData } =
    useContext(ApplicationContext);
  const { queryUserLockedToken, userDayLocakedToken } = useContext(DataContext);

  const onFinish = () => {
    const values = form.getFieldsValue();
    if (values.day) {
      values.day = timestampToDay(values.day.valueOf());
      withdrawReward(values as RealWithdrawRewardTransaction);
    }
  };

  useEffect(() => {
    if (isWithdrawRewardModalOpen) {
      if (defaultWithdrawOrDepositData.platform != "") {
        form.setFieldsValue({
          platform: defaultWithdrawOrDepositData.platform,
        });
      } else {
        form.setFieldsValue(null);
      }
    }
  });

  return (
    <Spin spinning={isLoading} size="large">
      <div className="flex w-full normal">
        <Form
          form={form}
          layout="vertical"
          preserve={false}
          requiredMark="optional"
          initialValues={{ language: 1 }}
          onFinish={onFinish}
          className="w-full"
        >
          <div className="text-xl font-bold">Withdraw Unlocked Tokens</div>
          <div>Withdraw The Unlocked Tokens to Your Account.</div>
          <div className="text-lg font-semibold mt-3">Platform</div>
          <Form.Item name="platform" required>
            <div className="normal border border-gray-200 mt-2 rounded-xl text-base">
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
                  defaultWithdrawOrDepositData.platform != "" ? true : false
                }
              >
                <Option value={ZERO_ADDRESS}>Murmes</Option>
              </Select>
            </div>
          </Form.Item>
          <div className="text-lg font-semibold">Day</div>
          <Form.Item name="day" required>
            <div className="normal border border-gray-200 mt-2 rounded-xl text-base">
              <DatePicker
                style={{ width: "100%" }}
                onChange={(date) => {
                  let base = date?.valueOf();
                  if (base) {
                    base = timestampToDay(base);
                    queryUserLockedToken(
                      defaultWithdrawOrDepositData.platform,
                      base
                    );
                  }
                }}
              />
            </div>
          </Form.Item>
          <div className="flex items-center justify-center space-x-3">
            <PrimaryButton
              label="Confirm"
              bgColor="#00BEA1"
              textColor="#fff"
              fn={() => []}
            />
            <PrimaryButton
              label="Cancel"
              bgColor="#1C1C1C"
              textColor="#fff"
              fn={hideWithdrawRewardModal}
            />
          </div>
        </Form>
      </div>
    </Spin>
  );
};
export default WithdrawReward;
