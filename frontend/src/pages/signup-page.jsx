import GoogleSignup from "@/components/social-signup/google-signup.jsx";
import KakaoSignup from "@/components/social-signup/kakao-signup.jsx";
import NaverSignup from "@/components/social-signup/naver-signup.jsx";

const SignupPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-8">회원가입</h1>
        <div className="space-y-4">
          <GoogleSignup />
          <KakaoSignup />
          <NaverSignup />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;