import { Button, Form, Input, message, Switch } from 'antd';
import { isNullOrEmptyString } from 'guden-core';
import { useEffect, useState } from 'react';
import { AssetService, FiatDetailService, NetworkService } from '@cryptobigbang-services';
import { PageUtilities } from '@cryptobigbang-core';
import { CryptobigbangSelectList, CryptobigbangSelectListProps } from '@cryptobigbang-components';

export interface EditProps {
    id: number
}
export default function Edit({ id }: EditProps) {
    const { translate, loading, setLoading, form, setFormFied } = PageUtilities();
    const { getFiatDetail ,addFiatDetail} = FiatDetailService();
    const { getAssets } = AssetService();
    const onFinish = async (values: any) => {
        try {
            setLoading(true);
            const response = await addFiatDetail(values);
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
        const response = await getFiatDetail(id);
        setFormFied({
            Id: response.id,
            Label: response.label,
            MinDeposit: response.minDeposit, 
            MinWithdraw: response.minWithdraw,
            AssetId : response.assetId

        })
        setLoading(false)
    }
    useEffect(() => { if (!isNullOrEmptyString(id)) getDetail(id); }, [id]);
    const assetCryptobigbangSelectListProps: CryptobigbangSelectListProps = {
        formItemProps: {
            name: "AssetId",
            label: translate("fiatDetailPage.asset"),
            rules: [{ required: true }]
        },
        getValueProperty:(record)=> record.id,
        getLabelProperty:(record)=> record.name,
        getList: getAssets
    };
    return (
        <Form form={form} onFinish={onFinish} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
            <Form.Item name="Id" label={translate("networkPage.id")} rules={[{ required: true }]} hidden>
                <Input />
            </Form.Item>
            <CryptobigbangSelectList {...assetCryptobigbangSelectListProps} />
            <Form.Item name="Label" label={translate("fiatDetailPage.label")} rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="MinDeposit" label={translate("fiatDetailPage.minDeposit")} rules={[{ required: true }]}>
                <Input type='number' />
            </Form.Item>
            <Form.Item name="MinWithdraw" label={translate("fiatDetailPage.minWithdraw")} rules={[{ required: true }]}>
                <Input type='number' />
            </Form.Item>
            <Form.Item style={{ textAlign: 'end' }}>
                <Button type="primary" htmlType="submit" loading={loading}>
                    {translate("common.update")}
                </Button>
            </Form.Item>
        </Form>
    )
}
