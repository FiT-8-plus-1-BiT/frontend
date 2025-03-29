import React from 'react';
import { useSelector } from 'react-redux';
import AllSessionList from '~/components/session-list/all-session-list';
import LiveSessionList from '~/components/session-list/live-session-list';
export default function SessionList() {
  const token = useSelector((state) => state.auth.token);

  return (
    <div className="flex flex-col min-h-screen mx-[8.4vw] py-8">
      <LiveSessionList token={token} />
      <AllSessionList token={token} />
    </div>
  );
}
