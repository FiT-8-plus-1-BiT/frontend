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

  const handleFilterChange = (field, value) => {
    const updatedFilters = { ...selectedFilters, [field]: value };
    setSelectedFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const buttonStyle =
    'border border-gray-300 rounded-md px-4 py-2 text-sm text-bold bg-white text-[#131212] min-w-[80px]';

  return (
    <div className="flex gap-2 flex-wrap items-center">
      {/* 분야 */}
      <select
        className={buttonStyle}
        value={selectedFilters.category}
        onChange={(e) => handleFilterChange('category', e.target.value)}
      >
        <option value="">분야</option>
        {tagOptions.fields.map((field) => (
          <option key={field} value={field}>
            {field}
          </option>
        ))}
      </select>

      {/* 주제 */}
      <select
        className={buttonStyle}
        value={selectedFilters.topic}
        onChange={(e) => handleFilterChange('topic', e.target.value)}
      >
        <option value="">주제</option>
        {tagOptions.topics.map((topic) => (
          <option key={topic} value={topic}>
            {topic}
          </option>
        ))}
      </select>

      {/* 유형 */}
      <select
        className={buttonStyle}
        value={selectedFilters.contentType}
        onChange={(e) => handleFilterChange('contentType', e.target.value)}
      >
        <option value="">유형</option>
        {tagOptions.types.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      {/* 난이도 */}
      <select
        className={buttonStyle}
        value={selectedFilters.level}
        onChange={(e) => handleFilterChange('level', e.target.value)}
      >
        <option value="">난이도</option>
        {tagOptions.levels.map((level) => (
          <option key={level} value={level}>
            {level}
          </option>
        ))}
      </select>
    </div>

  );
}

export default SessionFilter;
