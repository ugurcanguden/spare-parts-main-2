

import { BreadCrumb } from '@cryptobigbang-components';
import { DashboardHeaderRouteItems, DashboardRouteItems } from '@cryptobigbang-constants';
import { LanguageManager, PageUtilities } from '@cryptobigbang-core';
import { UserService } from '@cryptobigbang/libs/services';
import { Layout, Menu, MenuProps, Skeleton, Spin } from 'antd';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import ProfileMenu from './userMenu';
type DashBoardProps = {
  children: ReactNode
}
function Dashboard(props: DashBoardProps) {
  const { colorBgContainer, loading, setLoading } = PageUtilities();
  const { getUserDetail } = UserService();
  const { translate } = LanguageManager();
  const [collapsed, setCollapsed] = useState(false);

  const [selectedKeys, setSelectedKeys] = useState<string[]>(["Home"]);
  const [menus, setMenus] = useState<MenuItem[]>();
  useEffect(() => {
    setLoading(true);
      let menus = generateMenuItems(DashboardRouteItems, []);
setMenus(menus);
  }, [])

  const router = useRouter();

  type MenuItem = Required<MenuProps>['items'][number];


  const onClick = (key: string, urlLink?: string) => {
    let tempItems = [];
    tempItems.push(key);
    setSelectedKeys(tempItems)
    router.push(urlLink ?? "");
  }

  const generateMenuItems = (routes: any, backOfficeMenuDtos: any[]) => {
    return routes.map((item: any) => {
      
        if (item.children && item.children.length > 0) {
          const children = generateMenuItems(item.children, backOfficeMenuDtos);
          return {
            ...item,
            label: translate(item.label),
            children
          };
        } else {
          return {
            ...item,
            label: translate(item.label),
            onClick: () => {
              onClick(item.key, item.path);
            },
          };
        }
     
    }).filter(Boolean);  // undefined olanları filtrele
  };
  const control = (uniqueKey: string, backOfficeMenuDtos: any[]) => {
    let controlResult = backOfficeMenuDtos.filter(r => r.uniqueKey?.trim() == uniqueKey?.trim()).length > 0
    return controlResult;
  }

  // Ana menü öğelerini oluştur 
  const headerMenuItems: MenuItem[] = DashboardHeaderRouteItems.map(item => ({
    ...item,
    onClick: () => onClick(item.key, item.path), // onClick fonksiyonunu ekledik
  }));
  const roundedIconStyle = {
    background: colorBgContainer,
    width: '40px', // Genişlik
    height: '40px', // Yükseklik
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '50px'
  };

  const { Header, Content, Sider } = Layout;
  return (


    <Layout>
      <Header style={{ background: colorBgContainer }}>
        <Menu className="left-nav-menu">
          <div style={roundedIconStyle}>
            <img src="/img/bitcoin.png" style={{ flex: 0, width: "100%" }} />
            <h2 style={{marginLeft: '10px'}}> CryptoBigBang
            </h2>
          </div>
        </Menu>
        <Menu className="right-nav-menu">
          {ProfileMenu(headerMenuItems)}
        </Menu>
      </Header>
        <Layout>
          <Sider  
            width={275}
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            style={{ background: colorBgContainer, minHeight: '100vh' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
              items={menus}
            />
          </Sider>
          <Layout style={{ padding: '12px 24px 24px' }}>
            <BreadCrumb />
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: colorBgContainer,
              }}
            >
              {props.children}
            </Content>
          </Layout>
        </Layout>
    </Layout>

  )
}

export default Dashboard;
