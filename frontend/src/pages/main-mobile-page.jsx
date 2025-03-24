import React, { useState } from 'react';

const MobileMainPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['시간정보', 'Tab', 'Tab', 'Tab', 'Tab'];

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-[375px] min-h-[5338px] bg-white overflow-y-auto">
      {/* Status bar */}
      <div className="w-full h-[44px] bg-white"></div>

      {/* Header */}
      <div className="mx-4 my-2 h-[32px] flex items-center">
        <img src="./images/icon.png" alt="Icon" className="w-8 h-8" />
        <img src="./images/logo (1).png" alt="Logo 1" className="w-8 h-8 ml-1" />
        <img src="./images/Heading (2).png" alt="Logo 2" className="w-[34px] h-[16px]" />
        <img src="./images/icon.png" alt="Menu" className="w-8 h-8 ml-auto" />
      </div>

      {/* Main image */}
      <div className="mx-3 mt-2 mb-10 bg-gray-200 w-[351px] h-[336px]"></div>

      {/* Secondary image */}
      <div className="mx-5 mb-5 bg-gray-200 w-[335px] h-[168px]"></div>
      {/* Timeline and speaker info */}
      <div className="mx-5 mb-[245px]">
        <h2 className="text-black text-2xl font-bold leading-[150%] tracking-[-0.12px] mb-3">타임테이블 및 연사정보</h2>
        <h3 className="text-black text-xl font-bold leading-[150%] mb-3">주요연사</h3>
        <p className="text-black text-sm font-semibold leading-[140%] tracking-[-0.5px]">Sub text</p>
      </div>

      {/* Repeat secondary image and info */}
      <div className="mx-5 mb-5 bg-gray-200 w-[335px] h-[168px]"></div>
      <div className="mx-5 mb-[245px]">
        <h2 className="text-black text-2xl font-bold leading-[150%] tracking-[-0.12px] mb-3">타임테이블 및 연사정보</h2>
        <h3 className="text-black text-xl font-bold leading-[150%] mb-3">주요연사</h3>
        <p className="text-black text-sm font-semibold leading-[140%] tracking-[-0.5px]">Sub text</p>
      </div>

      <div className="mx-5 mb-[24px]">
        <h2 className="text-black text-2xl font-bold leading-[150%] tracking-[-0.12px] mb-3">타임테이블 및 연사정보</h2>
        <h3 className="text-black text-xl font-bold leading-[150%] mb-[24px]">주요연사</h3>
        <p className="text-black text-sm font-semibold leading-[140%] tracking-[-0.5px]">Sub text</p>
      </div>

      {/* Lecture cards */}
      <div className="flex overflow-x-auto gap-5 mx-5 mb-10">
        {[1, 2, 3].map((_, index) => (
          <div key={index} className="bg-white p-10 w-[335px] flex-shrink-0 flex flex-col items-start">
            <p className="text-[#45464A] h-[26px] w-full mb-5">time:time ~ time:time</p>
            <h3 className="text-black text-2xl font-bold leading-[150%] tracking-[-0.18px] w-full mb-5">강연 제목</h3>
            <hr className="w-full mb-10 border-gray-300" />
            <p className="text-black text-sm font-medium leading-[150%] tracking-[-0.5px] w-full h-6 mb-5">more info</p>
            <div className="flex flex-wrap gap-2 mb-auto">
              {["Label 1", "Label 2", "Label 3"].map((label, idx) => (
                <span key={idx} className="bg-[#45464A] text-white text-xs font-semibold leading-[140%] tracking-[-0.5px] px-[10px] py-1 rounded flex items-center justify-center h-8">
                  {label}
                </span>
              ))}
            </div>
            <div className="flex items-center mt-5">
              <div className="w-10 h-10 bg-gray-400 rounded-full mr-3"></div>
              <p className="text-[#131212] text-lg font-medium leading-[150%]">강연자 이름</p>
            </div>
          </div>
        ))}
      </div>

      {/* Timetable */}
      <div className="mx-5 mb-3 mt-[56px]">
        <h2 className="text-black text-xl font-bold leading-[150%] mb-3">타임테이블</h2>
        <p className="text-black text-sm font-semibold leading-[140%] tracking-[-0.5px] mb-[24px]">Sub text</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-row items-center mx-5 mb-[36px]">
        {tabs.map((tab, index) => (
          <span
            key={index}
            className={`text-lg font-bold px-[12px] py-[8px] cursor-pointer relative ${
              index === activeTab ? 'text-black' : 'text-[#85878D]'
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab}
            {index === activeTab && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black"></span>
            )}
          </span>
        ))}
      </div>

      {/* Schedule items */}
      {[1, 2, 3, 4, 5].map((_, index) => (
        <div key={index} className="mx-5 mb-5 p-5 w-[335px] h-[240px] border border-gray-300 rounded">
          <button className="bg-[#45464A] text-white px-4 py-[6px] rounded text-sm mb-2">호수정보</button>
          <h3 className="text-xl font-bold mb-5">Title</h3>
          <hr className="border-t border-[#E0E1E4] my-5" />
          <p className="text-xs font-medium mb-[31px]">time:time ~ time:time</p>
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            <span className="ml-3 text-base font-medium">닉네임</span>
          </div>
        </div>
      ))}

      {/* Additional sections */}
      <div className="mx-5 mb-6 mt-[40px]">
        <h2 className="text-2xl font-bold leading-[150%] tracking-[-0.12px] mb-3">Title</h2>
        <h3 className="text-xl font-bold leading-[150%] mb-6">Subtitle</h3>
        <p className="text-sm font-semibold leading-[140%] tracking-[-0.5px] mb-[24px]">Sub text</p>
      </div>

      {/* Floor buttons and image */}
      <div className="mx-5 mb-5">
        <div className="flex mb-4">
          <button className="w-[61px] h-[40px] bg-black text-white mr-2 py-[8px] font-bold">1층</button>
          <button className="w-[61px] h-[40px] bg-black text-white font-bold">2층</button>
        </div>
        <div className="bg-gray-200 w-[335px] h-[384px]"></div>
      </div>

      {/* Info cards */}
      {[1, 2].map((_, index) => (
        <div key={index} className="mx-5 mb-5">
          <div className="bg-gray-200 w-[335px] h-[156px]"></div>
          <div className="p-3 pt-5">
            <h3 className="text-base font-semibold leading-[150%] tracking-[-0.5px] mb-5">
              현장에서 자유롭게 세션을<br />
              이동하며 들을 수 있어요
            </h3>
            <p className="text-xs font-normal leading-[140%] tracking-[-0.5px]">
              국회의원이 회기전에 체포 또는 구금된 때에는<br />
              현행범인이 아닌 한 국회의 요구가 있으면 회기중 석방된다.<br />
              대한민국의 영토는 한반도와 그 부속도서로 한다.
            </p>
          </div>
        </div>
      ))}

      {/* FAQ section */}
      <div className="mx-5 mb-[31px]">
      <h2 className="text-3xl font-bold leading-[150%] tracking-[-0.22px] pt-[20px]">
        헤더 영역입니다
      </h2>
      <h3 className='w-[327px] h-[20px] text-xl font-medium mt-[12px] mb-[24px]'>
        sub Text
      </h3>
      {['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'].map((item, index) => (
            <div key={index} className="border-t border-black">
            <div className="p-4 flex items-center justify-between cursor-pointer" onClick={() => handleToggle(index)}>
            <div className="flex items-center gap-3 py-[16px]">
            <img src="./images/icon.png" alt="Icon" className="w-8 h-8" />
            <span className="text-xl font-medium leading-[150%] tracking-[-0.14px] text-black">
              {item}
            </span>
          </div>
          <img
            src="./images/show-icon.png"
            alt="Toggle"
            className={`w-4 h-4 transition-transform ${activeIndex === index ? 'rotate-180' : ''}`}
          />
          </div>
          {activeIndex === index && (
            <div className="p-4 text-[#45464A] text-base font-medium leading-[150%]">
              Sub Text
            </div>
          )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileMainPage;
