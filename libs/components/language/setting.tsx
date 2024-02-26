 
import { DownOutlined, SettingTwoTone } from '@ant-design/icons';
import { LanguageManager } from '@cryptobigbang-core';
import { Button, Divider, Dropdown, Menu, Popover, Switch } from 'antd';
import { useState } from 'react';
export interface SettingProps{
  setConfig: (newConfig: any) => void; // setConfig fonksiyonu
}
const LanguageSelector = () => {
  const { getLanguage, changeLanguage } = LanguageManager();
  const [selectedLanguage, setSelectedLanguage] = useState(getLanguage()); // Varsayılan dil

  const languageMenu = (
    <Menu >
      <Menu.Item key="tr">
        <Button onClick={() => handleLanguageChange('tr')} className={`language-button ${selectedLanguage === 'tr' ? 'active' : ''}`}>
          <img src="/img/icons/flags/turkey.png" alt="Türkçe" className="flag-icon" height='20px' />
        </Button>
      </Menu.Item>
      <Menu.Item key="en">
        <Button onClick={() => handleLanguageChange('en')} className={`language-button ${selectedLanguage === 'en' ? 'active' : ''}`}>
          <img src="/img/icons/flags/unitedkingdom.png" alt="English" className="flag-icon" height='20px' />
        </Button>
      </Menu.Item>
    </Menu>
  );

  const handleLanguageChange = (language: string) => {
    changeLanguage(language);
    setSelectedLanguage(language);
  };
  return (
      <Dropdown overlay={languageMenu} trigger={['click']}  >
        <Button  >
          <img src="/img/icons/flags/turkey.png" alt="Türkçe" className="flag-icon" height='10px' />
          <img src="/img/icons/flags/unitedkingdom.png" alt="English" className="flag-icon" height='10px' />
          <DownOutlined />
        </Button>
      </Dropdown> 
  );
}


const Setting = ({ setConfig }:SettingProps) => {
  const {translate} = LanguageManager();
  const [theme, setTheme] = useState('light'); // Tema durumunu tutan state
  const [direction,setDirection] = useState("ltr")


  const toggleTheme = (checked: boolean) => {    
    const newTheme = checked ? 'dark' : 'light';
    setTheme(newTheme);
    const newConfig = {
      type :"Theme",
      theme: newTheme
    };
    setConfig(newConfig); // setConfig fonksiyonunu çağırarak yapılandırmayı güncelle
  };

  const toggleDirection = (checked: boolean) => {    
    const newDirection = checked ? 'ltr' : 'rtl';
    setDirection(newDirection);
    const newConfig = {
      type :"Direction",
      direction: newDirection
    };
    setConfig(newConfig); // setConfig fonksiyonunu çağırarak yapılandırmayı güncelle
  };

  
 
  const padding = direction=="ltr"? {right : "50px"}: {left : "50px"};

  return (
    <div style={{ position: "fixed", bottom: "50px",...padding,zIndex:999999999 }}>
      <Popover 
        content={
          <div style={{alignItems:"center",display:"grid",width:"65px"}}>
            <Divider orientation="left" plain>
              {translate("settingPage.language")}
            </Divider>
              <LanguageSelector />
              <Divider orientation="left" plain>
              {translate("settingPage.theme")}
            </Divider> 
              <Switch checked={theme === 'dark'} onChange={toggleTheme} />
              <Divider orientation="left" plain>
              {translate("settingPage.direction")}
            </Divider> 
              <Switch checked={direction === 'ltr'} onChange={toggleDirection} />          
          </div>
          }
        trigger="click">
        <SettingTwoTone />
      </Popover>
    </div>
  );
};

export default Setting;


