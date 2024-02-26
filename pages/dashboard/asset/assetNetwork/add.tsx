import { CryptobigbangSelectList, CryptobigbangSelectListProps } from '@cryptobigbang-components'; 
import { PageUtilities } from '@cryptobigbang-core';
import { AssetNetworkService, AssetService, NetworkTypeDefinitionService, NetworkTypeService } from '@cryptobigbang-services';
import { Button, Form, Input, message, Select, Switch } from 'antd';

export default function Add() {
  const { translate, loading, setLoading, form } = PageUtilities();
  const { getAssets } = AssetService();
  const { addAssetNetwork } = AssetNetworkService(); 
  const { getNetworkTypeDefinitions } = NetworkTypeDefinitionService(); 

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const response = await addAssetNetwork(values);
      if (!response.IsBusinessError) {
        message.success(translate("common.addingSuccessful"));
        form.resetFields();
      }
    }
    finally {
      setLoading(false);
    }
  };
  const assetCryptobigbangSelectListProps: CryptobigbangSelectListProps = {
    formItemProps: {
      name: "AssetId",
      label: translate("assetNetworkPage.assetId"),
      rules: [{ required: true }]
    },        
    getValueProperty:(record)=> record.id,
    getLabelProperty:(record)=> record.name, 
    getList: getAssets
  }
  const networkDefinitionCryptobigbangSelectListProps: CryptobigbangSelectListProps = {
    formItemProps: {
      name: "NetworkTypeDefinitionId",
      label: translate("assetNetworkPage.networkTypeDefinitionId"),
      rules: [{ required: true }]
    },
    getValueProperty:(record)=> record.id,
    getLabelProperty:(record)=> record.network.name+" - "+record.networkType.name,
    getList: getNetworkTypeDefinitions
  }
  return (
    <Form form={form} onFinish={onFinish} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
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
        <Switch />
      </Form.Item>
      <Form.Item style={{ textAlign: 'end' }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          {translate("common.add")}
        </Button>
      </Form.Item>
    </Form>
  )
}
