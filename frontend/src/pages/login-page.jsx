import SocialLoginButtons from '~/components/social-login/social-login-buttons';
// import LogoutButton from '~/components/logout-button';
// import { useSelector, useDispatch  } from 'react-redux';
// import { useEffect } from 'react';
// import Main from '~/main-page.jsx';
// import { useNavigate } from 'react-router-dom';
// import { loginSuccess } from "~/redux/auth-slice";

function LoginPage() {
  // // Redux에서 로그인 상태 가져오기
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // const dispatch = useDispatch(); // 액션 디스패치 함수
  // const navigate = useNavigate();

  // // 로그인 상태가 true이면 메인 페이지로 이동
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate('/main'); // 로그인 성공 시 메인 페이지로
  //   }
  // }, [isAuthenticated, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen relative">
      {/* Logo Placeholder */}
      <div className="w-40 bg-gray-400 text-center py-4 absolute top-0 left-0 z-10">
        <span className="text-black">로고 들어갈 자리</span>
      </div>

      {/* Image Placeholder */}
      <div className="w-1/2 min-h-screen bg-gray-200 flex justify-center items-center">
        <span className="text-black">이미지 들어갈 자리</span>
      </div>

      {/* Right Section (Email and Password Fields) */}
      <div className="w-1/2 pl-6 pr-6">

        {/* Social Login Buttons */}
        <div className="mt-20 flex flex-col gap-4">
          <SocialLoginButtons />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
