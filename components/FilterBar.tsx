import React from 'react';
import { IPOStatus, IPOSector } from '../types';
import { SearchIcon, CalendarIcon } from './icons';
import { useI18n } from '../i18n';

interface FilterBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: IPOStatus | 'all';
  setStatusFilter: (status: IPOStatus | 'all') => void;
  sectorFilter: IPOSector | 'all';
  setSectorFilter: (sector: IPOSector | 'all') => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (order: 'asc' | 'desc') => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  sectorFilter,
  setSectorFilter,
  sortOrder,
  setSortOrder
}) => {
  const { t } = useI18n();

  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
        <div className="relative flex-grow md:mr-4">
            <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md leading-5 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-200 placeholder-gray-500 dark:placeholder-slate-400 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
            <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as IPOStatus | 'all')}
                className="w-full md:w-auto border border-gray-300 dark:border-slate-600 rounded-md py-2 px-3 bg-white dark:bg-slate-700 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
                <option value="all">{t('allStatuses')}</option>
                {Object.values(IPOStatus).map(status => (
                    <option key={status} value={status}>{t(status)}</option>
                ))}
            </select>
            <select
                value={sectorFilter}
                onChange={(e) => setSectorFilter(e.target.value as IPOSector | 'all')}
                className="w-full md:w-auto border border-gray-300 dark:border-slate-600 rounded-md py-2 px-3 bg-white dark:bg-slate-700 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
                <option value="all">{t('allSectors')}</option>
                {Object.values(IPOSector).map(sector => (
                    <option key={sector} value={sector}>{t(sector)}</option>
                ))}
            </select>
            <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="flex items-center space-x-2 border border-gray-300 dark:border-slate-600 rounded-md py-2 px-3 bg-white dark:bg-slate-700 text-sm hover:bg-gray-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
                <CalendarIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span>{t('dateSort')}: {sortOrder === 'desc' ? t('newest') : t('oldest')}</span>
            </button>
        </div>
    </div>
  );
};

export default FilterBar;