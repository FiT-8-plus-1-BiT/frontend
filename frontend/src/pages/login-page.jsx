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
    // <div className="flex justify-center items-center min-h-screen bg-gray-200">
    //   <div className="w-full h-128 max-w-lg bg-white p-8 rounded-2xl shadow-lg">
    //     <h1 className="text-3xl font-bold text-center mb-16 mt-4">
    //       {isAuthenticated ? <Main /> : '8＋1 B❗t LOGIN'}
    //     </h1>
    //     {isAuthenticated ? <LogoutButton /> : <SocialLoginButtons />}
    //   </div>
    // </div>
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
        {/* Email Input */}
        <div className="mb-6">
          <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
          <div className="relative">
            <input
              id="email"
              type="email"
              placeholder="이메일을 @형식으로 입력하세요"
              className="w-full h-12 pl-4 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-lg font-medium text-gray-700">Password</label>
          <div className="relative">
            <input
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              className="w-full h-12 pl-4 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer">
              👁️
            </span>
          </div>
        </div>

        {/* Forgot Password */}
        <div className="text-sm text-gray-600 mb-6">
          <a href="#" className="hover:underline">비밀번호를 잊으셨나요?</a>
        </div>

        {/* Login Button */}
        <button className="w-full h-12 bg-blue-500 text-white text-lg font-semibold rounded-md hover:bg-blue-600">
          로그인하기
        </button>

        {/* Social Login Buttons */}
        <div className="mt-20 flex flex-col gap-4">
          <SocialLoginButtons />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
