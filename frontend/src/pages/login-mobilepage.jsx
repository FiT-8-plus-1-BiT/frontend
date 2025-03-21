import React from 'react'
import { useNavigate } from 'react-router-dom';
import SocialMobileLoginButtons from '~/components/social-mobile-login/social-mobile-login-buttons';

const loginMobilePage = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/main');
    };

  return (
    <>
        <div className="w-[375px] h-[812px] bg-white mx-auto relative">
            {/* 상단 상태바 영역 */}
            <div className="w-full h-[44px]"></div>

            {/* 로고 영역 */}
            <div className="mt-[20px] ml-[20px] mb-[16px]">
                <img
                    src="./images/logo (1).png"
                    alt="logo"
                    className="w-[60px] h-[60px]"
                />
            </div>

            {/* 텍스트 영역 */}
            <div className="w-[279px] ml-[40px] mr-[76px] mb-[266px]">
                <p 
                    className="text-[22px] font-medium leading-[150%] 
                        tracking-[-0.12px] text-black"
                >
                    안녕하세요, <br />
                    합반 프로젝트에서는 <br />
                    총 4개의 직무가 함께해요!
                </p>
            </div>

            {/* 소셜 로그인 버튼 영역 */}
            <div className="px-[32px] space-y-[12px]">
                {/* 네이버, 카카오, 구글 소셜 로그인 */}
                <SocialMobileLoginButtons />
            </div>

            {/* 구분선 */}
            <div className="flex items-center my-[20px] px-[32px]">
                <div className="flex-1 h-[1px] bg-gray-300"></div>
                    <span className="px-[12px] text-gray-500 text-[14px]">
                        또는
                    </span>
                <div className="flex-1 h-[1px] bg-gray-300"></div>
            </div>

            {/* 둘러보기 버튼 */}
            <button 
                className="w-[311px] h-[36px] mx-[32px] bg-[#85878D] 
                    text-white text-[14px] font-medium flex 
                    items-center justify-center"
                onClick={handleClick}
            >
                가입하지 않고 둘러볼래요
            </button>
        </div>
    </>
  )
}

export default loginMobilePage;
