import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const MainPage = () => {
  // 애니메이션 컨트롤러 생성
  const controls = useAnimation();
  // 화면에 요소가 보이는지 감지하는 훅 (threshold: 0.2 = 20% 보이면 트리거)
  const { ref, inView } = useInView({ threshold: 0.2 });

  const questions = [
    "사일런트 컨퍼런스란 무엇인가요?",
    "사일런트 컨퍼런스의 목적은 무엇인가요?",
    "사일런트 컨퍼런스에는 어떤 장점이 있나요?",
    "다양한 세션에 어떻게 접속하나요?",
    "어떤 핀테크 주제가 다뤄지나요?",
    "행사 후 세션 녹화본을 볼 수 있나요?",
    "기조 강연자가 있나요?",
  ];
  
  const detailsList = [
    [
      "사일런트 컨퍼런스는 무선 헤드셋을 통해 강연을 듣는 시스템입니다.",
      "참가자는 원하는 세션을 선택하여 실시간으로 들을 수 있습니다.",
      "다양한 세션을 쉽게 전환할 수 있습니다."
    ],
    [
      "목표는 참가자들에게 더 나은 경험을 제공하는 것입니다.",
      "동시 진행되는 세션 간 이동을 원활하게 합니다.",
      "잡음 없이 개별 세션에 집중할 수 있습니다."
    ],
    [
      "다양한 주제를 한 공간에서 경험할 수 있습니다.",
      "각 세션별 맞춤 청취 환경을 제공합니다.",
      "세션 간 이동이 자유롭습니다."
    ],
    [
      "세션별 채널을 선택하여 접속합니다.",
      "무선 헤드셋을 활용하여 청취합니다.",
      "현장에서 안내되는 정보를 참고하면 됩니다."
    ],
    [
      "금융 기술 혁신, 블록체인, 인공지능 등이 포함됩니다.",
      "핀테크 스타트업 및 대기업의 최신 기술이 소개됩니다.",
      "전문가 패널 토론도 진행됩니다."
    ],
    [
      "네, 행사 후 일부 세션은 녹화본을 제공합니다.",
      "세션별 제공 여부는 공식 웹사이트에서 확인 가능합니다.",
      "제한된 기간 동안만 시청이 가능합니다."
    ],
    [
      "네, 기조 강연자가 있으며, 상세 일정은 추후 공개됩니다.",
      "유명 핀테크 전문가들이 참여할 예정입니다.",
      "각 세션별 주요 발표자도 함께 소개됩니다."
    ]
  ];

  // 아이템의 각 Sub Text의 보임 상태를 관리하는 상태 변수
  const [activeIndex, setActiveIndex] = useState(null);

  // 기본값으로 1층 이미지 선택
  const [selectedFloor, setSelectedFloor] = useState(1); 

  const handleToggle = (index) => {
    // 클릭한 아이템의 Sub Text 상태를 토글
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <div className="bg-[#F4F4F4]">
      <div className="flex justify-center">
        <motion.img
          ref={ref}
          src="/images/WebMainBanner.png"
          className="w-full max-w-[1924px] h-[874px] mb-[100px]"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 50 }, // 처음에는 흐릿하고 아래쪽에 위치
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }, // 부드럽게 나타남
          }}
        />
      </div>

      <div 
        className="w-[1920px] w-full h-[690px] flex mb-[100px] bg-cover"
        style={{ backgroundImage: "url('/images/FitBanner.png')" }} // 배경 이미지 적용
      >
        {/* 왼쪽 텍스트 영역 */}
        <div className="flex flex-col lg:w-[50%] 
          lg:px-[40px] p-6 rounded-lg mt-[148px] ml-[280px]">
          <h1 className="text-[24px] lg:text-[40px] font-[700] 
            leading-[150%] tracking-[-0.2px] text-left">
              그 동안 경험하지 못한 컨퍼런스
          </h1>

          <p className="text-[24px] lg:text-[24px] font-[500] leading-[150%] 
            tracking-[-0.12px] text-left w-full pt-6">
              최첨단 사일런트 기술을 활용해 참가자들에게<br />
              몰입감있는 경험을 제공합니다.<br /><br />
              한 공간에서 여러 세션이 동시에 진행되며,<br />
              개인 이어폰을 통해 원하는 세션을 자유롭게 선택할 수 있습니다.<br /><br />
              FiT에서 최신 핀테크 트렌드를 탐구하고,<br />
              네트워킹 기회를 누려보세요.<br /><br />
          </p>
        </div>
      </div>

      <div>
        <img 
          src="/images/BlueBanner.png"
          className="w-[1920px] w-full h-[690px] mb-[100px]"
        />
      </div>

      <div className="w-full max-w-[1480px] mx-auto">
        <h1 className="text-black text-[52px] font-bold leading-[150%] 
          tracking-[-0.26px] pb-[60px] text-left">
          메인세션 및 연사정보
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
          한국 시장에 미치는 영향을 살펴보고, 글로벌 진출 전략을 통해 스타트업들이 맞닥뜨릴 기회와 도전을 분석하며,<br />
          핀테크 혁신을 이끌어갈 스타트업들의 비전과 피칭을 공유합니다.
        </p>
        
        <div className="flex flex-wrap justify-center lg:justify-between">
          <div 
            className="bg-white pl-[40px] pr-[40px] py-[24px] h-[388px] h-full w-[452px] 
              w-full rounded-t-[12px] rounded-b-[12px] sm:w-[300px] md:w-[340px] 
              lg:w-[440px] flex flex-col items-start"
          >
            <p className="text-[#45464A] mb-[20px] font-bold">
              10:00~10:50
            </p>
            <p className="text-[#45464A] text-[20px] h-[26px] w-full mb-[20px] font-bold">
              김은정 (신한은행 디지털전략본부장)
            </p>

            <h3 className="text-[#2A2EAD] text-[36px] font-bold leading-[150%] 
              tracking-[-0.18px] w-full mb-[20px]">
                금융소비자 경험 혁신하기
            </h3>

            <p className="text-[#606166] text-[16px] font-bold leading-[150%] tracking-[-0.18px] w-full mb-[20px]">
              사용자 중심의 핀테크 서비스 개발 전략과 금융 소비자의 경험 혁신을 위한 최신 트렌드를 살펴봅니다.
            </p>

            {/* 라벨 3개 */}
            <div className="flex flex-wrap gap-[8px] flex-1">  {/* 🔥 flex-1 추가 */}
              {["소비자 경험", "기술 혁신", "패널 토론", "초급"].map((label, idx) => (
                <span
                  key={idx}
                  className="bg-[#85878D] text-white text-[12px] sm:text-[14px] font-semibold leading-[140%] tracking-[-0.5px] 
                  px-[10px] py-[4px] rounded-[4px] flex items-center justify-center h-[32px]"
                >
                  {label}
                </span>
              ))}
            </div>

            {/* 🔥 img가 바로 아래 붙도록 */}
            <img 
              src="/images/MainSession1.png"
              className="w-[452px] h-[200px] rounded-b-[12px] mt-[20px]"
            />
          </div>


          <div 
            className="bg-white pl-[40px] pr-[40px] py-[24px] h-[612px] h-full w-[452px] 
              w-full rounded-t-[12px] rounded-b-[12px] sm:w-[300px] md:w-[340px] 
              lg:w-[440px] flex flex-col items-start"
          >
            <p className="text-[#45464A] mb-[20px] font-bold">
              14:35~15:25
            </p>

            <p className="text-[#45464A] text-[20px] h-[26px] w-full mb-[20px] font-bold">
              김현우 (네이버페이 사업총괄)
            </p>

            <h3 className="text-[#2A2EAD] text-[36px] font-bold leading-[150%] 
              tracking-[-0.18px] w-full mb-[100px]">
                모바일 결제의 미래
            </h3>

            <p className="text-[#606166] text-[16px] font-bold 
              leading-[150%] tracking-[-0.18px] w-full mb-[20px]"
            >
              모바일 결제 시장의 변화와 주요 기술 혁신, 
              사용자 경험 개선 방안, 그리고 미래 전망을 분석합니다.
            </p>

            {/* 라벨 3개 */}
            <div className="flex flex-wrap gap-[8px] flex-1"> 
              {["송금/결제", "기술 혁신", "세미나", "중급"].map((label, idx) => (
                <span
                  key={idx}
                  className="bg-[#85878D] text-white text-[12px] sm:text-[14px] font-semibold leading-[140%] tracking-[-0.5px] 
                  px-[10px] rounded-[4px] flex items-center justify-center h-[32px]"
                >
                  {label}
                </span>
              ))}
            </div>

            {/* 🔥 img가 바로 아래 붙도록 */}
            <img 
              src="/images/MainSession2.png"
              className="w-[452px] h-[200px] rounded-b-[12px] mt-[20px]"
            />
          </div>

          <div 
            className="bg-white pl-[40px] pr-[40px] py-[24px] h-[612px] h-full w-[452px] 
              w-full rounded-t-[12px] rounded-b-[12px] sm:w-[300px] md:w-[340px] 
              lg:w-[440px] flex flex-col items-start"
          >
            <p className="text-[#45464A] mb-[20px] font-bold">
              16:45~17:35
            </p>
            <p className="text-[#45464A] text-[20px] h-[26px] w-full mb-[20px] font-bold">
              이나경 (금융위원회 정책자문위원)
            </p>

            <h3 className="text-[#2A2EAD] text-[36px] font-bold leading-[150%] 
              tracking-[-0.18px] w-full mb-[20px]">
                핀테크 기업의 규제 대응 전략
            </h3>

            <p 
              className="text-[#606166] text-[16px] font-bold leading-[150%] 
              tracking-[-0.18px] w-full mb-[20px]"
            >
              금융 규제 변화에 따른 핀테크 기업의 대응 방안과 
              성공적인 컴플라이언스(Compliance) 전략을 분석합니다.
            </p>

            {/* 라벨 3개 */}
            <div className="flex flex-wrap gap-[8px] flex-1">  {/* 🔥 flex-1 추가 */}
              {["규제 및 정책", "환경 변화", "워크숍", "고급"].map((label, idx) => (
                <span
                  key={idx}
                  className="bg-[#85878D] text-white text-[12px] sm:text-[14px] font-semibold leading-[140%] tracking-[-0.5px] 
                  px-[10px] py-[4px] rounded-[4px] flex items-center justify-center h-[32px]"
                >
                  {label}
                </span>
              ))}
            </div>

            {/* 🔥 img가 바로 아래 붙도록 */}
            <img 
              src="/images/MainSession3.png"
              className="w-[452px] h-[200px] rounded-b-[12px] mt-[20px]"
            />
          </div>    
        </div>

        <div className="flex flex-col mt-[60px]">
          <h2 className="text-black text-[32px] sm:text-[36px] md:text-[44px]
            font-bold leading-[150%] tracking-[-0.22px] mb-[60px]">
              연사 정보
          </h2>

          <div className="flex flex-col items-center space-y-[40px] pb-[40px] overflow-x-auto">
            {/* 첫 줄: 101, 102, 103, 104, 105 (배경색 없음) */}
            <div className="flex w-full justify-between px-[16px]">
              {[101, 102, 103, 104, 105].map((roomNumber) => (
                <div key={roomNumber} className="flex-1 text-center text-black text-[20px] font-bold leading-[150%] tracking-[-0.12px]">
                  {roomNumber}
                </div>
              ))}
            </div>

            {/* 시간: 09:50 ~ 10:00 */}
            <div className="bg-[#131212] text-white text-[24px] font-bold leading-[150%] 
              tracking-[-0.12px] flex items-center justify-center h-[60px] w-full">
              09:50 ~ 10:00
            </div>

            {/* Opening Speech */}
            <div className="bg-[#131212] text-white text-[24px] font-bold leading-[150%] 
              tracking-[-0.12px] flex items-center justify-center h-[60px] w-full">
              Opening Speech
            </div>

            {/* 시간: 10:00 ~ 10:50 */}
            <div className="bg-[#131212] text-white text-[24px] font-bold leading-[150%] 
              tracking-[-0.12px] flex items-center justify-center h-[60px] w-full">
              10:00 ~ 10:50
            </div>

            {/* 세션들 (간격 10px) */}
            {[...Array(1)].map((_, colIndex) => (
              <div key={colIndex} className="flex space-x-[10px] w-full justify-center">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="w-[280px] bg-[white] flex flex-col">
                    {/* Title */}
                    <h3 className="text-black text-[24px] font-bold leading-[150%] 
                      tracking-[-0.12px] pt-[50px] pl-[16px] pr-[58px]">
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

            {/* 시간: 11:05 ~ 11:55 */}
            <div className="bg-[#131212] text-white text-[24px] font-bold leading-[150%] 
              tracking-[-0.12px] flex items-center justify-center h-[60px] w-full">
              11:05 ~ 11:55
            </div>

            {/* 세션들 (간격 10px) */}
            {[...Array(1)].map((_, colIndex) => (
              <div key={colIndex} className="flex space-x-[10px] w-full justify-center">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="w-[280px] bg-[white] flex flex-col">
                    {/* Title */}
                    <h3 className="text-black text-[24px] font-bold leading-[150%] 
                      tracking-[-0.12px] pt-[50px] pl-[16px] pr-[58px]">
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

            {/* 시간: 13:30 ~ 14:20 */}
            <div className="bg-[#131212] text-white text-[24px] font-bold leading-[150%] 
              tracking-[-0.12px] flex items-center justify-center h-[60px] w-full">
              13:30 ~ 14:20
            </div>

            {/* 세션들 (간격 10px) */}
            {[...Array(1)].map((_, colIndex) => (
              <div key={colIndex} className="flex space-x-[10px] w-full justify-center">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="w-[280px] bg-[white] flex flex-col">
                    {/* Title */}
                    <h3 className="text-black text-[24px] font-bold leading-[150%] 
                      tracking-[-0.12px] pt-[50px] pl-[16px] pr-[58px]">
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

            {/* 시간: 14:35 ~ 15:25 */}
            <div className="bg-[#131212] text-white text-[24px] font-bold leading-[150%] 
              tracking-[-0.12px] flex items-center justify-center h-[60px] w-full">
              14:35 ~ 15:25
            </div>

            {/* 세션들 (간격 10px) */}
            {[...Array(1)].map((_, colIndex) => (
              <div key={colIndex} className="flex space-x-[10px] w-full justify-center">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="w-[280px] bg-[white] flex flex-col">
                    {/* Title */}
                    <h3 className="text-black text-[24px] font-bold leading-[150%] 
                      tracking-[-0.12px] pt-[50px] pl-[16px] pr-[58px]">
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

            {/* 시간: 15:40 ~ 16:30 */}
            <div className="bg-[#131212] text-white text-[24px] font-bold leading-[150%] 
              tracking-[-0.12px] flex items-center justify-center h-[60px] w-full">
              15:40 ~ 16:30
            </div>

            {/* 세션들 (간격 10px) */}
            {[...Array(1)].map((_, colIndex) => (
              <div key={colIndex} className="flex space-x-[10px] w-full justify-center">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="w-[280px] bg-[white] flex flex-col">
                    {/* Title */}
                    <h3 className="text-black text-[24px] font-bold leading-[150%] 
                      tracking-[-0.12px] pt-[50px] pl-[16px] pr-[58px]">
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

            {/* 시간: 16:45 ~ 17:35 */}
            <div className="bg-[#131212] text-white text-[24px] font-bold leading-[150%] 
              tracking-[-0.12px] flex items-center justify-center h-[60px] w-full">
              16:45 ~ 17:35
            </div>

            {/* 세션들 (간격 10px) */}
            {[...Array(1)].map((_, colIndex) => (
              <div key={colIndex} className="flex space-x-[10px] w-full justify-center">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="w-[280px] bg-[white] flex flex-col">
                    {/* Title */}
                    <h3 className="text-black text-[24px] font-bold leading-[150%] 
                      tracking-[-0.12px] pt-[50px] pl-[16px] pr-[58px]">
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

            {/* 시간: 17:35 ~ 17:50 */}
            <div className="bg-[#131212] text-white text-[24px] font-bold leading-[150%] 
              tracking-[-0.12px] flex items-center justify-center h-[60px] w-full">
              17:35 ~ 17:50
            </div>

            {/* Opening Speech */}
            <div className="bg-[#131212] text-white text-[24px] font-bold leading-[150%] 
              tracking-[-0.12px] flex items-center justify-center h-[60px] w-full">
              Closing
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1480px] w-full px-4 md:px-8 lg:px-12 mx-auto">
        <h2 className="text-black text-2xl md:text-3xl lg:text-[44px] 
          font-bold leading-[150%] tracking-[-0.22px] mb-[60px] text-left mt-[100px]">
            위치 정보
        </h2>

        <div className="flex flex-wrap gap-4 md:gap-6 mb-7">
          {[1, 2].map((floor) => (
            <button 
              key={floor}
              className={`w-[128px] h-[70px] md:w-40 lg:w-[128px] h-14 md:h-16 lg:h-[70px] 
                  py-2 px-4 md:px-6 text-lg md:text-xl lg:text-[36px] font-medium 
                  leading-[150%] tracking-[-0.18px] 
                ${selectedFloor === floor 
                  ? "bg-black text-white font-bold" 
                  : "bg-[white] border border-black text-black"}`}
              onClick={() => setSelectedFloor(floor)}
            >
              {floor}층
            </button>
          ))}
        </div>

        {/* 선택된 층에 맞는 이미지 표시 */}
        {selectedFloor === 1 && (
          <div className="w-full flex justify-center">
            <img
              src="/images/1floor.png"
              alt="Session Image"
              className="w-full max-w-[1480px] h-auto mb-[60px]"
            />
          </div>
        )}
        {selectedFloor === 2 && (
          <div className="w-full flex justify-center">
            <img
              src="/images/2floor.png"
              alt="2층 위치 이미지"
              className="w-full max-w-[1480px] h-auto mb-[60px]"
            />
          </div>
        )}
      </div>

      <div className="w-full max-w-[1480px] mx-auto px-4 md:px-8 lg:px-0 py-0">
        {/* <!-- 화이트 컨테이너 --> */}
        <div className="px-4 md:px-[50px] lg:px-[100px] py-[40px] md:py-[50px] lg:py-[64px]">
          {/* <!-- 첫 번째 블록 --> */}
          <div className="flex flex-col lg:flex-row items-start mb-[40px] md:mb-[50px] lg:mb-[64px]">
            {/* <!-- 왼쪽 텍스트 --> */}
            <div className="w-[672px] w-full lg:w-[620px]">
              <h2 className="text-[36px] md:text-[32px] lg:text-[36px] font-bold 
                leading-[150%] tracking-[-0.18px] mb-[20px] md:mb-[28px] lg:mb-[32px]">
                현장에서 자유롭게 세션을<br /> 
                이동하며 들을 수 있어요
              </h2>
              <p className="w-[672px] h-full text-[#606166] text-[20px] md:text-[20px] 
                lg:text-[20px] font-medium leading-[150%]"
              >
                참가자들은 무선 헤드폰을 통해 원하는 채널로 쉽게 전환할 수 있어,<br /> 
                여러 세션 간 이동이 간편하고 효율적입니다.
              </p>
            </div>
            {/* <!-- 오른쪽 이미지 박스 --> */}
            <div className="w-full lg:w-[508px] h-[220px] mt-[20px] lg:mt-0 lg:ml-[100px]">
              <img 
                src="/images/WomanImage.png" 
                className="rounded-[20px]"
                alt="이미지" 
              />
            </div>
          </div>

          {/* <!-- 두 번째 블록 (반복) --> */}
          <div className="flex flex-col lg:flex-row items-start">
            {/* <!-- 왼쪽 텍스트 --> */}
            <div className="w-full lg:w-[620px]">
              <h2 className="text-[36px] md:text-[32px] lg:text-[36px] font-bold 
                leading-[150%] tracking-[-0.18px] mb-[20px] md:mb-[28px] lg:mb-[32px]">
                오프라인 참가자에게<br /> 
                온라인 스트리밍을 지원해요
              </h2>
              <p className="w-[672px] h-full text-[#606166] text-[20px] md:text-[20px] 
                lg:text-[20px] font-medium leading-[150%]"
              >
                현장에서 참석하지 못한 세션을 온라인으로 시청할 수 있어,<br /> 
                놓친 콘텐츠도 쉽게 접할 수 있습니다.
              </p>
            </div>
            {/* <!-- 오른쪽 이미지 박스 --> */}
            <div className="w-full lg:w-[508px] h-[220px] 
              mt-[20px] lg:mt-0 lg:ml-[100px]"
            >
              <img 
                src="/images/PeopleImage.png"
                className="rounded-[20px]"  
                alt="이미지" 
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1480px] w-full bg-gray mx-auto mt-[60px] pb-[662px] px-4 md:px-8">
        {/* 헤더 영역 */}
        <h1 className="text-black text-[32px] md:text-[44px] font-bold 
          leading-[150%] tracking-[-0.22px] md:py-10">
            자주 묻는 질문
        </h1>

        <p className="text-[#45464A] text-[24px] mb-[80px]">
          아래에서 다루지 않은 질문이 있다면, 컨퍼런스 웹사이트의 연락처 페이지를 방문하거나 지원 팀에 문의해 주세요.
        </p>

        {/* 리스트 아이템 반복 */}
        {questions.map((question, index) => (
          <div key={index} className="border-t border-black">
            <div 
              className="border-t border-black p-4 md:p-8 flex items-center 
                justify-between cursor-pointer group" 
              onClick={() => handleToggle(index)} // 클릭 시 토글
            >
              {/* 왼쪽 아이콘 + 텍스트 */}
              <div className="flex items-center gap-3 md:gap-[10px]">
                <img 
                  src="/images/Shape.png" 
                  alt="아이콘" 
                  className="w-8 md:w-[32px] h-8 md:h-[32px]" 
                />
                <span className="text-[20px] md:text-[28px] font-medium 
                  leading-[150%] tracking-[-0.14px] text-black">
                  {question}
                </span>
              </div>
              {/* 오른쪽 아이콘 */}
              <img 
                src="/images/show-icon.png" 
                alt="펼치기" 
                className={`w-4 md:w-[16px] h-4 md:h-[16px] 
                  ${activeIndex === index ? 'rotate-180' : ''} 
                  transition-transform`} 
              />
            </div>

            {/* Sub Text 목록 표시 */}
            {activeIndex === index && (
              <div>
                {/* 목록 3개 */}
                <ul className="md:p-8 text-[#45464A] text-[16px] ml-[50px] mt-[-26px]
                  md:text-[20px] font-medium leading-[150%] list-disc list-inside">
                  {detailsList[index].map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                {/* 하단 보더 선 */}
                <div className="border-t border-black"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
