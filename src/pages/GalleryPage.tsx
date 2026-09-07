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
            <div className="bg-brand-forest text-white py-6 sm:py-7 px-4">
                <div className="container-x text-center max-w-3xl mx-auto">
                    <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-sky-300 uppercase tracking-widest mb-2">
                        Client Showcase & Portfolio
                    </span>
                    <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                        Our Bottle Gallery
                    </h1>
                    <p className="mt-2 text-slate-300 text-sm sm:text-base leading-relaxed">
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
