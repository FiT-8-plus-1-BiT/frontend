import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = [];

  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, startPage + 4);

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center items-center gap-[36px] mt-8 text-gray-800">
      {/* 처음으로 */}
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="disabled:opacity-30"
      >
        <ChevronsLeft size={20} />
      </button>


      {/* 숫자 버튼 */}
      <div className="flex items-center gap-6">
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-[36px] h-[36px] flex items-center justify-center text-[16px] rounded
              ${page === currentPage ? 'font-bold text-black' : 'text-gray-700'}`}
          >
            {page}
          </button>
        ))}
      </div>

  

      {/* 마지막으로 */}
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="disabled:opacity-30"
      >
        <ChevronsRight size={20} />
      </button>
    </div>
  );
}
