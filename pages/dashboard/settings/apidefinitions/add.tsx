import { PageUtilities } from '@cryptobigbang-core';
import { ApplicationDefinitionService } from '@cryptobigbang/libs/services/dashboard/settings';
import { Button, Form, Input, message, Switch } from 'antd';
import { useState } from 'react';

const Add = (props:any) => {
    const {applicationName}=props;
    const { translate, form, loading, setLoading } = PageUtilities();
    const { addApiDefinition } = ApplicationDefinitionService();
    const [useRegex, setUseRegex] = useState(false);
    const onFinish = async (values: any) => {
        values.ApiPathRegex = useRegex ? values.ApiPathRegex : "";
        values.UseRegex = useRegex;
        await addApiDefinition(applicationName,{ ...values }).then(response => {
            if (!response.IsBusinessError) {
                message.success(translate("common.addingSuccessful"));
                form.resetFields();
            }
        }).finally(() => setLoading(false))
    }


    return (
        <Form layout={"vertical"} form={form} onFinish={onFinish} >
            <Form.Item name="HttpRequestMethod" label={translate("apiDefinitionPage.httpRequestMethod")} rules={[{ required: true }]} >
                <Input />
            </Form.Item>
            <Form.Item name="ApiPathFormat" label={translate("apiDefinitionPage.apiPathFormat")} rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="ApiPath" label={translate("apiDefinitionPage.apiPath")} rules={[{ required: false }]} >
                <Input />
            </Form.Item>
            <Switch onChange={setUseRegex} checked={useRegex} />
            {useRegex && <Form.Item name="ApiPathRegex" label={translate("apiDefinitionPage.apiPathRegex")} rules={[{ required: useRegex }]} >
                <Input />
            </Form.Item>}
            <Form.Item name="ScopeKey" label={translate("apiDefinitionPage.scopeKey")} rules={[{ required: true }]} >
                <Input />
            </Form.Item>
            <Form.Item style={{ textAlign: 'end' }}>
                <Button type="primary" htmlType="submit" loading={loading}>
                    {translate("common.add")}
                </Button>
            </Form.Item>
        </Form>
    )
}

export default Add
