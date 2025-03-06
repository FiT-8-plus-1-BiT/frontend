import { useEffect } from "react";

const NaverLogin = () => {
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

  return <div id="naver_id_login"></div>;
};

export default NaverLogin;