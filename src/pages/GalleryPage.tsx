import React from 'react';
import { GalleryItem, BrandLogo, SiteSettings, BottleProduct } from '../data/store';
import { Gallery } from '../components/Gallery';
import { MainCustomSection } from '../components/MainCustomSection';
import { QuoteForm } from '../components/QuoteForm';

interface GalleryPageProps {
    settings: SiteSettings;
    items: GalleryItem[];
    brandLogos: BrandLogo[];
    products: BottleProduct[];
    onOpenQuote: (size?: string, note?: string) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ settings, items, brandLogos, products, onOpenQuote }) => {
    return (
        <div>
            {/* Page Header */}
            <div className="bg-brand-forest text-white py-3 sm:py-4 px-4 font-baskerville">
                <div className="container-x text-center max-w-3xl mx-auto">
                    <span className="inline-block rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold text-sky-300 uppercase tracking-widest mb-1">
                        Client Showcase & Portfolio
                    </span>
                    <h1 className="text-white text-xl sm:text-2xl font-bold tracking-tight">
                        Our Bottle Gallery
                    </h1>
                    <p className="mt-1 text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-snug">
                        Explore custom-branded water bottles crafted for hotels, restaurants, corporate events, weddings, and hospitality partners across Abbottabad.
                    </p>
                </div>
            </div>

            {/* Gallery Section */}
            <Gallery items={items} brandLogos={brandLogos} onOpenQuote={(note) => onOpenQuote(undefined, note)} />

            {/* Feature Banner */}
            <MainCustomSection onOpenQuote={(note) => onOpenQuote(undefined, note)} />

            {/* Quote Form */}
            <QuoteForm settings={settings} products={products} />
        </div>
    );
};
