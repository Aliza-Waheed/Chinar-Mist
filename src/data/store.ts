export interface BottleProduct {
    id: string;
    name: string;
    size: string; // e.g. "250ml", "330ml", "500ml", "1.5L"
    moq: number; // Minimum Order Quantity
    image: string;
    customizable: boolean;
    category: 'custom' | 'mineral';
    description: string;
    priceQuoteNote: string;
    featured?: boolean;
}

export type GalleryCategory = 'Restaurant' | 'Hotel' | 'Corporate' | 'Wedding' | 'Event' | 'Mineral Water';

export interface GalleryItem {
    id: string;
    title: string;
    category: GalleryCategory;
    image: string;
    description: string;
}

export type QuoteStatus = 'New' | 'Contacted' | 'Completed';

export interface QuoteSubmission {
    id: string;
    timestamp: string;
    name: string;
    company: string;
    phone: string;
    email: string;
    city: string;
    bottleSize: string;
    quantity: string;
    customizationRequired: string;
    deliveryLocation: string;
    additionalRequirements?: string;
    logoFileName?: string;
    logoDataUrl?: string;
    status: QuoteStatus;
}

export interface FAQ {
    id: string;
    question: string;
    answer: string;
}

export interface SiteSettings {
    brandName: string;
    tagline: string;
    whatsAppNumber: string;
    contactPhone: string;
    contactEmail: string;
    instagramUrl: string;
    address: string;
    heroHeading: string;
    heroSubheading: string;
    aboutContent: string;
    faqs: FAQ[];
}

export type BrandLogoCategory = 'Hotel' | 'Restaurant' | 'Corporate' | 'Wedding' | 'Event' | 'Retail';

export interface BrandLogo {
    id: string;
    name: string;
    logoUrl: string;
    category: BrandLogoCategory;
    enabled: boolean;
    order: number;
    websiteUrl?: string;
}

export interface AdminCredentials {
    username: string;
    passwordHash: string; // Stored locally in the browser; this site has no server-side auth.
}

/* --------------------------------------------------------------------------
   Defaults (all editable from the admin panel)
   -------------------------------------------------------------------------- */

export const DEFAULT_PRODUCTS: BottleProduct[] = [
    {
        id: 'b-250ml',
        name: '250ml Mini Bottle',
        size: '250ml',
        moq: 100,
        image: '/assets/hero_bottles.png',
        customizable: true,
        category: 'custom',
        description: 'Compact single-serve bottle for conferences, receptions, café tables and gift bags.',
        priceQuoteNote: 'Custom label included. Volume pricing available.',
        featured: true,
    },
    {
        id: 'b-330ml',
        name: '330ml Dining Bottle',
        size: '330ml',
        moq: 100,
        image: '/assets/hotel_bottle.png',
        customizable: true,
        category: 'custom',
        description: 'Slim silhouette suited to restaurant tables, hotel rooms and wedding place settings.',
        priceQuoteNote: 'Full-wrap label in gloss or matte finish.',
        featured: true,
    },
    {
        id: 'b-500ml',
        name: '500ml Standard Bottle',
        size: '500ml',
        moq: 100,
        image: '/assets/hero_bottles.png',
        customizable: true,
        category: 'custom',
        description: 'Our most popular size for offices, events, trade shows and hospitality.',
        priceQuoteNote: 'Colour-matched printing to your brand guidelines.',
        featured: true,
    },
    {
        id: 'b-1500ml',
        name: '1.5L Table Bottle',
        size: '1.5L',
        moq: 50,
        image: '/assets/hotel_bottle.png',
        customizable: true,
        category: 'custom',
        description: 'Shared-table size for banquets, boardrooms and catered dinners.',
        priceQuoteNote: 'Front and back label panels available.',
        featured: true,
    },
    {
        id: 'b-mineral-500ml',
        name: 'Chinar Mist Mineral Water 500ml',
        size: '500ml',
        moq: 50,
        image: '/assets/mineral_bottle.jpg',
        customizable: false,
        category: 'mineral',
        description: 'Our standard Chinar Mist label. Sold by the case for offices, shops and events.',
        priceQuoteNote: 'Wholesale case pricing on request.',
        featured: false,
    },
];

