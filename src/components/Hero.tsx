import React from 'react';
import { ArrowRight, Check, Palette } from 'lucide-react';
import { SiteSettings, BottleProduct } from '../data/store';
import { Emblem } from './Logo';
import { ImageFrame } from './ImageFrame';

interface HeroProps {
    settings: SiteSettings;
    products: BottleProduct[];
    onOpenQuote: () => void;
}

export const Hero: React.FC<HeroProps> = ({ settings, products, onOpenQuote }) => {
    const custom = products.filter((p) => p.category === 'custom');
    const minMoq = custom.length ? Math.min(...custom.map((p) => p.moq)) : 100;
    const sizeFact = custom.length >= 2
        ? `${custom.length} sizes, ${custom[0].size} to ${custom[custom.length - 1].size}`
        : custom.length === 1 ? `${custom[0].size} bottles` : 'Multiple bottle sizes';
    const facts = [
        `Minimum order from ${minMoq} bottles`,
        sizeFact,
        'Label preview approved before printing',
    ];

    return (
        <section id="home" className="relative overflow-hidden surface-mist">
            {/* Faint dot grid, fading out towards the bottom */}
            <div
                className="pointer-events-none absolute inset-0 grid-dots opacity-60"
                style={{ maskImage: 'linear-gradient(180deg, rgba(0,0,0,0.9), transparent 70%)', WebkitMaskImage: 'linear-gradient(180deg, rgba(0,0,0,0.9), transparent 70%)' }}
            />

            <div className="container-x relative pt-14 pb-20 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
                    {/* Copy */}
                    <div className="lg:col-span-6 text-center lg:text-left animate-fade-up">
                        <span className="eyebrow justify-center lg:justify-start">Custom branded water · Abbottabad</span>

                        <h1 className="h-display mt-5 text-[2.6rem] leading-[1.05] sm:text-5xl lg:text-[3.6rem] xl:text-[4rem]">
                            {settings.heroHeading}
                        </h1>

                        <p className="lead mt-6 max-w-xl mx-auto lg:mx-0">{settings.heroSubheading}</p>

                        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                            <a href="#customizer" className="btn-primary btn-lg w-full sm:w-auto">
                                <Palette className="w-4 h-4" />
                                Customize Your Bottle
                            </a>
                            <button onClick={onOpenQuote} className="btn-secondary btn-lg w-full sm:w-auto">
                                Request a Quote
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>

                        <ul className="mt-10 flex flex-col sm:flex-row sm:flex-wrap items-center justify-center lg:justify-start gap-x-7 gap-y-3 text-sm text-slate-600">
                            {facts.map((f) => (
                                <li key={f} className="flex items-center gap-2">
                                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-ice text-brand-green">
                                        <Check className="w-3 h-3" strokeWidth={3} />
                                    </span>
                                    {f}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Visual */}
                    <div className="lg:col-span-6 relative animate-fade-up" style={{ animationDelay: '120ms' }}>
                        <div className="relative mx-auto max-w-md">
                            <div className="relative overflow-hidden rounded-[2rem] shadow-lift ring-1 ring-brand-forest/10">
                                <ImageFrame
                                    src="/assets/mineral_bottle.jpg"
                                    alt="Chinar Mist water bottle with the green cap and chinar leaf label, in front of the Abbottabad mountains"
                                    className="aspect-[4/5] lg:aspect-[5/6]"
                                    imgClassName="p-3 sm:p-4"
                                    loading="eager"
                                />
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-forest/60 via-transparent to-transparent" />

                                {/* Caption */}
                                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                                    <div className="text-white max-w-[62%]">
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-200/90">Custom label</p>
                                        <p className="mt-1 font-heading font-semibold text-lg leading-tight">Your logo. Your colours. Your bottle.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Floating chip: brand mark */}
                            <div className="absolute -top-4 -left-3 sm:-left-6 card px-3.5 py-2.5 flex items-center gap-3 animate-float-slow">
                                <Emblem size={36} />
                                <div className="leading-tight">
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Bottled in</p>
                                    <p className="text-sm font-semibold text-brand-forest">Abbottabad, Pakistan</p>
                                </div>
                            </div>

                            {/* Floating chip: uses */}
                            <div className="absolute -bottom-5 -right-2 sm:-right-6 card px-4 py-3 hidden sm:block">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Made for</p>
                                <p className="mt-1 text-sm font-semibold text-brand-forest">Hotels · Restaurants · Events · Weddings</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
