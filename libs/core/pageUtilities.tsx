import { LanguageManager } from '@cryptobigbang-core';
import { Button, Form, message, theme } from 'antd';
import { useRouter } from "next/router";
import { useState } from 'react';
import { ArrowLeftOutlined, DeleteOutlined, EditOutlined, MessageOutlined, MobileOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';

export const PageUtilities = () => {
  const router = useRouter();
  const [apiCallCount, setApiCallCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState<string>();
  const [form] = Form.useForm();
  const { translate } = LanguageManager();
  const setFormFied = (value: any) => { form.setFieldsValue(value); }
  const { token: { colorBgContainer } } = theme.useToken();

  const onFiltered = (values: any): string => {
    const queryParams = [];
    // values nesnesinin anahtarlarını döngü ile işleyin
    for (const key in values) {
      if (values[key] !== undefined && values[key] !== null) {
        queryParams.push(`${key}=${values[key]}`);
      }
    }
    const queryString = queryParams.join('&');
    return queryString;
  };
  const confirm = async (id: any, deleteMethod: (id: any) => Promise<any>) => {
    try {
      const response = await deleteMethod(id);
      if (!response.IsBusinessError) {
        message.success(translate("common.deleteSuccessful"));
      }
    } catch (error) {
      message.success(translate("common.deleteUnSuccessful"));
    }
    finally {
      setApiCallCount(apiCallCount + 1);
    }
  };
  const backButton = (
    <Button
      style={{marginBottom:"12px",borderRadius:"50px"}}
      key={1}
      onClick={() => router.back()}
      icon={<ArrowLeftOutlined />} 
    />
  );  
  return {
    loading,
    setLoading,
    router,
    colorBgContainer,
    form,
    translate,
    setFormFied,
    onFiltered,
    query, setQuery,
    apiCallCount, setApiCallCount,
    backButton,
    confirm
  }
}
