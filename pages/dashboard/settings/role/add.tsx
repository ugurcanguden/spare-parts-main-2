import { PageUtilities } from '@cryptobigbang-core';
import { RoleService } from '@cryptobigbang-services';
import { Button, Form, Input, message, Select } from 'antd';
import React from 'react'

const Add = () => {
    const { translate, form, loading, setLoading } = PageUtilities();
    const { addRole } = RoleService();
    const onFinish = async (values: any) => {
        await addRole({ ...values, Status: 1 }).then(response => {
            if (!response.IsBusinessError) {
                message.success(translate("common.addingSuccessful"));
                form.resetFields();
            }
        }).finally(() => setLoading(false))
    }


    return (
        <Form layout={"vertical"} form={form} onFinish={onFinish} >
            <Form.Item name="Name" label={translate("rolePage.name")} rules={[{ required: true }]} >
                <Input />
            </Form.Item>
            <Form.Item name="Description" label={translate("rolePage.description")} rules={[{ required: true }]}>
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
