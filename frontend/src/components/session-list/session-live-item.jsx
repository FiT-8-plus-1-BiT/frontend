import React from 'react';

/**
 * 단일 강연(세션) 아이템을 보여주는 컴포넌트
 * props:
 *  - thumbnail: 썸네일 이미지 URL
 *  - title: 강연(세션) 제목
 *  - description: 강연 내용 요약
 *  - tags: 태그 배열
 *  - speaker: 강연자 이름
 */
function LiveSessionItem({ thumbnail, title, description, speaker }) {
  return (
    <div className="lecture_container flex flex-col items-start w-[520px]">
      {/* 썸네일 영역 */}
      <div className="flex justify-center items-center self-stretch bg-white">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="w-[520px] h-[292px] object-cover"
          />
        ) : (
          // 썸네일이 없으면 SVG 플레이스홀더
          <svg
            width={520}
            height={292}
            viewBox="0 0 520 292"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <path d="M0 0H520V362H0V0Z" fill="#D9D9D9" />
            <path d="M0 0H520V362H0V0Z" fill="url(#pattern0_1234_1716)" />
            <defs>
              <pattern
                id="pattern0_1234_1716"
                patternContentUnits="objectBoundingBox"
                width={1}
                height={1}
              >
                <use
                  xlinkHref="#image0_1234_1716"
                  transform="matrix(0.00390625 0 0 0.00561119 0 -0.218232)"
                />
              </pattern>
              <image
                id="image0_1234_1716"
                width={256}
                height={256}
                preserveAspectRatio="none"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAAAXNSR0IArs4c6QAACixJREFUeF7t3TFSJEAMQ9HhBNz/jESkJLuH+EGXym9zirKxvmUx9H79/f39+4R/v7+/4as/n+/v7/T1vr/+lwG6Pn9fAABARUAAvA1gAOBAiv4/AAAAaYCuWzD1c2BFQBXAHAAHUOaPAxjPwAAAAAAgdKBu4NcOEAAAIIz/hwPgALZDkNcE9v1lAIXA1YFwABxAmT8OgAPgAIqCOAAOoMwPBzBOYAAAAAAIHagEJEACDOM3fwLJAGQAZf7nBXB9AQAAAABA6MC6AwUAAAjj73MAACCESwK6bkHV/zaD+fr5+UnvAfgBvv0B6r/+lw0EABxMmR8PuoyfkAAAAAAQOrDuwAAAAML4e9INAMYt0HqKuz6A+v/2o/QcAAfAAYQOrAMYAAAgjL8TAACcAElALPBbC3y9/xwAB5AAtr4BAcAHgQggdAAAtj+IxAFwAEH+MoB1AAIAAABA6AAACAHD+Phruus3+Ov6OQAOIAFsfQO+FuDr7w8AAAAAoQPrAAQAAAjjLwScB4D/Hnz71zivLaTvv/1BJk+CCTGTAwAAAEgDtG6hCGBbANfnjwPgABLAAXAbgAAAAAAQOrAOQAAAgDD+PsgEAH6NlgR0/QZV/9vfQnEAHEAC2PoGvA4gAAAAAAgdWAcgAABAGH8ZAADIAJKArltQ9csAkoDWCUwAbwVwvf9OACcAAIcOrC8gAACAMP4yAACQASQBXbeg6n97AnEAHEAC2PoGvA4gAAAAAAgdWAcgAABAGH8ZAADIAJKArltQ9csAkoDWCUwAbwVwvf8eBOFgEoCvC2i9fgAAAAAIHQAAIVoYHyGaE86bgElA6wQmgLcCuN5/J4ATAIBDB9YXEAAAQBh/T5oBgAwgCei6BVX/2xOIA+AAEsDWN+B1AAEAAABA6MA6AAEAAML4ywAAQAaQBHTdgqpfBpAEtE5gAngrgOv9dwI4AQA4dGB9AQEAAITxlwEAgAwgCei6BVX/2xOIA+AAEsDWN+B1AHkSjINJALguoPX6AQAAACB0AABY6DA+QjQnxNsn0TgADiABbH0DXgcQAAAAAIQOrAMQAAAgjL8nzQBABpAEdN2Cql8GkAS0TmACeCuA6/13AjgBADh0YH0BAQAAhPGXAQCADCAJ6LoFVf/bE4gD4AASwNY34HUAAQAAAEDowDoAAQAAwvjLAABABpAEdN2Cql8GkAS0TmACeCuA6/33IAgHkwB8XUDr9QMAAABA6AAACNHC+AjRnHDeBEwCWicwAbwVwPX+OwGcAAAcOrC+gAAAAML4e9IMAGQASUDXLaj6355AHAAHkAC2vgGvAwgAAAAAQgfWAQgAABDGXwYAADKAJKDrFlT9MoAkoHUCE8BbAVzvvxPACQDAoQPrCwgAACCMvwwAAGQASUDXLaj6355AHAAHkAC2vgGvA8iTYBxMAsB1Aa3XDwAAAAChAwDAQofxEaI5Id4+icYBcAAJYOsb8DqAAAAAACB0YB2AAAAAYfw9aQYAMoAkoOsWVP0ygCSgdQITwFsBXO+/E8AJAMChA+sLCAAAIIy/DAAAZABJQNctqPrfnkAcAAeQALa+Aa8DCAAAAABCB9YBCAAAEMZfBgAAMoAkoOsWVP0ygCSgdQITwFsBXO+/B0E4mATg6wJarx8AAAAAQgcAQIgWxkeI5oTzJmAS0DqBCeCtAK733wngBADg0IH1BQQAABDG35NmACADSAK6bkHV//YE4gA4gASw9Q14HUAAAAAAQOrAOQAAAgDD+MgAAkAEkAV23oOqXASQBrROYAN4K4Hr/nQBOAAAOHVhfQAAAAGH8ZQAAIANIArpuQdX/9gTiADiABLD1DXgdQAAAAAAQOrAM4BAAA4Dc/pZ9ck1kH4f/Pz+Z7oBAAAAElFTkSuQmCC"
              />
            </defs>
          </svg>
        )}
      </div>

      {/* 텍스트/메타 영역 */}
      <div className="flex flex-col items-start gap-2 self-stretch">
        {/* 제목 & 담기 버튼 */}
        <div className="flex justify-between items-start self-stretch">
          <div className="text text-[#131212] font-['Pretendard'] text-[1.75rem] font-bold leading-[150%]">
            {title}
          </div>
          <div className="flex flex-col justify-center items-center gap-2 h-10 border border-[#85878d] cursor-pointer">
            <div className="state-layer flex justify-center items-center gap-2 self-stretch py-2 pl-4 pr-6">
              <svg
                width={18}
                height={18}
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.25 9.75H3.75V8.25H8.25V3.75H9.75V8.25H14.25V9.75H9.75V14.25H8.25V9.75Z"
                  fill="#85878D"
                />
              </svg>
              <div className="label-text text-[#85878d] text-center font-['Pretendard'] text-sm font-semibold leading-[140%]">
                담기
              </div>
            </div>
          </div>
        </div>

        {/* 강연자 */}
        <div className="self-stretch text-[#131212] font-['Pretendard'] font-medium leading-[150%]">
          {speaker}
        </div>

        {/* 설명(최대 4줄까지 표시) */}
        <div className="self-stretch text-[#85878d] font-['Pretendard'] text-sm leading-[150%] line-clamp-4">
          {description}
        </div>

        {/* 혼잡도 (예시) */}
        <div className="flex items-center gap-5 self-stretch">
          <div className="text-[#131212] font-['Pretendard'] font-medium leading-[150%]">
            혼잡도
          </div>
          <div className="text-3 text-[#a9abb4] font-['Pretendard'] text-xl font-medium leading-[150%]">
            ●●○
          </div>
        </div>

        {/* 태그 목록 */}
        <div className="flex flex-wrap items-center content-center gap-2 self-stretch">
          {tags?.map((tag, index) => (
            <div
              key={index}
              className="flex justify-center items-center h-8 rounded bg-[#f4f4f4]"
            >
              <div className="flex justify-center items-center gap-2 py-1 px-4 h-8 label-text text-[#606166] text-center font-['Pretendard'] text-sm font-semibold leading-[140%]">
                {tag}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { LiveSessionItem };
