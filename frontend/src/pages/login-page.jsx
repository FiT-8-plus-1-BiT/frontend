import SocialLoginButtons from "@/components/social-login/social-login-buttons";
import LogoutButton from "@/components/logout-button";
import { useSelector } from "react-redux";

function LoginPage() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">{isAuthenticated ? "로그인 완료" : "로그인"}</h2>
        {isAuthenticated ? <LogoutButton /> : <SocialLoginButtons />}
      </div>
    </div>
  );
}

export default LoginPage;