import React from 'react';
import { IPO } from '../types';
import IPOCard from './IPOCard';
import { useI18n } from '../i18n';

interface IPOListProps {
  ipos: IPO[];
  onSelectIpo: (ipo: IPO) => void;
}

const IPOList: React.FC<IPOListProps> = ({ ipos, onSelectIpo }) => {
  const { t } = useI18n();

  if (ipos.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300">{t('noIposFound')}</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2">{t('noIposFoundSubtitle')}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {ipos.map(ipo => (
        <IPOCard key={ipo.id} ipo={ipo} onSelectIpo={onSelectIpo} />
      ))}
    </div>
  );
};

export default IPOList;