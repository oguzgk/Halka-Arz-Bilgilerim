export enum IPOStatus {
  UPCOMING = 'Upcoming',
  COMPLETED = 'Completed',
}

export enum IPOSector {
  TECHNOLOGY = 'Technology',
  HEALTHCARE = 'Healthcare',
  FINANCE = 'Finance',
  ENERGY = 'Energy',
  CONSUMER_GOODS = 'Consumer Goods',
  INDUSTRIALS = 'Industrials',
}

export interface LocalizedString {
  en: string;
  tr: string;
}

export interface IPO {
  id: number;
  companyName: LocalizedString;
  ticker?: string;
  logoUrl: string;
  description: LocalizedString;
  ipoDate: string; // ISO string format 'YYYY-MM-DD'
  status: IPOStatus;
  priceRange: [number, number] | null;
  finalPrice: number | null;
  sharesOffered: number;
  exchange: string;
  sector: IPOSector;
  distributionMethod?: LocalizedString;
  background: LocalizedString;
  financials?: { year: number; revenue: LocalizedString; profit: LocalizedString }[];
  subscriptionStartDate?: string;
  subscriptionEndDate?: string;
}