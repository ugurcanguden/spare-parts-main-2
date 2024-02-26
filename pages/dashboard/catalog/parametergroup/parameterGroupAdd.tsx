import { LanguageManager, PageUtilities } from '@cryptobigbang-core';
import { ParameterGroupService } from '@cryptobigbang-services';
import { Button, Form, Input, message } from 'antd';
import { useState } from 'react';



export default function ParameterGroupAdd() { 
  const {translate,setLoading,loading,form} = PageUtilities(); 
    const {addParameterGroup} = ParameterGroupService();
    const onFinish = async (values:any) => {
        try {
          setLoading(true);
          const response = await addParameterGroup(values);
          if(!response.IsBusinessError) {
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
        <Form.Item name="GroupCode" label={translate("parameterGroupPage.groupCode")} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="Description" label={translate("parameterGroupPage.description")} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item style={{textAlign:'end'}}>
          <Button type="primary" htmlType="submit" loading={loading}>
            {translate("common.add")}
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
