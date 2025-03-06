import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/redux/auth-slice";
import "@/index.css";

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

  // useOneTap은 Google One Tap 로그인 기능을 활성화하여
  // 사용자가 한 번의 클릭만으로 로그인할 수 있도록 도와주는 훅
  return (
    <button
      onClick={handleGoogleLoginSuccess}
      className="btn btn-google mb-6"
    >
      <img
        src="/images/google-logo.png"
        alt="구글 로고"
        className="w-10 h-10"
      />
      <span className="ml-2">구글로 로그인</span>
    </button>
  );
};

export default GoogleLoginComponent;