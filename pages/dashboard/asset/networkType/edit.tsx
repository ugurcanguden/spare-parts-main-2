import { NetworkTypeService } from '@cryptobigbang-services';
import { PageUtilities } from '@cryptobigbang-core';
import { Button, Form, Input, message, Switch } from 'antd';
import { isNullOrEmptyString } from 'guden-core';
import { useEffect, useState } from 'react';
export interface EditProps {
    id: number
}
export default function Edit({ id }: EditProps) {
    const { translate, loading, setLoading, form,setFormFied } = PageUtilities();
    const [apiResponse, setApiResponse] = useState<any>();
    const { getNetworkType, addNetworkType } = NetworkTypeService();
    const onFinish = async (values: any) => {
        try {
            setLoading(true);
            const response = await addNetworkType(values);
            if (!response.IsBusinessError) {
                message.success(translate("common.updateSuccessful"));
                form.resetFields();
            }
        }
        finally {
            setLoading(false);
        }
    };

    const getDetail = async (id: number) => {
        setLoading(true);
        const response = await getNetworkType(id);
        setFormFied({
            Id:response.id,
            Name : response.name,
            UtxO_Based : response.utxO_Based
        })    
        setApiResponse(response);  
        setLoading(false)
    }
    
    useEffect(() => {if (!isNullOrEmptyString(id))getDetail(id);}, [id]) 
    return ( 
            <Form form={form} onFinish={onFinish} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                <Form.Item name="Id" label={translate("networkTypePage.id")} rules={[{ required: true }]} hidden>
                    <Input />
                </Form.Item>
                <Form.Item name="Name" label={translate("networkTypePage.name")} rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item valuePropName="UtxO_Based" name="UtxO_Based" label={translate("networkTypePage.utxO_Based")} rules={[{ required: false }]} >
                    {apiResponse && <Switch  defaultChecked={apiResponse.utxO_Based}/>}
                </Form.Item>
                <Form.Item style={{ textAlign: 'end' }}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        {translate("common.update")}
                    </Button>
                </Form.Item>
            </Form>      
    )
}
