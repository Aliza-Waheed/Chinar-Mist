import React from 'react';
import { BottleProduct, SiteSettings } from '../data/store';
import { QuoteForm } from '../components/QuoteForm';
import { FAQ } from '../components/FAQ';

interface ContactPageProps {
    settings: SiteSettings;
    products: BottleProduct[];
    prefillSize?: string;
    prefillNote?: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({ settings, products, prefillSize, prefillNote }) => {
    return (
        <div>
            {/* Page Header */}
            <div className="bg-brand-forest text-white py-14 px-4">
                <div className="container-x text-center max-w-3xl mx-auto">
                    <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-sky-300 uppercase tracking-widest mb-3">
                        Get In Touch
                    </span>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                        Contact Us & Request a Quote
                    </h1>
                    <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
                        Have a question or ready to order customized bottles for your brand? Send us a message below or reach out directly on WhatsApp.
                    </p>
                </div>
            </div>

            {/* Quote & Contact Form */}
            <QuoteForm settings={settings} products={products} prefillSize={prefillSize} prefillNote={prefillNote} />

            {/* FAQs */}
            <FAQ faqs={settings.faqs} whatsAppNumber={settings.whatsAppNumber} />
        </div>
    );
};
