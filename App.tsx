import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { IPO, IPOStatus, IPOSector } from './types';
import { IPOS } from './constants';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import IPOList from './components/IPOList';
import IPODetailModal from './components/IPODetailModal';
import AboutModal from './components/AboutModal';
import { useI18n } from './i18n';

export type View = 'all' | 'upcoming' | 'past' | 'about';
export type Theme = 'light' | 'dark';

export default function App() {
  const [selectedIpo, setSelectedIpo] = useState<IPO | null>(null);
  const [currentView, setCurrentView] = useState<View>('all');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<IPOStatus | 'all'>('all');
  const [sectorFilter, setSectorFilter] = useState<IPOSector | 'all'>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  const [theme, setTheme] = useState<Theme>('light');

  const { language, t } = useI18n();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);


  const handleSelectIpo = useCallback((ipo: IPO) => {
    setSelectedIpo(ipo);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedIpo(null);
  }, []);
  
  const handleCloseAbout = useCallback(() => {
    setCurrentView('all');
  }, []);

  const filteredIpos = useMemo(() => {
    let ipos = [...IPOS]; // Create a mutable copy

    if (currentView === 'upcoming') {
        ipos = ipos.filter(ipo => ipo.status === IPOStatus.UPCOMING);
    } else if (currentView === 'past') {
        ipos = ipos.filter(ipo => ipo.status === IPOStatus.COMPLETED);
    }

    if (searchTerm) {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      ipos = ipos.filter(ipo =>
        ipo.companyName[language].toLowerCase().includes(lowercasedSearchTerm) ||
        t(ipo.sector).toLowerCase().includes(lowercasedSearchTerm)
      );
    }

    if (statusFilter !== 'all') {
      ipos = ipos.filter(ipo => ipo.status === statusFilter);
    }

    if (sectorFilter !== 'all') {
      ipos = ipos.filter(ipo => ipo.sector === sectorFilter);
    }

    ipos.sort((a, b) => {
        const dateA = new Date(a.ipoDate).getTime();
        const dateB = new Date(b.ipoDate).getTime();
        return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

    return ipos;
  }, [currentView, searchTerm, statusFilter, sectorFilter, sortOrder, language, t]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans text-slate-800 dark:text-slate-200 transition-colors duration-300">
      <Header 
        currentView={currentView} 
        setCurrentView={setCurrentView}
        theme={theme}
        setTheme={setTheme}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">{t('ipoMarketplaceTitle')}</h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg">{t('ipoMarketplaceSubtitle')}</p>
        </div>
        
        <FilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          sectorFilter={sectorFilter}
          setSectorFilter={setSectorFilter}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
        
        <IPOList ipos={filteredIpos} onSelectIpo={handleSelectIpo} />
      </main>

      {selectedIpo && (
        <IPODetailModal ipo={selectedIpo} onClose={handleCloseModal} />
      )}
      
      {currentView === 'about' && (
        <AboutModal onClose={handleCloseAbout} />
      )}
    </div>
  );
}