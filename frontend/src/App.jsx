import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from '~/pages/login-page.jsx';
import { GoogleOAuthProvider } from "@react-oauth/google";
import SignUpPage from "~/pages/signup-page.jsx";
import Layout from "~/components/layout";
import Streaming from "~/pages/streaming";

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
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  )
}

export default App;
