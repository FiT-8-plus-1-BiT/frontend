import React from "react";
import { StreamingSwitchButton } from "~/components/streaming/streaming-switch-button";
import { StreamingSessionNavbar } from "~/components/streaming/streaming-session-navbar";
import { StreamingScreen } from "~/components/streaming/streaming-screen";
import { StreamingChatBox } from "~/components/streaming/streaming-chat-box";
import { StreamingInformation } from "~/components/streaming/streaming-information";

export default function Streaming() {

    return (
        <div className="flex gap-[8px]">
            <StreamingSessionNavbar />
            <div className="flex flex-1 flex-col gap-[20px] max-w-[2000px]">
                <StreamingSwitchButton />
                <div className="flex gap-[8px]">
                    <StreamingScreen />
                    <StreamingChatBox />

                </div>
                <StreamingInformation />
            </div>



        </div>
    )
}