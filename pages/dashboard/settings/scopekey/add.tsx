import { PageUtilities } from '@cryptobigbang-core';
import { RoleService } from '@cryptobigbang-services';
import { ScopeKeyService } from '@cryptobigbang/libs/services/dashboard/settings';
import { Button, Form, Input, message, Select } from 'antd';
import React from 'react'

const Add = () => {
    const { translate, form, loading, setLoading } = PageUtilities();
    
  const { baseUrl, addScopeKey } = ScopeKeyService();
    const onFinish = async (values: any) => {
        await addScopeKey({ ...values}).then(response => {
            if (!response.IsBusinessError) {
                message.success(translate("common.addingSuccessful"));
                form.resetFields();
            }
        }).finally(() => setLoading(false))
    }


    return (
        <Form layout={"vertical"} form={form} onFinish={onFinish} >
            <Form.Item name="ScopeKey" label={translate("scopeKeyPage.scopeKey")} rules={[{ required: true }]} >
                <Input />
            </Form.Item>
            <Form.Item name="Description" label={translate("scopeKeyPage.description")} rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="ActionName" label={translate("scopeKeyPage.actionName")} rules={[{ required: false }]} >
                <Input />
            </Form.Item>
            <Form.Item name="ControllerName" label={translate("scopeKeyPage.controllerName")} rules={[{ required: false }]} >
                <Input />
            </Form.Item>
            <Form.Item style={{ textAlign: 'end' }}>
                <Button type="primary" htmlType="submit" loading={loading}>
                    {translate("common.add")}
                </Button>
            </Form.Item>
        </Form>
    )
}

export default Add
