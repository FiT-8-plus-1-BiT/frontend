import { useDispatch } from 'react-redux';
import { loginSuccess } from '~/redux/auth-slice';
import { useEffect } from 'react';
import '~/index.css';
// import { useNavigate } from "react-router-dom";
import axios from 'axios';

const GoogleLoginComponent = () => {
  const dispatch = useDispatch(); // Redux 디스패치 훅
  // const navigate = useNavigate(); // React Router 훅 (리디렉션 용)

  useEffect(() => {
    const exchangeToken = async () => {
      try {
        const response = await fetch(
          'http://fit-conf.shop//api/v1/auth/token-exchange', // 백엔드의 토큰 교환 API
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include', // 쿠키 포함
          },
        );

        console.log('Response Status:', response.status); // 상태 코드 출력
        console.log('Response Headers:', response.headers); // 응답 헤더 출력

        if (response.ok) {
          const accessToken = response.headers.get('Authorization');
          if (accessToken) {
            localStorage.setItem('access-token', accessToken);
            // 액세스 토큰을 Redux 상태에 저장
            dispatch(loginSuccess({ token: accessToken }));

            // 사용자 정보 가져오기
            const userResponse = await axios.get(
              'http://fit-conf.shop/api/v1/users/account', // 계정 정보 조회 API
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`, // 액세스 토큰을 헤더에 포함
                },
              },
            );

            // 사용자 정보와 토큰을 Redux 상태에 저장
            dispatch(
              loginSuccess({
                user: userResponse.data, // 사용자 정보 저장
                token: accessToken, // 액세스 토큰 저장
              }),
            );

            // navigate("/main"); // 메인 페이지로 이동
          }
        } else {
          console.error('Token exchange failed');
        }
      } catch (error) {
        console.error('Error during token exchange:', error);
      }
    };

    // 에러 발생 시 회원가입 페이지 유지
    const params = new URLSearchParams(window.location.search);
    const error = params.get('error');

    if (error) {
      alert('이메일이 중복되었습니다. 다른 계정으로 회원가입해주세요.');
      // navigate("/signup");
    } else {
      exchangeToken(); // 로그인 성공 시 토큰 교환
    }
  }, [dispatch]);

  // OAuth 회원가입 버튼 클릭 시 해당 소셜 로그인 URL로 이동
  const onGoogleLogin = () => {
    window.location.href = 'http://fit-conf.shop/oauth2/authorization/google';
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
