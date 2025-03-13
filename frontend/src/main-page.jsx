import React, { useEffect } from "react";
import Navbar from "~/components/Navbar.jsx";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const MainPage = () => {
  // 애니메이션 컨트롤러 생성
  const controls = useAnimation();
  // 화면에 요소가 보이는지 감지하는 훅 (threshold: 0.2 = 20% 보이면 트리거)
  const { ref, inView } = useInView({ threshold: 0.2 });

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

      <div className="flex justify-center px-[220px] h-[812px] mb-[40px]">
        {/* 왼쪽: 이미지 */}
        <div className="w-[740px] h-full bg-gray-300">
          {/* 이미지가 들어갈 부분 */}
        </div>

        {/* 오른쪽: 텍스트 */}
        <div className="flex flex-col justify-center w-[740px] 
          h-full px-[40px]">
          {/* 첫 번째 텍스트 */}
          <h1 className="text-[40px] font-[700] leading-[150%] 
            tracking-[-0.2px] text-left pt-[237px] pb-[60px]">
            8 + 1 그 이상의 기술력
          </h1>

          {/* 두 번째 텍스트 */}
          <p className="text-[24px] font-[500] leading-[150%] 
            tracking-[-0.12px] text-left block w-full pl-0 px-[40px] pb-[237px]">
            핀테크는 금융의 미래를 열어갑니다.<br />
            최신 기술을 통한 혁신적 접근으로<br /> 
            사용자에게 딱 맞는 금융 경험을 창출합니다.
            <br /><br />
            맞춤형 핀테크 경험을 만들어가는 길잡이들과 함께<br /> 
            기술력을 활용하여 서비스를 만드는 여정을 떠나요
          </p>
        </div>
      </div>

      <div className="flex justify-center px-[220px] mb-[40px] mt-[40px]">
        {/* 왼쪽: 이미지 */}
        <div className="w-[812px] max-w-[812px] h-[692px] bg-gray-300 py-[60px] px-0">
          {/* 이미지가 들어갈 부분 */}
        </div>

        {/* 오른쪽: 텍스트 */}
        <div className="flex flex-col justify-center w-[812px] pl-[40px]">
          {/* 첫 번째 텍스트 */}
          <h1 className="text-[40px] font-[700] leading-[150%] tracking-[-0.2px] text-left mb-[60px]">
            {/* 첫 번째 텍스트 내용 */}
            나를 찾아와요
          </h1>

          {/* 두 번째 텍스트 */}
          <p className="text-[24px] font-[500] leading-[150%] tracking-[-0.12px] text-left pl-0 pb-[214px]">
            {/* 두 번째 텍스트 내용 */}
            길안내 토스 레퍼런스
            나에게 창조는 없다.
            <br /><br />
            모방만 있을 뿐.
          </p>
        </div>
      </div>

    </>
  );
};

export default MainPage;
