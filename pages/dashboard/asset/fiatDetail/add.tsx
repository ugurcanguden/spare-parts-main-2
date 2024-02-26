import { PageUtilities } from '@cryptobigbang-core';
import { AssetService, FiatDetailService, NetworkService } from '@cryptobigbang-services';
import { Button, Form, Input, message, Select, Switch } from 'antd';
import { CryptobigbangSelectList, CryptobigbangSelectListProps } from '@cryptobigbang-components';

export default function Add() {
  const { translate, loading, setLoading, form } = PageUtilities();
  const { addFiatDetail } = FiatDetailService();
  const { getAssets } = AssetService();
  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const response = await addFiatDetail(values);
      if (!response.IsBusinessError) {
        message.success(translate("common.addingSuccessful"));
        form.resetFields();
      }
    }
    finally {
      setLoading(false);
    }
  };
  const assetCryptobigbangSelectListProps : CryptobigbangSelectListProps={
    formItemProps :{
      name:"AssetId",
      label:translate("fiatDetailPage.asset"),
      rules:[{ required: true }]
    },
    getValueProperty:(record)=> record.id,
    getLabelProperty:(record)=> record.name,
    getList : getAssets
  }
  return (
    <Form form={form} onFinish={onFinish} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
      <CryptobigbangSelectList {...assetCryptobigbangSelectListProps}/>
      <Form.Item name="Label" label={translate("fiatDetailPage.label")} rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="MinDeposit" label={translate("fiatDetailPage.minDeposit")} rules={[{ required: true }]}>
        <Input type='number'/>
      </Form.Item>
      <Form.Item name="MinWithdraw" label={translate("fiatDetailPage.minWithdraw")} rules={[{ required: true }]}>
        <Input type='number'/>
      </Form.Item>     
      <Form.Item style={{ textAlign: 'end' }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          {translate("common.add")}
        </Button>
      </Form.Item>
    </Form>
  )
}
