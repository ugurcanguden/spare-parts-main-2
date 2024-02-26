import { PageUtilities } from '@cryptobigbang-core';
import { NetworkService } from '@cryptobigbang-services';
import { Button, Form, Input, message, Select, Switch } from 'antd';

export default function Add() {
  const { translate, loading, setLoading, form } = PageUtilities();
  const { addNetwork } = NetworkService();
  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const response = await addNetwork(values);
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
      <Form.Item name="Name" label={translate("networkPage.name")} rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="Symbol" label={translate("networkPage.symbol")} rules={[{ required: true }]}>
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
