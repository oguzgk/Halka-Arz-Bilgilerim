import React from 'react';
import { useI18n } from '../i18n';
import { View, Theme } from '../App';
import { SunIcon, MoonIcon } from './icons';

interface HeaderProps {
    currentView: View;
    setCurrentView: (view: View) => void;
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const NavLink: React.FC<{
    isActive: boolean;
    onClick: () => void;
    children: React.ReactNode;
}> = ({ isActive, onClick, children }) => (
    <button
        onClick={onClick}
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
            isActive
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-white'
        }`}
    >
        {children}
    </button>
);

const Header: React.FC<HeaderProps> = ({ currentView, setCurrentView, theme, setTheme }) => {
    const { language, setLanguage, t } = useI18n();

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'tr' : 'en');
    };

    return (
        <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg sticky top-0 z-40 shadow-sm">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                             <span className="text-2xl font-bold text-blue-600">{t('appTitle')}</span>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <NavLink isActive={currentView === 'all'} onClick={() => setCurrentView('all')}>{t('navAll')}</NavLink>
                                <NavLink isActive={currentView === 'upcoming'} onClick={() => setCurrentView('upcoming')}>{t('navUpcoming')}</NavLink>
                                <NavLink isActive={currentView === 'past'} onClick={() => setCurrentView('past')}>{t('navPast')}</NavLink>
                                <NavLink isActive={currentView === 'about'} onClick={() => setCurrentView('about')}>{t('navAbout')}</NavLink>
                            </div>
                        </div>
                        <div className="flex items-center ml-4">
                            <button
                                onClick={toggleTheme}
                                role="switch"
                                aria-checked={theme === 'dark'}
                                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${
                                    theme === 'dark' ? 'bg-blue-600' : 'bg-gray-200 dark:bg-slate-700'
                                }`}
                                aria-label="Toggle dark mode"
                            >
                                <span
                                    aria-hidden="true"
                                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                        theme === 'dark' ? 'translate-x-5' : 'translate-x-0'
                                    }`}
                                >
                                    <span className={`absolute inset-0 flex h-full w-full items-center justify-center transition-opacity duration-200 ease-in-out ${
                                        theme === 'dark' ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200'
                                    }`}>
                                        <SunIcon className="h-3 w-3 text-gray-400" />
                                    </span>
                                    <span className={`absolute inset-0 flex h-full w-full items-center justify-center transition-opacity duration-200 ease-in-out ${
                                        theme === 'dark' ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100'
                                    }`}>
                                        <MoonIcon className="h-3 w-3 text-blue-600" />
                                    </span>
                                </span>
                            </button>
                             <button
                                onClick={toggleLanguage}
                                className="ml-4 px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-slate-700 dark:text-slate-300 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600"
                            >
                                {language === 'en' ? 'TR' : 'EN'}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;