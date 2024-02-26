import { CheckCircleOutlined, CheckOutlined, CloseCircleOutlined, DeleteOutlined, HomeOutlined, MobileOutlined, QuestionCircleOutlined, UserOutlined } from '@ant-design/icons';
import { ProTable, ProTableProps } from '@cryptobigbang-components';
import { PageUtilities } from '@cryptobigbang-core';
import { CustomerService } from '@cryptobigbang-services';
import { Popover } from 'antd';

export default function CustomerPhones(props:any) {
  const {identityUserId}= props;
  const { translate, apiCallCount, router } = PageUtilities();
  const { baseUrl } = CustomerService();
  const columns = [
    {
      title: translate("customerPage.customerPhoneList.countryCode"),
      dataIndex: "countryCode",
      key: "countryCode",
    },
    {
      title: translate("customerPage.customerPhoneList.number"),
      dataIndex: "number",
      key: "number",
    },
    {
      title: translate("customerPage.customerPhoneList.isDefaultNumber"),
      dataIndex: "isDefaultNumber",
      key: "isDefaultNumber",
      render: (isDefaultNumber: boolean) => { return isDefaultNumber ? <CheckOutlined /> : <CloseCircleOutlined /> }
    },
    {
      title: translate("customerPage.customerPhoneList.status"),
      dataIndex: "status",
      key: "status",
      render: (status: number) => {
        if (status == 1)
          return <Popover title={translate("common.customerTelephoneStatus.unVerified")}><QuestionCircleOutlined /></Popover>
        if (status == 2)
          return <Popover title={translate("common.customerTelephoneStatus.deleted")}><DeleteOutlined /></Popover>
        if (status == 2)
          return <Popover title={translate("common.customerTelephoneStatus.verified")}><CheckCircleOutlined /></Popover>
      }
    },
    {
      title: translate("customerPage.customerPhoneList.type"),
      dataIndex: "type",
      key: "type",
      render: (type: number) => {
        if (type == 1)
          return <Popover title={translate("customerPage.customerPhoneList.customerTelephoneTypeMobile")}><MobileOutlined /></Popover>
        if (type == 2)
          return <Popover title={translate("customerPage.customerPhoneList.customerTelephoneTypeHome")}><HomeOutlined /></Popover>
        if (type == 2)
          return <Popover title={translate("customerPage.customerPhoneList.customerTelephoneTypeWork")}><UserOutlined /></Popover>
      }
    },
  ];
  const propTableProps: ProTableProps = {
    apiCallCount: apiCallCount,
    apiUrl: `${baseUrl}/telephones/${identityUserId}`,
    columns: columns,
    paginationDisabled: true  
  }
   return ( <ProTable {...propTableProps} /> )
}
