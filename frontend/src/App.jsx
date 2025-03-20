import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from '~/pages/login-page.jsx';
import { GoogleOAuthProvider } from "@react-oauth/google";
import SignUpPage from "~/pages/signup-page.jsx";
import Layout from "~/components/layout";
import Streaming from "~/pages/streaming";

import Main from "~/main-page.jsx";

import SessionList from "~/pages/session-list";

import MyPage from "~/pages/mypage";

import MobileLoginPage from "~/pages/login-mobilepage.jsx"

function App() {

  return (
    /*
      GoogleOAuthProvider는 Google 로그인 기능을 전역에서 사용할 수 있도록 설정하는 컨텍스트
      이걸 감싸야 GoogleLogin과 useOneTap이 정상적으로 작동함
    */
    <GoogleOAuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/streaming" element={<Streaming />} />
            <Route path="/session" element={<SessionList />} />
          </Route>
          <Route path="/main" element={<Main />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login2" element={<MobileLoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  )
}

export default App;
