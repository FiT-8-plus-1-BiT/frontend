import KakaoLogin from "@/components/social-login/kakao-login.jsx";
import NaverLogin from "@/components/social-login/naver-login.jsx";
import GoogleLogin from "@/components/social-login/google-login.jsx";

const SocialLoginButtons = () => {
  return (
    <div className="flex flex-col gap-4">
      <KakaoLogin />
      <NaverLogin />
      <GoogleLogin />
    </div>
  );
};

export default SocialLoginButtons;