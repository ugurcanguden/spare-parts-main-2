import { NotificationGroupDefinitionService } from '@cryptobigbang-services';
import { PageUtilities } from '@cryptobigbang-core';
import { Button, Form, Input, message } from 'antd';
import { isNullOrEmptyString } from 'guden-core';
import { useEffect, useState } from 'react';
export interface EditProps {
    groupCode : string
}
export default function Edit({groupCode}:EditProps) {
    const { translate, loading, setLoading, form } = PageUtilities();
    const [response, setResponse] = useState<any>();
    const {getNotificationDefinition,addeditNotificationDefinition} = NotificationGroupDefinitionService();
    const onFinish = async (values: any) => {
        try {
            setLoading(true);
            const response = await addeditNotificationDefinition(values);  
            if(!response.IsBusinessError) {
                message.success(translate("common.updateSuccessful"));
                form.resetFields();            
            }  
        }
        finally {
            setLoading(false);
        }
    };

    const getDetail = async (groupCode: string) => {
        const response = await getNotificationDefinition(groupCode);
        setResponse(response);
        form.setFieldsValue({
            GroupCode: response.groupCode,
            Description: response.description
        });
    }
    useEffect(() => {
        if (!isNullOrEmptyString(groupCode)) 
            getDetail(groupCode);        
    },[groupCode])
    return (
        <>
            <Form form={form} onFinish={onFinish} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                <Form.Item name="GroupCode" label={translate("notificationGroupDefinitionPage.groupCode")} rules={[{ required: true }]}>
                    <Input value={response?.groupCode} disabled />
                </Form.Item>
                <Form.Item name="Description" label={translate("notificationGroupDefinitionPage.description")} rules={[{ required: true }]}>
                    <Input value={response?.description} />
                </Form.Item>
                <Form.Item style={{textAlign:'end'}}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        {translate("common.update")}
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}
