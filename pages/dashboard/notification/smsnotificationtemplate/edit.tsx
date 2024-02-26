import { HtmlContentEditor } from '@cryptobigbang-components';
import { PageUtilities } from '@cryptobigbang-core';
import { SmsNotificationTemplateService } from '@cryptobigbang-services';
import { Button, Form, Input, message, Select, Switch } from 'antd';
import React, { useEffect, useState } from 'react'
import NotificationDefinitionBase from './base';
export interface EditProps {
  record: any;
}
export default function Edit({ record }: EditProps) {
  const { form, translate, setFormFied, loading, setLoading } = PageUtilities();
  const { getLanguageCodeOptions } = NotificationDefinitionBase();
  const [option, setOption] = useState<any[]>();
  const { editSmsNotificationTemplate } = SmsNotificationTemplateService();
  //#region  lifeClcyle
  useEffect(() => {
    setFormFied({ IsPassive: true })
    const fetchDataOption = async () => {
      let res = await getLanguageCodeOptions();
      setOption(res);
    };
    fetchDataOption();
  }, []);
  useEffect(() => {
    setFormFied({
      LanguageCode: record.languageCode,
      Content: record.content,
      MaxRetryCount: record.maxRetryCount,
      Provider: record.provider
    })
  }, [record]);
  //#endregion
  const onFinish = async (model: any) => {
    try {
      setLoading(true);
      var response = await editSmsNotificationTemplate(record.id, model);
      if (!response.IsBusinessError)
        message.success(translate("common.updateSuccessful"));
    }
    finally {
      setLoading(false);
    }
  }
  return (
    <Form size='middle' layout={"vertical"} form={form} onFinish={onFinish}  >
      <Form.Item name="LanguageCode" label={translate("smsNotificationTemplatePage.languageCode")} rules={[{ required: true }]} >
        <Select
          labelInValue
          style={{ width: "100%" }}
          options={option}
          onChange={(value: any) => setFormFied({ LanguageCode: value.value })}
          defaultValue={{ value: record.languageCode, label: record.languageCode }}
        >
        </Select>
      </Form.Item>
      <Form.Item name="Content" label={translate("smsNotificationTemplatePage.content")} rules={[{ required: true }]}>
        <HtmlContentEditor onChange={(value: any) => form.setFieldsValue({ HtmlContent: value })} initialValue={record.content} />
      </Form.Item>
      <Form.Item name="MaxRetryCount" label={translate("smsNotificationTemplatePage.maxRetryCount")} rules={[{ required: true }]}>
        <Input type='number' defaultValue={record.maxRetryCount} />
      </Form.Item >
      <Form.Item name="Provider" label={translate("smsNotificationTemplatePage.provider")} rules={[{ required: true }]}>
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
