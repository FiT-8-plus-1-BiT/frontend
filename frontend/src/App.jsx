import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from '@/pages/login-page.jsx';
import { GoogleOAuthProvider } from "@react-oauth/google";
import Main from "@/main-page.jsx";
import GoogleLoginComponent from "./components/social-login/google-login";

function App() {

  return (
    /*
      GoogleOAuthProvider는 Google 로그인 기능을 전역에서 사용할 수 있도록 설정하는 컨텍스트
      이걸 감싸야 GoogleLogin과 useOneTap이 정상적으로 작동함
    */
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
      <GoogleLoginComponent />
    </GoogleOAuthProvider>
  )
}

export default App;
