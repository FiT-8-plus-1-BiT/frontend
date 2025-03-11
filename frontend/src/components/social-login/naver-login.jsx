import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "~/redux/auth-slice";
import "~/index.css";
import { useNavigate } from "react-router-dom";

const NaverLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // React Router 훅 (리디렉션 용)

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://static.nid.naver.com/js/naveridlogin_js_sdk.v2.js";
    script.async = true;
    script.onload = () => {
      new window.naver.LoginWithNaverId({
        clientId: import.meta.env.VITE_NAVER_CLIENT_ID,
        callbackUrl: handleNaverLogin,
        isPopup: false,
      }).init();
    };
    document.head.appendChild(script);
  }, []);

  // const handleNaverLogin = () => {
  //   window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=YOUR_NAVER_CLIENT_ID&redirect_uri=YOUR_CALLBACK_URL`;
  // };

  const handleNaverLogin = async () => {
    try {
      // 네이버 로그인 후 인증 코드 받아오기
      const { code } = window.location;

      if (!code) {
        console.error("No authorization code found.");
        return;
      }

      // 인증 코드로 백엔드에서 토큰 요청
      const res = await fetch("http://localhost:8080/api/v1/auth/naver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json(); // 백엔드에서 받은 데이터

      // Redux 스토어에 사용자 정보와 토큰을 저장
      dispatch(loginSuccess({ user: data.user, token: data.token }));

      // 신규 사용자면 회원가입 페이지로, 기존 사용자면 메인 페이지로 리디렉션
      if (data.isNewUser) {
        navigate("/signup");
      } else {
        navigate("/main");
      }

      console.log("Login Success:", data);
    } catch (error) {
      console.error("Naver Login Failed:", error);
    }
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