import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "~/redux/auth-slice";
import { useNavigate } from "react-router-dom";

const KakaoLogin = () => {
  const dispatch = useDispatch(); // Redux 디스패치 훅
  const navigate = useNavigate(); // React Router 훅

  useEffect(() => {
     // 카카오 SDK 로드
     const script = document.createElement("script");
     script.src = "https://developers.kakao.com/sdk/js/kakao.js";
     script.async = true;
     script.onload = () => {
       if (window.Kakao) {
         // import.meta.env에서 카카오 앱 키를 가져옴
         window.Kakao.init(import.meta.env.VITE_KAKAO_APP_KEY); // 카카오 앱 키로 초기화
       }
     };
     document.head.appendChild(script); // 스크립트 문서에 추가
   }, []);

   const handleKakaoLogin = () => {
    window.Kakao.Auth.login({
      success: async (authObj) => {
        try {
          // 카카오 로그인 후 받은 토큰을 백엔드로 전송
          const res = await fetch("http://localhost:8080/api/v1/auth/kakao", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: authObj.access_token }),
          });

          if (!res.ok) throw new Error("Failed to fetch");
          const data = await res.json(); // 백엔드에서 받은 데이터

          // Redux 스토어에 사용자 정보와 토큰을 저장
          dispatch(loginSuccess({ user: data.user, token: data.token }));

          // 액세스 토큰 교환
          const exchangeToken = async () => {
            try {
              const response = await fetch(
                "http://localhost:8080/api/v1/auth/token-exchange",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  credentials: "include", // 쿠키를 포함하여 요청
                }
              );

              if (response.ok) {
                const accessToken = response.headers.get("Authorization");
                if (accessToken) {
                  localStorage.setItem("access-token", accessToken); // 토큰을 로컬 스토리지에 저장
                }
              } else {
                console.error("Token exchange failed");
              }
            } catch (error) {
              console.error("Error during token exchange:", error);
            }
          };

          exchangeToken(); // 토큰 교환 함수 호출

          // 로그인 성공 후 리디렉션 (새로운 사용자면 회원가입 페이지로, 기존 사용자면 메인 페이지로)
          if (data.isNewUser) {
            navigate("/signup");
          } else {
            navigate("/main");
          }
        } catch (error) {
          console.error("Kakao Login Failed:", error);
        }
      },
      fail: (err) => console.error("Kakao login failed:", err),
    });
  };

  return (
    <button onClick={handleKakaoLogin} className="btn btn-kakao">
      <img
        src="/images/kakao-logo.png"
        alt="카카오 로고"
      />
      <span>카카오로 로그인</span>
    </button>
  );
};

export default KakaoLogin;