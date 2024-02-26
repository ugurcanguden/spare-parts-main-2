 
import { Button, Form, message, Switch } from 'antd'
import { isNullOrEmptyString } from 'guden-core';
import React, { useEffect, useState } from 'react'
import {CalendarService} from '@cryptobigbang-services';
import { PageUtilities } from '@cryptobigbang-core';
export interface WeekDaysEditProps {
    alpha3Code: string
}
export default function WeekDaysEdit({ alpha3Code }: WeekDaysEditProps) {
    const {getWeekdaysByAlpha3Code,editWeekdays} = CalendarService();
    const {translate,form} = PageUtilities(); 
    const [weekDays, setWeekDays] = useState([false, false, false, false, false, false, false]);
    const [loading, setLoading] = useState(false);

    const getDetail = async (alpha3Code: String) => {
        const response = await getWeekdaysByAlpha3Code(alpha3Code);
        if (response?.length > 0) {
            let tempWeekDays = [
                getWeekDay(response, 0).isWorkingDay,
                getWeekDay(response, 1).isWorkingDay,
                getWeekDay(response, 2).isWorkingDay,
                getWeekDay(response, 3).isWorkingDay,
                getWeekDay(response, 4).isWorkingDay,
                getWeekDay(response, 5).isWorkingDay,
                getWeekDay(response, 6).isWorkingDay
            ];
            setWeekDays(tempWeekDays);
        }
    }
    const getWeekDay = (response: any[], dayOfWeek: number): any => {
        return response.find(r => r.dayOfWeek == dayOfWeek);
    }
    useEffect(() => {
        if (!isNullOrEmptyString(alpha3Code))
            getDetail(alpha3Code);
    }, [alpha3Code])

    const onChangeWeekDay = (index: number, value: boolean = !weekDays[index]) => {
        switch (index) {
            case 0:
                setWeekDays([value, weekDays[1], weekDays[2], weekDays[3], weekDays[4], weekDays[5], weekDays[6]]);
                break;
            case 1:
                setWeekDays([weekDays[0], value, weekDays[2], weekDays[3], weekDays[4], weekDays[5], weekDays[6]]);
                break;
            case 2:
                setWeekDays([weekDays[0], weekDays[1], value, weekDays[3], weekDays[4], weekDays[5], weekDays[6]]);
                break;
            case 3:
                setWeekDays([weekDays[0], weekDays[1], weekDays[2], value, weekDays[4], weekDays[5], weekDays[6]]);
                break;
            case 4:
                setWeekDays([weekDays[0], weekDays[1], weekDays[2], weekDays[3], value, weekDays[5], weekDays[6]]);
                break;
            case 5:
                setWeekDays([weekDays[0], weekDays[1], weekDays[2], weekDays[3], weekDays[4], value, weekDays[6]]);
                break;
            case 6:
                setWeekDays([weekDays[0], weekDays[1], weekDays[2], weekDays[3], weekDays[4], weekDays[5], value]);
                break;
        }
    }



    const onFinish = async (values: any) => {
        try {
            let tempItems: any[] = [];
            weekDays.forEach((value: boolean, index: number) => {
                if (value)
                    tempItems.push(index)
            });
            setLoading(true);
            debugger;
            const response = await editWeekdays(alpha3Code, { WorkingDays: tempItems });
            if (!response.IsBusinessError) {
                message.success(translate("common.updateSuccessful"));
                form.resetFields();
            }
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <Form
            onFinish={onFinish}
            layout="vertical"
            size='small'
            form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
            <Form.Item valuePropName="[0]" name="[0]" label={translate("calenderPage.weekDay.monday")} rules={[{ required: false }]} >
                <Switch checked={weekDays[0]} onClick={() => onChangeWeekDay(0)} />
            </Form.Item>
            <Form.Item valuePropName="[1]" name="[1]" label={translate("calenderPage.weekDay.tuesday")} rules={[{ required: false }]} >
                <Switch checked={weekDays[1]} onClick={() => onChangeWeekDay(1)} />
            </Form.Item>
            <Form.Item valuePropName="[2]" name="[2]" label={translate("calenderPage.weekDay.wednesday")} rules={[{ required: false }]} >
                <Switch checked={weekDays[2]} onClick={() => onChangeWeekDay(2)} />
            </Form.Item>
            <Form.Item valuePropName="[3]" name="[3]" label={translate("calenderPage.weekDay.thursday")} rules={[{ required: false }]} >
                <Switch checked={weekDays[3]} onClick={() => onChangeWeekDay(3)} />
            </Form.Item>
            <Form.Item valuePropName="[4]" name="[4]" label={translate("calenderPage.weekDay.friday")} rules={[{ required: false }]} >
                <Switch checked={weekDays[4]} onClick={() => onChangeWeekDay(4)} />
            </Form.Item>
            <Form.Item valuePropName="[5]" name="[5]" label={translate("calenderPage.weekDay.saturday")} rules={[{ required: false }]} >
                <Switch checked={weekDays[5]} onClick={() => onChangeWeekDay(5)} />
            </Form.Item>
            <Form.Item valuePropName="[6]" name="[6]" label={translate("calenderPage.weekDay.sunday")} rules={[{ required: false }]} >
                <Switch checked={weekDays[6]} onClick={() => onChangeWeekDay(6)} />
            </Form.Item>
            <Form.Item style={{textAlign:'end'}}>
                <Button type="primary" htmlType="submit" loading={loading}>
                    {translate("common.update")}
                </Button>
            </Form.Item>
        </Form>
    )
}
