import { LogoutOutlined } from '@ant-design/icons';
import { PageUtilities } from '@cryptobigbang-core';
import { Avatar, Button, Card, Checkbox, Descriptions, DescriptionsProps, Typography } from 'antd';

const { Title, Text } = Typography;

const ProfileScreen = () => { 
  const { translate,router} = PageUtilities();
 
  const items: DescriptionsProps['items'] = [
    // {
    //   key: '1',
    //   label: translate("dashboard.profile.userName"),
    //   children: <>{user?.profile.preferred_username}</>,
    // },
    // {
    //   key: '2',
    //   label: translate("dashboard.profile.firstName"),
    //   children: <>{user?.profile.given_name}</>,
    // },
    // {
    //   key: '3',
    //   label: translate("dashboard.profile.lastName"),
    //   children: <>{user?.profile.family_name}</>,
    // },
    // {
    //   key: '4',
    //   label: translate("dashboard.profile.email"),
    //   children:<>{user?.profile.email}</>,
    // },
    // {
    //   key: '5',
    //   label: translate("dashboard.profile.emailVerified"),
    //   children: <>{<Checkbox checked={user?.profile.email_verified} disabled={true}></Checkbox>}</>,
    // },
  ];


  return (
    <div className="profile-container">
      <Card className="profile-card">
        {/* <Avatar src={user?.profile.picture} size={64} />
        <Descriptions title="" items={items} layout="horizontal" />
        <Button
          type="primary"
          icon={<LogoutOutlined />}
          onClick={handleLogout}
          className="logout-button"
        >
          {translate("common.logout")}
        </Button> */}

      </Card>
    </div>

  );
};

export default ProfileScreen;
