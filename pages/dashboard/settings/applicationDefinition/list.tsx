import { PlusOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { ProTable, ProTableProps } from '@cryptobigbang-components';
import { PageUtilities } from '@cryptobigbang-core';
import { ApplicationDefinitionService } from '@cryptobigbang-services';
import { PlusSquareOutlined } from '@cryptobigbang/libs/components/icon/allIcon';
import { Button, Drawer, Layout, Menu, Modal } from 'antd';
import Link from 'next/link';
import { useState } from 'react';
import Add from './add';


export default function List() {
  const { translate, apiCallCount, setApiCallCount } = PageUtilities();
  const [open, setOpen] = useState([false, false]);
  const { baseUrl } = ApplicationDefinitionService();
  const showDrawer = (openStatus: boolean[]) => {
    setOpen(openStatus);
  };

  const onClose = () => {
    setOpen([false, false]);
    setApiCallCount(apiCallCount + 1);
  };


  const columns = [
    {
      title: translate("applicationDefinitionPage.name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: translate("applicationDefinitionPage.description"),
      dataIndex: "description",
      key: "description",
    },
    {
      title: translate("applicationDefinitionPage.type"),
      dataIndex: "type",
      key: "type"
    },
    {
      dataIndex: 'id',
      key: 'id',
      title: "",
      align: "end",
      fixed: 'right',
      width: 50,
      render: (id: number, record: any) =>
      <Link href={`/dashboard/settings/apidefinitions/${record.name}`}>
      <Button type="default" size="small" style={{ marginLeft: 8 }} icon={<PlusSquareOutlined />} >
        {translate("applicationDefinitionPage.apiDefinitionPageAdd")}
      </Button>
    </Link>
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
    paginationDisabled: true
  }
 

  return (
    <Layout className='antlayout'>
      {open[0] && <Drawer title={translate("common.new")} placement="right" onClose={onClose} open={open[0]}>
        <Add />
      </Drawer>
      } 
      <ProTable {...propTableProps} />
    </Layout>
  )
} 
