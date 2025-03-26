// RedirectIfLoggedIn.js
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const RedirectIfLoggedIn = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (isLoggedIn) {
    return <Navigate to="/main" replace />; // 로그인 상태면 홈으로 리다이렉트
  }

  return children;
};

export { RedirectIfLoggedIn};
