import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/redux/auth-slice";

const KakaoLogin = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    script.onload = () => {
      if (window.Kakao) {
        window.Kakao.init("YOUR_KAKAO_APP_KEY");
      }
    };
    document.head.appendChild(script);
  }, []);

  const handleKakaoLogin = () => {
    window.Kakao.Auth.login({
      success: async (authObj) => {
        const res = await fetch("YOUR_BACKEND_URL/auth/kakao", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: authObj.access_token }),
        });
        const data = await res.json();
        dispatch(loginSuccess({ user: data.user, token: data.token }));
      },
      fail: (err) => console.error(err),
    });
  };

  return <button onClick={handleKakaoLogin} className="btn-kakao">카카오로 로그인</button>;
};

export default KakaoLogin;