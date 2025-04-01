import React from 'react';

const StreamingScreen = () => {

    const videoId = 'ydR5Zt1X8_M'; // 🎯 YouTube video ID (from the URL: https://www.youtube.com/watch?v=ydR5Zt1X8_M)


    return (
        <div className="w-full bg-gray-200 md:h-[42.6vw] h-[79.8vw] flex justify-center items-center">
            <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
            ></iframe>
        </div>
    );
};

export { StreamingScreen };
