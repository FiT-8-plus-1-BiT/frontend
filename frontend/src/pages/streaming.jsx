import React from "react";
import { StreamingSwitchButton } from "~/components/streaming/streaming-switch-button";
import { StreamingSessionNavbar } from "~/components/streaming/streaming-session-navbar";
import { StreamingScreen } from "~/components/streaming/streaming-screen";
import { StreamingChatBox } from "~/components/streaming/streaming-chat-box";

export default function Streaming() {

    return (
        <div>
            <StreamingSwitchButton />
            <div className="flex gap-3">
                <StreamingSessionNavbar />
                <StreamingScreen />
                <StreamingChatBox/>
            </div>

        </div>
    )
}