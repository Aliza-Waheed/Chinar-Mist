import React from 'react';
import { ShieldCheck, Palette, Sparkles, SlidersHorizontal, Building2 } from 'lucide-react';
import { Reveal } from './Reveal';

const REASONS = [
    { title: 'Premium Quality', desc: 'Purified bottled water and clean, professional packaging on every order.', icon: ShieldCheck },
    { title: 'Custom Branding', desc: 'Your logo, colours and identity on every bottle, matched to your guidelines.', icon: Palette },
    { title: 'Professional Presentation', desc: 'Make your venue, office or event look considered and premium.', icon: Sparkles },
    { title: 'Flexible Orders', desc: 'Four bottle sizes and sensible minimums, from a single event to recurring supply.', icon: SlidersHorizontal },
    { title: 'Built for Business & Events', desc: 'Restaurants, hotels, offices, weddings and events are what we do every day.', icon: Building2 },
];

export const WhyChooseUs: React.FC = () => {
    return (
        <section className="section bg-white">
            <div className="container-x grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                <Reveal className="lg:col-span-5">
                    <span className="eyebrow">Why Chinar Mist</span>
                    <h2 className="h-section mt-4">A packaging partner, not just a water supplier</h2>
                    <p className="lead mt-5">
                        We keep the promise simple: honest quality, careful printing, and a clear process from your first message to the last case delivered.
                    </p>
                </Reveal>

                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
                    {REASONS.map((r, i) => {
                        const Icon = r.icon;
                        return (
                            <Reveal key={r.title} delay={i * 60} className="flex gap-4">
                                <span className="icon-tile shrink-0">
                                    <Icon className="w-5 h-5" />
                                </span>
                                <div>
                                    <h3 className="text-[17px] font-semibold">{r.title}</h3>
                                    <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{r.desc}</p>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
