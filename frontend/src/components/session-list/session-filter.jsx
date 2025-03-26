import React, { useEffect, useState } from 'react';
import { getAllSessions } from '~/api/session/get-all-session';

function SessionFilter({ onFilterChange, token }) {
  const [tagOptions, setTagOptions] = useState({
    fields: [],
    topics: [],
    types: [],
    levels: [],
  });

  const [selectedFilters, setSelectedFilters] = useState({
    category: '',
    topic: '',
    contentType: '',
    level: '',
  });

  // ✅ 태그 옵션을 세션들에서 추출
  useEffect(() => {
    async function fetchTags() {
      try {
        const sessions = await getAllSessions(token);
        const fieldSet = new Set();
        const topicSet = new Set();
        const typeSet = new Set();
        const levelSet = new Set();

        sessions.forEach((session) => {
          const { tags } = session;
          if (!tags) return;

          if (tags.field) fieldSet.add(tags.field);
          if (tags.topic) topicSet.add(tags.topic);
          if (tags.type) typeSet.add(tags.type);
          if (tags.level) levelSet.add(tags.level);
        });

        setTagOptions({
          fields: Array.from(fieldSet),
          topics: Array.from(topicSet),
          types: Array.from(typeSet),
          levels: Array.from(levelSet),
        });
      } catch (err) {
        console.error('태그 필터 정보 로딩 실패:', err);
      }
    }

    fetchTags();
  }, [token]);

  // ✅ 필터 선택 시 상태 업데이트 및 상위로 전달
  const handleFilterChange = (field, value) => {
    const updatedFilters = { ...selectedFilters, [field]: value };
    setSelectedFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="flex flex-col items-start justify-start flex-wrap gap-4 p-4 bg-white rounded-lg w-fit">
      <div className="flex gap-4 flex-wrap">
        {/* 중점분야 필터 */}
        <select
          className="border border-gray-300 rounded-md px-4 py-2"
          value={selectedFilters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
        >
          <option value="">중점분야 선택</option>
          {tagOptions.fields.map((field) => (
            <option key={field} value={field}>
              {field}
            </option>
          ))}
        </select>

        {/* 주제 필터 */}
        <select
          className="border border-gray-200 rounded-md px-4 py-2"
          value={selectedFilters.topic}
          onChange={(e) => handleFilterChange('topic', e.target.value)}
        >
          <option value="">주제 선택</option>
          {tagOptions.topics.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>

        {/* 콘텐츠 유형 필터 */}
        <select
          className="border border-gray-200 rounded-md px-4 py-2"
          value={selectedFilters.contentType}
          onChange={(e) => handleFilterChange('contentType', e.target.value)}
        >
          <option value="">콘텐츠 유형 선택</option>
          {tagOptions.types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        {/* 등급 필터 */}
        <select
          className="border border-gray-200 rounded-md px-4 py-2"
          value={selectedFilters.level}
          onChange={(e) => handleFilterChange('level', e.target.value)}
        >
          <option value="">등급 선택</option>
          {tagOptions.levels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default SessionFilter;
