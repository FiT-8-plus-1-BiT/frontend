import React,{ useEffect } from 'react'
import Navbar from "~/components/navbar.jsx"

import { useSelector, useDispatch } from "react-redux";
import { logout } from "~/redux/auth-slice.js";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const mypage = () => {
  // 사용자 정보
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 사용자 프로필 정보를 가져오는 함수
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/users/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`, // 액세스 토큰을 헤더에 포함
        },
      });
      dispatch(loginSuccess({
        user: response.data, // 사용자 프로필 정보 저장
      }));
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  };

  // 마이페이지 로드 시 사용자 프로필 정보 가져오기
  useEffect(() => {
    if (user) {
      fetchUserProfile();
    } 
  }, [user]);

  // 로그아웃 기능
  const handleLogout = () => {
    dispatch(logout()); // Redux 상태 초기화
    navigate("/"); // 홈으로 이동 (필요에 따라 변경 가능)
  };

  return (
    <>
      <Navbar className="mb-[100px]" />

      <div className="w-full max-w-[1520px] mx-auto px-5 py-16">
        {/* 계정 정보 */}
        <div className="text-black text-4xl font-bold leading-[150%] 
          tracking-[-0.22px] text-left px-5 py-16">
          계정정보
        </div>
 
        <div className="bg-[#FAFAFA] flex items-center justify-start space-x-6 px-5 py-5 mb-[20px]">
          {/* 프로필 정보 */}
          <div className="flex items-center space-x-4">
            {/* 프로필 이미지 */}
            <div className="w-[88px] h-[88px] rounded-full overflow-hidden">
              <img 
                src={user?.profileImage || "/images/default-profile.png"}
                alt="profile" 
                className="object-cover w-full h-full rounded-full" 
              />
            </div>

            {/* 닉네임과 이메일 */}
            <div className="flex flex-col">
              <div className="text-black text-2xl font-bold leading-[150%] tracking-[-0.14px]">
                {user?.name || "닉네임"}
              </div>
              <div className="text-[#606166] text-base font-medium leading-[150%]">
                {user?.email || "email@example.com"}
              </div>
            </div>
          </div>

          {/* 로그아웃 버튼 */}
          {user && (
            <button 
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              로그아웃
            </button>
          )}

          {/* 화살표 아이콘 */}
          <div className="ml-auto flex justify-end w-full">
            <img src="./public/images/chevron-left.png" alt="Arrow" className="w-6 h-6" />
          </div>
        </div>

        {/* 직무 및 연차 정보 */}
        <div className="bg-[#FAFAFA] px-5 py-5">
          {/* 첫 번째 줄 */}
          <div className="flex">
            <span className="text-[#606166] text-lg pl-[40px]">
              직무
            </span>
            <span className="text-[#606166] text-lg pl-[40px] leading-[150%] tracking-[-0.22px] font-bold">
              연차
            </span>
          </div>

          {/* 구분선 */}
          <hr className="border-[#E0E1E4] my-2" />

          {/* 두 번째 줄 */}
          <div className="flex">
            <span className="text-[#606166] text-lg pl-[40px]">
              연차
            </span>
            <span className="text-[#606166] text-lg pl-[40px] leading-[150%] tracking-[-0.22px] font-bold">
              연차
            </span>
          </div>
        </div>

        {/* 나의 활동 내역 */}
        <div className="text-black text-4xl font-bold leading-[150%] 
          tracking-[-0.22px] text-left px-5 py-[60px]">
          나의 활동 내역
        </div>

        {/* 관심 분야 + 라벨 그룹 */}
        <div className="px-5 py-16 flex flex-col">
          {/* 관심 분야 */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-5 mb-4 pb-[40px] sm:ml-[40px]">
            <div className="text-[#606166] text-lg w-full sm:w-[240px]">관심 분야</div>
            <div className="flex flex-wrap gap-2 sm:gap-5">
              <label className="bg-[#131212] text-white py-2 px-5 text-xl font-medium">Label</label>
              <label className="bg-[#131212] text-white py-2 px-5 text-xl font-medium">Label</label>
              <label className="bg-[#131212] text-white py-2 px-5 text-xl font-medium">Label</label>
              <label className="bg-[#131212] text-white py-2 px-5 text-xl font-medium">Label</label>
            </div>
          </div>

          <hr className="border-[#E0E0E0]" />

          {/* 좋아요 표시한 강연 */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-5 mb-4 py-[40px] sm:ml-[40px]">
            <div className="text-[#606166] text-lg w-full sm:w-[240px]">좋아요 표시한 강연</div>
            <div className="flex flex-wrap gap-2 sm:gap-5">
              <label className="bg-[#131212] text-white py-2 px-5 text-xl font-medium">Label</label>
              <label className="bg-[#131212] text-white py-2 px-5 text-xl font-medium">Label</label>
              <label className="bg-[#131212] text-white py-2 px-5 text-xl font-medium">Label</label>
              <label className="bg-[#131212] text-white py-2 px-5 text-xl font-medium">Label</label>
            </div>
          </div>

          <hr className="border-[#E0E0E0]" />

          {/* AI 추천 강연 */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-5 mb-4 pb-[40px] sm:ml-[40px] pt-[40px]">
            <div className="text-[#606166] text-lg w-full sm:w-[240px]">AI 추천 강연</div>
            <div className="flex flex-wrap gap-2 sm:gap-5">
              <label className="bg-[#131212] text-white py-2 px-5 text-xl font-medium">Label</label>
              <label className="bg-[#131212] text-white py-2 px-5 text-xl font-medium">Label</label>
              <label className="bg-[#131212] text-white py-2 px-5 text-xl font-medium">Label</label>
              <label className="bg-[#131212] text-white py-2 px-5 text-xl font-medium">Label</label>
            </div>
          </div>
        </div>

        <div className="w-full max-w-[1520px] min-h-[1836px] bg-[#FAFAFA] mx-auto">
          {/* 나의 스케줄 제목 */}
          <h2 className="text-black text-[40px] font-bold leading-[150%] 
            tracking-[-0.2px] px-[20px] pt-[32px] pb-[60px]">
            나의 스케줄
          </h2>

          {/* 스케줄 표 */}
          <div className="space-y-[20px]">
            {/* 네모 박스 컨테이너 */}
            <div className="flex justify-start items-center gap-[20px] 
              px-[40px] py-[20px] pl-[160px] w-full">
              {[101, 102, 103, 104, 105].map((item, index) => (
                <div key={index} className="flex-shrink-0 w-[240px] h-[52px] flex 
                  items-center justify-center text-black text-[24px] 
                  font-medium bg-[white] border border-black">
                  {item}
                </div>
              ))}
            </div>
            {[...Array(5)].map((_, rowIndex) => (
              <div key={rowIndex} className="flex items-start space-x-[20px] pl-[40px]">
                {/* 시간 박스 */}
                <div className="w-[100px] h-[288px] bg-white flex flex-col 
                  justify-center items-center text-black text-[22px] font-medium">
                  <div>09:50</div>
                  <div>~</div>
                  <div>10:00</div>
                </div>
                {[...Array(5)].map((_, colIndex) => (
                  <div key={colIndex} className="flex flex-col w-[240px] h-[288px] border border-[#CCCDD2]">
                    {/* 상단 구분선 */}
                    <div className="w-[240px] h-[8px] bg-[#CCCDD2]" />

                    {/* 세션 정보 */}
                    <div className="w-[216px] min-h-[60px] px-[12px] pb-[12px] 
                      text-black text-[18px] font-medium pt-[20px]">
                      세션의 이름은 최대 2줄까지 길어집니다
                    </div>

                    {/* 스피커 정보 */}
                    <div className="w-full px-[12px] pb-[20px] text-[#85878D] text-[16px] font-medium">
                      스피커(스피커의 직무 및 직책은 2줄입니다)
                    </div>

                    {/* 이미지 */}
                    <img 
                      src="./public/images/image (1).png" 
                      alt="세션 이미지" 
                      className="w-full h-[120px] object-cover" 
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  )
};

export default mypage;
