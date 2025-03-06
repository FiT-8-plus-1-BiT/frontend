import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from '@/pages/login-page.jsx';
import { GoogleOAuthProvider } from "@react-oauth/google";
import Main from "@/main-page.jsx";

function App() {

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  )
}

export default App;
