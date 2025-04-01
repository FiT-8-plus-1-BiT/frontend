import React from 'react';
import YouTube from 'react-youtube';

const StreamingScreen = () => {
    const videoId = 'FJfwehhzIhw'; // 🔹 특정 라이브 스트림 Video ID 직접 설정

    const opts = {
        width: '100%',
        height: '100%',
        playerVars: {
            autoplay: 1,
            modestbranding: 1,
            rel: 0,
        },
    };

    return (
        <div className="w-full bg-gray-200 md:h-[42.6vw] h-[79.8vw]">
            <div className="w-full h-full">
                <YouTube videoId={videoId} opts={opts} className="w-full h-full" />
            </div>
        </div>
    );
};

export { StreamingScreen };
