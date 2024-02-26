import { PageUtilities } from '@cryptobigbang-core';
import { WhitelistEmailService } from '@cryptobigbang-services';
import { Button, DatePicker, Form, Input, message } from 'antd';
import { useState } from 'react';
export default function Add() {
  const { form, translate, loading, setLoading } = PageUtilities();
  const [] = useState(false);
  const { addWhitelistEmail } = WhitelistEmailService();
  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      values = {
        BeginDate: values.DateRange[0],
        EndDate: values.DateRange[1],
        Email: values.Email
      }
      const response = await addWhitelistEmail(values);
      if (!response.IsBusinessError) {
        message.success(translate("common.addingSuccessful"));
        form.resetFields();
      }
    }
    finally {
      setLoading(false);
    }
  };
  const { RangePicker } = DatePicker;
  return (
    <>
      <Form form={form} onFinish={onFinish} layout={"vertical"}>
        <Form.Item name="Email" label={translate("whiteListPage.email")} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="DateRange" label={translate("whiteListPage.validDateRange")} rules={[{ required: true }]} >
          <RangePicker format='DD.MM.YYYY' ></RangePicker>
        </Form.Item>
        <Form.Item style={{ textAlign: 'end' }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            {translate("common.add")}
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
