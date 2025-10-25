import React, { useState } from 'react';
import { FiltersPanel, FilterOptions } from './FiltersModal';

interface SearchFiltersProps {
  onSearch: (query: string) => void;
  onClearAll: () => void;
  onApplyFilters: (filters: FilterOptions) => void;
  filters: FilterOptions;
  setFilters: (filters: FilterOptions) => void;
  className?: string;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({ 
  onSearch, 
  onClearAll, 
  onApplyFilters,
  filters,
  setFilters,
  className = '' 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const handleClearAll = () => {
    setSearchQuery('');
    onClearAll();
  };

  return (
    <section className={`bg-white shadow-[0px_14px_42px_rgba(8,15,52,0.06)] border flex flex-col w-full text-sm pt-[25px] pb-[25px] px-[25px] rounded-[20px] border-[rgba(240,240,240,1)] border-solid ${className}`}>
      <div className="flex flex-wrap w-full items-stretch gap-5 justify-between">
        <div className="bg-[rgba(249,249,249,1)] border flex gap-4 text-black font-normal pb-4 px-4 rounded-xl border-[rgba(240,240,240,1)] border-solid flex-1 min-w-[200px]">
          <img
            src="https://api.builder.io/api/v1/image/assets/f16bc7bb09694689bc28cb8eb3e754f2/5d36103bbe2165f4d896dc02f186971a91b7d9eb?placeholderIfAbsent=true"
            alt="Search"
            className="aspect-[1] object-contain w-4 shrink-0 mt-4"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search rooms, subjects, or hosts..."
            className="basis-auto grow shrink bg-transparent outline-none pt-4"
          />
        </div>
        <div className="flex items-stretch gap-3 font-semibold text-center">
          <button
            onClick={() => setShowFilters((prev) => !prev)}
            className="flex flex-row items-center justify-center gap-2 px-5 py-3.5 rounded-xl shadow-md bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white hover:from-violet-700 hover:to-fuchsia-600 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-violet-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414A1 1 0 0013 13.414V19a1 1 0 01-1.447.894l-2-1A1 1 0 009 18v-4.586a1 1 0 00-.293-.707L2.293 6.707A1 1 0 012 6V4z" /></svg>
            <span>Filter</span>
          </button>
          <button 
            onClick={handleClearAll}
            className="flex flex-row items-center justify-center gap-2 px-5 py-3.5 rounded-xl shadow-md bg-gray-100 text-violet-700 hover:bg-gray-200 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-violet-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            <span>Clear All</span>
          </button>
        </div>
      </div>
      {showFilters && (
        <div className="w-full mt-4">
          <FiltersPanel
            filters={filters}
            onChange={setFilters}
            onApply={() => onApplyFilters(filters)}
            onClear={onClearAll}
          />
        </div>
      )}
      {/* Pagination controls (example, expects props for pagination) */}
      {/*
      <div className="w-full mt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          totalResults={totalResults}
          resultsPerPage={resultsPerPage}
        />
      </div>
      */}
    </section>
  );
};
