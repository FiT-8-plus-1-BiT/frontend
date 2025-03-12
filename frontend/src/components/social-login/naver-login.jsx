import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "~/redux/auth-slice";
import "~/index.css";
import { useNavigate } from "react-router-dom";

const NaverLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const exchangeToken = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/v1/auth/token-exchange", // 백엔드의 토큰 교환 API
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", // 쿠키 포함
          }
        );

        if (response.ok) {
          const accessToken = response.headers.get("Authorization");
          if (accessToken) {
            localStorage.setItem("access-token", accessToken);
            dispatch(loginSuccess({ accessToken }));
            navigate("/main"); // 메인 페이지로 이동
          }
        } else {
          console.error("Token exchange failed");
        }
      } catch (error) {
        console.error("Error during token exchange:", error);
      }
    };

    // 에러 발생 시 회원가입 페이지 유지
    const params = new URLSearchParams(window.location.search);
    const error = params.get("error");

    if (error) {
      alert("이메일이 중복되었습니다. 다른 계정으로 회원가입해주세요.");
      navigate("/signup");
    } else {
      exchangeToken(); // 로그인 성공 시 토큰 교환
    }
  }, [navigate, dispatch]);

  // OAuth 회원가입 버튼 클릭 시 해당 소셜 로그인 URL로 이동
  const onNaverLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/naver";
  };
  
  return (
    <button onClick={onNaverLogin} className="btn btn-naver">
      <img
        src="/images/naver-logo.png"
        alt="네이버 로고"
      />
      <span>네이버로 로그인</span>
    </button>
  );
};

export default NaverLogin;