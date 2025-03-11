import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { signupSuccess } from "~/redux/auth-slice";
import { GoogleLogin } from "@react-oauth/google";

const GoogleSignup = () => {
  const dispatch = useDispatch();

  const handleGoogleSignupSuccess = async (response) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/signup/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: response.credential }),
      });

      if (!res.ok) throw new Error('Failed to signup');
      const data = await res.json();
      dispatch(signupSuccess({ user: data.user, token: data.token }));
      console.log('Signup Success:', data);
    } catch (error) {
      console.error('Google Signup Failed:', error);
    }
  };

  useEffect(() => {
    // 구글 로그인 SDK 로드
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleGoogleSignupSuccess,
      });
    };
    document.head.appendChild(script);
  }, []);

  return <GoogleLogin onSuccess={handleGoogleSignupSuccess} 
          onError={(error) => console.log('Google Signup Error:', error)} 
         />;
};

export default GoogleSignup;