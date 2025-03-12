import SocialLoginButtons from '~/components/social-login/social-login-buttons';
import LogoutButton from '~/components/logout-button';
import { useSelector, useDispatch  } from 'react-redux';
import { useEffect } from 'react';
import Main from '~/main-page.jsx';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from "~/redux/auth-slice";

function LoginPage() {
  // Redux에서 로그인 상태 가져오기
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch(); // 액션 디스패치 함수
  const navigate = useNavigate();

  // 로그인 상태가 true이면 메인 페이지로 이동
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/main'); // 로그인 성공 시 메인 페이지로
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="w-full h-128 max-w-lg bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-16 mt-4">
          {loginSuccess ? <Main /> : '8＋1 B❗t LOGIN'}
        </h1>
        {loginSuccess ? <LogoutButton /> : <SocialLoginButtons />}
      </div>
    </div>
  );
}

export default LoginPage;
