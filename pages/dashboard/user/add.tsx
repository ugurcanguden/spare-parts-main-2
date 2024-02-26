import { LanguageManager, PageUtilities } from '@cryptobigbang-core';
import { RoleService, UserService } from '@cryptobigbang-services';
import { Button, Form, Input, message, Select } from 'antd';
import { useEffect, useState } from 'react';



export default function Add() {
  const { translate, setLoading, loading, form } = PageUtilities();
  const { addUser, createPassword } = UserService();
  const { getRoles } = RoleService();
  const [option, setOptions] = useState<any[]>([]);

  useEffect(() => {
    getRoles().then(r => {
      let option: any[] = [];
      r.forEach((item: any) => {
        option.push({ value: item.id, label: item.name });
      });
      setOptions(option);
    })
  }, [])
  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const response = await addUser(values);
      if (!response.IsBusinessError) {
        await createPassword(response)
        if (!response.IsBusinessError) {
          message.success(translate("common.addingSuccessful"));
          form.resetFields();
        }
      }
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form form={form} onFinish={onFinish} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
        <Form.Item name="FirstName" label={translate("userPage.firstName")} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="LastName" label={translate("userPage.lastName")} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="Email" label={translate("userPage.email")} rules={[{ required: true }]}>
          <Input type='email' />
        </Form.Item>
        <Form.Item name="Password" label={translate("userPage.password")} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="NationalIdentityNumber" label={translate("userPage.nationalIdentityNumber")} rules={[{ required: true }]}>
          <Input type='number' />
        </Form.Item>
        <Form.Item name="RoleId" label={translate("userPage.role")} rules={[{ required: true }]}>
          <Select
            style={{ width: 120 }}
            options={option}
          />
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
