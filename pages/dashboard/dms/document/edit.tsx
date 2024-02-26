import { PageUtilities } from "@cryptobigbang-core";
import { DocumentDefinitionsService } from '@cryptobigbang-services';
import { Button, Form, Input, message, Select } from 'antd';
import { useState } from 'react';
import DocumentBase from './base';

export interface DocumentEditProps {
  groupCode :string;
  id:string;
  code:string;
  description:string;
  documentContentType:string
}

export default function DocumentEdit(props: DocumentEditProps) {
  const {id,code,description,documentContentType,groupCode} = props;
  const {form,translate,loading, setLoading} = PageUtilities(); 
  const { values } = DocumentBase(); 
  const [newDocumentContentType, setNewDocumentContentType] = useState<string>();
  const {editDocument} = DocumentDefinitionsService();

  const onFinish=async (model:any)=>{ 
    try {
      setLoading(true);
      model.DocumentContentType =  newDocumentContentType??documentContentType; 
      const response = await editDocument(groupCode,model);
      if(!response.IsBusinessError) {
        message.success(translate("common.updateSuccessful"));  
      }    
    }
    finally {
      setLoading(false);
    } 
  } 
  
 
  return (
    <Form layout={"vertical"} form={form} onFinish={onFinish} initialValues={{ Code: code ,Description : description,DocumentContentType:documentContentType}}> 
      <Form.Item name="Code" label={translate("documentPage.code")} rules={[{ required: true }]} >
        <Input disabled/>
      </Form.Item>
      <Form.Item name="Description" label={translate("documentPage.description")} rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="DocumentContentType" label={translate("documentPage.documentContentType")} rules={[{ required: true }]}>
        <Select
          labelInValue
          onChange={(e:any)=>{setNewDocumentContentType(e.value) }} 
          style={{ width: "100%" }}
          options = {values}
        >
        </Select>
      </Form.Item>   
        <Form.Item style={{textAlign:'end'}}>
          <Button type="primary" htmlType="submit" loading={loading}>
            {translate("common.update")}
          </Button>
        </Form.Item>
      </Form>
  )
}
