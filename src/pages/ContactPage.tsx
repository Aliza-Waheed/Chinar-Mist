import React from 'react';
import { BottleProduct, SiteSettings } from '../data/store';
import { QuoteForm } from '../components/QuoteForm';
import { FAQ } from '../components/FAQ';

interface ContactPageProps {
    settings: SiteSettings;
    products: BottleProduct[];
    prefillSize?: string;
    prefillNote?: string;
    prefillLogoDataUrl?: string;
    prefillLogoFileName?: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({ settings, products, prefillSize, prefillNote, prefillLogoDataUrl, prefillLogoFileName }) => {
    return (
        <div>
            {/* Page Header */}
            <div className="bg-brand-forest text-white py-3 sm:py-4 px-4 font-baskerville">
                <div className="container-x text-center max-w-3xl mx-auto">
                    <span className="inline-block rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold text-sky-300 uppercase tracking-widest mb-1">
                        Get In Touch
                    </span>
                    <h1 className="text-white text-xl sm:text-2xl font-bold tracking-tight">
                        Contact Us & Request a Quote
                    </h1>
                    <p className="mt-1 text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-snug">
                        Have a question or ready to order customized bottles for your brand? Send us a message below or reach out directly on WhatsApp.
                    </p>
                </div>
            </div>

            {/* Quote & Contact Form */}
            <QuoteForm
                settings={settings}
                products={products}
                prefillSize={prefillSize}
                prefillNote={prefillNote}
                prefillLogoDataUrl={prefillLogoDataUrl}
                prefillLogoFileName={prefillLogoFileName}
            />

            {/* FAQs */}
            <FAQ faqs={settings.faqs} whatsAppNumber={settings.whatsAppNumber} />
        </div>
    );
};
