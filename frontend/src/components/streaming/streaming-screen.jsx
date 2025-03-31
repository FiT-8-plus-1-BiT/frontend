import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import axios from 'axios';

const StreamingScreen = () => {
    const [videoId, setVideoId] = useState(null);

    useEffect(() => {
        const fetchRandomLiveStream = async () => {
            try {
                const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
                    params: {
                        part: 'id,snippet',
                        eventType: 'live', // 현재 진행 중인 라이브 스트림만 가져오기
                        type: 'video',
                        maxResults: 10, // 최대 10개의 결과를 가져옴
                        key: 'AIzaSyC-ZK40egZfm69Uew16O1fWV4J5CEGgOmg', // API 키 입력
                    },
                });

                // 랜덤으로 하나의 비디오 ID 선택
                const items = response.data.items;
                if (items && items.length > 0) {
                    const randomIndex = Math.floor(Math.random() * items.length);
                    const randomVideoId = items[randomIndex]?.id?.videoId;
                    setVideoId(randomVideoId);
                }
            } catch (error) {
                console.error('Error fetching live stream:', error);
            }
        };

        fetchRandomLiveStream();
    }, []);

    const opts = {
        height: '655',
        width: '1275',
        playerVars: {
            autoplay: 1, // 자동 재생
            modestbranding: 1, // YouTube 로고 숨김
            rel: 0, // 관련 동영상 표시 안함
        },
    };

    return (
        <div className="w-full">
            {videoId ? (
                <YouTube videoId={videoId} opts={opts} />
            ) : (
                <p>Loading random live stream...</p>
            )}
        </div>
    );
};

export { StreamingScreen };

