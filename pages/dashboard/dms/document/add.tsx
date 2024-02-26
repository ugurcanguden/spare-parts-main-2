 
import { PageUtilities } from '@cryptobigbang-core';
import { DocumentDefinitionsService } from '@cryptobigbang-services';
import { Button, Form, Input, message, Select } from 'antd';
import { useState } from 'react';
import DocumentBase from './base';

export interface ParameterAddProps{
  groupCode:string
}

export default function ParameterAdd(props : ParameterAddProps) { 
  const {groupCode} = props;
  const {translate,form} = PageUtilities();  
  const { values } = DocumentBase();
  const [loading, setLoading] = useState(false); 
  const [documentContentType, setDocumentContentType] = useState<string>("");  
  const {editDocument} = DocumentDefinitionsService();

  const onFinish=async (model:any)=>{ 
    try {
      setLoading(true);
      model.DocumentContentType =  documentContentType; 
      var response = await editDocument(groupCode,model);
      if(!response.IsBusinessError) {
        message.success(translate("common.addingSuccessful")); 
        form.resetFields();   
      }    
    }
    finally {
      setLoading(false);
    } 
  } 
  return (
       <Form layout={"vertical"} form={form} onFinish={onFinish} initialValues={{ GroupCode: groupCode }}> 
      <Form.Item name="Code" label={translate("documentPage.code")} rules={[{ required: true }]} >
        <Input />
      </Form.Item>
      <Form.Item name="Description" label={translate("documentPage.description")} rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="DocumentContentType" label={translate("documentPage.documentContentType")} rules={[{ required: true }]}>
        <Select
          labelInValue
          onChange={(e:any)=>{setDocumentContentType(e.value) }} 
          style={{ width: "100%" }}
          options = {values}
        >
        </Select>
      </Form.Item>   
        <Form.Item style={{textAlign:'end'}}>
          <Button type="primary" htmlType="submit" loading={loading}>
            {translate("common.add")}
          </Button>
        </Form.Item>
      </Form>
  )
}
