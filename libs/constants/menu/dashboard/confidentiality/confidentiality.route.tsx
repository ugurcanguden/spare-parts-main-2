import { MenuItem } from "@cryptobigbang-models";
import { FolderOpenOutlined, CheckCircleOutlined} from '@ant-design/icons';
import { DatabaseOutlined, FileProtectOutlined } from "@cryptobigbang/libs/components/icon/allIcon";

const baseLink = "/dashboard/confidentiality/"
  export const ConfidentialityRouteItems: MenuItem[] = [
    {
      key: 'ConfidentialityDefinition',
      icon: <FileProtectOutlined />,
      label: 'menu.menuConfidentialityDefinition',
      path:`${baseLink}ConfidentialityDefinition`,
      uniqueKey:"menuConfidentialityDefinition"
    }  
  ];