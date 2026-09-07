import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { BottleProduct } from '../data/store';
import { Reveal } from './Reveal';
import { ImageFrame } from './ImageFrame';

interface SecondaryMineralWaterProps {
    products: BottleProduct[];
    onOpenQuote: (prefillSize?: string) => void;
}

export const SecondaryMineralWater: React.FC<SecondaryMineralWaterProps> = ({ products, onOpenQuote }) => {
    const mineral = products.find((p) => p.category === 'mineral');

    return (
        <section id="mineral-water" className="section-tight bg-white scroll-mt-20">
            <div className="container-x">
                <Reveal>
                    <div className="card overflow-hidden grid grid-cols-1 md:grid-cols-12">
                        <div className="md:col-span-5 relative min-h-[300px]">
                            <ImageFrame
                                src={mineral?.image || '/assets/mineral_bottle.jpg'}
                                alt="Chinar Mist 500ml mineral water bottle with the standard green label"
                                className="absolute inset-0"
                                imgClassName="p-4"
                            />
                        </div>
                        <div className="md:col-span-7 p-7 sm:p-10 lg:p-12">
                            <span className="eyebrow">Also available</span>
                            <h2 className="mt-4 font-heading text-2xl sm:text-3xl font-bold">Premium Mineral Water</h2>
                            <p className="mt-4 text-slate-600 leading-relaxed">
                                Prefer our standard label? Chinar Mist mineral water is available by the case for offices, shops, events and
                                homes — the same purified water we use for every custom order.
                            </p>
                            <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-slate-700">
                                {['Multi-stage filtration and UV treatment', 'Bottled in Abbottabad', mineral ? `${mineral.size} bottles, cases from ${mineral.moq}` : '500ml bottles by the case', 'Wholesale pricing on request'].map((t) => (
                                    <li key={t} className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-brand-green shrink-0" strokeWidth={2.5} />
                                        {t}
                                    </li>
                                ))}
                            </ul>
                            <button onClick={() => onOpenQuote('Standard Mineral Water 500ml')} className="btn-secondary btn-md mt-7">
                                View Mineral Water
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};
