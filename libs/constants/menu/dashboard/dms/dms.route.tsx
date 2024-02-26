import { MenuItem } from "@cryptobigbang-models";
import { FolderOpenOutlined} from '@ant-design/icons';

const baseLink = "/dashboard/dms/"
  export const DMSRouteItems: MenuItem[] = [
    {
      key: 'DocumentGroup',
      icon: <FolderOpenOutlined />,
      label: 'menu.menuDocumentGroupList',
      path:`${baseLink}documentGroup/list`,
      uniqueKey:"menuDocumentGroupList"
    },    
    // { 
    //     key: 'Country',
    //     icon:<FlagOutlined />,
    //     label: 'menu.menuCountryList',
    //     path:`${baseLink}country/list`
    // } 
    // ,    
    // { 
    //     key: 'Calendar',
    //     icon:<CalendarOutlined />,
    //     label: 'menu.menuCalenderList',
    //     path:`${baseLink}calendar/list`
    // }
  ];