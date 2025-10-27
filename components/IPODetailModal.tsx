import React from 'react';
import { IPO, IPOStatus } from '../types';
import { CloseIcon } from './icons';
import { useI18n } from '../i18n';

interface IPODetailModalProps {
  ipo: IPO;
  onClose: () => void;
}

const DetailItem: React.FC<{ label: string, value: React.ReactNode }> = ({ label, value }) => (
    <div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
        <p className="text-lg text-slate-800 dark:text-slate-100">{value}</p>
    </div>
);


const IPODetailModal: React.FC<IPODetailModalProps> = ({ ipo, onClose }) => {
  const { language, t } = useI18n();
  
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

  const statusColor = ipo.status === IPOStatus.UPCOMING ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400';
  
  const isFixedPrice = ipo.priceRange && ipo.priceRange[0] === ipo.priceRange[1];
  let price;
  let priceLabel = t('priceRange');
  if (ipo.status === IPOStatus.UPCOMING) {
      if (isFixedPrice && ipo.priceRange) {
          price = `₺${ipo.priceRange[0].toFixed(2)}`;
          priceLabel = t('ipoPrice');
      } else if (ipo.priceRange) {
          price = `₺${ipo.priceRange[0]} - ₺${ipo.priceRange[1]}`;
      }
  } else {
      price = ipo.finalPrice ? `₺${ipo.finalPrice.toFixed(2)}` : '-';
      priceLabel = t('finalPrice');
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 dark:bg-opacity-80 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 sm:p-8">
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center">
                    <img src={ipo.logoUrl} alt={`${ipo.companyName[language]} logo`} className="w-16 h-16 rounded-full mr-5 border-2 border-slate-200 dark:border-slate-700" />
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{ipo.companyName[language]} {ipo.ticker && `(${ipo.ticker})`}</h2>
                        <p className="text-slate-500 dark:text-slate-400">{t(ipo.sector)}</p>
                    </div>
                </div>
                <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition">
                    <CloseIcon className="w-6 h-6" />
                </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-8 border-t border-b border-slate-200 dark:border-slate-700 py-6">
                <DetailItem label={t('ipoDates')} value={dateDisplay} />
                <DetailItem label={priceLabel} value={price} />
                <DetailItem label={t('status')} value={<span className={`font-semibold ${statusColor}`}>{t(ipo.status)}</span>} />
                <DetailItem label={t('sharesOffered')} value={ipo.sharesOffered.toLocaleString(language === 'en' ? 'en-US' : 'tr-TR')} />
                {ipo.distributionMethod && (
                    <DetailItem label={t('distributionMethod')} value={ipo.distributionMethod[language]} />
                )}
                 <DetailItem label={t('market')} value={ipo.exchange} />
            </div>

            <div className="space-y-6">
                <div>
                    <h4 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-2">{t('companyBackground')}</h4>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{ipo.background[language]}</p>
                </div>

                {ipo.financials && ipo.financials.length > 0 && (
                    <div>
                        <h4 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-3">{t('financialHighlights')}</h4>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                                <thead className="bg-slate-50 dark:bg-slate-700">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">{t('year')}</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">{t('revenue')}</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">{t('profit')}</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                                    {ipo.financials.map(fin => (
                                        <tr key={fin.year}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-100">{fin.year}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">{fin.revenue[language]}</td>
                                            <td className="px-6 py-4 whitespace-n-owrap text-sm text-slate-600 dark:text-slate-300">{fin.profit[language]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default IPODetailModal;
