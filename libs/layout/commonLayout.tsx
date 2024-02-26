 
import { UserOutlined } from '@ant-design/icons';
import { PageUtilities } from '@cryptobigbang-core';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import router from 'next/router';
import React, { useEffect, useState } from 'react';

const { Header, Content, Footer, Sider } = Layout;

const menuItems: MenuProps['items'] =
  [
    {
      key: "/",
      label: "Ürünler",
      onClick: () => { router.push("/") }
    },
    {
      key: "/auth/login",
      onClick: () => { router.push("/auth/login") },
      style: { marginRight: "10%" },
      icon: <UserOutlined />
    }
  ];


type Props = {
  children?: React.ReactNode,
  selectedKey: string
};
const CommonLayout: React.FC<Props> = ({ children, selectedKey }) => {

  const [selectedKeys, setSelectedKeys] = useState(['/']);
  const { colorBgContainer } = PageUtilities();

  useEffect(() => {
    let key = menuItems.find(r => r?.key == selectedKey)?.key;
    if (key != undefined && key?.toString()?.length > 0)
      setSelectedKeys([key.toString()])
  }, [])
  return (
    <Layout>
      <Header className="header" >
        <div className="logo" />
        <Menu mode="horizontal" selectedKeys={selectedKeys} items={menuItems} />
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Layout style={{ padding: '24px 0', background: colorBgContainer }}>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            {children}
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}></Footer>
    </Layout>
  );
};

export default CommonLayout;