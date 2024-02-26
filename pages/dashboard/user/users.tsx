import { EditOutlined, PlusOutlined, RetweetOutlined, UserOutlined } from '@ant-design/icons';
import { ProTable, ProTableProps } from '@cryptobigbang-components';
import { PageUtilities } from '@cryptobigbang-core';
import { RoleService, UserService } from '@cryptobigbang-services';
import { Avatar, Button, Drawer, Layout, Menu, message, Popconfirm, Space } from 'antd';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import Add from './add';
import Edit, { EditProps } from './edit';
export default function Index() {

  const { translate, onFiltered, query, setQuery, apiCallCount, setApiCallCount } = PageUtilities();
  const [open, setOpen] = useState([false, false]);
  const [user, setUser] = useState<any>();
  const { baseUrl,createPassword ,deleteUser} = UserService();
  const [option, setOptions] = useState<any[]>([]);
  const { getRoles } = RoleService();

  useEffect(() => {
    getRoles().then(r => {
      let option: any[] = [];
      r.forEach((item: any) => {
        option.push({ value: item.id, label: item.name });
      });
      setOptions(option);
    })
  }, [])
  const onClose = () => {
    setOpen([false, false]);
    setApiCallCount(apiCallCount + 1);
  };
  const resetPassword = async (id: string) => {
    try {
      const response = await createPassword(id);
      if (!response.IsBusinessError) {
        message.success(translate("common.processSuccessful"));
      }
    } catch (error) {
      message.success(translate("common.processUnSuccessful"));
    }
    finally {
      setApiCallCount(apiCallCount + 1);
    }
  };
  const deleteUserConfirm = async (id: string) => {
    try {
      const response = await deleteUser(id);
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
  const columns = [
    {
      title: '',
      dataIndex: 'avatarUrl',
      key: 'avatarUrl',
      render: (text: string) => text == null || text == "" ? <Avatar icon={<UserOutlined />} /> : <img src={text} alt="Avatar" style={{ width: '50px' }} />,
    },
    {
      title: "Id",
      dataIndex: 'id',
      key: 'id',
    },
    //   {
    //     title: translate("userPage.identityUserId"),
    //     dataIndex: 'identityUserId',
    //   key: 'identityUserId',
    // },
    {
      title: translate("userPage.firstName"),
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      dataIndex: 'lastName',
      key: 'lastName',
      title: translate("userPage.lastName")
    },
    {
      dataIndex: 'username',
      key: 'username',
      title: translate("userPage.username")
    },
    {
      title: translate("userPage.email"),
      dataIndex: 'email',
      key: 'email',
    },
    {
      dataIndex: 'roleId',
      key: 'roleId',
      title: translate("userPage.role"),
      render: (id: number,record :any) => 
        option.filter(r=>r.value == id).length>0? <>{option.filter(r=>r.value == id)[0].label}</>:<> - </>
           
      
    },
    {
      dataIndex: 'nationalIdentityNumber',
      key: 'nationalIdentityNumber',
      title: translate("userPage.nationalIdentityNumber")
    },
    {
      dataIndex: 'id',
      key: 'id',
      title: "",
      align: "end",
      fixed: 'right',
      width: 50,
      render: (id: string,record :any) =>
        <Space>
           <Button icon={<EditOutlined />} onClick={() => {
            setOpen([false, true]);
            setUser(record);
          }}></Button>
          <Popconfirm
            title={translate("common.sureDo")}
            onConfirm={() => resetPassword(id)}
            okText={translate("common.yes")}
            cancelText={translate("common.no")}
          >
          <Button icon={<RetweetOutlined />}  >{t("userPage.sendNewPassword")}</Button>
          </Popconfirm> 
          {/* <Popconfirm
            title={translate("common.sureDelete")}
            onConfirm={() => deleteUserConfirm(id)}
            okText={translate("common.yes")}
            cancelText={translate("common.no")}
          >
            <Button icon={<DeleteOutlined />}  ></Button>
          </Popconfirm> */}
        </Space>

    }
  ];
  const actionMenu = (
    <Menu >
      <Menu.Item key="add">
        <Button icon={<PlusOutlined style={{ color: '#1890ff' }} />} onClick={() => setOpen([true, false])}>
          {translate("common.add")}
        </Button>
      </Menu.Item>
    </Menu>
  );
  const propTableProps: ProTableProps = {
    apiCallCount: apiCallCount,
    apiUrl: `${baseUrl}`,
    columns: columns,
    queryParams: query,
    actionMenu: {
      actionButtonText: "",
      menu: actionMenu
    },
    headerItems: {
      Items: [
        // <Filter onFiltered={(e) => {
        //     let queryString = onFiltered(e);
        //     setQuery(queryString);
        //     setApiCallCount(apiCallCount + 1); 
        // }} key="filter"></Filter>
      ]
    }
  }
  const editProps : EditProps={
    email : user?.email,
    firstName : user?.firstName,
    id : user?.id,
    lastName : user?.lastName,
    nationalIdentityNumber : user?.nationalIdentityNumber,
    roleId : user?.roleId    
  }
  return (
    <Layout className='antlayout'>
        {open[0] && 
        <Drawer title={translate("common.new")} placement="right" onClose={onClose} open={open[0]}> 
        <Add />
        </Drawer>}
        {open[1] && 
        <Drawer title={translate("common.update")} placement="right" onClose={onClose} open={open[1]}> 
        <Edit {...editProps} />
        </Drawer>}
      <ProTable {...propTableProps} />
    </Layout>)
}
