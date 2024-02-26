import { PageUtilities } from '@cryptobigbang-core';
import { NotificationDefinitionService } from '@cryptobigbang-services';
import { Button, Form, Input, message, Select, Switch } from 'antd';
import { isNullOrUndefined } from 'guden-core';
import { useEffect, useState } from 'react';
import NotificationDefinitionBase from './base';
export interface EditProps {
  record: any
}
export default function Edit({ record }: EditProps) {
  const { translate, loading, setLoading, form, setFormFied } = PageUtilities();
  const { optionDurationTypeList, optionNotificationPriorityList } = NotificationDefinitionBase();
  const [] = useState(false);
  const { editNotificationDefinition } = NotificationDefinitionService();

  useEffect(() => { setFormFied({ IsPassive: true }) }, []);

  useEffect(() => {
    if (!isNullOrUndefined(record)) {
      setFormFied({
        GroupCode: record.groupCode,
        Description: record.description,
        DurationType: record.durationType,
        ExpireDuration: record.expireDuration,
        NotificationPriority: record.notificationPriority,
        IsPassive: record.isPassive
      });
    }
  }, [record]);


  const onFinish = async (model: any) => {
    try {
      setLoading(true);
      model.ExpireDuration = parseInt(model.ExpireDuration);
      var response = await editNotificationDefinition(record.id, model);
      if (!response.IsBusinessError) {
        message.success(translate("common.updateSuccessful"));
      }
    }
    finally {
      setLoading(false);
    }
  }
  return (
    <Form layout={"vertical"} form={form} onFinish={onFinish} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
      <Form.Item name="GroupCode" label={translate("notificationDefinitionPage.groupCode")}>
        <Input disabled defaultValue={record.groupCode} />
      </Form.Item>
      <Form.Item name="Code" label={translate("notificationDefinitionPage.Code")} >
        <Input defaultValue={record.code} disabled />
      </Form.Item>
      <Form.Item name="Description" label={translate("notificationDefinitionPage.description")} rules={[{ required: true }]}>
        <Input defaultValue={record.description} />
      </Form.Item>
      <Form.Item name="DurationType" label={translate("notificationDefinitionPage.durationType")} rules={[{ required: true }]} >
        <Select
          defaultValue={record.durationType}
          labelInValue
          style={{ width: "100%" }}
          options={optionDurationTypeList}
          onChange={(value: any) => setFormFied({ DurationType: value.value })}
        >
        </Select>
      </Form.Item>
      <Form.Item name="ExpireDuration" label={translate("notificationDefinitionPage.expireDuration")} rules={[{ required: true }]}>
        <Input type='number' defaultValue={record.expireDuration} />
      </Form.Item>
      <Form.Item name="NotificationPriority" label={translate("notificationDefinitionPage.notificationPriority")} rules={[{ required: true }]} >
        <Select
          defaultValue={record.notificationPriority}
          labelInValue
          style={{ width: "100%" }}
          options={optionNotificationPriorityList}
          onChange={(value: any) => setFormFied({ NotificationPriority: value.value })}
        >
        </Select>
      </Form.Item>
      <Form.Item name="IsPassive" label={translate("notificationDefinitionPage.isPassive")}>
        <Switch onChange={(value: boolean) => setFormFied({ IsPassive: value })} defaultChecked={record.isPassive} />
      </Form.Item>

      <Form.Item style={{ textAlign: 'end' }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          {translate("common.update")}
        </Button>
      </Form.Item>
    </Form>
  )
}
