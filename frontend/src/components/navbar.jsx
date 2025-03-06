import { Link } from "react-router-dom";

const NavbarItem = ({ to, label }) => {
  return (
    <Link to={to} className="h-11 px-4 flex items-center text-[#797677] text-xl font-medium">
      {label}
    </Link>
  );
};

const Navbar = () => {
  return (
    <nav className="w-full max-w-[1856px] h-[45px] flex justify-between items-center mx-auto">
      {/* 로고 영역 */}
      <div className="w-[184px] h-[45px] px-4 py-2.5 bg-[#d9d9d9] flex justify-center items-center">
        <span className="text-black text-xs font-medium">아직 미정인 로고 자리입니다</span>
      </div>

      {/* 네비게이션 메뉴 */}
      <div className="flex space-x-6 bg-white">
        <NavbarItem to="/location" label="위치안내(더중요한 정보로 바뀔여지)" />
        <NavbarItem to="/schedule" label="연사정보 및 타임테이블" />
        <NavbarItem to="/mypage" label="마이페이지" />
      </div>
    </nav>
  );
};

export default Navbar;
