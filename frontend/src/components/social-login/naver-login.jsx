import { useEffect } from "react";
import { useDispatch } from "react-redux";

const NaverLogin = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://static.nid.naver.com/js/naveridlogin_js_sdk.v2.js";
    script.async = true;
    script.onload = () => {
      new window.naver.LoginWithNaverId({
        clientId: import.meta.env.VITE_NAVER_CLIENT_ID,
        callbackUrl: import.meta.env.VITE_NAVER_CALLBACK_URL,
        isPopup: false,
      }).init();
    };
    document.head.appendChild(script);
  }, []);

  const handleNaverLogin = () => {
    window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${import.meta.env.VITE_NAVER_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_NAVER_CALLBACK_URL}`;
  };
  
  return (
    <button onClick={handleNaverLogin} className="btn btn-naver">
      <img
        src="/images/naver-logo.png"
        alt="네이버 로고"
      />
      <span>네이버로 로그인</span>
    </button>
  );
};

export default NaverLogin;