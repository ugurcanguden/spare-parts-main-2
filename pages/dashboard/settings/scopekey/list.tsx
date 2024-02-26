import { DeleteOutlined, EditOutlined, PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { ProTable, ProTableProps } from '@cryptobigbang-components';
import { PageUtilities } from '@cryptobigbang-core';
import { RoleMenuMapping, RoleMenuMappingProps } from '@cryptobigbang-sections';
import { ScopeKeyService } from '@cryptobigbang/libs/services/dashboard/settings';
import { Button, Drawer, Layout, Menu, message, Modal, Popconfirm, Space } from 'antd';
import { useState } from 'react';
import Add from './add';
import Edit, { EditProps } from './edit';


export default function List() {
  const { translate, apiCallCount, setApiCallCount } = PageUtilities();
  const [open, setOpen] = useState([false, false]);
  const [pageEdit, setPageEdit] = useState<EditProps>(
    {
      Id: "",
      ScopeKey: "",
      Description: "",
      ControllerName: "",
      ActionName: ""
    });


  const { baseUrl, addScopeKey } = ScopeKeyService();
  const showDrawer = (openStatus: boolean[]) => {
    setOpen(openStatus);
  };

  const onClose = () => {
    setOpen([false, false]);
    setApiCallCount(apiCallCount + 1);
  };

  const confirm = async (record: any, status: number) => {
    try {
      await addScopeKey({ ...record, status: status })
        .then(response => {
          if (!response.IsBusinessError) {
            status == -1 ?
              message.success(translate("common.deleteSuccessful"))
              :
              message.success(translate("common.processSuccessful"))
              ;
          }
        })

    } catch (error) {
      message.success(translate("common.deleteUnSuccessful"));
    }
    finally {
      setApiCallCount(apiCallCount + 1);
    }
  };
  const columns = [
    {
      title: translate("scopeKeyPage.scopeKey"),
      dataIndex: "scopeKey",
      key: "scopeKey",
    },
    {
      title: translate("scopeKeyPage.description"),
      dataIndex: "description",
      key: "description",
    },
    {
      title: translate("scopeKeyPage.actionName"),
      dataIndex: "actionName",
      key: "actionName"
    },
    {
      title: translate("scopeKeyPage.controllerName"),
      dataIndex: "controllerName",
      key: "controllerName"
    },
    {
      dataIndex: 'id',
      key: 'id',
      title: "",
      align: "end",
      fixed: 'right',
      width: 50,
      render: (id: number, record: any) =>
        <Space>
          <Button icon={<EditOutlined />} onClick={() => {
            showDrawer([false, true]);
            setPageEdit({
              Id: record.id,
              ScopeKey: record.scopeKey,
              Description: record.description,
              ActionName: record.actionName,
              ControllerName: record.controllerName
            });
          }}></Button>
          {/* <Button
            type="primary"
            icon={<PlusCircleOutlined />}  
            onClick={() => setRoleMenuMapping({ scopeKeyId: record.id ,apiCallCount:(apiCallCount+1)})} 
          >
           {translate("scopeKeyPage.addMenuMapping")}
          </Button> */}
          <Popconfirm
            title={translate("common.sureDelete")}
            onConfirm={() => confirm(record, -1)}
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
    paginationDisabled: true
  }
  return (
    <Layout className='antlayout'>
      {open[0] && <Drawer title={translate("common.new")} placement="right" onClose={onClose} open={open[0]}>
        <Add />
      </Drawer>}
      {open[1] && <Drawer title={translate("common.update")} placement="right" onClose={onClose} open={open[1]}>
        <Edit {...pageEdit} />
      </Drawer>}
      <ProTable {...propTableProps} />
    </Layout>
  )
} 
