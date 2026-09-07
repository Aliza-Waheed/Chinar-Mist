import React from 'react';
import { MapPin } from 'lucide-react';
import { SiteSettings, BottleProduct } from '../data/store';
import { Reveal } from './Reveal';
import { Emblem } from './Logo';

interface AboutSectionProps {
    settings: SiteSettings;
    products: BottleProduct[];
}

export const AboutSection: React.FC<AboutSectionProps> = ({ settings, products }) => {
    const custom = products.filter((p) => p.category === 'custom');
    const sizes = custom.map((p) => p.size).join(', ');
    const minMoq = custom.length ? Math.min(...custom.map((p) => p.moq)) : 100;

    const facts = [
        { k: 'Specialty', v: 'Customized branded water bottles' },
        { k: 'Bottle sizes', v: sizes || '250ml, 330ml, 500ml, 1.5L' },
        { k: 'Minimum order', v: `From ${minMoq} bottles` },
        { k: 'Based in', v: settings.address },
    ];

    return (
        <section id="about" className="section bg-white scroll-mt-20">
            <div className="container-x grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                <Reveal className="lg:col-span-6 relative">
                    <div className="relative overflow-hidden rounded-[2rem] shadow-lift ring-1 ring-brand-forest/10">
                        <img
                            src="/assets/abbottabad_mountains.png"
                            alt="Misty mountains and autumn chinar trees around Abbottabad"
                            className="w-full aspect-[4/3] object-cover"
                            loading="lazy"
                        />
                        <div className="absolute bottom-4 left-4 card px-3.5 py-2.5 flex items-center gap-2.5">
                            <MapPin className="w-4 h-4 text-brand-green" />
                            <span className="text-sm font-semibold text-brand-forest">Abbottabad, Khyber Pakhtunkhwa</span>
                        </div>
                    </div>
                    <div className="absolute -top-6 -right-3 sm:-right-6 hidden sm:flex h-28 w-28 items-center justify-center rounded-full bg-white shadow-lift ring-1 ring-slate-100 p-1.5">
                        <Emblem size={100} className="ring-0" />
                    </div>
                </Reveal>

                <Reveal delay={100} className="lg:col-span-6">
                    <span className="eyebrow">About {settings.brandName}</span>
                    <h2 className="h-section mt-4">Bottled water solutions with a focus on your brand</h2>
                    <p className="lead mt-5">{settings.aboutContent}</p>

                    <dl className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 border-t border-slate-100 pt-8">
                        {facts.map((f) => (
                            <div key={f.k}>
                                <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">{f.k}</dt>
                                <dd className="mt-1.5 text-[15px] font-semibold text-brand-forest">{f.v}</dd>
                            </div>
                        ))}
                    </dl>
                </Reveal>
            </div>
        </section>
    );
};
