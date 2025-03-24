import React, { useState } from 'react';

const categories = [
  'AI',
  'Blockchain',
  'Design',
  'Cloud',
  'Cybersecurity',
  'Data Science',
];
const topics = [
  'Neural Networks',
  'Decentralized Finance',
  'User Experience',
  'Infrastructure',
  'Network Security',
  'Data Analysis',
];
const contentTypes = ['Lecture', 'Panel Discussion', 'Workshop'];
const levels = ['Beginner', 'Intermediate', 'Advanced'];
const tags = [
  'Machine Learning',
  'Web3',
  'Product Design',
  'AWS',
  'Hacking',
  'Big Data',
  'Analytics',
  'DevOps',
];

function SessionFilter({ onFilterChange }) {
  const [selectedFilters, setSelectedFilters] = useState({
    category: '',
    topic: '',
    contentType: '',
    level: '',
    tags: [],
  });

  // 필터 변경 핸들러
  const handleFilterChange = (field, value) => {
    const updatedFilters = { ...selectedFilters, [field]: value };
    setSelectedFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  // 태그 체크박스 선택/해제
  const handleTagToggle = (tag) => {
    const updatedTags = selectedFilters.tags.includes(tag)
      ? selectedFilters.tags.filter((t) => t !== tag) // 선택 해제
      : [...selectedFilters.tags, tag]; // 선택 추가

    handleFilterChange('tags', updatedTags);
  };

  return (
    <div className="flex flex-col items-start justify-start flex-wrap gap-4 p-4 bg-white rounded-lg w-fit">
      <div className="flex gap-4 ">
        {/* 중점분야 필터 */}
        <select
          className="border border-gray-300 rounded-md px-4 py-2"
          value={selectedFilters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
        >
          <option value="">중점분야 선택</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
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
          {topics.map((topic) => (
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
          {contentTypes.map((type) => (
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
          {levels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>

      {/* 태그 필터 (체크박스) */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <label key={tag} className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox text-blue-500"
              checked={selectedFilters.tags.includes(tag)}
              onChange={() => handleTagToggle(tag)}
            />
            <span className="text-gray-700 text-sm">{tag}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default SessionFilter;
