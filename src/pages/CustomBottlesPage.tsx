import React from 'react';
import { BottleProduct, SiteSettings } from '../data/store';
import { BottleCustomizer, CustomDesign } from '../components/BottleCustomizer';
import { BottleOptions } from '../components/BottleOptions';
import { BrandingFeatures } from '../components/BrandingFeatures';
import { FAQ } from '../components/FAQ';
import { QuoteForm } from '../components/QuoteForm';

interface CustomBottlesPageProps {
    settings: SiteSettings;
    products: BottleProduct[];
    onOpenQuote: (size?: string, note?: string) => void;
    onQuoteWithDesign: (design: CustomDesign) => void;
}

export const CustomBottlesPage: React.FC<CustomBottlesPageProps> = ({ settings, products, onOpenQuote, onQuoteWithDesign }) => {
    return (
        <div>
            {/* Page Header */}
            <div className="bg-brand-forest text-white py-14 px-4">
                <div className="container-x text-center max-w-3xl mx-auto">
                    <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-sky-300 uppercase tracking-widest mb-3">
                        Custom Branding
                    </span>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                        Customized Water Bottles for Your Brand
                    </h1>
                    <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
                        Design and order personalized bottled water with your custom logo, colors, and branding. Ideal for hotels, restaurants, corporate offices, and special events in Abbottabad.
                    </p>
                </div>
            </div>

            {/* Bottle Customizer */}
            <BottleCustomizer products={products} onQuoteWithDesign={onQuoteWithDesign} />

            {/* Bottle Options Grid */}
            <section className="py-12 bg-slate-50">
                <div className="container-x mb-8 text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold text-brand-forest">Available Sizes & Specifications</h2>
                    <p className="text-slate-600 text-sm mt-2">Choose the right bottle size for your venue or occasion</p>
                </div>
                <BottleOptions products={products} onOpenQuote={(size) => onOpenQuote(size)} />
            </section>

            {/* Branding Features */}
            <BrandingFeatures onOpenQuote={() => onOpenQuote()} />

            {/* FAQs for Custom Bottles */}
            <FAQ faqs={settings.faqs} whatsAppNumber={settings.whatsAppNumber} />

            {/* Quote Form */}
            <QuoteForm settings={settings} products={products} />
        </div>
    );
};
