import { FilterProps, ProTable, ProTableProps } from '@cryptobigbang-components';
import { PageUtilities } from '@cryptobigbang-core';
import { DurationType, NotificationPriority } from '@cryptobigbang-enums';
import { NotificationDefinitionService } from '@cryptobigbang-services'; 
import { ArrowLeftOutlined, DeleteOutlined, EditOutlined, MessageOutlined, MobileOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Drawer, Input, Layout, Menu, message, Popconfirm, Row, Space } from 'antd';
import { isNullOrEmptyString } from 'guden-core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Add from './add';
import Edit from './edit';

export default function List() {
  const {translate,apiCallCount, setApiCallCount,router,backButton} = PageUtilities();     
  const [open, setOpen] = useState([false, false]);
  const { groupCode } = router.query;
  const [record, setRecord] = useState<any>();
  const {baseUrl,deleteNotificationDefinition} = NotificationDefinitionService();

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
      const response = await deleteNotificationDefinition(id);
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
      title: "Id",
      dataIndex: "id",
      key: "id" 
    },
    {
      title: translate("notificationDefinitionPage.columns.code"),
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
      title: translate("notificationDefinitionPage.columns.description"),
      dataIndex: "description",
      key: "description",
    },
    {
      title: translate("notificationDefinitionPage.columns.durationType"),
      dataIndex: "durationType",
      key: "durationType",
      render: (durationType: DurationType) => {
        let text = "";
        switch (durationType) {
          case DurationType.Day:
            text = translate("common.durationType.day");
            break;
          case DurationType.Hour:
            text = translate("common.durationType.hour");
            break;
          case DurationType.Minute:
            text = translate("common.durationType.minute");
            break;
          case DurationType.Month:
            text = translate("common.durationType.month");
            break;
          case DurationType.Second:
            text = translate("common.durationType.second");
            break;
          case DurationType.Week:
            text = translate("common.durationType.week");
            break;
          case DurationType.Year:
            text = translate("common.durationType.year");
            break;
        }
        return (text)
      }
    },
    {
      title: translate("notificationDefinitionPage.columns.expireDuration"),
      dataIndex: "expireDuration",
      key: "expireDuration",
    },
    {
      title: translate("notificationDefinitionPage.columns.notificationPriority"),
      dataIndex: "notificationPriority",
      key: "notificationPriority",
      render: (notificationPriority: NotificationPriority) => {
        let text = "";
        switch (notificationPriority) {
          case NotificationPriority.High:
            text = translate("notificationDefinitionPage.notificationPriorityHigh");
            break;
          case NotificationPriority.Low:
            text = translate("notificationDefinitionPage.notificationPriorityLow");
            break;
          case NotificationPriority.Medium:
            text = translate("notificationDefinitionPage.notificationPriorityMedium");
            break;
          case NotificationPriority.Urgent:
            text = translate("notificationDefinitionPage.notificationPriorityUrgent");
            break;
        }
        return (text)
      }
    },
    {
      title: translate("notificationDefinitionPage.columns.isPassive"),
      dataIndex: "isPassive",
      key: "isPassive",
      render: (isPassive: boolean) => {
        let text = !isPassive ? translate("common.active") : translate("common.passive");
        return (text)
      }
    },
    {
      dataIndex: 'id',
      key: 'id',
      title: "",
      align: "end",
      fixed: 'right',
      width: 50,
      render: (id: string, record: any) =>
        <>
          <Row>
            <Link href={`/dashboard/notification/emailnotificationtemplate/list?notificationDefinitionId=${id}`}>
              <Button type="default" size="small" style={{ marginLeft: 8 }} icon={<MobileOutlined />} >
                {translate("notificationDefinitionPage.emailNotificationTemplate")}
              </Button>
            </Link>
          </Row>
          <Row>
            <Link href={`/dashboard/notification/smsnotificationtemplate/list?notificationDefinitionId=${id}`}>
              <Button type="default" size="small" style={{ marginLeft: 8 }} icon={<MessageOutlined />} >
                {translate("notificationDefinitionPage.smsnotificationtemplate")}
              </Button>
            </Link>
          </Row>
        </>


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
            setRecord(record);
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
    apiUrl: `${baseUrl}/by-groupcode/${groupCode}`,
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
        <Add groupCode={groupCode ? groupCode.toString() : ""}></Add>
      </Drawer>}
      {open[1] && <Drawer title={translate("common.update")} placement="right" onClose={onClose} open={open[1]}>
        <Edit record={record}></Edit></Drawer>}
      {<ProTable {...propTableProps} />}
    </Layout>
  )
}
