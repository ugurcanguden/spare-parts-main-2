import { HtmlContentEditor } from '@cryptobigbang-components';
import { PageUtilities } from '@cryptobigbang-core';
import { EmailNotificationTemplateService } from '@cryptobigbang-services';
import { Button, Form, Input, message, Select } from 'antd';
import { useEffect, useState } from 'react';
import NotificationDefinitionBase from './base';
export interface EditProps { record: any; }
export default function Edit({ record }: EditProps) {
  const { form, translate, loading, setLoading, setFormFied } = PageUtilities();
  const { getLanguageCodeOptions } = NotificationDefinitionBase();
  const [option, setOption] = useState<any[]>();
  const { editEmailNotificationTemplate } = EmailNotificationTemplateService();
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
      var response = await editEmailNotificationTemplate(record.id, model);
      if (!response.IsBusinessError) {
        message.success(translate("common.updateSuccessful"));
        form.resetFields();
      }
    }
    finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    setFormFied({
      LanguageCode: record.languageCode,
      Subject: record.subject,
      HtmlContent: record.htmlContent,
      PlainTextContent: record.plainTextContent,
      SenderAddress: record.senderAddress,
      ReplyTo: record.replyTo,
      MaxRetryCount: record.maxRetryCount,
      Provider: record.provider
    })
  }, [record]);

  return (
    <Form size='middle' layout={"vertical"} form={form} onFinish={onFinish}  >
      <Form.Item name="LanguageCode" label={translate("emailNotificationTemplatePage.languageCode")} rules={[{ required: true }]}  >
        <Select
          labelInValue
          style={{ width: "100%" }}
          options={option}
          onChange={(value: any) => setFormFied({ LanguageCode: value.value })}
          defaultValue={{ value: record.languageCode, label: record.languageCode }}
        >
        </Select>
      </Form.Item>
      <Form.Item name="Subject" label={translate("emailNotificationTemplatePage.subject")} rules={[{ required: true }]}>
        <Input defaultValue={record.subject} />
      </Form.Item>
      <Form.Item
        name="HtmlContent"
        label={translate("emailNotificationTemplatePage.htmlContent")}
        rules={[{ required: true }]}
      >
        <HtmlContentEditor initialValue={record.htmlContent} onChange={(value: any) => form.setFieldsValue({ HtmlContent: value })} />
      </Form.Item>
      <Form.Item name="PlainTextContent" label={translate("emailNotificationTemplatePage.plainTextContent")} rules={[{ required: true }]}>
        <Input defaultValue={record.plainTextContent} />
      </Form.Item>
      <Form.Item name="SenderAddress" label={translate("emailNotificationTemplatePage.senderAddress")} rules={[{ required: false }]}>
        <Input defaultValue={record.senderAddress} />
      </Form.Item>
      <Form.Item name="ReplyTo" label={translate("emailNotificationTemplatePage.replyTo")} rules={[{ required: false }]}>
        <Input defaultValue={record.replyTo} />
      </Form.Item>
      <Form.Item name="MaxRetryCount" label={translate("emailNotificationTemplatePage.maxRetryCount")} rules={[{ required: true }]}>
        <Input type='number' defaultValue={record.maxRetryCount} />
      </Form.Item>
      <Form.Item name="Provider" label={translate("emailNotificationTemplatePage.provider")} rules={[{ required: true }]}>
        <Input defaultValue={record.provider} />
      </Form.Item>

      <Form.Item style={{ textAlign: 'end' }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          {translate("common.update")}
        </Button>
      </Form.Item>
    </Form>
  )
}