export const DEFAULT_GALLERY: GalleryItem[] = [
    {
        id: 'g-1',
        title: 'Hotel guest-room bottle',
        category: 'Hotel',
        image: '/assets/hotel_bottle.png',
        description: 'Black and gold label on a 330ml bottle for in-room hospitality.',
    },
    {
        id: 'g-2',
        title: 'Restaurant table bottle',
        category: 'Restaurant',
        image: '/assets/hero_bottles.png',
        description: 'Co-branded 500ml bottles designed to sit alongside the menu.',
    },
    {
        id: 'g-3',
        title: 'Wedding favour bottle',
        category: 'Wedding',
        image: '/assets/hotel_bottle.png',
        description: 'Monogram and date on a 330ml bottle for guest tables.',
    },
    {
        id: 'g-4',
        title: 'Conference delegate bottle',
        category: 'Corporate',
        image: '/assets/hero_bottles.png',
        description: 'Company logo on 500ml bottles for a multi-day corporate event.',
    },
    {
        id: 'g-5',
        title: 'Product launch bottle',
        category: 'Event',
        image: '/assets/hotel_bottle.png',
        description: '250ml mini bottles with launch branding for an evening event.',
    },
    {
        id: 'g-6',
        title: 'Chinar Mist standard label',
        category: 'Mineral Water',
        image: '/assets/mineral_bottle.jpg',
        description: 'Our own emblem label and green cap on the 500ml mineral water bottle.',
    },
    {
        id: 'g-7',
        title: 'Embossed Chinar Mist cap',
        category: 'Mineral Water',
        image: '/assets/bottle_cap.jpg',
        description: 'The chinar leaf emblem on the green bottle cap.',
    },
];

export const DEFAULT_SETTINGS: SiteSettings = {
    brandName: 'Chinar Mist',
    tagline: 'From the Misty Mountains of Abbottabad',
    whatsAppNumber: '923328489214',
    contactPhone: '+92 332 8489214',
    contactEmail: 'chimarmist@gmail.com',
    instagramUrl: 'https://www.instagram.com/chinarmist',
    address: 'Supply, Ali Brother Plaza, Abbottabad',
    heroHeading: 'Customized Water Bottles for Your Brand',
    heroSubheading:
        'Premium-quality bottled water customized with your logo, branding and design — perfect for businesses, events, hotels, restaurants and special occasions.',
    aboutContent:
        'Chinar Mist is a bottled water company based in Abbottabad with a focus on customized water bottles. We help businesses, hotels, restaurants, wedding planners and event organisers present their brand professionally through personalised bottle packaging, backed by clean, purified mineral water.',
    faqs: [
        {
            id: 'f-1',
            question: 'What is the minimum order quantity for custom bottles?',
            answer: 'Minimum orders start at 100 bottles for 250ml, 330ml and 500ml sizes, and 50 bottles for 1.5L. Smaller sample runs can be arranged on request.',
        },
        {
            id: 'f-2',
            question: 'Can I print a full-colour logo on the label?',
            answer: 'Yes. Labels are printed in full colour on waterproof material, with a choice of gloss or matte finish. Send us your logo file and we will match your brand colours.',
        },
        {
            id: 'f-3',
            question: 'How long does a custom order take?',
            answer: 'Once you approve the label preview, production and delivery typically take 3 to 7 working days depending on quantity and location. Tell us your event date and we will confirm a timeline.',
        },
        {
            id: 'f-4',
            question: 'Do I get to see the design before you print it?',
            answer: 'Always. We prepare a digital label preview for your approval before any bottles are produced.',
        },
        {
            id: 'f-5',
            question: 'Where does the water come from?',
            answer: 'Our water is bottled in Abbottabad and passes through multi-stage filtration and UV treatment before bottling.',
        },
    ],
};

// Client logos are shown only once you add real ones from the admin panel.
export const DEFAULT_BRAND_LOGOS: BrandLogo[] = [];

const DEFAULT_ADMIN_CREDS: AdminCredentials = {
    username: 'admin',
    passwordHash: 'chinarmist123',
};

/* --------------------------------------------------------------------------
   Storage helpers
   -------------------------------------------------------------------------- */

const STORAGE_KEYS = {
    PRODUCTS: 'chinarmist_products_v2',
    GALLERY: 'chinarmist_gallery_v2',
    SETTINGS: 'chinarmist_settings_v2',
    QUOTES: 'chinarmist_quotes_v2',
    BRAND_LOGOS: 'chinarmist_brand_logos_v2',
    ADMIN_CREDS: 'chinarmist_admin_creds_v2',
    ADMIN_SESSION: 'chinarmist_admin_session_v2',
};

function readJSON<T>(key: string, fallback: T): T {
    try {
        const raw = localStorage.getItem(key);
        return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
        return fallback;
    }
}

function writeJSON(key: string, value: unknown): void {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
        console.warn('Could not persist to localStorage', err);
    }
}

/** Build a wa.me link from any phone string. */
export function whatsAppLink(number: string, message?: string): string {
    const digits = (number || '').replace(/[^0-9]/g, '');
    const text = message ? `?text=${encodeURIComponent(message)}` : '';
    return `https://wa.me/${digits}${text}`;
}

export const getStoredAdminCredentials = () => readJSON<AdminCredentials>(STORAGE_KEYS.ADMIN_CREDS, DEFAULT_ADMIN_CREDS);
export const saveStoredAdminCredentials = (creds: AdminCredentials) => writeJSON(STORAGE_KEYS.ADMIN_CREDS, creds);

