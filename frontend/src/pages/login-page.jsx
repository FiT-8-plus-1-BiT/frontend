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
        px-4 sm:px-8 md:px-20 pb-[20px]">
        {/* 내부 컨테이너 */}
        <div className="flex flex-col md:flex-row justify-center items-center w-full ">

          {/* 왼쪽 이미지 영역 */}
          <div className="w-full md:w-auto flex justify-center items-center mt-[60px]">
            <img 
              src="https://mblogthumb-phinf.pstatic.net/MjAyMTA4MThfNjQg/MDAxNjI5MjUwNTk5Mzg0.XA0T0u2BSgIDdOJ20CzuLmiwVBvNvYpsjQmJIH7-ro0g.6m--zWiMFU_M-g0se0tUOgdyNzBx3oQdj13TnZgZngog.JPEG.wenice777/3.jpg?type=w800" 
              alt="background" 
              className="w-full md:max-w-[760px] h-full md:h-[760px] object-cover"
            />
          </div>

          {/* 오른쪽 로그인 영역 */}
          <div className="w-full md:max-w-[600px] font-[Pretendard] flex flex-col 
            justify-center self-center gap-y-6 text-left ml-[60px] mt-[17px]"
          >
            <h1 className="text-black text-2xl sm:text-3xl md:text-4xl font-bold pt-[130px]">
              Sub title
            </h1>

            <p className="text-lg sm:text-xl font-medium">
              sub text
            </p>

            <div className="mt-10 flex flex-col gap-4">
              <SocialLoginButtons />
            </div>

            <hr className="my-[100px] w-full border-t border-[#E0E1E4]" />

            <div className="flex flex-col items-center pb-[100px]">
              <small className="text-[#131212] text-sm sm:text-base font-semibold leading-[140%] tracking-[-0.5px] text-center py-[10px] px-[12px] mb-[12px]">
                LabelLabelLabelLabelLabelLabel
              </small>

              <button 
                onClick={handleClick}
                className="w-full h-[52px] bg-[#131212] text-center"
              >
                <span className='w-[198px] h-[36px] text-white text-[24px]'>
                  로그인 없이 둘러보기
                </span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default LoginPage;
