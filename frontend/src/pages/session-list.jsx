// src/pages/SessionList.jsx

import React, { Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';

// 💡 lazy 로딩
const LiveSessionList = lazy(() => import('~/components/session-list/live-session-list'));
const AllSessionList = lazy(() => import('~/components/session-list/all-session-list'));

// 💡 스켈레톤 컴포넌트
import {SkeletonLiveSessionList} from '~/components/session-list/skeleton-live-session-list';
import {SkeletonAllSessionList} from '~/components/session-list/skeleton-all-session-list';

export default function SessionList() {
  const token = useSelector((state) => state.auth.token);

  return (
    <div className="flex flex-col min-h-screen mx-[8.4vw] py-8">
      <Suspense fallback={<SkeletonLiveSessionList />}>
        <LiveSessionList token={token} />
      </Suspense>

      <div className="h-8" />

      <Suspense fallback={<SkeletonAllSessionList />}>
        <AllSessionList token={token} />
      </Suspense>
    </div>
  );
}
