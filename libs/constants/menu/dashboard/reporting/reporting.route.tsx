import { MenuItem } from "@cryptobigbang-models";
import { FolderOpenOutlined, CheckCircleOutlined} from '@ant-design/icons';
import { DatabaseOutlined,AreaChartOutlined } from "@cryptobigbang/libs/components/icon/allIcon";

const baseLink = "/dashboard/reporting/"
  export const ReportingRouteItems: MenuItem[] = [
    {
      key: 'Reporting',
      icon: <AreaChartOutlined />,
      label: 'menu.menuReportingList',
      path:`${baseLink}reporting/List`,
      uniqueKey:"menuReportingList"
    }  ,
    {
      key: 'ReportingDefinition',
      icon: <DatabaseOutlined />,
      label: 'menu.menuReportingDefinition',
      path:`${baseLink}ReportingDefinition`,
      uniqueKey:"menuReportingDefinition"
    }  
  ];