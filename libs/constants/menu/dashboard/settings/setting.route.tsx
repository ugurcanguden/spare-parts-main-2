import { MenuItem } from "@cryptobigbang-models";
import { SwapOutlined   ,RadiusSettingOutlined,CodeSandboxOutlined } from '@ant-design/icons';

const baseLink = "/dashboard/settings/"
  export const SettingRouteItems: MenuItem[] = [
    {
      key: 'Settings',
      icon: <RadiusSettingOutlined/>,
      label: 'menu.menus',
      path: `${baseLink}menu`,
      uniqueKey:"menus"
    },
    {
      key: 'Roles',
      icon: <SwapOutlined />,
      label: 'menu.menuRoles',
      path:`${baseLink}role/list`,
      uniqueKey:"menuRoles" 
    } ,
    {
      key: 'applicationdefinition',
      icon: <CodeSandboxOutlined />,
      label: 'menu.applicationdefinition',
      path:`${baseLink}applicationDefinition/list`,
      uniqueKey:"menuApplicationdefinitionScopeKey" ,
      controlOff:true
    } 
  ];