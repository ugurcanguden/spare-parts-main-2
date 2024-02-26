import { NotificationGroupDefinitionService } from '@cryptobigbang-services';
import { PageUtilities } from '@cryptobigbang-core';
import { Button, Form, Input, message } from 'antd';

export default function Add() {
  const { translate, loading, setLoading, form} = PageUtilities(); 
  const {addeditNotificationDefinition} = NotificationGroupDefinitionService();
  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const response = await addeditNotificationDefinition(values);
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
    <>
      <Form form={form} onFinish={onFinish} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
        <Form.Item name="GroupCode" label={translate("notificationGroupDefinitionPage.groupCode")} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="Description" label={translate("notificationGroupDefinitionPage.description")} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item style={{textAlign:'end'}}>
          <Button type="primary" htmlType="submit" loading={loading}>
            {translate("common.add")}
          </Button>
        </Form.Item>
      </Form>
    </>)
}
