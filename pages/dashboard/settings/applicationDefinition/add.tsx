import { PageUtilities } from '@cryptobigbang-core';
import { ApplicationDefinitionService } from '@cryptobigbang/libs/services/dashboard/settings';
import { Button, Form, Input, message } from 'antd';

const Add = () => {
    const { translate, form, loading, setLoading } = PageUtilities();
    const { add } = ApplicationDefinitionService();
    
    const onFinish = async (values: any) => {
        await add({ ...values }).then(response => {
            if (!response.IsBusinessError) {
                message.success(translate("common.addingSuccessful"));
                form.resetFields();
            }
        }).finally(() => setLoading(false))
    }


    return (
        <Form layout={"vertical"} form={form} onFinish={onFinish} >
            <Form.Item name="Name" label={translate("applicationDefinitionPage.name")} rules={[{ required: true }]} >
                <Input />
            </Form.Item>
            <Form.Item name="Description" label={translate("applicationDefinitionPage.description")} rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="Type" label={translate("applicationDefinitionPage.type")} rules={[{ required: false }]} >
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
