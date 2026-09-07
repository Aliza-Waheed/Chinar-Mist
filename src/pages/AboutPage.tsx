import React from 'react';
import { BottleProduct, SiteSettings } from '../data/store';
import { AboutSection } from '../components/AboutSection';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { IndustriesStrip } from '../components/IndustriesStrip';
import { FAQ } from '../components/FAQ';
import { QuoteForm } from '../components/QuoteForm';

interface AboutPageProps {
    settings: SiteSettings;
    products: BottleProduct[];
    onOpenQuote: (size?: string, note?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ settings, products, onOpenQuote }) => {
    return (
        <div>
            {/* Page Header */}
            <div className="bg-brand-forest text-white py-3 sm:py-4 px-4 font-baskerville">
                <div className="container-x text-center max-w-3xl mx-auto">
                    <span className="inline-block rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-300 uppercase tracking-widest mb-1">
                        About Our Company
                    </span>
                    <h1 className="text-white text-xl sm:text-2xl font-bold tracking-tight">
                        About Chinar Mist
                    </h1>
                    <p className="mt-1 text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-snug">
                        Bottled in the misty mountains of Abbottabad, Chinar Mist brings customized, high-purity mineral water to businesses, hotels, events, and dining venues across Pakistan.
                    </p>
                </div>
            </div>

            {/* About Main Story */}
            <AboutSection settings={settings} products={products} />

            {/* Why Choose Us */}
            <WhyChooseUs />

            {/* Client Industries */}
            <IndustriesStrip />

            {/* FAQs */}
            <FAQ faqs={settings.faqs} whatsAppNumber={settings.whatsAppNumber} />

            {/* Quote / Contact */}
            <QuoteForm settings={settings} products={products} />
        </div>
    );
};
