import { FilterProps, ProTable, ProTableProps } from '@cryptobigbang-components';
import { SearchOutlined, ZoomInOutlined } from '@ant-design/icons';
import { PageUtilities } from '@cryptobigbang-core';
import { CountryService } from '@cryptobigbang-services';
import { Button, Drawer, Input, Layout, Space } from 'antd';
import { useState } from 'react';
import CountryDetail from './countryDetail';

export default function List() {
  const {baseUrl} = CountryService();
  const {translate} = PageUtilities(); 
  const [detailProps, setDetailProps] = useState<any>({ isOpen: false, data: null });


  const columns = [
    {
      title: translate("countryPage.columns.alpha3Code"),
      dataIndex: "alpha3Code",
      key: "alpha3Code",
    }, 
    {
      title: translate("countryPage.columns.commonName"),
      dataIndex: "commonName",
      key: "commonName",      // Filtre özelliğini ekleyin
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: FilterProps) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder={translate("common.search")}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            {translate("common.search")}
          </Button>
        </div>
      ),
      // Filtreleme işlevini tanımlayın
      onFilter: (value: any, record: any) => record.commonName.toLowerCase().includes(value.toLowerCase()),
      // Filtre simgesi ekleyin
      filterIcon: (filtered: any) => (
        <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      )
    },
    {
      title: translate("countryPage.columns.officialName"),
      dataIndex: "officialName",
      key: "officialName",
    },
    {
      title: translate("countryPage.columns.nativeName"),
      dataIndex: "nativeName",
      key: "nativeName",      // Filtre özelliğini ekleyin
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: FilterProps) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder={translate("common.search")}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            {translate("common.search")}
          </Button>
        </div>
      ),
      // Filtreleme işlevini tanımlayın
      onFilter: (value: any, record: any) => record.nativeName.toLowerCase().includes(value.toLowerCase()),
      // Filtre simgesi ekleyin
      filterIcon: (filtered: any) => (
        <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      )
    },
    {
      title: translate("countryPage.columns.region"),
      dataIndex: "region",
      key: "region",
    },
    {
      title: translate("countryPage.columns.subRegion"),
      dataIndex: "subRegion",
      key: "subRegion",
    },
    {
      dataIndex: 'commonName',
      key: 'commonName',
      title: "",
      align: "end",
      fixed: 'right',
      width: 50,
      render: (commonName: string, record: any) =>
        <Space>
          <Button icon={<ZoomInOutlined />} onClick={() => {
            setDetailProps({
              isOpen: true,
              data: {
                ...record
              }
            });}}>

          </Button>
        </Space>

    }
  ];
  const propTableProps: ProTableProps = {
    apiCallCount: 1,
    apiUrl:baseUrl,
    columns: columns,
    paginationDisabled: true
  }


  return (
    <Layout className='antlayout'>
      {
        <Drawer
          title={translate("common.detail")}
          placement="right"
          open={detailProps?.isOpen}
          onClose={() => setDetailProps({ ...detailProps, isOpen: false })}
          size="large">
          <CountryDetail commonName={detailProps?.data?.commonName}></CountryDetail>
        </Drawer>
      }
      <ProTable {...propTableProps} />
    </Layout>
  )
}
