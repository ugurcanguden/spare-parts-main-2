import { CryptobigbangSelectList, CryptobigbangSelectListProps } from '@cryptobigbang-components';
import { PageUtilities } from '@cryptobigbang-core';
import { AssetNetworkService, AssetService, NetworkTypeDefinitionService } from '@cryptobigbang-services';
import { Button, Form, Input, message, Switch } from 'antd';
import { isNullOrEmptyString } from 'guden-core';
import { useEffect, useState } from 'react';
export interface EditProps {
    id: number
}
export default function Edit({ id }: EditProps) {
    const { translate, loading, setLoading, form, setFormFied } = PageUtilities();
    const { getAssets } = AssetService();
    const { addAssetNetwork, getAssetNetwork } = AssetNetworkService();
    const { getNetworkTypeDefinitions } = NetworkTypeDefinitionService();
    const [response, setResponse] = useState<any>();
    const onFinish = async (values: any) => {
        try {
            setLoading(true);
            const response = await addAssetNetwork(values);
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
        const response = await getAssetNetwork(id);
        setResponse(response);
        setFormFied({
            Id: response.id,
            VaultAssetId: response.vaultAssetId,
            MinDeposit: response.minDeposit,
            MinWithdraw: response.minWithdraw,
            WithdrawFee: response.withdrawFee,
            AssetId: response.assetId,
            NetworkTypeDefinitionId: response.networkTypeDefinitionId,
            IsSameAddress: response.isSameAddress
        });
        setLoading(false)
    }
    useEffect(() => { if (!isNullOrEmptyString(id)) getDetail(id); }, [id])
    const assetCryptobigbangSelectListProps: CryptobigbangSelectListProps = {
        formItemProps: {
            name: "AssetId",
            label: translate("networkTypeDefinitionPage.assetId"),
            rules: [{ required: true }]
        },
        getValueProperty:(record)=> record.id,
        getLabelProperty:(record)=> record.name,
        getList: getAssets
    }
    const networkDefinitionCryptobigbangSelectListProps: CryptobigbangSelectListProps = {
        formItemProps: {
            name: "NetworkTypeDefinitionId",
            label: translate("networkTypeDefinitionPage.networkTypeDefinitionId"),
            rules: [{ required: true }]
        },
        getValueProperty:(record)=> record.id,
        getLabelProperty:(record)=> record.network.name+" - "+record.networkType.name,
        getList: getNetworkTypeDefinitions
    }
    return (
        <Form form={form} onFinish={onFinish} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
             <Form.Item name="Id" label={translate("networkPage.id")} rules={[{ required: true }]} hidden>
                <Input />
            </Form.Item>
            <Form.Item name="VaultAssetId" label={translate("assetNetworkPage.vaultAssetId")} rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="MinDeposit" label={translate("assetNetworkPage.minDeposit")} rules={[{ required: true }]}>
                <Input type='number' />
            </Form.Item>
            <Form.Item name="MinWithdraw" label={translate("assetNetworkPage.minWithdraw")} rules={[{ required: true }]}>
                <Input type='number' />
            </Form.Item>
            <Form.Item name="WithdrawFee" label={translate("assetNetworkPage.withdrawFee")} rules={[{ required: true }]}>
                <Input type='number' />
            </Form.Item>
            <CryptobigbangSelectList {...assetCryptobigbangSelectListProps} />
            <CryptobigbangSelectList {...networkDefinitionCryptobigbangSelectListProps} />
            <Form.Item valuePropName="IsSameAddress" name="IsSameAddress" label={translate("assetNetworkPage.isSameAddress")} rules={[{ required: false }]} >
               {response&&<Switch defaultChecked={response.isSameAddress}/>}
            </Form.Item>
            <Form.Item style={{ textAlign: 'end' }}>
                <Button type="primary" htmlType="submit" loading={loading}>
                    {translate("common.update")}
                </Button>
            </Form.Item>
        </Form>
    )
}
