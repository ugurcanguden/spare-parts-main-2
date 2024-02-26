import { SettingOutlined } from '@ant-design/icons';
import { PageUtilities, useProxyManager } from '@cryptobigbang-core';
import { Button, Dropdown, message, Table, TablePaginationConfig } from 'antd';
import { isNullOrEmptyString } from 'guden-core';
import React, { useEffect, useState } from 'react';
export interface ProTableProps {
  apiCallCount: number,
  columns: any
  apiUrl: string,
  actionMenu?: {
    menu: React.JSX.Element,
    actionButtonText: string
  },
  headerItems?: {
    Items: React.JSX.Element[]
  },
  paginationDisabled?: boolean,
  queryParams?: string,
  getData? : (row:any[])=>void,
  id ?:string
}
export interface ColumnProps {
  title: string;
  dataIndex: string;
  key: string;
  filterDropdown?: React.ReactNode;
  onFilter?: (value: string, record: any) => boolean;
  filterIcon?: React.ReactNode;
}

export interface FilterProps {
  setSelectedKeys: (selectedKeys: string[]) => void;
  selectedKeys: string[];
  confirm: () => void;
  clearFilters: () => void;
}

const ProTable = ({ columns, apiUrl, actionMenu, apiCallCount, paginationDisabled, headerItems, queryParams,getData,id}: ProTableProps) => {
  const { colorBgContainer } = PageUtilities();
  const { httpGetAxios } = useProxyManager();
  const defaultSetting = {
    totalitems: 1,
    currentpage: 1,
    nextpage: null,
    previouspage: null,
    totalpages: 1,
    results: [],
    tablePagging: {
      total: 1,
      current: 1,
      pageSize: 25, // Sayfa başına öğe sayısı 
    }
  }


  const [loading, setLoading] = useState(false);

  const [pagination, setPagination] = useState(defaultSetting);


  const fetchDataWithPagging = async (pagination: any) => {
    try {
      setLoading(true);
      let url = `${apiUrl}?limit=${pagination.tablePagging.pageSize}&page=${pagination.tablePagging.current}`;
      if (!isNullOrEmptyString(queryParams))
        url = `${url}&${queryParams}`;
      const response = await httpGetAxios(url);
      setPagination({
        ...pagination,
        results: response.Results
      });
      setPagination({
        ...pagination,
        ...response,
        tablePagging: {
          ...pagination.tablePagging,
          total: response.totalItems
        } });
        if(getData){
          getData(response.Results)
        }
    } catch (error) {
      message.error(JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  };
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await httpGetAxios(`${apiUrl}`);
      setPagination({
        ...pagination,
        results: response
      });
      if(getData){
        getData(response)
      }
    } catch (error) {
      message.error(JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (apiCallCount) {
      if (apiCallCount > 0) {
        setPagination(defaultSetting);
        paginationDisabled ? fetchData() : fetchDataWithPagging(defaultSetting);
      }
      else
        setPagination({
          ...defaultSetting,
          results: []
        })
    }
  }, [apiCallCount])



  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    let paggingItem = {
      ...pagination,
      tablePagging: {
        ...pagination
      }
    };
    setPagination(paggingItem);
    if (paginationDisabled)
      fetchData();
    else
      fetchDataWithPagging(paggingItem);
  };

  const paginationProps: TablePaginationConfig = {
    position: ["bottomCenter"],
    ...pagination.tablePagging
  }

  return (
    <div style={{ background: colorBgContainer }}>
      {
        headerItems &&
        <div style={{ display: 'flex', justifyContent: 'flex-start', margin: 4 }}>
          {
            headerItems.Items.map((item) => item)
          }
        </div>
      }
      {actionMenu &&
        <div style={{ display: 'flex', justifyContent: 'flex-end', margin: 4 }}>
          <Dropdown overlay={actionMenu.menu} placement="bottomRight">
            <Button icon={<SettingOutlined />} type="primary">
              {actionMenu?.actionButtonText}
            </Button>
          </Dropdown>
        </div>}
      <Table
        size='small'
        bordered
        scroll={{ x: true }}
        columns={columns}
        dataSource={pagination?.results}
        loading={loading}
        pagination={paginationDisabled ? false : paginationProps}
        onChange={handleTableChange}
        id={id}
      />
    </div>

  );
};

export default ProTable;
