import { useDispatch } from "react-redux";
import { loginSuccess } from "@/redux/auth-slice";
import { useEffect } from "react";

const GoogleLoginComponent = () => {
  const dispatch = useDispatch();

  const handleGoogleLoginSuccess = async (response) => {
    try {
      const res = await fetch('http://localhost:8080/api/v1/auth/token-exchange', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: response.credential }),
      });
  
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      dispatch(loginSuccess({ user: data.user, token: data.token }));
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
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleGoogleLoginSuccess,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("google-login-button"),
        { theme: "outline", size: "large", shape: "pill" }
      );
    };
    document.head.appendChild(script);
  }, []);

  return <div id="google-login-button" className="flex justify-center"></div>;
};

export default GoogleLoginComponent;