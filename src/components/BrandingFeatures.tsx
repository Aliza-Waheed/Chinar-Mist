import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { Reveal } from './Reveal';

interface BrandingFeaturesProps {
    onOpenQuote: () => void;
}

const FEATURES = [
    { name: 'Company logo', desc: 'Crisp, colour-accurate print from your logo file.' },
    { name: 'Brand name', desc: 'Your typography and tagline on every bottle.' },
    { name: 'Brand colours', desc: 'Matched to your brand guidelines.' },
    { name: 'Custom label', desc: 'Gloss or matte waterproof finish.' },
    { name: 'Event name & date', desc: 'For conferences, launches and galas.' },
    { name: 'Wedding names', desc: 'Couple names, date and monogram.' },
    { name: 'Restaurant branding', desc: 'Table bottles that match your menu.' },
    { name: 'Hotel branding', desc: 'In-room and lobby presentation.' },
    { name: 'Corporate branding', desc: 'Boardrooms, offices and client gifts.' },
    { name: 'Special messages', desc: 'A thank-you, a slogan or a QR code.' },
];

export const BrandingFeatures: React.FC<BrandingFeaturesProps> = ({ onOpenQuote }) => {
    return (
        <section className="section bg-brand-mist">
            <div className="container-x grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                <Reveal className="lg:col-span-4 lg:sticky lg:top-28">
                    <span className="eyebrow">Custom label & branding</span>
                    <h2 className="h-section mt-4">What you can put on your bottle</h2>
                    <p className="lead mt-5">
                        The label is yours from edge to edge. Send us what you have and we will lay it out to fit the bottle.
                    </p>
                    <button onClick={onOpenQuote} className="btn-primary btn-md mt-8">
                        Send us your design
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </Reveal>

                <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {FEATURES.map((f, i) => (
                        <Reveal key={f.name} delay={i * 40}>
                            <div className="card p-5 flex items-start gap-4 h-full">
                                <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-green text-white">
                                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                                </span>
                                <div>
                                    <h3 className="text-[15px] font-semibold">{f.name}</h3>
                                    <p className="mt-1 text-sm text-slate-600">{f.desc}</p>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};
