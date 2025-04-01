import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "~/redux/auth-slice";
import "~/index.css";

const NaverMobileLogin = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const exchangeToken = async () => {
      try {
        const response = await fetch(
          "https://fit-conference.shop/api/v1/auth/token-exchange", // 백엔드의 토큰 교환 API
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
      exchangeToken(); // 로그인 성공 시 토큰 교환
    }
  }, [dispatch]);

  // OAuth 회원가입 버튼 클릭 시 해당 소셜 로그인 URL로 이동
  const onNaverMobileLogin = () => {
    window.location.href = "https://fit-conference.shop/oauth2/authorization/naver";
  };
  
  return (
    <button 
      onClick={onNaverMobileLogin} 
      className="flex items-center justify-center w-full 
        h-[48px] bg-[#03C75A] text-white"
    >
      <img 
          src="./images/NaverLogo.png" 
          alt="Naver" 
          className="w-[16px] h-[16px] mr-[20px]" 
      />
      <span 
          className="text-[16px] font-medium leading-[150%] tracking-[-0.5px]">
          네이버로 시작하기
      </span>
    </button>
  );
};

export default NaverMobileLogin;