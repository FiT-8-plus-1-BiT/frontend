import SocialLoginButtons from '~/components/social-login/social-login-buttons';

import { useNavigate } from 'react-router-dom';

function LoginPage() {
  // useNavigate 훅을 사용하여 페이지 이동 기능을 가져옴
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/main');
  };

  return (
    <>
      {/* 전체 컨테이너 박스를 중앙에 배치 */}
      <div className=" w-full h-screen flex justify-center items-center 
        px-[140px] sm:px-8 md:px-20">
        {/* 내부 컨테이너 */}
        <div className="flex flex-col md:flex-row justify-center items-center w-full ">

          {/* 왼쪽 이미지 영역 */}
          <div className="w-full md:w-auto flex justify-center items-center mt-[36px]">
            <img 
              src="/images/LoginImage.png" 
              alt="background" 
              className="w-full md:max-w-[760px] h-full md:h-[760px] object-cover"
            />
          </div>

          {/* 오른쪽 로그인 영역 */}
          <div className="w-full md:max-w-[600px] font-[Pretendard] flex flex-col 
            justify-center self-center gap-y-6 text-left ml-[140px]"
          >
            <div className='flex flex-col gap-[12px]'>
              <h1 className="text-black text-2xl sm:text-3xl md:text-4xl font-bold mt-[60px]">
                안녕하세요
              </h1>
              <h1 className="text-black text-2xl sm:text-3xl md:text-4xl font-bold">
                FiT입니다
              </h1>
            </div>

            <div className='mt-[20px] flex flex-col gap-[8px]'>
              <p className="text-lg sm:text-xl font-medium">
                네이버, 카카오, 구글 계정으로
              </p>
              <p className="text-lg sm:text-xl font-medium">
                3초만에 가입하고 바로 시작해보세요!
              </p>
            </div>

            <div className="mt-[80px] flex flex-col gap-4">
              <SocialLoginButtons />
            </div>

            <hr className="mb-[20px] mt-[80px] w-full border-t border-[#E0E1E4]" />

            <a 
              onClick={handleClick}
              className="w-full h-[52px] text-[#45464A] text-center cursor-pointer underline"
            >
              로그인 없이 둘러보기
            </a>
          </div>

        </div>
      </div>
    </>
  );
}

export default LoginPage;
