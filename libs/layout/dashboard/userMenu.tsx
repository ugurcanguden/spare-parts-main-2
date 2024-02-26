import { UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu, MenuProps } from 'antd'; 
type MenuItem = Required<MenuProps>['items'][number];
const ProfileMenu = (menuItem : MenuItem[]) => {  
  
  return (
    <div  style={{ textAlign: 'right' }}>
      <Dropdown overlay={<Menu items={menuItem} ></Menu>} placement="bottomRight" arrow>
        <div className="profile-dropdown">
          <span > 
             {/* {auth.user?.profile.email}  */}
            <Avatar style={{ backgroundColor: '#f56a00' }} icon={<UserOutlined />} > </Avatar>
          </span>
        </div>
      </Dropdown>
    </div>

  );
};

export default ProfileMenu;