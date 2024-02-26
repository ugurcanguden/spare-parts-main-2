import { PageUtilities } from '@cryptobigbang-core'; 
import { DocumentGroupService } from '@cryptobigbang-services';
import { Button, Form, Input, message } from 'antd';
import { isNullOrEmptyString } from 'guden-core';
import { useEffect, useState } from 'react';

export interface parameterGroupEditProps {
    groupCode: string
} 
export default function ParameterGroupEdit(props: parameterGroupEditProps) {
    const { groupCode } = props;
    const {form,translate,loading, setLoading} = PageUtilities();  
    const {editDocumentGroup,getDocumentGroup}  = DocumentGroupService();
    const onFinish = async (values: any) => {
        try {
            setLoading(true);
            const response = await editDocumentGroup(groupCode, values);
            if (!response.IsBusinessError) {
                message.success(translate("common.updateSuccessful"));
                form.resetFields();
            }
        }
        finally {
            setLoading(false);
        }
    }; 
    const getDetail = async (groupCode: string) => {
        const response = await getDocumentGroup(groupCode);
        response && form.setFieldsValue({
            "GroupCode": response.groupCode,
            "Description": response.description
        })
    }
    useEffect(() => {
        if (!isNullOrEmptyString(groupCode))
            getDetail(groupCode);
    }, [groupCode])
    return (
        <>
            <Form form={form} onFinish={onFinish}>
                <Form.Item name="GroupCode" label={translate("documentGroupPage.groupCode")} rules={[{ required: true }]}>
                    <Input disabled />
                </Form.Item>
                <Form.Item name="Description" label={translate("documentGroupPage.description")} rules={[{ required: true }]}>
                    <Input />
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
