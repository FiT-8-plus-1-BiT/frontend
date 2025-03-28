import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "~/redux/auth-slice";
import "~/index.css";

const KakaoMobileLogin = () => {
  const dispatch = useDispatch(); // Redux 디스패치 훅

  useEffect(() => {
    const exchangeToken = async () => {
      try {
        const response = await fetch(
          "http://fit-conf.shop/api/v1/auth/token-exchange", // 백엔드의 토큰 교환 API
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
            // navigate("/main"); // 메인 페이지로 이동
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
      // navigate("/signup");
    } else {
      exchangeToken(); // 회원가입 성공 시 토큰 교환
    }
  }, [dispatch]);

  const onKakaoMobileLogin = () => {
    window.location.href = "http://fit-conf.shop/oauth2/authorization/kakao";
  };

  return (
    <button 
      onClick={onKakaoMobileLogin} 
      className="flex items-center justify-center w-full h-[48px] bg-[#FEE500] text-black"
    >
      <img 
          src="./images/KakaoLogo.png" 
          alt="Kakao" 
          className="w-[16px] h-[16px] mr-[20px]" 
      />
      <span 
        className="text-[16px] font-medium leading-[150%] tracking-[-0.5px]">
          카카오로 시작하기
      </span>
  </button>
  );
};

export default KakaoMobileLogin;