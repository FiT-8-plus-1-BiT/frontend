import { useDispatch } from "react-redux";
import { loginSuccess } from "~/redux/auth-slice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleLoginComponent = () => {
  const dispatch = useDispatch(); // Redux 디스패치 훅
  const navigate = useNavigate(); // React Router 훅 (리디렉션 용)

  const handleGoogleLoginSuccess = async (response) => {
    try {
      // 구글 로그인 후 받은 토큰을 백엔드로 전송
      const res = await fetch("http://localhost:8080/api/v1/auth/google", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: response.credential }),
      });
  
      if (!res.ok) throw new Error('Failed to fetch'); // 응답 실패 시 에러 처리
      const data = await res.json(); // 백엔드에서 받은 데이터

      // Redux 스토어에 사용자 정보와 토큰을 저장
      dispatch(loginSuccess({ user: data.user, token: data.token }));

      // 신규 사용자면 회원가입 페이지로, 기존 사용자면 메인 페이지로 리디렉션
      if (data.isNewUser) {
        navigate('/signup');
      } else {
        navigate('/main');
      }

      console.log('Login Success:', data);
    } catch (error) {
      console.error('Google Login Failed:', error);
    }
  };

  useEffect(() => {
    // 구글 로그인 SDK 로드
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.onload = () => {
      // 구글 로그인 초기화
      window.google.accounts.id.initialize({
        // 환경 변수에서 구글 클라이언트 ID 가져오기
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleGoogleLoginSuccess, // 로그인 성공 후 호출될 함수
      });

      // 로그인 버튼을 렌더링
      window.google.accounts.id.renderButton(
        document.getElementById("google-login-button"),
        {
          theme: "outline", // 버튼 스타일 (outline, light, dark 등)
          size: "large",    // 버튼 크기 (small, medium, large 등)
          shape: "pill",    // 버튼 모양 (rectangular, pill, circle 등)
        }
      );
    };
    document.head.appendChild(script); // 스크립트 태그 문서에 추가
  }, []); // 페이지 로드 시 한 번만 실행

  return <div id="google-login-button" className="flex justify-center"></div>;
};

export default GoogleLoginComponent;