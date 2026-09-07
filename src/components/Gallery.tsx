import React, { useEffect, useState } from 'react';
import { X, ArrowRight, ZoomIn } from 'lucide-react';
import { GalleryItem, BrandLogo } from '../data/store';
import { Reveal } from './Reveal';
import { ImageFrame } from './ImageFrame';

interface GalleryProps {
    items: GalleryItem[];
    brandLogos?: BrandLogo[];
    onOpenQuote: (note?: string) => void;
}

const CATEGORIES = ['All', 'Hotel', 'Restaurant', 'Wedding', 'Corporate', 'Event', 'Mineral Water'];

export const Gallery: React.FC<GalleryProps> = ({ items, brandLogos = [], onOpenQuote }) => {
    const [category, setCategory] = useState('All');
    const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

    const logos = brandLogos.filter((l) => l.enabled).sort((a, b) => a.order - b.order);
    const filtered = category === 'All' ? items : items.filter((i) => i.category === category);

    useEffect(() => {
        if (!lightbox) return;
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setLightbox(null);
        window.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [lightbox]);

    return (
        <section id="gallery" className="section bg-brand-mist scroll-mt-20">
            <div className="container-x">
                <Reveal className="max-w-2xl">
                    <span className="eyebrow">Gallery</span>
                    <h2 className="h-section mt-4">Bottles we have made</h2>
                    <p className="lead mt-5">Label designs and packaging from hotel, restaurant, corporate, wedding and event orders.</p>
                </Reveal>

                {/* Client logos (only when real ones exist) */}
                {logos.length > 0 && (
                    <Reveal className="mt-10">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">Brands we have bottled for</p>
                        <div className="mt-4 relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
                            <div className="marquee-track gap-6">
                                {[...logos, ...logos].map((logo, i) => (
                                    <a
                                        key={`${logo.id}-${i}`}
                                        href={logo.websiteUrl || undefined}
                                        target={logo.websiteUrl ? '_blank' : undefined}
                                        rel="noopener noreferrer"
                                        className="card px-5 py-3 flex items-center gap-3 shrink-0 hover:border-brand-green/30"
                                        title={logo.name}
                                    >
                                        <img src={logo.logoUrl} alt={logo.name} className="h-8 w-auto max-w-[120px] object-contain" loading="lazy" />
                                        <span className="text-sm font-medium text-brand-forest whitespace-nowrap">{logo.name}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                )}

                {/* Filters */}
                <Reveal className="mt-10 flex flex-wrap gap-2">
                    {CATEGORIES.map((c) => (
                        <button key={c} onClick={() => setCategory(c)} className={`pill px-4 py-1.5 transition-colors ${category === c ? 'pill-active' : 'hover:border-slate-300'}`}>
                            {c}
                        </button>
                    ))}
                </Reveal>

                {/* Grid */}
                {filtered.length === 0 ? (
                    <div className="mt-10 card p-10 text-center text-sm text-slate-500">No designs in this category yet.</div>
                ) : (
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filtered.map((item, i) => (
                            <Reveal key={item.id} delay={(i % 3) * 60}>
                                <button
                                    onClick={() => setLightbox(item)}
                                    className="card-hover w-full text-left overflow-hidden group"
                                    aria-label={`View ${item.title}`}
                                >
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <ImageFrame src={item.image} alt={item.title} className="absolute inset-0" imgClassName="transition-transform duration-700 group-hover:scale-[1.04]" />
                                        <span className="absolute top-3 left-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-brand-forest">
                                            {item.category}
                                        </span>
                                        <span className="absolute bottom-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-brand-forest opacity-0 translate-y-1 transition-all group-hover:opacity-100 group-hover:translate-y-0">
                                            <ZoomIn className="w-4 h-4" />
                                        </span>
                                    </div>
                                    <div className="p-5">
                                        <h3 className="text-base font-semibold">{item.title}</h3>
                                        <p className="mt-1 text-sm text-slate-600 line-clamp-2">{item.description}</p>
                                    </div>
                                </button>
                            </Reveal>
                        ))}
                    </div>
                )}
            </div>

            {/* Lightbox */}
            {lightbox && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true" aria-label={lightbox.title}>
                    <div className="absolute inset-0 bg-brand-forest/80 backdrop-blur-sm" onClick={() => setLightbox(null)} />
                    <div className="relative w-full max-w-3xl card overflow-hidden animate-fade-up">
                        <button
                            onClick={() => setLightbox(null)}
                            className="absolute top-3 right-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-brand-forest shadow-sm hover:bg-white"
                            aria-label="Close"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <ImageFrame src={lightbox.image} alt={lightbox.title} className="aspect-[4/3] sm:aspect-video" loading="eager" />
                        <div className="p-6 sm:p-7 flex flex-col sm:flex-row sm:items-end justify-between gap-5">
                            <div>
                                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-green">{lightbox.category}</span>
                                <h3 className="mt-1.5 text-xl font-semibold">{lightbox.title}</h3>
                                <p className="mt-2 text-sm text-slate-600 max-w-lg">{lightbox.description}</p>
                            </div>
                            <button
                                onClick={() => {
                                    const t = lightbox.title;
                                    setLightbox(null);
                                    onOpenQuote(`Custom bottle design similar to: ${t}`);
                                }}
                                className="btn-primary btn-md shrink-0"
                            >
                                Request something similar
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};
