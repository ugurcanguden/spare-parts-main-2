import { PageUtilities } from '@cryptobigbang-core';
import { RoleService, UserService } from '@cryptobigbang-services';
import { Button, Form, Input, message, Select } from 'antd'
import React, { useEffect, useState } from 'react'
export interface EditProps{
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    nationalIdentityNumber: string,
    roleId: number
}
export default function Edit(props : EditProps) {
    const {translate,setLoading,loading,form} = PageUtilities(); 
    const [option,setOptions]=useState<any[]>([]);
    const {updateUser} = UserService();
    const {getRoles}=RoleService();
    const onFinish = async (values:any) => {
        try {
          setLoading(true);
          let request = {...values,Id: props.id}
          const response = await updateUser(request);
          if(!response.IsBusinessError) { 
            if(!response.IsBusinessError) {
              message.success(translate("common.updateSuccessful")); 
            }           
          } 
        }
        finally {
          setLoading(false);
        }
      };

      useEffect(()=>{
        form.setFieldsValue({
            FirstName:props.firstName,
            LastName : props.lastName,
            Email : props.email,
            NationalIdentityNumber : props.nationalIdentityNumber,
            RoleId : props.roleId
        })
      },[props])

      useEffect(()=>{
        getRoles().then(r=>{
          let option :any[]=[];
          r.forEach((item:any) => {
            option.push({value:item.id,label:item.name});
          });
          setOptions(option);
        })
      },[])
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
        <Input type='email'/>
      </Form.Item>
      
      <Form.Item name="NationalIdentityNumber" label={translate("userPage.nationalIdentityNumber")} rules={[{ required: true }]}>
        <Input type='number'/>
      </Form.Item>
      <Form.Item name="RoleId" label={translate("userPage.role")} rules={[{ required: true }]}>
        <Select
            style={{ width: 120 }}
            options={option}
          />
      </Form.Item>
      <Form.Item style={{textAlign:'end'}}>
        <Button type="primary" htmlType="submit" loading={loading}>
          {translate("common.update")}
        </Button>
      </Form.Item>
    </Form>
  </>
  )
}
