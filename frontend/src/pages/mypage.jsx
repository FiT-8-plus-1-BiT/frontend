import React from 'react'
import Navbar from "~/components/navbar.jsx"

const mypage = () => {
  return (
    <>
      <Navbar className="mb-[100px]" />

      {/* 계정 정보 */}
      <div className="w-full max-w-[1520px] mx-auto px-5 py-16">
        <div className="text-black text-4xl font-bold leading-[150%] tracking-[-0.22px] text-left px-5 py-16">
          계정정보
        </div>

        {/* 프로필 */}
        <div className="flex items-center space-x-6 px-5 py-5">
          <div className="w-[88px] h-[88px] rounded-full bg-gray-300"></div>
          <div className="flex flex-col space-y-1">
            <div className="text-black text-2xl font-bold leading-[150%] tracking-[-0.14px]">
              닉네임
            </div>
            <div className="text-[#606166] text-base font-medium leading-[150%]">
              ddddd@naver.com
            </div>
          </div>
          <div className="ml-auto">
            <img src="./public/images/chevron-left.png" alt="Arrow" className="w-6 h-6" />
          </div>
        </div>

        {/* 직무 및 연차 정보 */}
        <div className="flex justify-between items-center px-5 py-4">
          <div className="text-[#606166] text-lg">직무</div>
          <div className="text-[#606166] text-lg">연차</div>
        </div>
        <hr className="border-[#E0E0E0]" />
        <div className="flex justify-between items-center px-5 py-4">
          <div className="text-[#606166] text-lg">직무</div>
          <div className="text-[#606166] text-lg">연차</div>
        </div>
        <hr className="border-[#E0E0E0]" />

        {/* 나의 활동 내역 */}
        <div className="text-black text-4xl font-bold leading-[150%] tracking-[-0.22px] text-left px-5 py-16">
          나의 활동 내역
        </div>

        {/* 관심 분야 */}
        <div className="px-5 py-16">
          <div className="text-[#606166] text-lg mb-4">관심 분야</div>
          <div className="flex space-x-5 mb-4">
            <label className="bg-gray-200 py-2 px-5 text-xl font-medium rounded-lg">Label1</label>
            <label className="bg-gray-200 py-2 px-5 text-xl font-medium rounded-lg">Label2</label>
            <label className="bg-gray-200 py-2 px-5 text-xl font-medium rounded-lg">Label3</label>
            <label className="bg-gray-200 py-2 px-5 text-xl font-medium rounded-lg">Label4</label>
          </div>
          <hr className="border-[#E0E0E0]" />

          {/* 관심 분야 2 */}
          <div className="text-[#606166] text-lg mb-4">관심 분야</div>
          <div className="flex space-x-5 mb-4">
            <label className="bg-gray-200 py-2 px-5 text-xl font-medium rounded-lg">Label1</label>
            <label className="bg-gray-200 py-2 px-5 text-xl font-medium rounded-lg">Label2</label>
            <label className="bg-gray-200 py-2 px-5 text-xl font-medium rounded-lg">Label3</label>
            <label className="bg-gray-200 py-2 px-5 text-xl font-medium rounded-lg">Label4</label>
          </div>
          <hr className="border-[#E0E0E0]" />

          {/* 관심 분야 3 */}
          <div className="text-[#606166] text-lg mb-4">관심 분야</div>
          <div className="flex space-x-5 mb-4">
            <label className="bg-gray-200 py-2 px-5 text-xl font-medium rounded-lg">Label1</label>
            <label className="bg-gray-200 py-2 px-5 text-xl font-medium rounded-lg">Label2</label>
            <label className="bg-gray-200 py-2 px-5 text-xl font-medium rounded-lg">Label3</label>
            <label className="bg-gray-200 py-2 px-5 text-xl font-medium rounded-lg">Label4</label>
          </div>
          <hr className="border-[#E0E0E0]" />
        </div>
      </div>
    </>
  )
}

export default mypage
