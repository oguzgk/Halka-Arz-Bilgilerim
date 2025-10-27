import React from 'react';
import { CloseIcon } from './icons';
import { useI18n } from '../i18n';

interface AboutModalProps {
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ onClose }) => {
  const { t } = useI18n();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 dark:bg-opacity-80 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 sm:p-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t('aboutTitle')}</h2>
                <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition">
                    <CloseIcon className="w-6 h-6" />
                </button>
            </div>
            <div className="text-slate-600 dark:text-slate-300 space-y-4">
                <p>{t('aboutP1')}</p>
                <p>{t('aboutP2')}</p>
                <p>{t('aboutP3')}</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AboutModal;