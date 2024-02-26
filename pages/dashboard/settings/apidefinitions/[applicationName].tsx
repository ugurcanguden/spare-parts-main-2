import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { ProTable, ProTableProps } from '@cryptobigbang-components';
import { PageUtilities } from '@cryptobigbang-core';
import { ApplicationDefinitionService } from '@cryptobigbang-services';
import { Button, Drawer, Layout, Menu, Modal, Popconfirm, Space } from 'antd';
 
import React, { useState } from 'react'
import Add from './add';

const Index = () => {

    const {translate,apiCallCount, setApiCallCount,router,backButton} = PageUtilities();
    const { baseUrl } = ApplicationDefinitionService();
    const { applicationName } = router.query; 
    const [open, setOpen] = useState([false, false,false]); 
    const { groupcode } = router.query; 
    const [row, setRow] = useState<any>(); 
    const showDrawer = (openStatus: boolean[]) => {
      setOpen(openStatus);
    };
  

  

    const columns = [
      {
        title: translate("apiDefinitionPage.httpRequestMethod"),
        dataIndex: "httpRequestMethod",
        key: "httpRequestMethod",
      },
      {
        title: translate("apiDefinitionPage.apiPathFormat"),
        dataIndex: "apiPathFormat",
        key: "apiPathFormat",
      },
      {
        title: translate("apiDefinitionPage.apiPath"),
        dataIndex: "apiPath",
        key: "apiPath",
      },
      {
        title: translate("apiDefinitionPage.apiPathRegex"),
        dataIndex: "apiPathRegex",
        key: "apiPathRegex",
      }, 
            {
        title: translate("apiDefinitionPage.scopeKey"),
        dataIndex: "scopeKey",
        key: "scopeKey",
      }, 
      {
        dataIndex: 'id',
        key: 'id',
        title: "",
        align: "end",
        fixed: 'right',
        width: 50,
        render: (groupCode: string, record: any) =>
          <Space>
            <Button icon={<EditOutlined />} onClick={() => {
              showDrawer([false, true]);
              setRow(record);
            }}></Button> 
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
      apiUrl: `${baseUrl}/${applicationName}/api-definitions`,
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
      paginationDisabled:true
    } 
    return (
      <Layout className='antlayout'>
        {open[0] && <Drawer title={translate("common.new")} placement="right" onClose={()=>{setOpen([false,false,false]);setApiCallCount(apiCallCount+1);}} open={open[0]}>
          <Add applicationName={applicationName}/>
        </Drawer>
        }  
        {/* {open[1] && <Drawer title={translate("common.update")} placement="right" onClose={onClose} open={open[1]}>
          <Edit groupCode={parameter.groupCode} parameterCode={parameter.parameterCode}></Edit></Drawer>} } */}
        {<ProTable {...propTableProps} />}
      </Layout>
    )
  }
  
export default Index;

