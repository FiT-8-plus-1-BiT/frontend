import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from '~/pages/login-page.jsx';
import { GoogleOAuthProvider } from "@react-oauth/google";
import Layout from "~/components/layout";
import Streaming from "~/pages/streaming";
import Main from "~/main-page.jsx";
import SessionList from "~/pages/session-list";
import MyPage from "~/pages/mypage";

function App() {
  return (
    <GoogleOAuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/streaming" element={<Streaming />} />
            <Route path="/session" element={<SessionList />} />
          </Route>
          <Route path="/main" element={<Main />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  )
}

export default App;
