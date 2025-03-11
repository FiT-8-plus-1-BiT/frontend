import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { signupSuccess } from "~/redux/auth-slice";

const KakaoSignup = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    script.onload = () => {
      window.Kakao.init(import.meta.env.VITE_KAKAO_APP_KEY);
    };
    document.head.appendChild(script);
  }, []);

  const handleKakaoSignup = () => {
    window.Kakao.Auth.login({
      success: async (authObj) => {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/signup/kakao`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: authObj.access_token }),
        });
        const data = await res.json();
        dispatch(signupSuccess({ user: data.user, token: data.token }));
        console.log("Kakao Signup Success:", data);
      },
      fail: (err) => console.error(err),
    });
  };

  return (
    <div className="flex justify-center items-center">
      <button onClick={handleKakaoSignup} className="btn btn-kakao">
        <img src="/images/kakao-logo.png" alt="카카오 로고" className="w-10 h-10" />
        <span>카카오로 회원가입</span>
      </button>
    </div>
  );
};

export default KakaoSignup;