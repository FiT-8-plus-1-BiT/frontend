import React from 'react'
import DesktopLoginPage from '~/pages/login-page.jsx';
import MobileLoginPage from '~/pages/login-mobilepage.jsx'

const LoginPage = () => {
    const isMobile = useMediaQuery({ maxWidth: 767 });

    return isMobile ? <MobileLoginPage /> : <DesktopLoginPage />;
}

export default LoginPage;
