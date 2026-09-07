import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { FAQ as FAQItem, whatsAppLink } from '../data/store';
import { Reveal } from './Reveal';
import { WhatsAppIcon } from './WhatsAppWidget';

interface FAQProps {
    faqs: FAQItem[];
    whatsAppNumber: string;
}

export const FAQ: React.FC<FAQProps> = ({ faqs, whatsAppNumber }) => {
    const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);
    if (!faqs || faqs.length === 0) return null;

    return (
        <section id="faq" className="section bg-brand-mist scroll-mt-20">
            <div className="container-x grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                <Reveal className="lg:col-span-4">
                    <span className="eyebrow">FAQ</span>
                    <h2 className="h-section mt-4">Common questions</h2>
                    <p className="lead mt-5">Can't find what you need? Message us and we will reply during working hours.</p>
                    <a
                        href={whatsAppLink(whatsAppNumber, 'Hello Chinar Mist, I have a question about custom bottles.')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-whatsapp btn-md mt-7"
                    >
                        <WhatsAppIcon className="w-4 h-4" />
                        Ask on WhatsApp
                    </a>
                </Reveal>

                <Reveal delay={80} className="lg:col-span-8">
                    <div className="card divide-y divide-slate-100">
                        {faqs.map((f) => {
                            const open = openId === f.id;
                            return (
                                <div key={f.id}>
                                    <button
                                        onClick={() => setOpenId(open ? null : f.id)}
                                        className="w-full flex items-center justify-between gap-6 px-6 py-5 text-left"
                                        aria-expanded={open}
                                    >
                                        <span className="text-[15px] sm:text-base font-semibold text-brand-forest">{f.question}</span>
                                        <span
                                            className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all ${open ? 'bg-brand-forest border-brand-forest text-white rotate-45' : 'border-slate-200 text-brand-forest'
                                                }`}
                                        >
                                            <Plus className="w-4 h-4" />
                                        </span>
                                    </button>
                                    <div
                                        className="grid transition-[grid-template-rows] duration-300 ease-out"
                                        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
                                    >
                                        <div className="overflow-hidden">
                                            <p className="px-6 pb-6 text-sm sm:text-[15px] text-slate-600 leading-relaxed">{f.answer}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Reveal>
            </div>
        </section>
    );
};
