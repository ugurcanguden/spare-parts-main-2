import { ParameterInputType } from '@cryptobigbang-constants';
import { PageUtilities } from '@cryptobigbang-core';
import { ParameterValueType } from '@cryptobigbang-enums'; 
import { ParameterService } from '@cryptobigbang-services';
import { Button, Form, Input, message, Select } from 'antd';
import { useState } from 'react';
import ParameterBase from './parameterBase';

export interface addProps{
  groupCode:string
}

export default function Add(props : addProps) {
  const {getInputType,optionList,getValue} = ParameterBase();
  const {groupCode} = props;
  const {translate,form} = PageUtilities(); 
  const [loading, setLoading] = useState(false);
  const [valueType, setValueType] = useState<ParameterValueType>(ParameterValueType.string);
  const [inputType, setInputType] = useState<ParameterInputType>(ParameterInputType.String);
  const [value, setValue] = useState<any>();
  const {addParameter} = ParameterService();

  const onFinish=async (model:any)=>{ 
    try {
      setLoading(true);
      model.ValueType =  parseInt(valueType);
      model.Value = value;
      var response = await addParameter(model);
      if(!response.IsBusinessError) {
        message.success(translate("common.addingSuccessful")); 
        form.resetFields();
        setValueType(ParameterValueType.string); 
        setInputType(ParameterInputType.String);  
        setValue("");  
      }    
    }
    finally {
      setLoading(false);
    } 
  }
 
  return (
       <Form layout={"vertical"} form={form} onFinish={onFinish} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} initialValues={{ GroupCode: groupCode, Order: 1 }}>
      <Form.Item name="GroupCode" label={translate("parameterPage.groupCode")} rules={[{ required: true }]}>
        <Input disabled />
      </Form.Item>
      <Form.Item name="ParameterCode" label={translate("parameterPage.parameterCode")} rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="ValueType" label={translate("parameterPage.valueType")}>
        <Select
          labelInValue
          onChange={(e:any)=>{
            setValueType(e.value); 
            setInputType(getInputType(e.value)); 
            setValue(getInputType(e.value) == ParameterInputType.Checkbox ? "false": null); 
            form.setFieldsValue({ 
              Value: getInputType(e.value) == ParameterInputType.Checkbox ? "false": null 
            }); 
          }}
          defaultValue={ParameterValueType.string}
          style={{ width: "100%" }}
          options = {optionList}
        >
        </Select>
      </Form.Item>

      <Form.Item name="Value" label={translate("parameterPage.value")} rules={[{ required: inputType != ParameterInputType.Checkbox  }]}>
        <Input type={inputType.toString()}
          onChange={(e) => setValue(getValue(e,inputType.toString()))} />
      </Form.Item>


      <Form.Item name="Description" label={translate("parameterPage.description")} rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="Order" label={translate("parameterPage.order")} rules={[{ required: true }]}>
        <Input type='number' />
      </Form.Item>
        
        <Form.Item style={{textAlign:'end'}}>
          <Button type="primary" htmlType="submit" loading={loading}>
            {translate("common.add")}
          </Button>
        </Form.Item>
      </Form>
  )
}
