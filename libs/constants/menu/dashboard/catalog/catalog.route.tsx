
import { MenuItem } from '@cryptobigbang-models';
import { FlagOutlined, SlidersOutlined ,CalendarOutlined } from '@ant-design/icons';

const baseLink = "/dashboard/catalog/"
  export const CatalogRouteItems: MenuItem[] = [
    {
      key: 'ParameterGroup',
      icon: <SlidersOutlined  />,
      label: 'menu.menuParameterGroupList',
      path:`${baseLink}parametergroup/list`,
      uniqueKey:"menuParameterGroupList"
    },    
    { 
        key: 'Country',
        icon:<FlagOutlined />,
        label: 'menu.menuCountryList',
        path:`${baseLink}country/list`,
        uniqueKey:"menuCountryList"
    } ,    
    { 
        key: 'Calendar',
        icon:<CalendarOutlined />,
        label: 'menu.menuCalenderList',
        path:`${baseLink}calendar/list`,
        uniqueKey:"menuCalenderList"
    }
  ];