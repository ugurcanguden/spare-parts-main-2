import { ProTable, ProTableProps } from '@cryptobigbang-components';
import {PageUtilities } from '@cryptobigbang-core';
import { DeleteOutlined, EditOutlined, PlusOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { DocumentGroupService } from '@cryptobigbang-services';
import { Button, Drawer, Layout, Menu, message, Popconfirm, Space } from 'antd';
import Link from 'next/link';
import { useState } from 'react';
import Add from './add';
import Edit from './edit';


export default function List() {
  const {translate,apiCallCount,setApiCallCount} = PageUtilities();  
  const [open, setOpen] = useState([false, false]);
  const [parameterGroup, setParameterGroup] = useState("");
  const {baseUrl,deleteDocumentGroup}  = DocumentGroupService();
  const showDrawer = (openStatus: boolean[]) => {
    setOpen(openStatus);
  };

  const onClose = () => {
    setOpen([false, false]);
    setApiCallCount(apiCallCount + 1);
  };


  const columns = [
    {
      title: translate("documentGroupPage.columns.groupCode"),
      dataIndex: "groupCode",
      key: "groupCode",
    },
    {
      title: translate("documentGroupPage.columns.description"),
      dataIndex: "description",
      key: "description",
    },
    {
      dataIndex: 'groupCode',
      key: 'groupCode',
      title: "",
      align: "end",
      fixed: 'right',
      width: 50,
      render: (groupCode: string) =>
        <Space>
          <Link href={`/dashboard/dms/document/${groupCode}`}>
            <Button type="default" size="small" style={{ marginLeft: 8 }} icon={<PlusSquareOutlined />} >
              {translate("documentGroupPage.documentAdd")}
            </Button>
          </Link>
          <Button icon={<EditOutlined />} onClick={() => {
            showDrawer([false, true]);
            setParameterGroup(groupCode);
          }}></Button>
          <Popconfirm
            title={translate("common.sureDelete")}
            onConfirm={() => confirm(groupCode)}
            okText={translate("common.yes")}
            cancelText={translate("common.no")} >
            <Button icon={<DeleteOutlined />}  ></Button>
          </Popconfirm>
        </Space>

    }
  ];
  const confirm = async (groupCode: string) => {
    try {
      const response = await deleteDocumentGroup(groupCode);
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
    paginationDisabled: true
  }
  return (
    <Layout className='antlayout'>
      {open[0] && <Drawer title={translate("common.new")} placement="right" onClose={onClose} open={open[0]}>
        <Add></Add>
      </Drawer>}
      {open[1] && <Drawer title={translate("common.update")} placement="right" onClose={onClose} open={open[1]}>
        <Edit groupCode={parameterGroup}></Edit>
      </Drawer>}
      <ProTable {...propTableProps} />
    </Layout>
  )
} 
