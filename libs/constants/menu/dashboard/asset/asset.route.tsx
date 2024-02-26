
import { BankOutlined,AuditOutlined,BorderlessTableOutlined,ToolOutlined,ApartmentOutlined,ClusterOutlined } from '@ant-design/icons';
import { MenuItem } from '@cryptobigbang-models';

const baseLink = "/dashboard/asset/"
  export const AssetRouteItems: MenuItem[] = [
    {
      key: 'Asset',
      icon: <BankOutlined />,
      label: 'menu.menuAssetList',
      path:`${baseLink}asset/list`,
      uniqueKey:"menuAssetList"
    },
    {
      key: 'AssetNetwork',
      icon: <AuditOutlined />,
      label: 'menu.menuAssetNetworkList',
      path:`${baseLink}assetNetwork/list`,
      uniqueKey:"menuAssetNetworkList"
    },
    {
      key: 'fiatDetail',
      icon: <BorderlessTableOutlined />,
      label: 'menu.menuFiatDetailList',
      path:`${baseLink}fiatDetail/list`,
      uniqueKey:"menuFiatDetailList"
    },
    {
      key: 'Network',
      icon: <ApartmentOutlined />,
      label: 'menu.menuNetworkList',
      path:`${baseLink}network/list`,
      uniqueKey:"menuNetworkList"
    },
    {
      key: 'NetworkType',
      icon: <ClusterOutlined />,
      label: 'menu.menuNetworkTypeList',
      path:`${baseLink}networkType/list`,
      uniqueKey:"menuNetworkTypeList"
    },
    {
      key: 'NetworkTypeDefinition',
      icon: <ToolOutlined />,
      label: 'menu.menuNetworkTypeDefinitionList',
      path:`${baseLink}networkTypeDefinition/list`,
      uniqueKey:"menuNetworkTypeDefinitionList"
    }
  ];