import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { ProTable, ProTableProps } from '@cryptobigbang-components';
import { PageUtilities } from '@cryptobigbang-core';
import { FiatDetailService } from '@cryptobigbang-services';
import { Button, Drawer, Layout, Menu, Popconfirm, Space } from 'antd';
import { useState } from 'react';
import Add from './add';
import Edit from './edit';

export default function List() {
  const { translate, apiCallCount, setApiCallCount,confirm } = PageUtilities();
  const [open, setOpen] = useState([false, false]);
  const [id, setId] = useState(0);
  const { baseUrl, deleteFiatDetail } = FiatDetailService();

  const showDrawer = (openStatus: boolean[]) => {setOpen(openStatus);};

  const onClose = () => {
    setOpen([false, false]);
    setApiCallCount(apiCallCount + 1);
  };


  const columns = [  {
    title: "Id",
    dataIndex: "id",
    key: "id"
  }, 
    {
      dataIndex: 'assetId',
      key: 'assetId',
      title:  translate("fiatDetailPage.columns.asset"),
      render: (id: string,record:any) =>record.asset.name
    },  
    {
      title: translate("fiatDetailPage.columns.label"),
      dataIndex: "label",
      key: "label",
    },
    {
      title: translate("fiatDetailPage.columns.minDeposit"),
      dataIndex: "minDeposit",
      key: "minDeposit" 
    },
    {
      title: translate("fiatDetailPage.columns.minWithdraw"),
      dataIndex: "minWithdraw",
      key: "minWithdraw" 
    },
    {
      dataIndex: 'id',
      key: 'id',
      title: "",
      align: "end",
      fixed: 'right',
      width: 50,
      render: (id: string,record:any) =>
      <Space>
          <Button icon={<EditOutlined />} onClick={() => {
            showDrawer([false, true]);
            setId(record.id);
          }}></Button>
          <Popconfirm
            title={translate("common.sureDelete")}
            onConfirm={() => confirm(id,deleteFiatDetail)}
            okText={translate("common.yes")}
            cancelText={translate("common.no")} >
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
    paginationDisabled : true
  }
  return (
    <Layout className='antlayout'>
      {open[0] && <Drawer title={translate("common.new")} placement="right" onClose={onClose} open={open[0]}>
        <Add></Add>
      </Drawer>}
      {open[1] && <Drawer title={translate("common.update")} placement="right" onClose={onClose} open={open[1]}>
        <Edit id={id}></Edit>
      </Drawer>}
      <ProTable {...propTableProps} />
    </Layout>
  )
}
