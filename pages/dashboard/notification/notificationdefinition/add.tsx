import { NotificationDefinitionService } from '@cryptobigbang-services';
import { PageUtilities } from '@cryptobigbang-core';
import { Button, Form, Input, message, Select, Switch } from 'antd';
import { useEffect, useState } from 'react';
import NotificationDefinitionBase from './base';
export interface AddProps {
  groupCode: string;
}
export default function Add({ groupCode }: AddProps) {
  const {translate,form,setFormFied} = PageUtilities();   
  const { optionDurationTypeList, optionNotificationPriorityList } = NotificationDefinitionBase(); 
  const [loading, setLoading] = useState(false);  
  const {addNotificationDefinition} = NotificationDefinitionService();

 useEffect(()=>{setFormFied({IsPassive:true})},[]);
  const onFinish = async (model: any) => {
    try {
      setLoading(true);
      model.ExpireDuration = parseInt(model.ExpireDuration); 
      var response = await addNotificationDefinition(model);
      if (!response.IsBusinessError) {
        message.success(translate("common.addingSuccessful"));
        form.resetFields(); 
      }
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <Form layout={"vertical"} form={form} onFinish={onFinish} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} initialValues={{ GroupCode: groupCode, Order: 1 }}>
      <Form.Item name="GroupCode" label={translate("notificationDefinitionPage.groupCode")} rules={[{ required: true }]}>
        <Input disabled />
      </Form.Item>
      <Form.Item name="Code" label={translate("notificationDefinitionPage.code")} rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="Description" label={translate("notificationDefinitionPage.description")} rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="DurationType" label={translate("notificationDefinitionPage.durationType")} rules={[{ required: true }]} >
        <Select
          labelInValue
          style={{ width: "100%" }}
          options={optionDurationTypeList}
          onChange={(value:any)=> setFormFied({DurationType:value.value})}
          >
        </Select>
      </Form.Item>
      <Form.Item name="ExpireDuration" label={translate("notificationDefinitionPage.expireDuration")} rules={[{ required: true }]}>
        <Input type='number' />
      </Form.Item>
      <Form.Item name="NotificationPriority" label={translate("notificationDefinitionPage.notificationPriority")} rules={[{ required: true }]} >
        <Select
          labelInValue
          style={{ width: "100%" }}
          options={optionNotificationPriorityList}
          onChange={(value:any)=> setFormFied({NotificationPriority:value.value})}
        >
        </Select>
      </Form.Item>
      <Form.Item  name="IsPassive"  label={translate("notificationDefinitionPage.isPassive")}>
        <Switch onChange={(value: boolean) => setFormFied({ IsPassive: value })}   defaultChecked={true}/>
      </Form.Item>

      <Form.Item style={{textAlign:'end'}}>
        <Button type="primary" htmlType="submit" loading={loading}>
          {translate("common.add")}
        </Button>
      </Form.Item>
    </Form>
  )
}
