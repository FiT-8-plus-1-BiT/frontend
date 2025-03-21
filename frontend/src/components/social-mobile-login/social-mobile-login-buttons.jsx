import KakaoMobileLogin from "~/components/social-mobile-login/kakao-mobile-login.jsx";
import NaverMobileLogin from "~/components/social-mobile-login/naver-mobile-login.jsx";
import GoogleMobileLogin from "~/components/social-mobile-login/google-mobile-login.jsx";

const SocialLoginButtons = () => {
  return (
    <>
      <NaverMobileLogin />
      <KakaoMobileLogin />
      <GoogleMobileLogin />
    </>
  );
};

export default SocialLoginButtons;