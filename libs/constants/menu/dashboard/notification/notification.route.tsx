import { MenuItem } from "@cryptobigbang-models";
import { ExclamationCircleOutlined   ,BellOutlined,CheckCircleOutlined } from '@ant-design/icons';

const baseLink = "/dashboard/notification/"
  export const NotificationRouteItems: MenuItem[] = [
    {
      key: 'Notification',
      icon: <BellOutlined  />,
      label: 'menu.menuNotificationGroupList',
      path:`${baseLink}notificationgroupdefinition/list`,
      uniqueKey:"menuNotificationGroupList"
    },
    {
      key: 'WhiteList',
      icon: <ExclamationCircleOutlined    />,
      label: 'menu.menuWhiteList',
      path:`${baseLink}whitelist/email/list`,
      uniqueKey:"menuWhiteList"
    },
    {
      key: 'NotificationStatus',
      icon: <CheckCircleOutlined />,
      label: 'menu.menuNotificationStatus',
      path:`${baseLink}report/usermailnotifications`,
      uniqueKey:"menuNotificationStatus"
    }
  ];