import { Button, Form, Input, message, Select, Switch } from 'antd';
import { isNullOrEmptyString } from 'guden-core';
import { useEffect, useState } from 'react';
import { AssetService } from '@cryptobigbang-services';
import { PageUtilities } from '@cryptobigbang-core';
export interface EditProps {
    id: number
}
export default function Edit({ id }: EditProps) {
    const { translate, loading, setLoading, form, setFormFied } = PageUtilities();
    const { getAsset, addAsset } = AssetService();
    const onFinish = async (values: any) => {
        try {
            setLoading(true);
            const response = await addAsset(values);
            if (!response.IsBusinessError) {
                message.success(translate("common.updateSuccessful")); 
            }
        }
        finally {
            setLoading(false);
        }
    };

    const getDetail = async (id: number) => {
        setLoading(true);
        const response = await getAsset(id);
        setFormFied({
            Id: response.id,
            Name: response.name,
            Symbol: response.symbol,
            Type : response.type
        })
        setLoading(false)
    }
    useEffect(() => { if (!isNullOrEmptyString(id)) getDetail(id); }, [id])
    return (
        <Form form={form} onFinish={onFinish} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
            <Form.Item name="Id" label={translate("assetPage.id")} rules={[{ required: true }]} hidden>
                <Input />
            </Form.Item>
            <Form.Item name="Name" label={translate("assetPage.name")} rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="Symbol" label={translate("assetPage.symbol")} rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="Type" label={translate("assetPage.type")} rules={[{ required: true }]}>
                <Select options={[{ label: "C", value: "C" }, { label: "F", value: "F" }]} />
            </Form.Item>
            <Form.Item style={{ textAlign: 'end' }}>
                <Button type="primary" htmlType="submit" loading={loading}>
                    {translate("common.update")}
                </Button>
            </Form.Item>
        </Form>
    )
}
