import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/redux/auth-slice";

const GoogleLoginComponent = () => {
  const dispatch = useDispatch();

  const handleGoogleLoginSuccess = async (response) => {
    try {
      const token = response.credential;
      const res = await fetch("YOUR_BACKEND_URL/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      dispatch(loginSuccess({ user: data.user, token: data.token }));
    } catch (error) {
      console.error("Google login failed", error);
    }
  };

  return <GoogleLogin onSuccess={handleGoogleLoginSuccess} useOneTap />;
};

export default GoogleLoginComponent;