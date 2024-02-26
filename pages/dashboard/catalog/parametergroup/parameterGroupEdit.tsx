import { PageUtilities } from '@cryptobigbang-core';
import { ParameterGroupService } from '@cryptobigbang-services';
import { Button, Form, Input, message } from 'antd';
import { isNullOrEmptyString } from 'guden-core';
import { useEffect, useState } from 'react';

export interface parameterGroupEditProps {
    groupCode: string
}

export default function ParameterGroupEdit(props: parameterGroupEditProps) {
    const {translate,setLoading,loading,form} = PageUtilities();   
    const { groupCode } = props;      
    const [response, setResponse] = useState<any>();
    const {editParameterGroup,getParameterGroup} = ParameterGroupService();    
    //#region  actions.
    const onFinish = async (values: any) => {
        try {
            setLoading(true);
            const response = await editParameterGroup(groupCode, values);
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
        const response = await getParameterGroup(groupCode);
        setResponse(response);
        form.setFieldsValue({
            GroupCode: response.groupCode,
            Description: response.description
        });
    }
    //#endregion
    //#region  lifeclycle
    useEffect(() => {if (!isNullOrEmptyString(groupCode))getDetail(groupCode);},[groupCode])
    //#endregion
    return (
        <>
            <Form form={form} onFinish={onFinish} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                <Form.Item name="GroupCode" label={translate("parameterGroupPage.groupCode")} rules={[{ required: true }]}>
                    <Input value={response?.groupCode} disabled />
                </Form.Item>
                <Form.Item name="Description" label={translate("parameterGroupPage.description")} rules={[{ required: true }]}>
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
