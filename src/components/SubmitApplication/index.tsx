import { Select, Form, Input, InputNumber, DatePicker } from 'antd';
import { MdOutlineClose } from "react-icons/md";
import type { DatePickerProps } from 'antd';
const { Option } = Select;
const dataChangeHandler: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
};

const SubmitApplication = (hideApplicationCancel: any) => {
    const [form] = Form.useForm();
    return (
        <div className="flex p-5 w-full">
            <Form
                form={form}
                layout="vertical"
                // initialValues={{ requiredMarkValue: requiredMark }}
                requiredMark="optional"
                className='w-full'
            >
                <div className='flex items-center justify-between mb-3'>
                    <div className='text-xl font-bold'>Submit application to use subtitle service</div>
                    <div
                        className="flex hover:text-[#48a8ff] hover:bg-gray-100 items-center justify-center cursor-pointer mt-1 rounded-full p-0.5"
                        onClick={hideApplicationCancel}
                    >
                        <MdOutlineClose fontSize="1.25rem" />
                    </div>
                </div>
                
                <Form.Item label="Platform" tooltip="The name or blockchain address of the platform to which the video belongs.">
                    <Input placeholder="Platform name or id address." />
                </Form.Item>
                <Form.Item
                    label="Video ID"
                    tooltip="After the platform opens the service for video, the video gets the unique ID in the platform."
                >
                    <InputNumber placeholder="If the service is not started, the ID is 0." min={0} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item label="Payment strategy" required>
                    <Select defaultValue="0" style={{ width: '100%' }}>
                        <Option value="0">One-time Payment</Option>
                        <Option value="1">Divided Payment</Option>
                        <Option value="2">One-time Mortgage Payment</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Payment amount (proportion)" required tooltip="Zimu token is required for one-time payment, and VT token of future expected income is used for others.">
                    <InputNumber placeholder="Divided payment refers to the payment proportion, with a maximum of 1000000 (100%)." min={1} style={{ width: '100%' }} decimalSeparator="18" />
                </Form.Item>
                <Form.Item label="Language" required>
                    <Select
                        showSearch
                        defaultValue="cn"
                        placeholder="Select a language"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                        }
                    >
                        <Option value="cn">Chinese</Option>
                        <Option value="en">English</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Deadline" tooltip="If no subtitles are uploaded by the deadline, the application will be frozen.">
                    <DatePicker onChange={dataChangeHandler} style={{ width: '100%' }} placeholder="The default is to extend by 365 days."/>
                </Form.Item>
            </Form>
        </div>
    )
}

export default SubmitApplication