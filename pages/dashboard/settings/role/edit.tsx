import { PageUtilities } from '@cryptobigbang-core';
import { RoleService } from '@cryptobigbang-services';
import { Form, Input, Button, message } from 'antd' 
import React from 'react'

export interface EditProps{
    Id:number,
    Name:string,
    Description : string,
    Status : number
}
export const Edit = (props:EditProps) => {
    const { translate, form, loading, setLoading } = PageUtilities();
    const { editRole } = RoleService();
    const onFinish = async (form: any) => {
        await editRole({ ...form, Status: props.Status,Id:props.Id}).then(response => {
            if (!response.IsBusinessError) {
                message.success(translate("common.updateSuccessful")); 
            }
        }).finally(() => setLoading(false))
    }



    return (
        <Form layout={"vertical"} form={form} onFinish={onFinish} initialValues={{Name:props.Name,Description:props.Description}}>
            <Form.Item name="Name" label={translate("rolePage.Name")} rules={[{ required: true }]} >
                <Input />
            </Form.Item>
            <Form.Item name="Description" label={translate("rolePage.description")} rules={[{ required: true }]}>
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
