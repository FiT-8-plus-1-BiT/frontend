import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from '~/pages/login-page.jsx';
import { GoogleOAuthProvider } from "@react-oauth/google";
import SignUpPage from "~/pages/signup-page.jsx";
import Layout from "~/components/layout";
import Streaming from "~/pages/streaming";
import Main from "~/main-page.jsx";
import SessionList from "~/pages/session-list";
import MyPage from "~/pages/mypage.jsx";
import { Provider, useSelector } from 'react-redux';
import store from '~/redux/store.js';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// 보호된 라우트 컴포넌트
const ProtectedRoute = ({ children }) => {
  // 로그인 상태
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("마이페이지는 로그인을 해야 접근이 가능합니다!", {
        position: toast.POSITION ? toast.POSITION.TOP_CENTER : "bottom-right",
      });
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
};

function App() {
  return (
    /*
      GoogleOAuthProvider는 Google 로그인 기능을 전역에서 사용할 수 있도록 설정하는 컨텍스트
      이걸 감싸야 GoogleLogin과 useOneTap이 정상적으로 작동함
    */
    <Provider store={store}>
      <GoogleOAuthProvider>
        <Router>
          <ToastContainer position="top-center" />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/streaming" element={<Streaming />} />
              <Route path="/session" element={<SessionList />} />
            </Route>
            <Route path="/main" element={<Main />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route
              path="/mypage"
              element={
                <ProtectedRoute>
                  <MyPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </GoogleOAuthProvider>
    </Provider>
  )
}

export default App;
