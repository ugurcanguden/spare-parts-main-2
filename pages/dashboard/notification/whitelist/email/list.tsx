import { FilterProps, ProTable, ProTableProps } from '@cryptobigbang-components';
import { PageUtilities } from '@cryptobigbang-core';
import { WhitelistEmailService } from '@cryptobigbang-services';
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Drawer, Input, Layout, Menu, message, Popconfirm, Space } from 'antd';
import { isNullOrEmptyString } from 'guden-core';
import moment from 'moment';
import { useState } from 'react';
import Add from './add';
import Edit from './edit';
import Filter from './filter';

export default function List() {
    const { translate, onFiltered, query, setQuery,apiCallCount, setApiCallCount} = PageUtilities(); 
    const [open, setOpen] = useState([false, false]); 
    const [record, setRecord] = useState<any>();
    const {baseUrl,deleteWhitelistEmail} = WhitelistEmailService(); 
    const showDrawer = (openStatus: boolean[]) => {
        setOpen(openStatus);
    };

    const onClose = () => {
        setOpen([false, false]);
        setApiCallCount(apiCallCount + 1);
    };

    const confirm = async (email: string) => {
        if (isNullOrEmptyString(email))
            return;
        try {
            const response = await deleteWhitelistEmail(email);
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
            title: translate("whiteListPage.columns.email"),
            dataIndex: "email",
            key: "email",            // Filtre özelliğini ekleyin
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
            onFilter: (value: any, record: any) => record.email.toLowerCase().includes(value.toLowerCase()),
            // Filtre simgesi ekleyin
            filterIcon: (filtered: any) => (
                <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
            )
        },
        {
            dataIndex: 'beginDate',
            key: 'beginDate',
            title: translate("whiteListPage.columns.validDateRange"),
            align: "end",
            render: (email: string, record: any) => {

                let beginDateFormat = moment(record?.beginDate).format("DD.MM.yyyy");
                let endDateFormat = moment(record?.endDate).format("DD.MM.yyyy");

                return (
                    <>
                        {beginDateFormat} -
                        {new Date(record?.endDate).getFullYear() == 9999 ? " ∞ " : endDateFormat}
                    </>
                )

            }
        },
        {
            dataIndex: 'email',
            key: 'email',
            title: "",
            align: "end",
            fixed: 'right',
            width: 40,
            render: (email: string, record: any) =>
                <Space>
                    <Button icon={<EditOutlined />} onClick={() => {
                        showDrawer([false, true]);
                        setRecord(record);
                    }}></Button>

                    <Popconfirm
                        title={translate("common.sureDelete")}
                        onConfirm={() => { confirm(email) }}
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
        apiUrl: baseUrl,
        columns: columns,
        actionMenu: {
            actionButtonText: "",
            menu: actionMenu
        },
        queryParams: query,
        headerItems:{
            Items:[
                <Filter onFiltered={(e)=>{
                    let queryString=onFiltered(e); 
                    setQuery(queryString);
                    setApiCallCount(apiCallCount+1);
                }} key="filter"></Filter>
            ]
        }
    }
    return (
        <Layout className='antlayout'>
            {open[0] && <Drawer title={translate("common.new")} placement="right" onClose={onClose} open={open[0]}>
                <Add />
            </Drawer>}
            {open[1] && <Drawer title={translate("common.update")} placement="right" onClose={onClose} open={open[1]}>
                <Edit record={record}></Edit></Drawer>}
            <ProTable {...propTableProps} />
        </Layout>
    )
}