import { ProTable, ProTableProps } from '@cryptobigbang-components';
import { LanguageManager, PageUtilities } from '@cryptobigbang-core';
import { DeleteOutlined, EditOutlined, PlusOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { ParameterGroupService } from '@cryptobigbang-services';
import { Button, Drawer, Layout, Menu, message, Popconfirm, Space } from 'antd';
import Link from 'next/link';
import { useState } from 'react';
import ParameterGroupAdd from './parameterGroupAdd';
import ParameterGroupEdit from './parameterGroupEdit';


export default function Index() {
  const {translate,setApiCallCount,apiCallCount} = PageUtilities(); 
  const [open, setOpen] = useState([false, false]);
  const [parameterGroup, setParameterGroup] = useState("");
  const {baseUrl,deleteParameterGroup} = ParameterGroupService();
  //#region  Actions..
  const showDrawer = (openStatus: boolean[]) => {setOpen(openStatus);};

  const onClose = () => {
    setOpen([false, false]);
    setApiCallCount(apiCallCount + 1);
  }; 
  const confirm = async (groupCode: string) => {
    try {
      const response = await deleteParameterGroup(groupCode);
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
  //#endregion 
  const columns = [
    {
      title: translate("parameterGroupPage.columns.groupCode"),
      dataIndex: "groupCode",
      key: "groupCode",
    },
    {
      title: translate("parameterGroupPage.columns.description"),
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
          <Link href={`/dashboard/catalog/parameter/${groupCode}`}>
            <Button type="default" size="small" style={{ marginLeft: 8 }} icon={<PlusSquareOutlined />} >
              {translate("Parameters")}
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
    }
  }
  return (
    <Layout className='antlayout'>
      {open[0] && <Drawer title={translate("common.new")} placement="right" onClose={onClose} open={open[0]}>
        <ParameterGroupAdd></ParameterGroupAdd>
      </Drawer>}
      {open[1] && <Drawer title={translate("common.update")} placement="right" onClose={onClose} open={open[1]}>
        <ParameterGroupEdit groupCode={parameterGroup}></ParameterGroupEdit>
      </Drawer>}
      <ProTable {...propTableProps} />
    </Layout>
  )
} 
