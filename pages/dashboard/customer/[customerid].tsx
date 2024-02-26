import { PageUtilities } from '@cryptobigbang-core';
import { CustomerAssets, CustomerDocuments, CustomerProfile, CustomerSummary } from '@cryptobigbang-sections';
import { CustomerService } from '@cryptobigbang-services';
import { Avatar, Col, Descriptions, Divider, Row, Tabs } from 'antd';
import { isNullOrEmptyString } from 'guden-core';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const CustomerDetail = () => {
  const { translate, backButton } = PageUtilities();
  const router = useRouter();
  const { customerid } = router.query;
  const { getCustomer } = CustomerService();
  const [customer, setCustomer] = useState<any>();

  useEffect(() => {
    if (!isNullOrEmptyString(customerid) && customerid)
      getCustomerDetail(customerid.toString());
  }, [customerid])
  const getCustomerDetail = async (customerid: string) => {
    let result = await getCustomer(customerid);
    setCustomer(result);
  }
  // Kullanıcının detaylarını göstermek için userId'yi kullan
  // ... 
  const tabprops: any = [
    {
      label: translate("customerPage.customerDetailPage.tabNameProfile"),
      key: 6,
      children:customer&&<CustomerProfile customer={customer}/>,
    },
    {
      label: translate("customerPage.customerDetailPage.tabNameSummary"),
      key: 1,
      children: <CustomerSummary  customerid={customerid}/>
    },
    {
      label: translate("customerPage.customerDetailPage.tabNameAsset"),
      key: 2,
      children: <CustomerAssets/>,
    }, 
    {
      label: translate("customerPage.customerDetailPage.tabNameCustomerDocuments"),
      key: 5,
      children: <CustomerDocuments identityUserId={customerid}/>,
    }
  ]
  return (
    <>
      {backButton}
      <Row>
        <Col {...{
          xs: 24,
          sm: 24,
          md: 24,
          lg: 4,
          xl: 4,
          xxl: 4
        }}>
          <Avatar
            style={
              {
                backgroundColor: '#ffbf00',
                verticalAlign: 'middle'
              }
            }
            size="large"
            gap={4}>
            {customer?.firstName?.substring(0, 1)?.toUpperCase()}
          </Avatar>
        </Col>
        <Col {...{
          xs: 24,
          sm: 24,
          md: 24,
          lg: 20,
          xl: 20,
          xxl: 20
        }}>
          <Descriptions column={3} items={[{
            key: 'firstName',
            label: translate("customerPage.customerList.firstName"),
            children: <span>{customer?.firstName}</span>,
          },
          {
            key: 'lastName',
            label: translate("customerPage.customerList.lastName"),
            children: <span>{customer?.lastName}</span>,
          },
          {
            key: 'email',
            label: translate("customerPage.customerList.email"),
            children: <span>{customer?.email}</span>,
          },
          ]} />
        </Col>

      </Row>
      <Divider />
      {customerid && customerid.length>0  &&
      <Tabs
        defaultValue={1}
        type="card"
        size={'small'}
        items={tabprops}

      />}
    </>
 
  );
};

export default CustomerDetail;
