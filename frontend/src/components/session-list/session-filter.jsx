import React, { useEffect, useState } from 'react';
import { getAllSessions } from '~/api/session/get-all-session';
import { ChevronDown } from 'lucide-react';

const CustomSelect = ({ label, options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option === '__RESET__' ? '' : option);
    setIsOpen(false);
  };

  return (
    <div className="relative min-w-[140px] w-auto">
      <button
        className="w-full h-[52px] bg-white border border-gray-300 rounded-md px-4 text-[20px] font-bold text-left flex items-center justify-between whitespace-nowrap"
        onClick={() => setIsOpen((prev) => !prev)}
        type="button"
      >
        <span className="truncate">{value || label}</span>
        <ChevronDown size={20} />
      </button>
      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow max-h-60 overflow-auto">
          <li
            className="px-4 py-2 text-[18px] text-gray-500 italic hover:bg-gray-100 cursor-pointer"
            onClick={() => handleSelect('__RESET__')}
          >
            전체
          </li>
          {options.map((opt) => (
            <li
              key={opt}
              className="px-4 py-2 text-[18px] hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(opt)}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default function SessionFilter({ onFilterChange, token }) {
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

        sessions.forEach(({ tags }) => {
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

    if (token) fetchTags();
  }, [token]);

  const handleFilterChange = (field, value) => {
    const updated = { ...selectedFilters, [field]: value };
    setSelectedFilters(updated);
    onFilterChange(updated);
  };

  return (
    <div className="flex gap-2 flex-wrap items-center">
      <CustomSelect
        label="분야"
        options={tagOptions.fields}
        value={selectedFilters.category}
        onChange={(val) => handleFilterChange('category', val)}
      />
      <CustomSelect
        label="주제"
        options={tagOptions.topics}
        value={selectedFilters.topic}
        onChange={(val) => handleFilterChange('topic', val)}
      />
      <CustomSelect
        label="유형"
        options={tagOptions.types}
        value={selectedFilters.contentType}
        onChange={(val) => handleFilterChange('contentType', val)}
      />
      <CustomSelect
        label="난이도"
        options={tagOptions.levels}
        value={selectedFilters.level}
        onChange={(val) => handleFilterChange('level', val)}
      />
    </div>
  );
}
