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
                        eventType: 'live',
                        type: 'video',
                        maxResults: 10,
                        key: 'AIzaSyD0NkM1rBVbfJV8xzPFINk99PnqpSEGWO4',
                    },
                });

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
            {videoId ? (
                <div className="w-full h-full">
                    <YouTube videoId={videoId} opts={opts} className="w-full h-full" />
                </div>
            ) : (
                <p>Loading random live stream...</p>
            )}
        </div>
    );
};

export { StreamingScreen };
