import { PageUtilities } from '@cryptobigbang-core';
import { NetworkTypeService } from '@cryptobigbang-services';
import { Button, Form, Input, message, Select, Switch } from 'antd';

export default function Add() {
  const { translate, loading, setLoading, form, setFormFied } = PageUtilities();
  const { addNetworkType } = NetworkTypeService();
  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const response = await addNetworkType(values);
      if (!response.IsBusinessError) {
        message.success(translate("common.addingSuccessful"));
        form.resetFields();
      }
    }
    finally {
      setLoading(false);
    }
  };
  return (
    <Form form={form} onFinish={onFinish} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
      <Form.Item name="Name" label={translate("networkTypePage.name")} rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item valuePropName="UtxO_Based" name="utxO_Based" label={translate("networkTypePage.utxO_Based")} rules={[{ required: false }]} >
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
