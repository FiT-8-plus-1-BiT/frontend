import SocialLoginButtons from "@/components/social-login/social-login-buttons";
import LogoutButton from "@/components/logout-button";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Main from "@/main-page.jsx"
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="w-full h-128 max-w-lg bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-16 mt-4">
          {isAuthenticated ? <Main /> : "8＋1 B❗t LOGIN"}
        </h1>
        {isAuthenticated ? <LogoutButton /> : <SocialLoginButtons />}
      </div>
    </div>
  );
}

export default LoginPage;