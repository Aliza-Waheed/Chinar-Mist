import React from 'react';
import { ArrowRight, BadgeCheck } from 'lucide-react';
import { BottleProduct } from '../data/store';
import { Reveal } from './Reveal';
import { ImageFrame } from './ImageFrame';

interface BottleOptionsProps {
    products: BottleProduct[];
    onOpenQuote: (prefillSize?: string) => void;
}

export const BottleOptions: React.FC<BottleOptionsProps> = ({ products, onOpenQuote }) => {
    const customProducts = products.filter((p) => p.category === 'custom');
    if (customProducts.length === 0) return null;

    return (
        <section id="bottle-options" className="section bg-white scroll-mt-20">
            <div className="container-x">
                <Reveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                    <div className="max-w-2xl">
                        <span className="eyebrow">Bottle options</span>
                        <h2 className="h-section mt-4">Sizes for every table, room and event</h2>
                        <p className="lead mt-5">
                            Every size can be customized. Minimum order quantities are shown per bottle; pricing is quoted on request based on quantity and label finish.
                        </p>
                    </div>
                    <button onClick={() => onOpenQuote()} className="btn-secondary btn-md shrink-0 self-start lg:self-auto">
                        Ask about a size not listed
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </Reveal>

                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {customProducts.map((p, i) => (
                        <Reveal key={p.id} delay={i * 60}>
                            <article className="card-hover h-full flex flex-col overflow-hidden group">
                                <div className="relative aspect-[4/5] overflow-hidden">
                                    <ImageFrame src={p.image} alt={p.name} className="absolute inset-0" imgClassName="transition-transform duration-700 group-hover:scale-[1.04]" />
                                    <span className="absolute top-3 left-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-brand-forest shadow-sm">
                                        {p.size}
                                    </span>
                                    {p.customizable && (
                                        <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-brand-forest/70 backdrop-blur px-2.5 py-1 text-[11px] font-semibold text-white">
                                            <BadgeCheck className="w-3.5 h-3.5 text-sky-300" />
                                            Customizable
                                        </span>
                                    )}
                                </div>

                                <div className="p-5 flex flex-col flex-1">
                                    <h3 className="text-lg font-semibold leading-snug">{p.name}</h3>
                                    <p className="mt-2 text-sm text-slate-600 leading-relaxed flex-1">{p.description}</p>

                                    <dl className="mt-4 pt-4 border-t border-slate-100 text-sm">
                                        <div className="flex items-center justify-between">
                                            <dt className="text-slate-500">Minimum order</dt>
                                            <dd className="font-semibold text-brand-forest">{p.moq} bottles</dd>
                                        </div>
                                        {p.priceQuoteNote && <p className="mt-2 text-xs text-slate-500">{p.priceQuoteNote}</p>}
                                    </dl>

                                    <button onClick={() => onOpenQuote(p.size)} className="btn-secondary btn-md w-full mt-5">
                                        Request quote · {p.size}
                                    </button>
                                </div>
                            </article>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};
