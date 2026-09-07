import React from 'react';
import { Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { SiteSettings, whatsAppLink } from '../data/store';
import { Logo } from './Logo';
import { WhatsAppIcon } from './WhatsAppWidget';

interface FooterProps {
    settings: SiteSettings;
    onOpenAdmin: () => void;
    onOpenQuote: () => void;
}

const NAV = [
    { name: 'Customized Bottles', href: '#custom-bottles' },
    { name: 'Design Your Bottle', href: '#customizer' },
    { name: 'How It Works', href: '#process' },
    { name: 'Bottle Sizes', href: '#bottle-options' },
    { name: 'Mineral Water', href: '#mineral-water' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'About Us', href: '#about' },
    { name: 'FAQ', href: '#faq' },
];

const INDUSTRIES = ['Restaurants & Cafés', 'Hotels & Resorts', 'Corporate Offices', 'Weddings', 'Events & Conferences', 'Schools & Universities'];

export const Footer: React.FC<FooterProps> = ({ settings, onOpenAdmin, onOpenQuote }) => {
    const waHref = whatsAppLink(settings.whatsAppNumber, 'Hello Chinar Mist, I would like to ask about customized water bottles.');

    return (
        <footer className="bg-brand-forest text-slate-300">
            <div className="container-x pt-16 pb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
                    {/* Brand */}
                    <div className="lg:col-span-5">
                        <a href="#home" aria-label={`${settings.brandName} home`}>
                            <Logo tone="light" size="md" />
                        </a>
                        <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
                            {settings.brandName} supplies customized, branded bottled water for businesses, hotels, restaurants, weddings and events, bottled in Abbottabad.
                        </p>
                        <p className="mt-3 text-sm font-medium text-white/90">{settings.tagline}</p>
                        <div className="mt-6 flex items-center gap-2">
                            <a href={waHref} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white hover:bg-[#25D366] transition-colors" aria-label="WhatsApp">
                                <WhatsAppIcon className="w-[18px] h-[18px]" />
                            </a>
                            {settings.instagramUrl && (
                                <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white hover:bg-white/15 transition-colors" aria-label="Instagram">
                                    <Instagram className="w-[18px] h-[18px]" />
                                </a>
                            )}
                            <a href={`mailto:${settings.contactEmail}`} className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white hover:bg-white/15 transition-colors" aria-label="Email">
                                <Mail className="w-[18px] h-[18px]" />
                            </a>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="lg:col-span-2">
                        <h4 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">Explore</h4>
                        <ul className="mt-4 space-y-2.5 text-sm">
                            {NAV.map((n) => (
                                <li key={n.href}>
                                    <a href={n.href} className="hover:text-white transition-colors">{n.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Industries */}
                    <div className="lg:col-span-2">
                        <h4 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">Industries</h4>
                        <ul className="mt-4 space-y-2.5 text-sm">
                            {INDUSTRIES.map((n) => (
                                <li key={n}>
                                    <a href="#custom-bottles" className="hover:text-white transition-colors">{n}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="lg:col-span-3">
                        <h4 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">Contact</h4>
                        <ul className="mt-4 space-y-3 text-sm">
                            <li className="flex items-start gap-3">
                                <Phone className="w-4 h-4 mt-0.5 text-sky-300 shrink-0" />
                                <a href={`tel:${settings.contactPhone.replace(/\s+/g, '')}`} className="hover:text-white">{settings.contactPhone}</a>
                            </li>
                            <li className="flex items-start gap-3">
                                <Mail className="w-4 h-4 mt-0.5 text-sky-300 shrink-0" />
                                <a href={`mailto:${settings.contactEmail}`} className="hover:text-white break-all">{settings.contactEmail}</a>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 mt-0.5 text-sky-300 shrink-0" />
                                <span>{settings.address}</span>
                            </li>
                        </ul>
                        <button onClick={onOpenQuote} className="btn btn-md mt-6 bg-white text-brand-forest hover:bg-brand-ice w-full sm:w-auto">
                            Request a Quote
                        </button>
                    </div>
                </div>

                <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
                    <p>© {new Date().getFullYear()} {settings.brandName}. All rights reserved.</p>
                    <div className="flex items-center gap-4">
                        <a href="#home" className="hover:text-slate-300">Back to top</a>
                        <button onClick={onOpenAdmin} className="hover:text-slate-300">Admin</button>
                    </div>
                </div>
            </div>
        </footer>
    );
};
