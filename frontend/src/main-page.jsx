import React, { useEffect } from "react";
import Navbar from "~/components/Navbar.jsx";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const MainPage = () => {
  // 애니메이션 컨트롤러 생성
  const controls = useAnimation();
  // 화면에 요소가 보이는지 감지하는 훅 (threshold: 0.2 = 20% 보이면 트리거)
  const { ref, inView } = useInView({ threshold: 0.2 });

  const items = ["Title 1", "Title 2", "Title 3", "Title 4", "Title 5", "Title 6"];

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <>
      <Navbar />

      <div className="flex justify-center">
        <motion.div
          ref={ref}
          className="w-full max-w-[1600px] h-[794px] bg-gray-200 px-[160px] mb-[100px]"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 50 }, // 처음에는 흐릿하고 아래쪽에 위치
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }, // 부드럽게 나타남
          }}
        />
      </div>

      <div className="flex justify-center px-4 lg:px-[220px] h-[812px] mb-[40px]">
        {/* 왼쪽: 이미지 */}
        <div className="w-full lg:w-[740px] h-full bg-gray-300">
          {/* 이미지가 들어갈 부분 */}
        </div>

        {/* 오른쪽: 텍스트 */}
        <div className="flex flex-col justify-center w-full lg:w-[740px] 
          h-full px-4 lg:px-[40px]">
          {/* 첫 번째 텍스트 */}
          <h1 className="text-[24px] lg:text-[40px] font-[700] leading-[150%] 
            tracking-[-0.2px] text-left pt-[20px] lg:pt-[237px] pb-[60px] lg:pb-[60px]">
            8 + 1 그 이상의 기술력
          </h1>

          {/* 두 번째 텍스트 */}
          <p className="text-[16px] lg:text-[24px] font-[500] leading-[150%] 
            tracking-[-0.12px] text-left w-full pb-[40px] lg:pb-[237px]">
            핀테크는 금융의 미래를 열어갑니다.<br />
            최신 기술을 통한 혁신적 접근으로<br /> 
            사용자에게 딱 맞는 금융 경험을 창출합니다.
            <br /><br />
            맞춤형 핀테크 경험을 만들어가는 길잡이들과 함께<br /> 
            기술력을 활용하여 서비스를 만드는 여정을 떠나요
          </p>
        </div>
      </div>

      <div className="flex justify-center px-4 lg:px-[220px] h-[812px] mb-[40px]">
        {/* 왼쪽: 이미지 */}
        <div className="w-full lg:w-[740px] h-full bg-gray-300">
          {/* 이미지가 들어갈 부분 */}
        </div>

        {/* 오른쪽: 텍스트 */}
        <div className="flex flex-col justify-center w-full lg:w-[740px] 
          h-full px-4 lg:px-[40px]">
          {/* 첫 번째 텍스트 */}
          <h1 className="text-[24px] lg:text-[40px] font-[700] leading-[150%] 
            tracking-[-0.2px] text-left pt-[20px] lg:pt-[237px] pb-[40px] lg:pb-[60px]">
            나를 찾아와요
          </h1>

          {/* 두 번째 텍스트 */}
          <p className="text-[16px] lg:text-[24px] font-[500] leading-[150%] 
            tracking-[-0.12px] text-left w-full pb-[40px] lg:pb-[237px]">
            {/* 두 번째 텍스트 내용 */}
            길안내 토스 레퍼런스
            나에게 창조는 없다.
            <br /><br />
            모방만 있을 뿐.
          </p>
        </div>
      </div>

      <div className="w-full max-w-[1480px] bg-[#E0E1E4] mx-auto mt-[90px]">
        {/* 세션정보 및 타임테이블 */}
        <h1 className="text-black text-[52px] font-bold leading-[150%] 
          tracking-[-0.26px] mb-[80px] text-left">
          세션정보 및 타임테이블
        </h1>
        
        {/* 메인 세션 */}
        <h2 className="text-black text-[44px] font-bold leading-[150%] 
          tracking-[-0.22px] mb-[20px] text-left">
          메인 세션
        </h2>
        
        {/* 세션 설명 */}
        <p className="text-black text-[24px] font-medium leading-[150%] 
          tracking-[-0.12px] mb-[71px] text-left">
          핀테크 금융동맹의 확장과 글로벌 진출 전략이 한국 시장의 스타트업들에게 어떤 기회와 도전을 제공할 수 있을까요?<br />
          핀테크 금융동맹의 한국 시장에 미치는 영향을 살펴보고, 글로벌 진출 전략을 통해 스타트업들이 맞닥뜨릴 기회와 도전을 분석하며,<br />
          핀테크 혁신을 이끌어갈 스타트업들의 비전과 피칭을 공유합니다.
        </p>
        
        {/* 강연자 정보 컨테이너 */}
        <div className="flex flex-nowrap justify-between gap-[20px]">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="bg-white p-[40px] h-[440px] w-[440px] flex flex-col items-start">
              {/* 시간 */}
              <p className="text-[#45464A] h-[26px] w-full mb-[20px]">
                time:time ~ time:time
              </p>
              
              {/* 강연 제목 */}
              <h3 className="text-black text-[36px] font-bold leading-[150%] tracking-[-0.18px] w-full mb-[20px]">
                강연 제목
              </h3>
              
              {/* 구분선 */}
              <hr className="w-full mb-[60px] border-gray-300" />
              
              {/* 추가 정보 */}
              <p className="text-black text-[16px] font-medium leading-[150%] tracking-[-0.5px] w-full h-[24px] mb-[20px]">
                more info
              </p>
              
              {/* 라벨 3개 */}
              <div className="flex space-x-[8px] mb-auto">
                {["Label 1", "Label 2", "Label 3"].map((label, idx) => (
                  <span
                    key={idx}
                    className="bg-[#45464A] text-white text-[14px] font-semibold leading-[140%] tracking-[-0.5px] 
                    px-[10px] py-[4px] rounded-[4px] flex items-center justify-center h-[32px]"
                  >
                    {label}
                  </span>
                ))}
              </div>
              
              {/* 강연자 프로필 */}
              <div className="flex items-center mt-[20px]">
                <div className="w-[40px] h-[40px] bg-gray-400 rounded-full mr-[12px]"></div>
                <p className="text-[#131212] text-[20px] font-medium leading-[150%]">
                  강연자 이름
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#E0E1E4] flex flex-col">
          <h2 className="text-black text-[44px] font-bold leading-[150%] tracking-[-0.22px] mb-[20px] pt-[127px]">
            타임테이블
          </h2>
          <p className="text-black text-[24px] font-medium leading-[150%] tracking-[-0.12px] mb-[40px] pb-[52px]">
            sub text
          </p>
          {/* 타임테이블 목록 */}
          <div className="flex flex-col items-center space-y-[40px] pb-[40px]">
            {[...Array(5)].map((_, rowIndex) => (
              <div key={rowIndex} className="flex">
                {[...Array(5)].map((_, colIndex) => (
                  <div key={colIndex} className="w-[280px] bg-[#F4F4F4] flex flex-col">
                    {/* Label 헤더 */}
                    <div className="bg-[#131212] text-white text-[24px] font-bold leading-[150%] 
                      tracking-[-0.12px] flex items-center justify-center h-[60px]">
                      Label
                    </div>
                    {/* Title */}
                    <h3 className="text-black text-[24px] font-bold leading-[150%] 
                      tracking-[-0.12px] pt-[106px] pl-[16px] pr-[58px]">
                      Title
                    </h3>
                    {/* Labels */}
                    <div className="flex space-x-[8px] pl-[16px] pt-[20px]">
                      {[...Array(3)].map((_, labelIndex) => (
                        <span key={labelIndex} className="bg-[#45464A] text-white text-[14px] 
                          font-semibold leading-[140%] tracking-[-0.5px] px-[12px] py-[6px] 
                          rounded-[4px] flex items-center justify-center">
                          Label
                        </span>
                      ))}
                    </div>
                    {/* 강연자 프로필 및 이름 */}
                    <div className="flex items-center pl-[16px] pt-[20px] pb-[46px]">
                      <div className="w-[48px] h-[48px] bg-gray-500 rounded-full mr-[12px]"></div>
                      <span className="text-black text-[20px] font-medium leading-[150%]">
                        강연자 이름
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div class="w-[1480px] h-[1288px] bg-white mx-auto mt-[50px]">
        {/* <!-- 세션정보 및 타임테이블 텍스트 --> */}
        <h1 class="text-black text-[52px] font-bold leading-[150%] tracking-[-0.26px] mb-[80px] text-left">
          세션정보 및 타임테이블
        </h1>

        {/* <!-- 메인 세션 텍스트 --> */}
        <h2 class="text-black text-[44px] font-bold leading-[150%] tracking-[-0.22px] mb-[20px] text-left">
          메인 세션
        </h2>

        {/* <!-- 세션 설명 --> */}
        <p class="text-black text-[24px] font-medium leading-[150%] tracking-[-0.12px] mb-[101px]">
          핀테크 금융동맹의 확장과 글로벌 진출 전략이 한국 시장의 스타트업들에게 어떤 기회와 도전을 제공할 수 있을까요?<br />
          핀테크 금융동맹의 한국 시장에 미치는 영향을 살펴보고,<br /> 글로벌 진출 전략을 통해 스타트업들이 맞닥뜨릴 기회와 도전을 분석하며,<br />
          핀테크 혁신을 이끌어갈 스타트업들의 비전과 피칭을 공유합니다.
        </p>

        {/* <!-- 버튼들 --> */}
        <div class="flex space-x-[20px] mb-[28px]">
          {/* <!-- 첫 번째 버튼 --> */}
          <button class="w-[128px] h-[70px] py-0 px-[20px] text-[36px] font-medium 
            leading-[150%] tracking-[-0.18px] bg-[#45464A] text-white">
            1층
          </button>
          {/* <!-- 두 번째 버튼 --> */}
          <button class="w-[128px] h-[70px] py-0 px-[20px] text-[36px] font-medium 
            leading-[150%] tracking-[-0.18px] bg-[#45464A] text-white">
            2층
          </button>
        </div>

        {/* <!-- 이미지 --> */}
        <img src="/public/images/image 67.png" alt="Image" class="w-[1480px] h-[737px]" />
      </div>

      <div class="w-[1480px] h-[942px] bg-gray-300 mx-auto mt-[220px] pr-[0] pl-[0] pt-[0] pb-[0]">
        {/* <!-- 세션정보 및 타임테이블 텍스트 --> */}
        <h1 class="text-black text-[52px] font-bold leading-[150%] tracking-[-0.26px] text-left">
          세션정보 및 타임테이블
        </h1>

        {/* <!-- 설명 텍스트 --> */}
        <p class="text-black text-[24px] font-medium leading-[150%] tracking-[-0.12px] mt-[80px] mb-[60px]">
          핀테크 금융동맹의 확장과 글로벌 진출 전략이 한국 시장의 스타트업들에게 어떤 기회와 도전을 제공할 수 있을까요?<br />
          핀테크 혁신을 이끌어갈 스타트업들의 비전과 피칭을 공유합니다.
        </p>

        {/* <!-- 화이트 컨테이너 --> */}
        <div class="bg-white px-[100px] py-[64px]">
          {/* <!-- 첫 번째 블록 --> */}
          <div class="flex items-start mb-[64px]">
            {/* <!-- 왼쪽 텍스트 --> */}
            <div class="w-[620px]">
              <h2 class="text-[36px] font-bold leading-[150%] tracking-[-0.18px] mb-[32px]">
                현장에서 자유롭게 세션을 이동하며 들을 수 있어요
              </h2>
              <p class="text-[20px] font-medium leading-[150%]">
                국회의원이 회기 전에 체포 또는 구금된 때에는 현행범인이 아닌 한 국회의 요구가 있으면 회기 중 석방된다.<br /> 
                대한민국의 영토는 한반도와 그 부속도서로 한다.
              </p>
            </div>
            {/* <!-- 오른쪽 이미지 박스 --> */}
            <div class="w-[560px] h-[220px] bg-[#D9D9D9] ml-[100px]"></div>
          </div>

          {/* <!-- 두 번째 블록 (반복) --> */}
          <div class="flex items-start">
            {/* <!-- 왼쪽 텍스트 --> */}
            <div class="w-[620px]">
              <h2 class="text-[36px] font-bold leading-[150%] tracking-[-0.18px] mb-[32px]">
                오프라인 참가자에게<br />
                온라인 스트리밍을 지원해요
              </h2>
              <p class="text-[20px] font-medium leading-[150%]">
                국회의원이 회기 전에 체포 또는 구금된 때에는 현행범인이 아닌 한 국회의 요구가 있으면 회기 중 석방된다.<br /> 
                대한민국의 영토는 한반도와 그 부속도서로 한다.
              </p>
            </div>
            {/* <!-- 오른쪽 이미지 박스 --> */}
            <div class="w-[560px] h-[220px] bg-[#D9D9D9] ml-[100px]"></div>
          </div>
        </div>
      </div>

      <div className="w-[1480px] bg-[gray] mx-auto mt-[100px] pb-[0] mb-[313px]">
        {/* 헤더 영역 */}
        <h1 className="text-black text-[44px] font-bold leading-[150%] tracking-[-0.22px] p-[80px_0] pt-[0]">
          헤더 영역입니다
        </h1>

        {/* 리스트 아이템 반복 */}
        {items.map((title, index) => (
          <div key={index} className="border-t border-black">
            <div className="border-b border-black p-[32px] flex items-center justify-between cursor-pointer group">
              {/* 왼쪽 아이콘 + 텍스트 */}
              <div className="flex items-center gap-[10px]">
                <img src="/public/images/icon.png" alt="아이콘" className="w-[32px] h-[32px]" />
                <span className="text-[28px] font-medium leading-[150%] tracking-[-0.14px] text-white">
                  {title}
                </span>
              </div>
              {/* 오른쪽 아이콘 */}
              <img src="/public/images/show-icon.png" alt="펼치기" className="w-[16px] h-[16px] group-hover:rotate-180 transition-transform" />
            </div>
            {/* 숨겨진 Sub Text */}
            <div className="hidden group-hover:block border-t border-black p-[32px] text-[#45464A] text-[20px] font-medium leading-[150%]">
              Sub Text
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MainPage;
