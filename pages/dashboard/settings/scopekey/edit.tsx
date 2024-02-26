import { PageUtilities } from '@cryptobigbang-core';
import { RoleService } from '@cryptobigbang-services';
import { ScopeKeyService } from '@cryptobigbang/libs/services/dashboard/settings';
import { Form, Input, Button, message } from 'antd' 
import React from 'react'

export interface EditProps{
    Id:string,
    ScopeKey:string,
    Description : string,
    ActionName : string,
    ControllerName : string 
}
export const Edit = (props:EditProps) => {
    const { translate, form, loading, setLoading } = PageUtilities();
    const { editScopeKey } = ScopeKeyService();
    const onFinish = async (form: any) => {
        await editScopeKey(props.Id.toString(),{ ...form}).then(response => {
            if (!response.IsBusinessError) {
                message.success(translate("common.updateSuccessful")); 
            }
        }).finally(() => setLoading(false))
    }



    return (
        <Form layout={"vertical"} form={form} onFinish={onFinish} initialValues={{
            Id: props.Id,
            ScopeKey:props.ScopeKey,
            Description:props.Description,
            ActionName : props.ActionName,
            ControllerName : props.ControllerName
            }}>
            <Form.Item name="Id" hidden >
                <Input />
            </Form.Item>
             <Form.Item name="ScopeKey" label={translate("scopeKeyPage.scopeKey")} rules={[{ required: true }]} >
                <Input />
            </Form.Item>
            <Form.Item name="Description" label={translate("scopeKeyPage.description")} rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="ActionName" label={translate("scopeKeyPage.actionName")} rules={[{ required: false }]} >
                <Input />
            </Form.Item>
            <Form.Item name="ControllerName" label={translate("scopeKeyPage.controllerName")} rules={[{ required: false }]} >
                <Input />
            </Form.Item>
            <Form.Item style={{ textAlign: 'end' }}>
                <Button type="primary" htmlType="submit" loading={loading}>
                    {translate("common.update")}
                </Button>
            </Form.Item>
        </Form>
    )
}

export default Edit
