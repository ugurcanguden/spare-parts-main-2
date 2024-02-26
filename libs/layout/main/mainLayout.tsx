import React from 'react';
import DashboardLayout from '../dashboard/dashboardLayout';
interface LayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
    // const [imageHeight, setImageHeight] = useState(0);

    // useEffect(() => {
    //   const updateImageHeight = () => {
    //     const windowHeight = window.innerHeight;
    //     setImageHeight(windowHeight); // Ekran yüksekliğinin yüzde 80'i olarak ayarla
    //   };
  
    //   updateImageHeight(); // İlk render'da çalıştır
    //   window.addEventListener('resize', updateImageHeight); // Ekran boyutu değiştiğinde çalıştır
  
    //   return () => {
    //     window.removeEventListener('resize', updateImageHeight); // Bileşen kaldırıldığında dinleyiciyi temizle
    //   };
    // }, []);

    // const { translate } = LanguageManager();
    // const auth = useAuth();
    // const [loading, setLoading] = useState<boolean>(false);
    // setTimeout(() => {
    //     setLoading(false);
    // }, 600);

    // switch (auth.activeNavigator) {
    //     case "signinSilent":
    //         return <div>Signing you in...</div>;
    //     case "signoutRedirect":
    //         return <div>Signing you out...</div>;
    // }

    // if (auth.isLoading) {
    //     return <div>Loading...</div>;
    // } 
    // if (auth.isAuthenticated)
     return (
            <DashboardLayout>
                {children}
            </DashboardLayout>
        );
    

    // return ( 
    //         <Row  style={{ height: '100vh' }}  >
    //             <Col span={18}>
    //                 <img src="/img/loginPage.png" alt="Background" style={{ width: '100%', height: imageHeight }} /> 
    //             </Col>
    //             <Col span={6}>
    //                 <div className={styles.container}>
    //                     <h1>{translate("welcomePage.welcomeMessage")}</h1>
    //                     <p>{translate("welcomePage.SignIn")}</p>
    //                     <Button onClick={() => void auth.signinRedirect()} type="primary" icon={<LoginOutlined />} loading={loading} >{translate("welcomePage.GoToLogin")}</Button>
    //                 </div>
    //             </Col>
    //         </Row> );
};

export default MainLayout;