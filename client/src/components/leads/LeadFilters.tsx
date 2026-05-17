import React from 'react';
import { LeadFilters } from '../../types';
import { Search } from 'lucide-react';

interface Props {
  filters: LeadFilters;
  onFilterChange: (filters: Partial<LeadFilters>) => void;
}

const LeadFiltersComponent: React.FC<Props> = ({ filters, onFilterChange }) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex flex-wrap gap-3">
      <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 flex-1 min-w-48">
        <Search size={15} className="text-gray-400 dark:text-gray-500 mr-2" />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => onFilterChange({ search: e.target.value, page: 1 })}
          placeholder="Search by name or email..."
          className="text-sm outline-none w-full bg-transparent dark:text-white dark:placeholder-gray-400"
        />
      </div>
      <select
        value={filters.status}
        onChange={(e) => onFilterChange({ status: e.target.value, page: 1 })}
        className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="">All Statuses</option>
        <option value="New">New</option>
        <option value="Contacted">Contacted</option>
        <option value="Qualified">Qualified</option>
        <option value="Lost">Lost</option>
      </select>
      <select
        value={filters.source}
        onChange={(e) => onFilterChange({ source: e.target.value, page: 1 })}
        className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="">All Sources</option>
        <option value="Website">Website</option>
        <option value="Instagram">Instagram</option>
        <option value="Referral">Referral</option>
      </select>
      <select
        value={filters.sort}
        onChange={(e) => onFilterChange({ sort: e.target.value as 'latest' | 'oldest', page: 1 })}
        className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="latest">Latest First</option>
        <option value="oldest">Oldest First</option>
      </select>
    </div>
  );
};

export default LeadFiltersComponent;