
import { Setting, SettingProps } from '@cryptobigbang-components';
import { MainLayout } from '@cryptobigbang-layout';
import { ConfigProvider, theme } from 'antd';
import { DirectionType } from 'antd/es/config-provider';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import '../libs/core/language/i18n'; // i18n dosyasını içe aktar
import '../libs/styles/globals.css';
let authority = process.env.NEXT_PUBLIC_OIDC_AUTHORITY ?? "";
let client_id = process.env.NEXT_PUBLIC_OIDC_CLIENT_ID ?? "";
let redirect_uri = process.env.NEXT_PUBLIC_OIDC_REDIRECT_URI ?? ""; 
const oidcConfig = {
  authority: authority.toString(),
  client_id: client_id.toString(),
  redirect_uri: redirect_uri.toString()
};
const App = ({ Component, pageProps }: AppProps) => {
  const [direction, setDirection] = useState<DirectionType>("ltr")
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const setConfig = (config: any) => {
    switch (config.type) {
      case "Direction":
        setDirection(config.direction)
        break;
      case "Theme":
        setIsDarkMode(config.theme == 'dark')
        break;

      default:
        break;
    }
  }
  const settingProps: SettingProps = {
    setConfig
  }
  return (
      <ConfigProvider direction={direction}
        theme={{ algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm }}>
        <Setting {...settingProps} />
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ConfigProvider>
  )
}
export default App;


