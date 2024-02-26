import { ParameterInputType } from '@cryptobigbang-constants';
import { PageUtilities } from '@cryptobigbang-core';
import { ParameterValueType } from '@cryptobigbang-enums';
import { ParameterService } from '@cryptobigbang-services';
import { Button, Form, Input, message, Select } from 'antd';
import { isNullOrEmptyString } from 'guden-core';
import { useEffect, useState } from 'react';
import ParameterBase from './parameterBase';

export interface EditProps {
  groupCode: string,
  parameterCode: string
}

export default function Edit(props: EditProps) {
  const {getInputType,optionList,getValue} = ParameterBase();
  const {translate,form,loading, setLoading} = PageUtilities(); 
  const { groupCode, parameterCode } = props;
  const [valueType, setValueType] = useState<ParameterValueType>(ParameterValueType.string);
  const [inputType, setInputType] = useState<ParameterInputType>(ParameterInputType.String);
  const [value, setValue] = useState<any>();
  const {editParameter,getParameter} = ParameterService();
  
  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      values.ValueType = parseInt(valueType);
      values.Value = value;
      const response = await editParameter(groupCode,parameterCode, values);
      if (!response.IsBusinessError) {
        message.success(translate("common.updateSuccessful")); 
      }
    }
    finally {
      setLoading(false);
    }
  };

  const getDetail = async (groupCodeValue: string, parameterCodeValue: string) => {
    const response = await getParameter(groupCodeValue,parameterCodeValue);
    setValueType(response.valueType?.toString()); 
    setInputType(getInputType(response.valueType?.toString())); 
    setValue(response.value); 
    form.setFieldsValue({
      GroupCode: response.groupCode,
      ParameterCode: response.parameterCode,
      ValueType: response.valueType?.toString(),
      Value: response.value,
      Description: response.description
    });
  }
  useEffect(() => {
    if (!isNullOrEmptyString(groupCode) && !isNullOrEmptyString(parameterCode))
      getDetail(groupCode, parameterCode);
  }, [groupCode, parameterCode])
 
  return (
    <Form layout={"vertical"} form={form} onFinish={onFinish} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} initialValues={{ GroupCode: groupCode, Order: 1 }}>
      <Form.Item name="GroupCode" label={translate("parameterPage.groupCode")} rules={[{ required: true }]}>
        <Input disabled />
      </Form.Item>
      <Form.Item name="ParameterCode" label={translate("parameterPage.parameterCode")} rules={[{ required: true }]}>
        <Input disabled />
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
          {translate("common.update")}
        </Button>
      </Form.Item>
    </Form>
  )
}
