import { MenuItem } from "@cryptobigbang-models";
import { FolderOpenOutlined, CheckCircleOutlined} from '@ant-design/icons';
import { CheckOutlined, MoneyCollectOutlined } from "@cryptobigbang/libs/components/icon/allIcon";

const baseLink = "/dashboard/fee/"
  export const FEERouteItems: MenuItem[] = [
    {
      key: 'Fee',
      icon: <MoneyCollectOutlined />,
      label: 'menu.menuFeeList',
      path:`${baseLink}fee/List`,
      uniqueKey:"menuFeeList"
    }, 
    {
      key: 'Approval',
      icon: <CheckOutlined />,
      label: 'menu.menuApproval',
      path:`${baseLink}Approval`,
      uniqueKey:"menuApproval"
    },    
  ];