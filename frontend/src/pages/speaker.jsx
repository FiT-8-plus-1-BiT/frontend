// src/pages/SpeakerPage.jsx
import React from 'react';
// 필요시 발표자 스트리밍 컴포넌트도 import
import PresenterStreaming from '../components/streaming/presenter-streaming';

function SpeakerPage() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>🎙️ 발표자 전용 페이지</h1>
      <p>여기는 발표자만 들어올 수 있는 영역입니다.</p>

      {/* 예시: 발표자 오디오 스트리밍 삽입 */}
      <PresenterStreaming />
    </div>
  );
}

export default SpeakerPage;
