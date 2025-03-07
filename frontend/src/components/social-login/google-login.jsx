import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/redux/auth-slice";
import { useEffect } from "react";

const GoogleLoginComponent = () => {
  const dispatch = useDispatch();

  const handleGoogleLoginSuccess = async (response) => {
    try {
      const res = await fetch('YOUR_BACKEND_API_URL', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: response.credential }),
      });
  
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      dispatch(loginSuccess({ user: data.user, token: data.token }));
      console.log('Login Success:', data);
    } catch (error) {
      console.error('Google Login Failed:', error);
    }
  };

  useEffect(() => {
    // 구글 로그인 SDK를 로드합니다.
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: "YOUR_GOOGLE_CLIENT_ID",
        callback: handleGoogleLoginSuccess,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("google-login-button"),
        {
          theme: "outline", // 버튼 스타일 (light, dark, outline)
          size: "large",    // 버튼 크기 (small, medium, large)
          shape: "pill",    // 버튼 모양 (rectangular, pill, circle, square)
        }
      );
    };
    document.head.appendChild(script);
  }, []);

  return (
    <div className="w-full max-w-[500px] h-30 flex items-center justify-center">
      <div id="google-login-button" className="w-full max-h-[500px]"></div>
    </div>
  );
};

export default GoogleLoginComponent;