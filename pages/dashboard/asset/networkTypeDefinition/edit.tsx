import { CryptobigbangSelectList, CryptobigbangSelectListProps } from '@cryptobigbang-components';
import { PageUtilities } from '@cryptobigbang-core';
import { NetworkService, NetworkTypeDefinitionService, NetworkTypeService } from '@cryptobigbang-services';
import { Button, Form, Input, message } from 'antd';
import { isNullOrEmptyString } from 'guden-core';
import { useEffect, useState } from 'react';
export interface EditProps {
    id: number
}
export default function Edit({ id }: EditProps) {
    const { translate, loading, setLoading, form, setFormFied } = PageUtilities(); 
    const { addNetworkTypeDefinition, getNetworkTypeDefinition } = NetworkTypeDefinitionService();
    const { getNetworks } = NetworkService();
    const { getNetworkTypes } = NetworkTypeService();
    const onFinish = async (values: any) => {
        try {
            setLoading(true);
            const response = await addNetworkTypeDefinition(values);
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
        const response = await getNetworkTypeDefinition(id);
        setFormFied({
            Id: response.id,
            NetworkId: response.network.id,
            NetworkTypeId: response.networkType.id
        }) 
        setLoading(false)
    }
    const networkCryptobigbangSelectListProps: CryptobigbangSelectListProps = {
        formItemProps: {
            name: "NetworkId",
            label: translate("networkTypeDefinitionPage.network"),
            rules: [{ required: true }]
        },
        getValueProperty:(record)=> record.id,
        getLabelProperty:(record)=> record.name,
        getList: getNetworks
    }
    const networkTypeCryptobigbangSelectListProps: CryptobigbangSelectListProps = {
        formItemProps: {
            name: "NetworkTypeId",
            label: translate("networkTypeDefinitionPage.networkType"),
            rules: [{ required: true }]
        },
        getValueProperty:(record)=> record.id,
        getLabelProperty:(record)=> record.name,
        getList: getNetworkTypes
    }
    useEffect(() => { if (!isNullOrEmptyString(id)) getDetail(id); }, [id]);
    return (
        <Form form={form} onFinish={onFinish} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
            <Form.Item name="Id" label={translate("networkTypePage.id")} rules={[{ required: true }]} hidden>
                <Input />
            </Form.Item>
            <CryptobigbangSelectList {...networkCryptobigbangSelectListProps} />
            <CryptobigbangSelectList {...networkTypeCryptobigbangSelectListProps} />
            <Form.Item style={{ textAlign: 'end' }}>
                <Button type="primary" htmlType="submit" loading={loading}>
                    {translate("common.update")}
                </Button>
            </Form.Item>
        </Form>
    )
}
