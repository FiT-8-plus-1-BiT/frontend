import SocialLoginButtons from "~/components/social-signup/social-signup-buttons.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signupSuccess } from "~/redux/auth-slice";

const SignupPage = () => {
  // Redux에서 로그인 상태 가져오기
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const signupStatus = useSelector((state) => state.auth.signupSuccess); // 회원가입 상태
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 회원가입 성공 시 로그인 페이지로 리디렉션
  useEffect(() => {
    if (signupStatus) {
      navigate("/login");
    }
  }, [signupStatus, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="w-full h-128 max-w-lg bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-16 mt-4">
          {signupStatus ? "회원가입 성공" : "8＋1 B❗t SIGNUP"}
        </h1>
        <SocialLoginButtons />
      </div>
    </div>
  );
};

export default SignupPage;