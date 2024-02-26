import { PageUtilities } from '@cryptobigbang-core';
import { CalendarService } from '@cryptobigbang-services';
import { Button, DatePicker, Form, Input, message, Switch } from 'antd';
import { useState } from 'react';
export interface AddProps {
    alpha3Code: string
}
export default function Add({ alpha3Code }: AddProps) {
    const {translate,form} = PageUtilities(); 
    const [loading, setLoading] = useState(false);
    const {addCalendar} = CalendarService();
    const onFinish = async (values: any) => {
        try {
            setLoading(true);
            const response = await addCalendar(alpha3Code, values);
            if (!response.IsBusinessError) {
                message.success(translate("common.addingSuccessful"));
                form.resetFields();
            }
        }
        finally {
            setLoading(false);
        }
    };
    return (
        <Form layout={"vertical"} form={form} onFinish={onFinish} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
            <Form.Item name="HolidayName" label={translate("calenderPage.holidayName")} rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="HolidayDate" label={translate("calenderPage.holidayDate")} rules={[{ required: true }]}>
                <DatePicker />
            </Form.Item>
            <Form.Item name="IsRecurring" label={translate("calenderPage.isRecurring")} rules={[{ required: false }]} >
                <Switch />
            </Form.Item>
            <Form.Item valuePropName="IsHalfDay" name="IsHalfDay" label={translate("calenderPage.isHalfDay")} rules={[{ required: false }]} >
                <Switch />
            </Form.Item>
            <Form.Item style={{textAlign:'end'}}>
                <Button type="primary" htmlType="submit" loading={loading}>
                    {translate("common.add")}
                </Button>
            </Form.Item>
        </Form>
    )
}
