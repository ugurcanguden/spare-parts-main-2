import { HtmlContentEditor } from '@cryptobigbang-components'; 
import { PageUtilities } from '@cryptobigbang-core';
import { EmailNotificationTemplateService } from '@cryptobigbang-services';
import { Button, Form, Input, message, Select } from 'antd';
import { useEffect, useState } from 'react';
import NotificationDefinitionBase from './base';
export interface AddProps {
  notificationDefinitionId: string;
}
export default  function Add({ notificationDefinitionId }: AddProps) {
  const {form,translate,loading, setLoading,setFormFied} = PageUtilities();  
  const { getLanguageCodeOptions } = NotificationDefinitionBase(); 
  const [option, setOption] = useState<any[]>();
  const {addEmailNotificationTemplate} = EmailNotificationTemplateService(); 
  useEffect(() => { 
    setFormFied({ IsPassive: true }) 
    const fetchDataOption = async () => {  
      let res = await getLanguageCodeOptions(); 
      setOption(res);
    };
    fetchDataOption();
  }, []);
  const onFinish = async (model: any) => {
    try {
      setLoading(true); 
      var response = await addEmailNotificationTemplate(notificationDefinitionId,model);
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
    <Form size='middle' layout={"vertical"} form={form} onFinish={onFinish} initialValues={{MaxRetryCount:1}}  >
      <Form.Item name="LanguageCode" label={translate("emailNotificationTemplatePage.languageCode")} rules={[{ required: true }]} >
        <Select
          labelInValue
          style={{ width: "100%" }}
          options={option}
          onChange={(value: any) => setFormFied({ LanguageCode: value.value })}
        >
        </Select>
      </Form.Item> 
      <Form.Item name="Subject" label={translate("emailNotificationTemplatePage.subject")} rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="HtmlContent" label={translate("emailNotificationTemplatePage.htmlContent")} rules={[{ required: true }]}>
          <HtmlContentEditor onChange={(value:any) => form.setFieldsValue({ HtmlContent: value })} />
       </Form.Item>
      <Form.Item name="PlainTextContent" label={translate("emailNotificationTemplatePage.plainTextContent")} rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="SenderAddress" label={translate("emailNotificationTemplatePage.senderAddress")} rules={[{ required: false }]}>
        <Input />
      </Form.Item>
      <Form.Item name="ReplyTo" label={translate("emailNotificationTemplatePage.replyTo")} rules={[{ required: false }]}>
        <Input />
      </Form.Item>
      <Form.Item name="MaxRetryCount" label={translate("emailNotificationTemplatePage.maxRetryCount")} rules={[{ required: true }]}>
        <Input type='number' defaultValue={1}/>
      </Form.Item>
      <Form.Item name="Provider" label={translate("emailNotificationTemplatePage.provider")} rules={[{ required: true }]}>
        <Input/>
      </Form.Item>
      
      <Form.Item style={{textAlign:'end'}}>
        <Button type="primary" htmlType="submit" loading={loading}>
          {translate("common.add")}
        </Button>
      </Form.Item>
    </Form>
  )
}
