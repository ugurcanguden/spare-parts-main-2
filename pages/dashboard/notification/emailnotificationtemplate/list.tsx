import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { FilterProps, ProTable, ProTableProps } from '@cryptobigbang-components';
import { PageUtilities } from '@cryptobigbang-core';
import { EmailNotificationTemplateService } from "@cryptobigbang-services";
import { Button, Drawer, Input, Layout, Menu, message, Popconfirm, Space } from 'antd';
import { isNullOrEmptyString } from 'guden-core';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Add from './add';
import Edit from './edit';

export default function List() {
    const {translate,apiCallCount, setApiCallCount,backButton} = PageUtilities();   
    const [open, setOpen] = useState([false, false]);
    const router = useRouter();
    const { notificationDefinitionId } = router.query;
    const [record, setRecord] = useState<any>();
    const {deleteEmailNotificationTemplate,baseUrl} = EmailNotificationTemplateService();
    const showDrawer = (openStatus: boolean[]) => {
        setOpen(openStatus);
    };

    const onClose = () => {
        setOpen([false, false]);
        setApiCallCount(apiCallCount + 1);
    };

    const confirm = async (id: string) => {
        if (isNullOrEmptyString(id))
            return;
        try {
            const response = await deleteEmailNotificationTemplate(id);
            if (!response.IsBusinessError) {
                message.success(translate("common.deleteSuccessful"));
                setApiCallCount(apiCallCount + 1);
            }
        }
        finally {

        }
    };
    const columns = [
        {
            title: translate("emailNotificationTemplatePage.columns.languageCode"),
            dataIndex: "languageCode",
            key: "languageCode",
        },
        {
            title: translate("emailNotificationTemplatePage.columns.subject"),
            dataIndex: "subject",
            key: "subject",
            // Filtre özelliğini ekleyin
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: FilterProps) => (
                <div style={{ padding: 8 }}>
                    <Input
                        placeholder={translate("common.search")}
                        value={selectedKeys[0]}
                        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => confirm()}
                        style={{ width: 188, marginBottom: 8, display: 'block' }}
                    />
                    <Button
                        type="primary"
                        onClick={() => confirm()}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90, marginRight: 8 }}
                    >
                        {translate("common.search")}
                    </Button>
                </div>
            ),
            // Filtreleme işlevini tanımlayın
            onFilter: (value: any, record: any) => record.subject.toLowerCase().includes(value.toLowerCase()),
            // Filtre simgesi ekleyin
            filterIcon: (filtered: any) => (
                <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
            )
        },
        {
            title: translate("emailNotificationTemplatePage.columns.htmlContent"),
            dataIndex: "htmlContent",
            key: "htmlContent",
        },
        {
            title: translate("emailNotificationTemplatePage.columns.plainTextContent"),
            dataIndex: "plainTextContent",
            key: "plainTextContent",
        },
        {
            title: translate("emailNotificationTemplatePage.columns.senderAddress"),
            dataIndex: "senderAddress",
            key: "senderAddress",
        },
        {
            title: translate("emailNotificationTemplatePage.columns.replyTo"),
            dataIndex: "replyTo",
            key: "replyTo",
        },
        {
            title: translate("emailNotificationTemplatePage.columns.maxRetryCount"),
            dataIndex: "maxRetryCount",
            key: "maxRetryCount",
        },
        {
            title: translate("emailNotificationTemplatePage.columns.provider"),
            dataIndex: "provider",
            key: "provider",
        },
        {
            dataIndex: 'id',
            key: 'id',
            title: "",
            align: "end",
            fixed: 'right',
            width: 40,
            render: (id: string, record: any) =>
                <Space>
                    <Button icon={<EditOutlined />} onClick={() => {
                        showDrawer([false, true]);
                        setRecord(record);
                    }}></Button>

                    <Popconfirm
                        title={translate("common.sureDelete")}
                        onConfirm={() => { confirm(record.id) }}
                        okText={translate("common.yes")}
                        cancelText={translate("common.no")}
                    >
                        <Button icon={<DeleteOutlined />}  ></Button>
                    </Popconfirm>
                </Space>


        }
    ];
    const actionMenu = (
        <Menu >
            <Menu.Item key="add">
                <Button icon={<PlusOutlined style={{ color: '#1890ff' }} />} onClick={() => showDrawer([true, false])}>
                    {translate("common.add")}
                </Button>
            </Menu.Item>
        </Menu>
    );


    const propTableProps: ProTableProps = {
        apiCallCount: apiCallCount,
        apiUrl: `${baseUrl}/by-notification-def-id/${notificationDefinitionId}`,
        columns: columns,
        actionMenu: {
            actionButtonText: "",
            menu: actionMenu
        },
        headerItems: {
            Items: [
                backButton
            ]
        },
        paginationDisabled: true
    }
    return (
        <Layout className='antlayout'>
            {open[0] && <Drawer title={translate("common.new")} placement="right" onClose={onClose} open={open[0]}>
                <Add notificationDefinitionId={notificationDefinitionId ? notificationDefinitionId.toString() : ""}></Add>
            </Drawer>}
            {open[1] && <Drawer title={translate("common.update")} placement="right" onClose={onClose} open={open[1]}>
                <Edit record={record}></Edit></Drawer>}
            {<ProTable {...propTableProps} />}
        </Layout>
    )
}