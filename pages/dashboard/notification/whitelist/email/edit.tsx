import { WhitelistEmailService } from '@cryptobigbang-services';
import { PageUtilities } from '@cryptobigbang-core';
import { Button, DatePicker, Form, Input, message } from 'antd';
import moment from 'moment';
export interface EditProps {
    record: any
}
export default function Edit({ record }: EditProps) {
    const { translate, loading,setLoading,form} = PageUtilities();
    const {editWhitelistEmail} = WhitelistEmailService(); 
    const onFinish = async (values: any) => {
        try {
            setLoading(true);
            values = {
                BeginDate:values.DateRange[0],
                EndDate : values.DateRange[1],
                Email : values.Email
              }; 
            const response = await editWhitelistEmail(values);
            if (!response.IsBusinessError) {
                message.success(translate("common.updateSuccessful")); 
            }
        }
        finally {
            setLoading(false);
        }
    };

    const { RangePicker } = DatePicker;
 

    return (
        <>
            <Form form={form} onFinish={onFinish} layout={"vertical"} initialValues={{Email:record.email, DateRange: [
                 moment(record.beginDate),
                 moment(record.endDate)
            ]}}>
                <Form.Item name="Email" label={translate("whiteListPage.email")} rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="DateRange" label={translate("whiteListPage.validDateRange")} rules={[{ required: true }]}>
                    <RangePicker  format='DD.MM.YYYY' value={[record.beginDate,record.endDate]}></RangePicker>
                </Form.Item>
                <Form.Item style={{ textAlign: 'end' }}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        {translate("common.add")}
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}
