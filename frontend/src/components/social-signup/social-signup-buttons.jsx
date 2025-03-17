import KakaoSignup from "~/components/social-signup/kakao-signup.jsx";
import NaverSignup from "~/components/social-signup/naver-signup.jsx";
import GoogleSignup from "~/components/social-signup/google-signup.jsx";

const SocialLoginButtons = () => {
  return (
    <div className="flex flex-col gap-4">
      <KakaoSignup />
      <NaverSignup />
      <GoogleSignup />
    </div>
  );
};

export default SocialLoginButtons;