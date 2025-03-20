import { useDispatch } from "react-redux";
import { loginSuccess } from "~/redux/auth-slice";
import { useEffect } from "react";
import "~/index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GoogleLoginComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const exchangeToken = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/v1/auth/token-exchange",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (response.ok) {
          let accessToken = response.headers.get("Authorization");

          if (accessToken) {
            // 만약 accessToken에 "Bearer "가 이미 포함되어 있다면 제거
            if (accessToken.startsWith("Bearer ")) {
              accessToken = accessToken.substring(7);
            }
            localStorage.setItem("access-token", accessToken);

            // 우선 토큰만 저장 (필요에 따라 상태 업데이트)
            // dispatch(loginSuccess({ token: accessToken }));

            // 사용자 정보 가져오기
            const userResponse = await axios.get(
              "http://localhost:8080/api/v1/users/account",
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );

            const userData = userResponse.data.response;
            console.log("User Data:", userData);

            // 사용자 정보와 토큰을 Redux 상태에 저장
            dispatch(loginSuccess({ user: userData, token: accessToken }));
            // 인증 상태를 true로 설정
            // dispatch(setIsAuthenticated(true));
            // 마이페이지로 이동
            navigate("/mypage");
          }
        } else {
          console.error("Token exchange failed");
        }
      } catch (error) {
        console.error("Error during token exchange:", error);
      }
    };

    // URL 쿼리 파라미터에서 error 확인
    const params = new URLSearchParams(window.location.search);
    const error = params.get("error");

    if (error) {
      alert("이메일이 중복되었습니다. 다른 계정으로 회원가입해주세요.");
    } else {
      exchangeToken();
    }
  }, [dispatch, navigate]);

  const onGoogleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  return (
    <button
      onClick={onGoogleLogin}
      className="btn btn-google bg-blue-400 text-black rounded-full hover:bg-blue-500 transition-colors duration-200 hover:scale-105 transition-all duration-200"
    >
      <img
        src="/images/google-logo.png"
        alt="구글 로고"
        className="w-8 h-8 absolute left-5"
      />
      <span className="flex-1 text-center text-black">구글로 로그인</span>
    </button>
  );
};

export default GoogleLoginComponent;