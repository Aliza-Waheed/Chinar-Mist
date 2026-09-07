import React from 'react';
import {
    UtensilsCrossed, Hotel, Coffee, Building2, Heart, CalendarDays, Presentation, PartyPopper, GraduationCap, Megaphone,
} from 'lucide-react';

const INDUSTRIES = [
    { name: 'Restaurants', icon: UtensilsCrossed },
    { name: 'Hotels', icon: Hotel },
    { name: 'Cafés', icon: Coffee },
    { name: 'Corporate Offices', icon: Building2 },
    { name: 'Weddings', icon: Heart },
    { name: 'Events', icon: CalendarDays },
    { name: 'Conferences', icon: Presentation },
    { name: 'Parties', icon: PartyPopper },
    { name: 'Schools & Universities', icon: GraduationCap },
    { name: 'Promotional Campaigns', icon: Megaphone },
];

export const IndustriesStrip: React.FC = () => {
    const items = [...INDUSTRIES, ...INDUSTRIES];
    return (
        <section className="border-y border-slate-100 bg-white" aria-label="Industries we serve">
            <div className="container-x py-5 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                <p className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                    Trusted for
                </p>
                <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
                    <div className="marquee-track">
                        {items.map((it, i) => {
                            const Icon = it.icon;
                            return (
                                <span key={`${it.name}-${i}`} className="flex items-center gap-2.5 text-sm font-medium text-slate-600 whitespace-nowrap">
                                    <Icon className="w-4 h-4 text-brand-green" />
                                    {it.name}
                                </span>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};
