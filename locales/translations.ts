import { IPOStatus, IPOSector } from '../types';

const en = {
    // Header & Nav
    appTitle: 'IPO Tracker',
    navAll: 'All IPOs',
    navUpcoming: 'Upcoming IPOs',
    navPast: 'Past IPOs',
    navAbout: 'About',

    // Main Page
    ipoMarketplaceTitle: 'IPO Marketplace',
    ipoMarketplaceSubtitle: 'Discover the latest Initial Public Offerings.',

    // Filter Bar
    searchPlaceholder: 'Search by company or sector...',
    allStatuses: 'All Statuses',
    allSectors: 'All Sectors',
    dateSort: 'Date',
    newest: 'Newest',
    oldest: 'Oldest',

    // IPO List
    noIposFound: 'No IPOs Found',
    noIposFoundSubtitle: 'Try adjusting your search or filter criteria.',

    // IPO Detail Modal
    ipoDate: 'IPO Date',
    ipoDates: 'IPO Dates',
    priceRange: 'Price Range',
    finalPrice: 'Final Price',
    ipoPrice: 'IPO Price',
    status: 'Status',
    sharesOffered: 'Shares Offered',
    subscriptionStarts: 'Subscription Starts',
    subscriptionEnds: 'Subscription Ends',
    companyBackground: 'Company Background',
    financialHighlights: 'Financial Highlights',
    year: 'Year',
    revenue: 'Revenue',
    profit: 'Profit',
    distributionMethod: 'Distribution Method',
    market: 'Market',
    
    // About Modal
    aboutTitle: 'About IPO Tracker',
    aboutP1: 'IPO Tracker is a demonstration web application built to showcase a modern, responsive interface for browsing Initial Public Offerings.',
    aboutP2: 'This project was created using React and TypeScript, with all styling handled by Tailwind CSS. The data is currently static and loaded from a local constants file to simulate a backend API.',
    aboutP3: 'Users can search, filter, and sort IPOs, and view detailed information for each company. The design is mobile-first, ensuring a great experience on any device.',

    // Enums
    [IPOStatus.UPCOMING]: 'Upcoming',
    [IPOStatus.COMPLETED]: 'Completed',
    [IPOSector.TECHNOLOGY]: 'Technology',
    [IPOSector.HEALTHCARE]: 'Healthcare',
    [IPOSector.FINANCE]: 'Finance',
    [IPOSector.ENERGY]: 'Energy',
    [IPOSector.CONSUMER_GOODS]: 'Consumer Goods',
    [IPOSector.INDUSTRIALS]: 'Industrials',
};

const tr: typeof en = {
    // Header & Nav
    appTitle: 'Halka Arz',
    navAll: 'Tüm Arzlar',
    navUpcoming: 'Yaklaşan Arzlar',
    navPast: 'Geçmiş Arzlar',
    navAbout: 'Hakkında',

    // Main Page
    ipoMarketplaceTitle: 'Halka Arz Piyasası',
    ipoMarketplaceSubtitle: 'En son halka arzları keşfedin.',

    // Filter Bar
    searchPlaceholder: 'Şirket veya sektöre göre ara...',
    allStatuses: 'Tüm Durumlar',
    allSectors: 'Tüm Sektörler',
    dateSort: 'Tarih',
    newest: 'En Yeni',
    oldest: 'En Eski',

    // IPO List
    noIposFound: 'Halka Arz Bulunamadı',
    noIposFoundSubtitle: 'Arama veya filtre kriterlerinizi değiştirmeyi deneyin.',

    // IPO Detail Modal
    ipoDate: 'Halka Arz Tarihi',
    ipoDates: 'Halka Arz Tarihleri',
    priceRange: 'Fiyat Aralığı',
    finalPrice: 'Nihai Fiyat',
    ipoPrice: 'Halka Arz Fiyatı',
    status: 'Durum',
    sharesOffered: 'Arz Edilen Pay',
    subscriptionStarts: 'Talep Toplama Başlangıcı',
    subscriptionEnds: 'Talep Toplama Bitişi',
    companyBackground: 'Şirket Geçmişi',
    financialHighlights: 'Finansal Göstergeler',
    year: 'Yıl',
    revenue: 'Gelir',
    profit: 'Kâr',
    distributionMethod: 'Dağıtım Yöntemi',
    market: 'Pazar',

    // About Modal
    aboutTitle: 'Halka Arz Takipçisi Hakkında',
    aboutP1: 'Halka Arz Takipçisi, halka arzlara göz atmak için modern ve duyarlı bir arayüz sergilemek amacıyla oluşturulmuş bir demo web uygulamasıdır.',
    aboutP2: 'Bu proje React ve TypeScript kullanılarak oluşturulmuş olup, tüm stil işlemleri Tailwind CSS ile yapılmıştır. Veriler şu anda statiktir ve bir arka uç API\'sini simüle etmek için yerel bir dosyadan yüklenmektedir.',
    aboutP3: 'Kullanıcılar halka arzları arayabilir, filtreleyebilir, sıralayabilir ve her şirket için ayrıntılı bilgileri görüntüleyebilir. Tasarım, her cihazda harika bir deneyim sağlamak için mobil önceliklidir.',

    // Enums
    [IPOStatus.UPCOMING]: 'Yaklaşan',
    [IPOStatus.COMPLETED]: 'Tamamlandı',
    [IPOSector.TECHNOLOGY]: 'Teknoloji',
    [IPOSector.HEALTHCARE]: 'Sağlık',
    [IPOSector.FINANCE]: 'Finans',
    [IPOSector.ENERGY]: 'Enerji',
    [IPOSector.CONSUMER_GOODS]: 'Tüketim Malları',
    [IPOSector.INDUSTRIALS]: 'Sanayi',
};

export const translations = { en, tr };
export type TranslationKey = keyof typeof en;