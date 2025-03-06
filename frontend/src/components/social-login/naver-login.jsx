import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/redux/auth-slice";
import "@/index.css";

const NaverLogin = () => {
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

  const handleNaverLogin = () => {
    window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=YOUR_NAVER_CLIENT_ID&redirect_uri=YOUR_CALLBACK_URL`;
  };
  
  return (
    <button onClick={handleNaverLogin} className="btn btn-naver">
      <img
        src="/images/naver-logo.png"
        alt="네이버 로고"
        className="w-10 h-10"
      />
      <span className="ml-2">네이버로 로그인</span>
    </button>
  );
};

export default NaverLogin;