export function verifyAdminCredentials(username: string, password: string): boolean {
    if (!username || !password || !username.trim()) return false;
    const creds = getStoredAdminCredentials();
    return username.trim().toLowerCase() === creds.username.trim().toLowerCase() && password === creds.passwordHash;
}

export function isAdminAuthenticatedSession(): boolean {
    try {
        return sessionStorage.getItem(STORAGE_KEYS.ADMIN_SESSION) === 'true';
    } catch {
        return false;
    }
}

export function setAdminAuthenticatedSession(auth: boolean): void {
    try {
        if (auth) sessionStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, 'true');
        else sessionStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
    } catch {
        /* ignore */
    }
}

export const getStoredBrandLogos = () => readJSON<BrandLogo[]>(STORAGE_KEYS.BRAND_LOGOS, DEFAULT_BRAND_LOGOS);
export const saveStoredBrandLogos = (logos: BrandLogo[]) => writeJSON(STORAGE_KEYS.BRAND_LOGOS, logos);

export const getStoredProducts = () => readJSON<BottleProduct[]>(STORAGE_KEYS.PRODUCTS, DEFAULT_PRODUCTS);
export const saveStoredProducts = (products: BottleProduct[]) => writeJSON(STORAGE_KEYS.PRODUCTS, products);

export const getStoredGallery = () => readJSON<GalleryItem[]>(STORAGE_KEYS.GALLERY, DEFAULT_GALLERY);
export const saveStoredGallery = (gallery: GalleryItem[]) => writeJSON(STORAGE_KEYS.GALLERY, gallery);

export function getStoredSettings(): SiteSettings {
    // Merge so newly added settings fields get sensible defaults for existing installs.
    const stored = readJSON<Partial<SiteSettings>>(STORAGE_KEYS.SETTINGS, {});
    return { ...DEFAULT_SETTINGS, ...stored, faqs: stored.faqs ?? DEFAULT_SETTINGS.faqs };
}
export const saveStoredSettings = (settings: SiteSettings) => writeJSON(STORAGE_KEYS.SETTINGS, settings);

export const DEFAULT_QUOTES: QuoteSubmission[] = [
    {
        id: 'q-sample-1',
        timestamp: '07 Sep 2026, 14:30',
        name: 'Shahid Khan',
        company: 'Pine Hills Hotel & Resorts',
        phone: '+92 300 5551234',
        email: 'info@pinehillshotel.com',
        city: 'Abbottabad',
        bottleSize: '330ml',
        quantity: '500 bottles',
        customizationRequired: 'Full custom label design with gold foil accent',
        deliveryLocation: 'Main Supply Road, Abbottabad',
        additionalRequirements: 'Need delivery for annual gala dinner. Please send digital proof before printing.',
        logoFileName: 'pine_hills_logo.png',
        logoDataUrl: '/assets/hotel_bottle.png',
        status: 'New',
    },
    {
        id: 'q-sample-2',
        timestamp: '06 Sep 2026, 10:15',
        name: 'Usman Ali',
        company: 'Monal Restaurant Group',
        phone: '+92 333 4445566',
        email: 'purchasing@monal.pk',
        city: 'Islamabad',
        bottleSize: '500ml',
        quantity: '1,000 bottles',
        customizationRequired: 'Logo and brand name',
        deliveryLocation: 'Pir Sohawa Road, Islamabad',
        additionalRequirements: 'Monthly recurring order expected if sample approval goes smoothly.',
        logoFileName: 'monal_logo.png',
        logoDataUrl: '/assets/hero_bottles.png',
        status: 'Contacted',
    },
];

export const getStoredQuotes = () => readJSON<QuoteSubmission[]>(STORAGE_KEYS.QUOTES, DEFAULT_QUOTES);

export function saveStoredQuote(quote: Omit<QuoteSubmission, 'id' | 'timestamp' | 'status'>): QuoteSubmission {
    const existing = getStoredQuotes();
    const submission: QuoteSubmission = {
        ...quote,
        id: 'q-' + Date.now(),
        timestamp: new Date().toLocaleString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }),
        status: 'New',
    };
    const updated = [submission, ...existing];
    writeJSON(STORAGE_KEYS.QUOTES, updated);
    return submission;
}

export function updateQuoteStatus(id: string, status: QuoteStatus): QuoteSubmission[] {
    const updated = getStoredQuotes().map((q) => (q.id === id ? { ...q, status } : q));
    writeJSON(STORAGE_KEYS.QUOTES, updated);
    return updated;
}

export function deleteQuote(id: string): QuoteSubmission[] {
    const updated = getStoredQuotes().filter((q) => q.id !== id);
    writeJSON(STORAGE_KEYS.QUOTES, updated);
    return updated;
}
