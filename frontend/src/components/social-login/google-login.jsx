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
          "https://fit-conf.shop/api/v1/auth/token-exchange",
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
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

            // 사용자 정보 가져오기
            const userResponse = await axios.get(
              "https://fit-conf.shop/api/v1/users/account",
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              },
            );

            const userData = userResponse.data.response;
            console.log("User Data:", userData);

            // ✅ 프로필 이미지 업데이트 요청
            await axios.put(
              "https://fit-conf.shop/api/v1/users/profile/image",
              {}, // PUT 요청은 보통 데이터를 보내지만, 여기서는 빈 객체
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );

            // 사용자 정보와 토큰을 Redux 상태에 저장
            dispatch(loginSuccess({ user: userData, token: accessToken }));

            navigate("/mypage");
          }
        } else {
          console.error('❌ Token exchange failed');
        }
      } catch (error) {
        console.error('🔥 Token exchange error:', error);
      }
    };

    // URL 쿼리 파라미터에서 error 확인
    const params = new URLSearchParams(window.location.search);
    const error = params.get('error');

    if (error) {
      alert("이메일이 중복되었습니다. 다른 계정으로 회원가입해주세요.");
    } else {
      exchangeToken();
    }
  }, [dispatch, navigate]);

  const onGoogleLogin = () => {
    window.location.href = "https://fit-conf.shop/oauth2/authorization/google";
  };

  return (
    <button
      onClick={onGoogleLogin}
      className="w-full h-[60px] bg-white text-black 
        flex items-center justify-center gap-4 p-2 border border-gray-300"
    >
      <img
        src="/images/google-logo.png"
        alt="구글 로고"
        className="w-[24px] h-[24px] sm:w-[35px] sm:h-[35px]"
      />
      <span className="text-black text-[20px] font-bold whitespace-nowrap">
        구글로 시작하기
      </span>
    </button>
  );
};

export default GoogleLoginComponent;
