import { UserOutlined,SearchOutlined} from '@ant-design/icons';
import { ProTable, ProTableProps } from '@cryptobigbang-components';
import { PageUtilities } from '@cryptobigbang-core';
import { CustomerService } from '@cryptobigbang-services';
import { Avatar, Button, Space} from 'antd';
import { ConvertDateToString, DateFormat } from 'guden-core';
import Link from 'next/link';
import Filter from './filter';
export default function Index() {
 
  const {translate, onFiltered, query, setQuery,apiCallCount, setApiCallCount} = PageUtilities(); 
  const {baseUrl} = CustomerService();
  const columns = [
    
    {
      title: '',
      dataIndex: 'AvatarUrl',
      key: 'AvatarUrl',
      render: (text:string) => text==null|| text ==""?<Avatar icon={<UserOutlined />} />:<img src={text} alt="Avatar" style={{ width: '50px' }} />,
    }, 
    {
      title: translate("customerPage.customerList.firstName"),
      dataIndex: 'firstName',
      key: 'firstName',
    },     
    {
      title: translate("customerPage.customerList.lastName"),
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: translate("customerPage.customerList.middleName"),
      dataIndex: 'middleName',
      key: 'middleName',
    },   
    {
      title: translate("customerPage.customerList.email"),
      dataIndex: 'email',
      key: 'email',
    },
    {
      dataIndex: 'nationalIdentityNumber',
      key: 'nationalIdentityNumber',
      title: translate("customerPage.customerList.nationalIdentityNumber") 
    },
    {
      dataIndex: 'birthDate',
      key: 'birthDate',
      title: translate("customerPage.customerList.birthDate") ,
      render: (birthDate:Date) => <>{ConvertDateToString(new Date(birthDate),DateFormat.DDMMYYYYS)}</>      
      
    },
    {
      dataIndex: 'identityUserId',
      key: 'identityUserId',
      title: "",
      align: "end",
      fixed: 'right',
      width: 50,
      render: (identityUserId: string,record:any) =>
        <Space>
          <Link href={`/dashboard/customer/${identityUserId}`}>
            <Button type="default" size="small" style={{ marginLeft: 8 }} icon={<SearchOutlined />} />
          </Link> 
        </Space>

    }
  ];
  const propTableProps: ProTableProps = {
    apiCallCount: apiCallCount,
    apiUrl: `${baseUrl}/list`,
    columns: columns ,
    queryParams: query,
    headerItems: {
        Items: [
            <Filter onFiltered={(e) => {
                let queryString = onFiltered(e);
                setQuery(queryString);
                setApiCallCount(apiCallCount + 1); 
            }} key="filter"></Filter>
        ]
    }
  }
  return (<ProTable {...propTableProps}></ProTable>)
}
