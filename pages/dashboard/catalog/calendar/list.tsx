import { CountrySearch, ProTable, ProTableProps } from '@cryptobigbang-components';
import { CheckOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined, PlusOutlined, ProfileOutlined } from '@ant-design/icons';
import { PageUtilities } from '@cryptobigbang-core';
import { CalendarService } from '@cryptobigbang-services';
import { Button, Collapse, Drawer, Empty, Layout, Menu, message, Popconfirm, Space } from 'antd';
import { isNullOrEmptyString } from 'guden-core';
import { useState } from 'react';
import Add from './add';
import Edit from './edit';
import WeekDaysEdit from './weekDaysEdit';

export default function List() {
  const [selectedCountries, setSelectedCountries] = useState<any>();
  const [selectedHoliday, setSelectedHoliday] = useState<any>();
  const [showDrawer, setShowDrawer] = useState([false, false,false])
  const [activeKey, setActiveKey] = useState(["1"]);  
  const {baseUrl,deleteCalendar} = CalendarService();
  const {translate,apiCallCount,setApiCallCount,colorBgContainer} = PageUtilities(); 

  const confirm = async (selectedRow: any) => {
    if (isNullOrEmptyString(selectedRow?.stringId))
      return;
    try {
      const response = await deleteCalendar(selectedRow.stringId);
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
      title: translate("calenderPage.countryCode"),
      dataIndex: "countryCode",
      key: "countryCode",
    },
    {
      title: translate("calenderPage.holidayName"),
      dataIndex: "holidayName",
      key: "holidayName",
    },
    {
      title: translate("calenderPage.holidayDate"),
      dataIndex: "holidayDate",
      key: "holidayDate",
    },
    {
      title: translate("calenderPage.isRecurring"),
      dataIndex: "isRecurring",
      key: "isRecurring",
      render: (isRecurring: boolean) => {
        return isRecurring ? <CheckOutlined /> : <CloseCircleOutlined />
      }
    },
    {
      title: translate("calenderPage.isHalfDay"),
      dataIndex: "isHalfDay",
      key: "isHalfDay",
      render: (isHalfDay: boolean) => {
        return isHalfDay ? <CheckOutlined /> : <CloseCircleOutlined />
      }
    },
    {
      dataIndex: 'groupCode',
      key: 'groupCode',
      title: "",
      align: "end",
      fixed: 'right',
      width: 50,
      render: (groupCode: string, record: any) =>
        <Space> 
          <Button icon={<EditOutlined />} onClick={() => {
            record.id = record.id.toString();
            setSelectedHoliday(record);
            setShowDrawer([false, true,false]);
          }}></Button> 
          <Popconfirm
            title={translate("common.sureDelete")}
            onConfirm={() => confirm(record)}
            okText={translate("common.yes")}
            cancelText={translate("common.no")}>
            <Button icon={<DeleteOutlined />}></Button>
          </Popconfirm>
        </Space>

    }
  ];
  const actionMenu = (
    <Menu >
      <Menu.Item key="add">
        <Button icon={<PlusOutlined style={{ color: '#1890ff' }} />} onClick={() => setShowDrawer([true, false,false])}>
          {translate("common.add")}
        </Button> 
      </Menu.Item>
    </Menu>
  );
  const propTableProps: ProTableProps = {
    apiCallCount: apiCallCount,
    apiUrl: `${baseUrl}/by-countrycode/${selectedCountries?.alpha3Code}`,
    columns: columns,
    actionMenu: {
      actionButtonText: "",
      menu: actionMenu
    },
    paginationDisabled: true,
    headerItems : {
      Items : [
        <Button key={"update"} icon={<ProfileOutlined />} onClick={() => { 
          setShowDrawer([false, false,true]);
        }}>{translate("calenderPage.weekDay.update")}</Button>
      ]
    }
  }
  const onClose = () => {
    setShowDrawer([false, false,false]);
    setApiCallCount(apiCallCount + 1);
  }; 
  return (
    <Layout className='antlayout' style={{ background: colorBgContainer}}>
      {showDrawer[0] && <Drawer size='large' title={translate("common.new")} placement="right" onClose={onClose} open={showDrawer[0]}>
        <Add alpha3Code={selectedCountries?.alpha3Code}></Add>
      </Drawer>}
      {showDrawer[1] && selectedHoliday && <Drawer size='large' title={translate("common.new")} placement="right" onClose={onClose} open={showDrawer[1]}>
        <Edit selectedRow={selectedHoliday}></Edit>
      </Drawer>}
      {showDrawer[2] && <Drawer size='default' title={translate("calenderPage.weekDay.weekDays")} placement="right" onClose={()=>setShowDrawer([false, false,false])} open={showDrawer[2]}>
        <WeekDaysEdit alpha3Code={selectedCountries?.alpha3Code}></WeekDaysEdit>
      </Drawer>}
      <Collapse items={[
        {
          key: '1',
          label: translate("countryPage.selectCountry"),
          children: <CountrySearch onSelectedRow={(record: any) => { setSelectedCountries(record); setApiCallCount(apiCallCount + 1); setActiveKey(activeKey.length > 0 ? [] : ["1"]) }}></CountrySearch>
        }
      ]} activeKey={activeKey} onChange={() => setActiveKey(activeKey.length > 0 ? [] : ["1"])}>
      </Collapse> 
      {!isNullOrEmptyString(selectedCountries?.alpha3Code) ?
        <ProTable {...propTableProps}></ProTable> :
        <Empty description={translate("calenderPage.selectCountry")} />
      }
    </Layout>
  )
}
