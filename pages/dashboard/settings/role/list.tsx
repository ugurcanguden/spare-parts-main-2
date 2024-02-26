import { ProTable, ProTableProps } from '@cryptobigbang-components';
import { PageUtilities } from '@cryptobigbang-core';
import { DeleteOutlined, EditOutlined, PlusOutlined, CheckCircleOutlined, CloseCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { DocumentGroupService, RoleService } from '@cryptobigbang-services';
import { Button, Drawer, Layout, Menu, message, Popconfirm, Space, Modal } from 'antd';
import Link from 'next/link';
import { useState } from 'react';
import Add from './add';
import Edit, { EditProps } from './edit';
import { RoleApiDefinitionMapping, RoleApiDefinitionMappingProps, RoleMenuMapping, RoleMenuMappingProps } from '@cryptobigbang-sections';


export default function List() {
  const { translate, apiCallCount, setApiCallCount } = PageUtilities();
  const [open, setOpen] = useState([false, false]);
  const [pageEdit, setPageEdit] = useState<EditProps>({ Id: 0, Name: "", Description: "", Status: 0 });
  const [roleMenuMapping, setRoleMenuMapping] = useState<RoleMenuMappingProps>({ roleId: 0 , apiCallCount : 0 });
  const [roleApiDefinitionMapping, setRoleApiDefinitionMapping] = useState<RoleApiDefinitionMappingProps>({ roleId: 0 });


  const { baseUrl, editRole } = RoleService();
  const showDrawer = (openStatus: boolean[]) => {
    setOpen(openStatus);
  };

  const onClose = () => {
    setOpen([false, false]);
    setApiCallCount(apiCallCount + 1);
  };


  const columns = [
    {
      title: translate("rolePage.name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: translate("rolePage.description"),
      dataIndex: "description",
      key: "description",
    },
    {
      title: translate("rolePage.status"),
      dataIndex: "status",
      key: "status",
      render: (id: number, record: any) => {

        return record.status == 1 ? <>{translate("common.active")}</> :
          <>{translate("common.passive")}</>

      }
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
              Id: id,
              Name: record.name,
              Description: record.description,
              Status: record.status
            });
          }}></Button>
          <Button
            type="primary"
            icon={record.status === 0 ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
            onClick={() => confirm(record, record.status === 0 ? 1 : 0)} // toggleStatus fonksiyonunu çağırın 
          >
          </Button>
          <Button
            type="primary"
            icon={<PlusCircleOutlined />} // Role eklemek için kullanılacak bir simge ekleyin (örneğin, artı işareti)
            onClick={() => setRoleMenuMapping({ roleId: record.id ,apiCallCount:(apiCallCount+1)})} // Role popup'ını açmak için bir işlev çağırın
          >
           {translate("rolePage.addMenuMapping")}
          </Button>
          <Button
            type="primary"
            icon={<PlusCircleOutlined />} // Role eklemek için kullanılacak bir simge ekleyin (örneğin, artı işareti)
            onClick={() => setRoleApiDefinitionMapping({ roleId: record.id})} // Role popup'ını açmak için bir işlev çağırın
          >
           {translate("rolePage.setRoleApiDefinitionMapping")}
          </Button>

          
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
  const confirm = async (record: any, status: number) => {
    try {
      await editRole({ ...record, status: status })
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
      {roleMenuMapping?.roleId > 0&&<Modal open={roleMenuMapping?.roleId > 0} onCancel={() => setRoleMenuMapping({ roleId: 0,apiCallCount:(apiCallCount+1) })} footer={null}>
        <RoleMenuMapping {...roleMenuMapping} /> 
      </Modal>
      }
      {roleApiDefinitionMapping?.roleId > 0&&<Modal  style={{ height: '900px' }}  width={900} open={roleApiDefinitionMapping?.roleId > 0} onCancel={() => setRoleApiDefinitionMapping({ roleId: 0})} footer={null} >
        <RoleApiDefinitionMapping {...roleApiDefinitionMapping} /> 
      </Modal>
      }


      <ProTable {...propTableProps} />
    </Layout>
  )
} 
