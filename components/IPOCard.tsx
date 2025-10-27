import React from 'react';
import { IPO, IPOStatus } from '../types';
import { CalendarIcon, PriceTagIcon, StatusIcon, ScaleIcon } from './icons';
import { useI18n } from '../i18n';

interface IPOCardProps {
  ipo: IPO;
  onSelectIpo: (ipo: IPO) => void;
}

const IPOCard: React.FC<IPOCardProps> = ({ ipo, onSelectIpo }) => {
  const { language, t } = useI18n();

  const statusColor = ipo.status === IPOStatus.UPCOMING 
    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200' 
    : 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300';
  
  const formattedDate = (dateStr: string, options: Intl.DateTimeFormatOptions) => new Date(dateStr).toLocaleDateString(language === 'en' ? 'en-US' : 'tr-TR', options);

  let dateDisplay;
  if (ipo.subscriptionStartDate && ipo.subscriptionEndDate) {
      const start = new Date(ipo.subscriptionStartDate);
      const end = new Date(ipo.subscriptionEndDate);
      const locale = language === 'en' ? 'en-US' : 'tr-TR';
      
      if (start.getFullYear() === end.getFullYear() && start.getMonth() === end.getMonth()) {
          const month = start.toLocaleDateString(locale, { month: 'long' });
          const year = start.getFullYear();
          if (language === 'en') {
               dateDisplay = `${month} ${start.getDate()}-${end.getDate()}, ${year}`;
          } else {
              dateDisplay = `${start.getDate()}-${end.getDate()} ${month} ${year}`;
          }
      } else {
          dateDisplay = `${formattedDate(ipo.subscriptionStartDate, {day:'numeric', month:'long'})} - ${formattedDate(ipo.subscriptionEndDate, {day:'numeric', month:'long', year:'numeric'})}`;
      }
  } else {
      dateDisplay = formattedDate(ipo.ipoDate, { year: 'numeric', month: 'long', day: 'numeric' });
  }

  const isFixedPrice = ipo.priceRange && ipo.priceRange[0] === ipo.priceRange[1];
  let price;
  if (ipo.status === IPOStatus.UPCOMING) {
      if (isFixedPrice && ipo.priceRange) {
          price = `₺${ipo.priceRange[0].toFixed(2)}`;
      } else if (ipo.priceRange) {
          price = `₺${ipo.priceRange[0]} - ₺${ipo.priceRange[1]}`;
      }
  } else {
      price = ipo.finalPrice ? `₺${ipo.finalPrice.toFixed(2)}` : '-';
  }

  return (
    <div 
      onClick={() => onSelectIpo(ipo)}
      className="bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-1"
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          <img src={ipo.logoUrl} alt={`${ipo.companyName[language]} logo`} className="w-14 h-14 rounded-full mr-4 border border-slate-200 dark:border-slate-700" />
          <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">{ipo.companyName[language]} {ipo.ticker && `(${ipo.ticker})`}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{t(ipo.sector)}</p>
          </div>
        </div>
        <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 h-10">{ipo.description[language]}</p>
        
        <div className="space-y-3 text-sm">
            <div className="flex items-center text-slate-700 dark:text-slate-300">
                <CalendarIcon className="w-4 h-4 mr-2 text-slate-400 dark:text-slate-500" />
                <span>{dateDisplay}</span>
            </div>
             <div className="flex items-center text-slate-700 dark:text-slate-300">
                <PriceTagIcon className="w-4 h-4 mr-2 text-slate-400 dark:text-slate-500" />
                <span>{price}</span>
            </div>
            {ipo.distributionMethod && (
               <div className="flex items-center text-slate-700 dark:text-slate-300">
                  <ScaleIcon className="w-4 h-4 mr-2 text-slate-400 dark:text-slate-500" />
                  <span>{ipo.distributionMethod[language]}</span>
              </div>
            )}
             <div className="flex items-center text-slate-700 dark:text-slate-300">
                 <StatusIcon className="w-4 h-4 mr-2 text-slate-400 dark:text-slate-500" />
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColor}`}>
                    {t(ipo.status)}
                </span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default IPOCard;
