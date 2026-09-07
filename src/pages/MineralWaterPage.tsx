import React from 'react';
import { BottleProduct, SiteSettings } from '../data/store';
import { SecondaryMineralWater } from '../components/SecondaryMineralWater';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { FAQ } from '../components/FAQ';
import { QuoteForm } from '../components/QuoteForm';

interface MineralWaterPageProps {
    settings: SiteSettings;
    products: BottleProduct[];
    onOpenQuote: (size?: string, note?: string) => void;
}

export const MineralWaterPage: React.FC<MineralWaterPageProps> = ({ settings, products, onOpenQuote }) => {
    return (
        <div>
            {/* Page Header */}
            <div className="bg-brand-forest text-white py-6 sm:py-7 px-4">
                <div className="container-x text-center max-w-3xl mx-auto">
                    <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-emerald-300 uppercase tracking-widest mb-2">
                        Pure Mountain Spring Water
                    </span>
                    <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                        Chinar Mist Mineral Water
                    </h1>
                    <p className="mt-2 text-slate-300 text-sm sm:text-base leading-relaxed">
                        Pure drinking water sourced and bottled in Abbottabad. Multi-stage filtration and UV sterilization ensure clean, refreshing mineral water for wholesale, offices, and retail.
                    </p>
                </div>
            </div>

            {/* Main Mineral Water Showcase */}
            <SecondaryMineralWater products={products} onOpenQuote={(size) => onOpenQuote(size)} />

            {/* Why Choose Us */}
            <WhyChooseUs />

            {/* FAQs */}
            <FAQ faqs={settings.faqs} whatsAppNumber={settings.whatsAppNumber} />

            {/* Quote Form */}
            <QuoteForm settings={settings} products={products} />
        </div>
    );
};
