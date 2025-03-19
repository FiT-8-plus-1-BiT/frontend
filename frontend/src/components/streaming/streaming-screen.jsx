const StreamingScreen = () => {
    return (
        <div 
            className="flex-1 border border-black bg-gray-200 rounded-[5px]"
            style={{
                width: "clamp(954px, 68.125vw, 1308px)", // 가로 비율 조정 (1308px → 954px)
                height: "clamp(596px, 42.604vw, 818px)", // 세로 비율 조정 (818px → 596px)
                maxHeight: "818px"
            }}
        >
            반응형 너비 1308px & 높이 818px (최대값 제한)
        </div>
    )
}

export { StreamingScreen };
