import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from '~/pages/login-page.jsx';
import { GoogleOAuthProvider } from "@react-oauth/google";
import Layout from "~/components/layout";
import Streaming from "~/pages/streaming";
import Main from "~/main-page.jsx";
import SessionList from "~/pages/session-list";
import MyPage from "~/pages/mypage";
// import MobileMainPage from "~/pages/main-mobile-page";
import { useMediaQuery } from 'react-responsive';
import MobileMainPage from '~pages/main-mobile-page.jsx';

const MainPageWrapper = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? <MobileMainPage /> : <Main />;
};

function App() {
  return (
    <GoogleOAuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/streaming" element={<Streaming />} />
            <Route path="/session" element={<SessionList />} />
          </Route>
          <Route path="/main" element={<MainPageWrapper />} />
          {/* <Route path="/main2" element={<MobileMainPage />} /> */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  )
}

export default App;
