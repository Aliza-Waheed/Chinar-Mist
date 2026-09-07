import React from 'react';
import { BottleProduct, SiteSettings } from '../data/store';
import { ProcessStepper } from '../components/ProcessStepper';
import { FAQ } from '../components/FAQ';
import { QuoteForm } from '../components/QuoteForm';

interface HowItWorksPageProps {
    settings: SiteSettings;
    products: BottleProduct[];
    onOpenQuote: (size?: string, note?: string) => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ settings, products, onOpenQuote }) => {
    return (
        <div>
            {/* Page Header */}
            <div className="bg-brand-forest text-white py-14 px-4">
                <div className="container-x text-center max-w-3xl mx-auto">
                    <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-sky-300 uppercase tracking-widest mb-3">
                        Simple 4-Step Process
                    </span>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                        How to Order Custom Water Bottles
                    </h1>
                    <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
                        From digital design preview to doorstep delivery in Abbottabad — ordering customized branded water bottles is fast, straightforward, and hassle-free.
                    </p>
                </div>
            </div>

            {/* Step-by-Step Process Component */}
            <ProcessStepper onOpenQuote={() => onOpenQuote()} />

            {/* Detailed Workflow Steps */}
            <section className="py-12 bg-slate-50 border-t border-b border-slate-100">
                <div className="container-x max-w-4xl mx-auto space-y-8">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-brand-forest">What Happens After You Request a Quote?</h2>
                        <p className="text-slate-600 text-sm mt-1">Clear communication at every stage of production</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 space-y-2">
                            <span className="h-8 w-8 rounded-full bg-brand-ice text-brand-green font-bold text-sm flex items-center justify-center">1</span>
                            <h3 className="font-bold text-brand-forest text-lg">Instant Quote Confirmation</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Submit your inquiry with your required quantity, bottle size, and custom logo. Our team reviews your request and sends a detailed price quote via WhatsApp or email within hours.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 space-y-2">
                            <span className="h-8 w-8 rounded-full bg-brand-ice text-brand-green font-bold text-sm flex items-center justify-center">2</span>
                            <h3 className="font-bold text-brand-forest text-lg">Free Digital Label Mockup</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                We prepare a high-resolution 3D digital label preview matching your exact brand colors, logo placement, and text. Printing only starts after you approve the proof!
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 space-y-2">
                            <span className="h-8 w-8 rounded-full bg-brand-ice text-brand-green font-bold text-sm flex items-center justify-center">3</span>
                            <h3 className="font-bold text-brand-forest text-lg">Water Purification & Bottling</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Waterproof full-wrap labels are printed and applied to fresh bottles filled with multi-stage purified mountain mineral water at our Abbottabad bottling plant.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 space-y-2">
                            <span className="h-8 w-8 rounded-full bg-brand-ice text-brand-green font-bold text-sm flex items-center justify-center">4</span>
                            <h3 className="font-bold text-brand-forest text-lg">Direct Delivery to Your Door</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Orders are packaged securely and delivered directly to your hotel, restaurant, office, or event location in Abbottabad and surrounding regions within 3 to 7 days.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Ordering FAQs */}
            <FAQ faqs={settings.faqs} whatsAppNumber={settings.whatsAppNumber} />

            {/* Quote Form */}
            <QuoteForm settings={settings} products={products} />
        </div>
    );
};
