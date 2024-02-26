import { CryptobigbangSelectList, CryptobigbangSelectListProps } from '@cryptobigbang-components';
import { PageUtilities } from '@cryptobigbang-core';
import { AssetService, NetworkService, NetworkTypeDefinitionService, NetworkTypeService } from '@cryptobigbang-services';
import { Button, Form, Input, message, Select } from 'antd';

export default function Add() {
  const { translate, loading, setLoading, form, setFormFied } = PageUtilities();
  const { addNetworkTypeDefinition } = NetworkTypeDefinitionService();
  const { getNetworks } = NetworkService();
  const { getNetworkTypes } = NetworkTypeService();


  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      debugger;
      const response = await addNetworkTypeDefinition(values);
      if (!response.IsBusinessError) {
        message.success(translate("common.addingSuccessful"));
        form.resetFields();
      }
    }
    finally {
      setLoading(false);
    }
  };

  const networkCryptobigbangSelectListProps : CryptobigbangSelectListProps={
    formItemProps :{
      name:"NetworkId",
      label:translate("networkTypeDefinitionPage.network"),
      rules:[{ required: true }]
    },
    getValueProperty:(record)=> record.id,
    getLabelProperty:(record)=> record.name,
    getList : getNetworks
  }
  const networkTypeCryptobigbangSelectListProps : CryptobigbangSelectListProps={
    formItemProps :{
      name:"NetworkTypeId",
      label:translate("networkTypeDefinitionPage.networkType"),
      rules:[{ required: true }]
    },
    getValueProperty:(record)=> record.id,
    getLabelProperty:(record)=> record.name, 
    getList : getNetworkTypes
  }
  return (
    <>
      <Form form={form} onFinish={onFinish} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
        <CryptobigbangSelectList {...networkCryptobigbangSelectListProps}/>
        <CryptobigbangSelectList {...networkTypeCryptobigbangSelectListProps}/>
        <Form.Item style={{ textAlign: 'end' }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            {translate("common.add")}
          </Button>
        </Form.Item>
      </Form>
    </>)
}
