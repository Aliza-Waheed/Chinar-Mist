import React from 'react';
import { BottleProduct, GalleryItem, SiteSettings, BrandLogo } from '../data/store';
import { PageRoute } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { IndustriesStrip } from '../components/IndustriesStrip';
import { MainCustomSection } from '../components/MainCustomSection';
import { BottleOptions } from '../components/BottleOptions';
import { ProcessStepper } from '../components/ProcessStepper';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { AboutSection } from '../components/AboutSection';
import { FAQ } from '../components/FAQ';
import { QuoteForm } from '../components/QuoteForm';

interface HomePageProps {
    settings: SiteSettings;
    products: BottleProduct[];
    onOpenQuote: (size?: string, note?: string) => void;
    onNavigate: (page: PageRoute) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ settings, products, onOpenQuote, onNavigate }) => {
    return (
        <div className="space-y-0">
            <Hero settings={settings} products={products} onOpenQuote={() => onOpenQuote()} />
            <IndustriesStrip />
            <MainCustomSection onOpenQuote={(note) => onOpenQuote(undefined, note)} />

            <section className="py-12 bg-slate-50/50">
                <div className="container-x text-center mb-8">
                    <span className="text-xs font-semibold text-brand-green uppercase tracking-wider">Product Options</span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-brand-forest mt-1">Available Bottle Sizes</h2>
                    <p className="text-slate-600 text-sm mt-2 max-w-xl mx-auto">
                        Choose from a range of sizes designed for hotels, restaurants, events, and corporate settings.
                    </p>
                </div>
                <BottleOptions products={products} onOpenQuote={(size) => onOpenQuote(size)} />
                <div className="text-center mt-6">
                    <button
                        onClick={() => onNavigate('custom-bottles')}
                        className="btn-secondary btn-md font-medium"
                    >
                        Explore All Customized Options →
                    </button>
                </div>
            </section>

            <ProcessStepper onOpenQuote={() => onOpenQuote()} />
            <WhyChooseUs />
            <AboutSection settings={settings} products={products} />
            <FAQ faqs={settings.faqs} whatsAppNumber={settings.whatsAppNumber} />
            <QuoteForm settings={settings} products={products} />
        </div>
    );
};
