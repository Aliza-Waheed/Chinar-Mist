import React from 'react';
import { UtensilsCrossed, Hotel, Building2, Heart, CalendarDays, Coffee, GraduationCap, Megaphone, ArrowRight, Palette } from 'lucide-react';
import { Reveal } from './Reveal';

interface MainCustomSectionProps {
    onOpenQuote: (note?: string) => void;
}

const CATEGORIES = [
    { title: 'Restaurant Bottles', icon: UtensilsCrossed, desc: 'Table-ready bottles that match your menu and interior.' },
    { title: 'Hotel Bottles', icon: Hotel, desc: 'In-room and lobby water carrying your hotel identity.' },
    { title: 'Corporate Bottles', icon: Building2, desc: 'Boardrooms, client meetings and staff hydration with your logo.' },
    { title: 'Wedding Bottles', icon: Heart, desc: 'Names, dates and monograms for guest tables and favours.' },
    { title: 'Event Bottles', icon: CalendarDays, desc: 'Launches, galas, seminars and outdoor events.' },
    { title: 'Café Bottles', icon: Coffee, desc: 'Compact bottles for coffee shops and bakeries.' },
    { title: 'School & University Bottles', icon: GraduationCap, desc: 'Crest and mascot branding for campus events and sports.' },
    { title: 'Promotional Bottles', icon: Megaphone, desc: 'High-visibility giveaways for activations and expos.' },
];

export const MainCustomSection: React.FC<MainCustomSectionProps> = ({ onOpenQuote }) => {
    return (
        <section id="custom-bottles" className="section bg-white scroll-mt-20">
            <div className="container-x">
                <Reveal className="max-w-2xl">
                    <span className="eyebrow">Customized water bottles</span>
                    <h2 className="h-section mt-4">Your Brand. Your Bottle. Your Identity.</h2>
                    <p className="lead mt-5">
                        We produce customized water bottles to your branding requirements — your logo, colours and message printed on a
                        waterproof label, filled with purified mineral water and delivered ready to serve.
                    </p>
                </Reveal>

                <div className="mt-12 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {CATEGORIES.map((c, i) => {
                        const Icon = c.icon;
                        return (
                            <Reveal key={c.title} delay={i * 50}>
                                <button
                                    onClick={() => onOpenQuote(`Interested in: ${c.title}`)}
                                    className="card-hover group w-full h-full text-left p-6 flex flex-col"
                                >
                                    <span className="icon-tile">
                                        <Icon className="w-5 h-5" />
                                    </span>
                                    <h3 className="mt-5 text-lg font-semibold">{c.title}</h3>
                                    <p className="mt-2 text-sm text-slate-600 leading-relaxed flex-1">{c.desc}</p>
                                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green">
                                        Request a quote
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                                    </span>
                                </button>
                            </Reveal>
                        );
                    })}
                </div>

                {/* CTA band */}
                <Reveal className="mt-14 lg:mt-20">
                    <div className="surface-forest rounded-[2rem] p-8 sm:p-10 lg:p-12 text-white flex flex-col lg:flex-row lg:items-center justify-between gap-8 overflow-hidden relative">
                        <div className="max-w-xl relative">
                            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white leading-tight">
                                Planning an event, opening or launch?
                            </h3>
                            <p className="mt-3 text-slate-300 leading-relaxed">
                                Tell us the occasion, quantity and date. We will send a label preview and quote so you can approve before anything is printed.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 relative">
                            <a href="#customizer" className="btn btn-lg bg-white text-brand-forest hover:bg-brand-ice">
                                <Palette className="w-4 h-4" />
                                Design it live
                            </a>
                            <button onClick={() => onOpenQuote()} className="btn btn-lg border border-white/25 text-white hover:bg-white/10">
                                Create Your Custom Bottle
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};
