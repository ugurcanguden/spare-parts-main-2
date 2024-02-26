import { Button, Form, Input, message, Switch } from 'antd';
import { isNullOrEmptyString } from 'guden-core';
import { useEffect, useState } from 'react';
import { NetworkService } from '@cryptobigbang-services';
import { PageUtilities } from '@cryptobigbang-core';
export interface EditProps {
    id: number
}
export default function Edit({ id }: EditProps) {
    const { translate, loading, setLoading, form, setFormFied } = PageUtilities();
    const { getNetwork, addNetwork } = NetworkService();
    const onFinish = async (values: any) => {
        try {
            setLoading(true);
            const response = await addNetwork(values);
            if (!response.IsBusinessError) {
                message.success(translate("common.updateSuccessful"));
                form.resetFields();
            }
        }
        finally {
            setLoading(false);
        }
    };

    const getDetail = async (id: number) => {
        setLoading(true);
        const response = await getNetwork(id);
        setFormFied({
            Id: response.id,
            Name: response.name,
            Symbol: response.symbol
        })
        setLoading(false)
    }
    useEffect(() => { if (!isNullOrEmptyString(id)) getDetail(id); }, [id])
    return (
        <Form form={form} onFinish={onFinish} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
            <Form.Item name="Id" label={translate("networkPage.id")} rules={[{ required: true }]} hidden>
                <Input />
            </Form.Item>
            <Form.Item name="Name" label={translate("networkPage.name")} rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="Symbol" label={translate("networkPage.symbol")} rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item style={{ textAlign: 'end' }}>
                <Button type="primary" htmlType="submit" loading={loading}>
                    {translate("common.update")}
                </Button>
            </Form.Item>
        </Form>
    )
}
