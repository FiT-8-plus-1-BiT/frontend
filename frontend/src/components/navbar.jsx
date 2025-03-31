import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React from 'react';

const NavbarItem = ({ to, label, requiresAuth }) => {
  const navigate = useNavigate();
  // 로그인 상태 가져오기
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative inline-flex items-center 
        font-bold group px-[16px] py-[16px] 
        ${isActive ? 'text-black' : 'text-[#85878D]'} 
        hover:text-black`
      }
      onClick={(e) => {
        if (requiresAuth && !isAuthenticated) {
          e.preventDefault();
          navigate('/login');
        }
      }}
    >
      {label}
      {/* 호버 시 밑줄 역할을 하는 요소 */}
      <span
        className="absolute bottom-0 left-1/2 w-full h-[2px] bg-black 
        transition-transform scale-x-0 duration-300 origin-left 
        group-hover:scale-x-100 transform -translate-x-1/2"
      ></span>
    </NavLink>
  );
};

const Navbar = () => {
  return (
    <nav
      className="static top-0 inset-x-0 max-w-[1920px] w-full h-[89px] 
      flex justify-between items-center px-4 lg:px-[160px] py-[12px] 
      bg-[#FAFAFA]
 z-50  mx-auto"
    >
      {/* 로고 영역 */}
      <div className="w-[132px] h-[33px] flex justify-center items-center">
        <a href="/main" alt="홈으로">
          <img src="/images/8logo.png" alt="Logo" />
        </a>
      </div>

      {/* 네비게이션 메뉴 */}
      <div className="flex flex-nowrap gap-[20px] md:gap-[40px] justify-center">
        <NavbarItem to="/" label="홈 화면" />
        <NavbarItem to="/session" label="강연목록" />
        <NavbarItem to="/mypage" label="마이페이지" requiresAuth={true} />
      </div>
    </nav>
  );
};

export default Navbar;
