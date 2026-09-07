import React from 'react';
import { Upload, Ruler, FileCheck2, Truck, ArrowRight } from 'lucide-react';
import { Reveal } from './Reveal';

interface ProcessStepperProps {
    onOpenQuote: () => void;
}

const STEPS = [
    { num: '01', title: 'Share Your Design', desc: 'Send your logo, brand name or a reference design. A rough idea is enough to start.', icon: Upload },
    { num: '02', title: 'Choose Your Bottle', desc: 'Pick the size, quantity, label finish and any packaging requirements.', icon: Ruler },
    { num: '03', title: 'Approve the Design', desc: 'We prepare a label preview. Nothing is printed until you sign it off.', icon: FileCheck2 },
    { num: '04', title: 'Get Your Bottles', desc: 'We bottle, label and deliver to your venue or office on the agreed date.', icon: Truck },
];

export const ProcessStepper: React.FC<ProcessStepperProps> = ({ onOpenQuote }) => {
    return (
        <section id="process" className="section bg-brand-mist scroll-mt-20">
            <div className="container-x">
                <Reveal className="max-w-2xl mx-auto text-center">
                    <span className="eyebrow justify-center">How it works</span>
                    <h2 className="h-section mt-4">From logo to delivered bottles in four steps</h2>
                    <p className="lead mt-5">A simple process with one approval point, so there are no surprises.</p>
                </Reveal>

                <div className="relative mt-14 lg:mt-16">
                    {/* Connector line (desktop) */}
                    <div className="hidden lg:block absolute top-7 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-brand-green/30 to-transparent" />

                    <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {STEPS.map((s, i) => {
                            const Icon = s.icon;
                            return (
                                <Reveal as="li" key={s.num} delay={i * 80} className="relative">
                                    <div className="flex lg:flex-col lg:items-center lg:text-center gap-5">
                                        <div className="relative shrink-0">
                                            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-brand-green shadow-soft ring-1 ring-slate-200/80">
                                                <Icon className="w-6 h-6" />
                                            </span>
                                            <span className="absolute -top-2 -right-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-brand-forest px-1.5 text-[10px] font-bold text-white">
                                                {s.num}
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold">{s.title}</h3>
                                            <p className="mt-2 text-sm text-slate-600 leading-relaxed">{s.desc}</p>
                                        </div>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </ol>
                </div>

                <Reveal className="mt-14 text-center">
                    <button onClick={onOpenQuote} className="btn-navy btn-lg">
                        Start your order
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </Reveal>
            </div>
        </section>
    );
};
