
import { FilterOutlined, SearchOutlined } from '@ant-design/icons';
import { PageUtilities } from '@cryptobigbang-core';
import { Button, Form, Input, Modal } from 'antd';
import { useState } from 'react';

export interface FilterProps {
    onFiltered: (values: any) => void;
}
export default function Filter({ onFiltered }: FilterProps) {
    const { translate} = PageUtilities();
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
                    <Form.Item name="FirstName" label={translate("customerPage.customerList.firstName")} rules={[{ required: false }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="LastName" label={translate("customerPage.customerList.lastName")} rules={[{ required: false }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="Email" label={translate("customerPage.customerList.email")} rules={[{ required: false }]}>
                        <Input />
                    </Form.Item> 
                    <Form.Item name="NationalIdentityNumber" label={translate("customerPage.customerList.nationalIdentityNumber")} rules={[{ required: false }]}>
                        <Input />
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
