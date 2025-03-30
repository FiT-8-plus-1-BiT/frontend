import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from '~/pages/login-page.jsx';
import { GoogleOAuthProvider } from "@react-oauth/google";
import Layout from "~/components/layout";
import Streaming from "~/pages/streaming";
import Main from "~/main-page.jsx";
import SessionList from "~/pages/session-list";
import MyPage from "~/pages/mypage.jsx";
import { Provider, useSelector } from 'react-redux';
import { store } from '~/redux/store.js';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SpeakerPage from "./pages/speaker";
import MobileLoginPage from '~/pages/login-mobilepage.jsx';
import { useFetchUserProfile } from "./hooks/user/use-fetch-user-profile";
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
  const token = useSelector(state => state.auth.token); // 추가
  useFetchUserProfile(token); // 추가
  return (
    <Provider store={store}>
      <GoogleOAuthProvider>
        <Router>
          <ToastContainer position="top-center" />
          <Routes>
            <Route path="/" element={<Navigate to="/main" replace />} />
            <Route path="/" element={<Layout />}>
              <Route path="/streaming" element={<Streaming />} />
              <Route path="/session" element={<SessionList />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/main" element={<Main />} />
            </Route>
            <Route
              path="/mypage"
              element={
                <ProtectedRoute>
                  <MyPage />
                </ProtectedRoute>
              }
            />

            <Route path="/speaker"
              element={
                <ProtectedRoute>
                  <SpeakerPage />
                </ProtectedRoute>
              }
            />
            


            <Route path="/login2" element={<MobileLoginPage />} />

          </Routes>
        </Router>
      </GoogleOAuthProvider>
    </Provider>
  )
}

export default App;
