import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signupSuccess } from '~/redux/auth-slice';
import '~/index.css';
import { useNavigate } from 'react-router-dom';

const GoogleSignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const exchangeToken = async () => {
      try {
        const response = await fetch(
          'https://fit-conf.shop/api/v1/auth/token-exchange', // 백엔드의 토큰 교환 API
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include', // 쿠키 포함
          },
        );

        if (response.ok) {
          console.log("signup 진행")
          const accessToken = response.headers.get('Authorization');
          if (accessToken) {
            localStorage.setItem('access-token', accessToken);
            dispatch(signupSuccess({token: accessToken,
            }));
            navigate('/login'); // 로그인 페이지로 이동
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
      navigate('/signup');
    } else {
      exchangeToken(); // 회원가입 성공 시 토큰 교환
    }
  }, [navigate, dispatch]);

  // OAuth 회원가입 버튼 클릭 시 해당 소셜 로그인 URL로 이동
  const onGoogleSignup = () => {
    // const redirectUri = "http://localhost:5173/login"; // 회원가입 후 리디렉션할 URI
    // window.location.href = `http://localhost:8080/oauth2/authorization/${provider}?redirect_uri=${encodeURIComponent(redirectUri)}`;
    window.location.href = 'https://fit-conf.shop/oauth2/authorization/google';
  };

  return (
    <button
      onClick={onGoogleSignup}
      className="btn btn-google flex items-center 
      justify-start gap-8 bg-blue-700 text-black py-2 px-6 rounded-full
      hover:bg-blue-600 transition-colors duration-200 
      hover:scale-105 transition-all duration-200 "
    >
      <img src="/images/google-logo.png" alt="구글 로고" className="w-8 h-8" />
      <span className="ml-20">구글로 회원가입</span>
    </button>
  );
};

export default GoogleSignup;
