import { PageUtilities } from '@cryptobigbang-core';
import { CalendarService } from '@cryptobigbang-services';
import { Button, DatePicker, Form, Input, message, Switch } from 'antd';
import dayjs from 'dayjs';
import { isNullOrUndefined } from 'guden-core';
import { useEffect, useState } from 'react';


export interface EditProps {
    selectedRow: any
}
export default function Edit({ selectedRow }: EditProps) {
    const {translate,form} = PageUtilities(); 
    const [loading, setLoading] = useState(false);
    const [isRecurring, setIsRecurring] = useState(false);
    const [isHalfDay, setIsHalfDay] = useState(false);
    const {editCalendar} = CalendarService();


    const onFinish = async (values: any) => {
        try {
            setLoading(true);
            const response = await editCalendar(selectedRow.stringId, values);
            if (!response.IsBusinessError) {
                message.success(translate("common.updateSuccessful"));
            }
        }
        finally {
            setLoading(false);
        }
    };


    useEffect(() => {  
        if (!isNullOrUndefined(selectedRow?.holidayName) &&
            !isNullOrUndefined(selectedRow?.holidayDate) &&
            !isNullOrUndefined(selectedRow?.isRecurring) &&
            !isNullOrUndefined(selectedRow?.isHalfDay)){
            form.setFieldsValue({
                CountryCode : selectedRow?.countryCode,
                HolidayName: selectedRow?.holidayName,
                HolidayDate: dayjs(selectedRow?.holidayDate),
                IsRecurring: selectedRow?.isRecurring,
                IsHalfDay: selectedRow?.isHalfDay
            });
            setIsRecurring(selectedRow?.isRecurring);
            setIsHalfDay(selectedRow?.isHalfDay);
        }
    }, [selectedRow?.holidayName, selectedRow?.holidayDate, selectedRow?.isRecurring, selectedRow?.isHalfDay])

    return (
        <Form layout={"vertical"} form={form} onFinish={onFinish} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
            <Form.Item name="CountryCode" label={translate("calenderPage.countryCode")} rules={[{ required: true }]}>
                <Input disabled/>
            </Form.Item>
            <Form.Item name="HolidayName" label={translate("calenderPage.holidayName")} rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="HolidayDate" label={translate("calenderPage.holidayDate")} rules={[{ required: true }]}>
                <DatePicker />
            </Form.Item>
            <Form.Item name="IsRecurring" label={translate("calenderPage.isRecurring")} rules={[{ required: false }]} >
                <Switch checked={isRecurring} onClick={()=>setIsRecurring(!isRecurring)}/>
            </Form.Item>
            <Form.Item valuePropName="IsHalfDay" name="IsHalfDay" label={translate("calenderPage.isHalfDay")} rules={[{ required: false }]} >
                <Switch checked={isHalfDay} onClick={()=>setIsHalfDay(!isHalfDay)}/>
            </Form.Item>
            <Form.Item style={{textAlign:'end'}}>
                <Button type="primary" htmlType="submit" loading={loading}>
                    {translate("common.add")}
                </Button>
            </Form.Item>
        </Form>
    )
}
