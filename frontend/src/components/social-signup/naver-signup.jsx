import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { signupSuccess } from "@/redux/auth-slice";

const NaverSignup = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://static.nid.naver.com/js/naveridlogin_js_sdk.v2.js";
    script.async = true;
    script.onload = () => {
      new window.naver.LoginWithNaverId({
        clientId: "YOUR_NAVER_CLIENT_ID",
        callbackUrl: "YOUR_CALLBACK_URL",
        isPopup: false,
      }).init();
    };
    document.head.appendChild(script);
  }, []);

  const handleNaverSignup = () => {
    window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=YOUR_NAVER_CLIENT_ID&redirect_uri=YOUR_CALLBACK_URL`;
  };

  return (
    <div className="flex justify-center items-center">
      <button onClick={handleNaverSignup} className="btn btn-naver">
        <img src="/images/naver-logo.png" alt="네이버 로고" className="w-10 h-10" />
        <span>네이버로 회원가입</span>
      </button>
    </div>
  );
};

export default NaverSignup;