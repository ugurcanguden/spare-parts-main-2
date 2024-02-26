import { FilterProps, ProTable, ProTableProps } from '@cryptobigbang-components';
import { ArrowLeftOutlined, DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { PageUtilities } from '@cryptobigbang-core';
import { DocumentDefinitionsService } from '@cryptobigbang-services';
import { Button, Drawer, Input, Layout, Menu, message, Popconfirm, Space } from 'antd';
import { isNullOrEmptyString } from 'guden-core';
import { useState } from 'react';
import Add from './add';
import Edit from './edit';

export default function Index() {
  const {translate,setApiCallCount,apiCallCount,router,backButton} = PageUtilities();  
  const [open, setOpen] = useState([false, false]);   
  const { groupcode } = router.query;
  const [document, setDocument] = useState<any>();
  const {baseUrl,deleteDocument} = DocumentDefinitionsService();  
  //#region  Actions..
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
      const response = await deleteDocument(id);
      if (!response.IsBusinessError) {
        message.success(translate("common.deleteSuccessful"));
        setApiCallCount(apiCallCount + 1);
      }
    }
    finally {

    }
  };
  //#endregion

  const columns = [ 
    {
      title: "Id",
      dataIndex: "id",
      key: "id"
    }, 
    {
      title: translate("documentPage.columns.code"),
      dataIndex: "code",
      key: "code",
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
      onFilter: (value: any, record: any) => record.code.toLowerCase().includes(value.toLowerCase()),
      // Filtre simgesi ekleyin
      filterIcon: (filtered: any) => (
        <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      )
    }, 
    {
      title: translate("documentPage.columns.description"),
      dataIndex: "description",
      key: "description",
    }, 
    {
      title: translate("documentPage.columns.documentContentType"),
      dataIndex: "documentContentType",
      key: "documentContentType",
    }, 
    {
      dataIndex: 'id',
      key: 'id',
      title: "",
      align: "end",
      fixed: 'right',
      width: 50,
      render: (id: string, record: any) =>
        <Space>
          <Button icon={<EditOutlined />} onClick={() => {
            showDrawer([false, true]);
            setDocument(record);
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
    apiUrl: `${baseUrl}/${groupcode}`,
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
      {open[0] && <Drawer title={translate("common.new")} placement="right" onClose={onClose} open={open[0]}>
        <Add groupCode={groupcode ? groupcode.toString() : ""}></Add>
      </Drawer>}
      {open[1] && <Drawer title={translate("common.update")} placement="right" onClose={onClose} open={open[1]}>
        <Edit {...document} groupCode={groupcode}></Edit></Drawer>}
      {<ProTable {...propTableProps} />}
    </Layout>
  )
}
