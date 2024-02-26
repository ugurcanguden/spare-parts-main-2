import { FilterProps, ProTable, ProTableProps } from '@cryptobigbang-components';
import { LanguageManager, PageUtilities } from '@cryptobigbang-core';
import { ArrowLeftOutlined, DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { ParameterService } from '@cryptobigbang-services';
import { Button, Drawer, Input, Layout, Menu, message, Popconfirm, Space } from 'antd';
import { isNullOrEmptyString } from 'guden-core';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Add from './add';
import Edit from './edit';

export default function Index() { 
  const {translate,apiCallCount, setApiCallCount,router,backButton} = PageUtilities(); 
  const [open, setOpen] = useState([false, false]); 
  const { groupcode } = router.query; 
  const [parameter, setParameter] = useState<any>();
  const {baseUrl,deleteParameter} = ParameterService(); 
  const showDrawer = (openStatus: boolean[]) => {
    setOpen(openStatus);
  };

  const onClose = () => {
    setOpen([false, false]);
    setApiCallCount(apiCallCount + 1);
  };

  const confirm = async (groupCode: string, parameterCode: string) => {
    if (isNullOrEmptyString(parameterCode) || isNullOrEmptyString(groupCode))
      return;
    try {
      const response = await deleteParameter(groupCode,parameterCode);
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
      title: translate("parameterPage.columns.groupCode"),
      dataIndex: "groupCode",
      key: "groupCode",
    },
    {
      title: translate("parameterPage.columns.parameterCode"),
      dataIndex: "parameterCode",
      key: "parameterCode",
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
      onFilter: (value: any, record: any) => record.parameterCode.toLowerCase().includes(value.toLowerCase()),
      // Filtre simgesi ekleyin
      filterIcon: (filtered: any) => (
        <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      )
    },
    {
      title: translate("parameterPage.columns.value"),
      dataIndex: "value",
      key: "value",
    },
    {
      title: translate("parameterPage.columns.order"),
      dataIndex: "order",
      key: "order",
    },
    {
      title: translate("parameterPage.columns.description"),
      dataIndex: "description",
      key: "description",
    },
    {
      title: translate("parameterPage.columns.valueType"),
      dataIndex: "valueType",
      key: "valueType",
      render: (valueType: number) => {
        let text = "";
        switch (valueType) {
          case 0: text = 'text';
            break;
          case 1: text = 'number';
            break;
          case 2: text = 'date';
            break;
          case 3: text = 'number';
            break;
          case 4: text = 'checkbox';
            break;
          default:
            break;
        }
        return (text)
      }
    },
    {
      dataIndex: 'parameterCode',
      key: 'parameterCode',
      title: "",
      align: "end",
      fixed: 'right',
      width: 50,
      render: (groupCode: string, record: any) =>
        <Space>
          <Button icon={<EditOutlined />} onClick={() => {
            showDrawer([false, true]);
            setParameter(record);
          }}></Button>
          <Popconfirm
            title={translate("common.sureDelete")}
            onConfirm={() => { confirm(record.groupCode, record.parameterCode) }}
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
    }
  } 
  return (
    <Layout className='antlayout'>
      {open[0] && <Drawer title={translate("common.new")} placement="right" onClose={onClose} open={open[0]}>
        <Add groupCode={groupcode ? groupcode.toString() : ""}></Add>
      </Drawer>}
      {open[1] && <Drawer title={translate("common.update")} placement="right" onClose={onClose} open={open[1]}>
        <Edit groupCode={parameter.groupCode} parameterCode={parameter.parameterCode}></Edit></Drawer>}
      {<ProTable {...propTableProps} />}
    </Layout>
  )
}
