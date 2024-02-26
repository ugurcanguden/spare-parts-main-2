import { Button, DatePicker, Form, Input, Layout, Modal } from 'antd'
import { FilterOutlined, SearchOutlined } from '@ant-design/icons';
import React, { useState } from 'react'
import { PageUtilities } from '@cryptobigbang-core';

export interface FilterProps {
    onFiltered: (values: any) => void;
}

export default function Filter({ onFiltered }: FilterProps) {
    const { translate } = PageUtilities();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Modal open={isModalOpen} closeIcon footer={[]} onCancel={handleCancel} title={translate("common.filter")}>
                <Form onFinish={onFiltered} layout='vertical'>
                    <Form.Item name="Email" label={translate("notificationReportPage.email")} rules={[{ required: false }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="Begin" label={translate("notificationReportPage.beginDate")} rules={[{ required: false }]}>
                        <DatePicker style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item name="End" label={translate("notificationReportPage.endDate")} rules={[{ required: false }]}>
                        <DatePicker style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item style={{ textAlign: 'end' }}>
                        <Button type="default" htmlType="submit" icon={<SearchOutlined />}>
                            {translate("common.search")}
                        </Button>
                    </Form.Item>
                </Form>

            </Modal>
            <Button type="primary" onClick={showModal} icon={<FilterOutlined />} />
        </>

    )
}
