import { CodeSandboxOutlined,AppstoreOutlined, FileTextOutlined , HomeOutlined, LogoutOutlined, SettingOutlined,NotificationOutlined, UserOutlined,DatabaseOutlined } from '@ant-design/icons';
import { MenuItem } from '@cryptobigbang-models';  
import { AssetRouteItems } from './dashboard/asset/asset.route';
import { CatalogRouteItems } from './dashboard/catalog/catalog.route';
import { DMSRouteItems } from './dashboard/dms/dms.route';
import { NotificationRouteItems } from './dashboard/notification/notification.route';
import { SettingRouteItems } from './dashboard/settings/setting.route';
import { FEERouteItems } from './dashboard/fee/fee.route';
import { ReportingRouteItems } from './dashboard/reporting/reporting.route';
import { BarChartOutlined, MoneyCollectOutlined, SecurityScanOutlined, TeamOutlined } from '@cryptobigbang/libs/components/icon/allIcon';
import { ConfidentialityRouteItems } from './dashboard/confidentiality/confidentiality.route';
export const DashboardRouteItems: MenuItem[] = [
    {
      key: 'Home',
      icon: <HomeOutlined />,
      label: 'menu.menuHome',
      path: '/dashboard', 
      uniqueKey:"menuHome",
      breadcrumb : [{label:"Home"}],
      controlOff:true
    },    
    {
        key: 'Customers',
        icon: <UserOutlined />,
        label: 'menu.menuCustomer',
        path: '/dashboard/customer', // Yolu tanımladık
        uniqueKey:"menuCustomer"      
    },
    {
      key: 'Users',
      icon: <TeamOutlined />,
      label: 'menu.menuUser',
      path: '/dashboard/user/users', // Yolu tanımladık
      uniqueKey:"menuUser"
    },
    {
      key: 'Catalog',
      icon: <AppstoreOutlined />,
      label: 'menu.menuCatalog',
      children: CatalogRouteItems,
      uniqueKey:"menuCatalog"
    },
    {
      key: 'DMS',
      icon: <FileTextOutlined/>,
      label: 'menu.menuDMS',
      children: DMSRouteItems,
      uniqueKey:"menuDMS"
    },
    {
      key: 'Notification',
      icon: <NotificationOutlined />,
      label: 'menu.menuNotification',
      children: NotificationRouteItems,
      uniqueKey:"menuNotification"
    },

    {
      key: 'Asset',
      icon: <CodeSandboxOutlined />,
      label: 'menu.menuAsset',
      children: AssetRouteItems,
      uniqueKey:"menuAsset"
    },
    {
      key: 'Fee',
      icon: <MoneyCollectOutlined />,
      label: 'menu.menuFee',
      children: FEERouteItems,
      uniqueKey:"menuFee"
    },
    {
      key: 'Reporting',
      icon: <BarChartOutlined />,
      label: 'menu.menuReporting',
      children: ReportingRouteItems,
      uniqueKey:"menuReporting"
    },
    {
      key: 'Confidentiality',
      icon: <SecurityScanOutlined />,
      label: 'menu.menuConfidentiality',
      children: ConfidentialityRouteItems,
      uniqueKey:"menuConfidentiality"
    },
    {
      key: 'Settings',
      icon: <SettingOutlined />,
      label: 'menu.menuSettings',
      children: SettingRouteItems,
      uniqueKey:"menuSettings"
    },

    {
      key: 'Logout',
      icon: <LogoutOutlined />,
      label:"menu.menuExist",
      path: '/dashboard/logout', 
      controlOff:true 
    }
  ];

  export const DashboardHeaderRouteItems: MenuItem[] = [
    {
      key: 'UserProfile',
      icon: <UserOutlined />,
      label: 'Profil',
      path: '/dashboard/profile', 
      controlOff:true 
    },  
    {
      key: 'Logout',
      icon: <LogoutOutlined />,
      label:"Çıkış",
      path: '/dashboard/logout' , 
      controlOff:true 
    }
  ];