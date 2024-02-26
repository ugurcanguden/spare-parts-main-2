import { MenuItem } from "@cryptobigbang-models";
import {UserOutlined } from '@ant-design/icons';

const baseLink = "/dashboard/users"
  export const UserRouteItems: MenuItem[] = [ 
    {
      key: 'User',
      icon: <UserOutlined />,
      label: 'menu.menuUser',
      path:`${baseLink}`,
      uniqueKey:"menuUser"
    }
  ];