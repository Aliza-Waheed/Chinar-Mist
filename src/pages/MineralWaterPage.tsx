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
            <div className="bg-brand-forest text-white py-3 sm:py-4 px-4 font-baskerville">
                <div className="container-x text-center max-w-3xl mx-auto">
                    <span className="inline-block rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-300 uppercase tracking-widest mb-1">
                        Pure Mountain Spring Water
                    </span>
                    <h1 className="text-white text-xl sm:text-2xl font-bold tracking-tight">
                        Chinar Mist Mineral Water
                    </h1>
                    <p className="mt-1 text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-snug">
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
