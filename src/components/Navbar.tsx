import React, { useEffect, useState } from 'react';
import { Menu, X, ArrowRight, Lock } from 'lucide-react';
import { SiteSettings, whatsAppLink } from '../data/store';
import { Logo } from './Logo';
import { WhatsAppIcon } from './WhatsAppWidget';

interface NavbarProps {
    settings: SiteSettings;
    onOpenQuote: () => void;
    onOpenAdmin?: () => void;
}

const NAV_LINKS = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'Customized Bottles', href: '#custom-bottles', id: 'custom-bottles' },
    { name: 'Mineral Water', href: '#mineral-water', id: 'mineral-water' },
    { name: 'How It Works', href: '#process', id: 'process' },
    { name: 'Gallery', href: '#gallery', id: 'gallery' },
    { name: 'About Us', href: '#about', id: 'about' },
    { name: 'Contact', href: '#quote', id: 'quote' },
];

export const Navbar: React.FC<NavbarProps> = ({ settings, onOpenQuote, onOpenAdmin }) => {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState('home');

    // Shadow on scroll
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Scroll spy
    useEffect(() => {
        const sections = NAV_LINKS
            .map((l) => document.getElementById(l.id))
            .filter((el): el is HTMLElement => !!el);
        if (sections.length === 0 || typeof IntersectionObserver === 'undefined') return;

        const io = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
                if (visible[0]) setActive(visible[0].target.id);
            },
            { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.2, 0.5] }
        );
        sections.forEach((s) => io.observe(s));
        return () => io.disconnect();
    }, []);

    // Lock body scroll when the mobile menu is open
    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    // Close on Escape
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open]);

    const waHref = whatsAppLink(settings.whatsAppNumber, 'Hello Chinar Mist, I would like to ask about customized water bottles.');

    return (
        <header
            className={`sticky top-0 z-50 bg-white/85 backdrop-blur-md transition-shadow duration-300 ${scrolled ? 'shadow-[0_1px_0_rgba(11,29,51,0.06),0_8px_24px_-16px_rgba(11,29,51,0.25)]' : 'shadow-[0_1px_0_rgba(11,29,51,0.06)]'
                }`}
        >
            <div className="container-x">
                <div className="flex h-[72px] items-center justify-between gap-6">
                    {/* Brand */}
                    <a href="#home" onClick={() => setOpen(false)} className="shrink-0" aria-label={`${settings.brandName} home`}>
                        <Logo size="md" />
                    </a>

                    {/* Desktop nav */}
                    <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
                        {NAV_LINKS.map((link) => {
                            const isActive = active === link.id;
                            return (
                                <a
                                    key={link.id}
                                    href={link.href}
                                    className={`relative px-3.5 py-2 text-[13.5px] font-medium rounded-full transition-colors ${isActive ? 'text-brand-green' : 'text-slate-600 hover:text-brand-forest hover:bg-brand-mist'
                                        }`}
                                >
                                    {link.name}
                                    {isActive && (
                                        <span className="absolute left-1/2 -bottom-0.5 h-1 w-1 -translate-x-1/2 rounded-full bg-brand-green" />
                                    )}
                                </a>
                            );
                        })}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        {onOpenAdmin && (
                            <button
                                onClick={onOpenAdmin}
                                className="hidden md:inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-500 hover:text-brand-forest hover:bg-brand-mist transition-colors"
                                aria-label="Admin panel"
                                title="Admin panel"
                            >
                                <Lock className="w-4 h-4" />
                            </button>
                        )}
                        <a
                            href={waHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden md:inline-flex h-10 w-10 items-center justify-center rounded-full text-[#25D366] hover:bg-[#25D366]/10 transition-colors"
                            aria-label="Chat on WhatsApp"
                            title="Chat on WhatsApp"
                        >
                            <WhatsAppIcon className="w-5 h-5" />
                        </a>
                        <button onClick={onOpenQuote} className="btn-primary btn-md hidden sm:inline-flex">
                            Get a Quote
                            <ArrowRight className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setOpen((v) => !v)}
                            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full text-brand-forest hover:bg-brand-mist transition-colors"
                            aria-expanded={open}
                            aria-controls="mobile-menu"
                            aria-label={open ? 'Close menu' : 'Open menu'}
                        >
                            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {open && (
                <div id="mobile-menu" className="lg:hidden absolute inset-x-0 top-full">
                    <div className="fixed inset-0 top-[72px] bg-brand-forest/30 backdrop-blur-sm" onClick={() => setOpen(false)} />
                    <div className="relative bg-white border-t border-slate-100 shadow-lift animate-fade-up">
                        <nav className="container-x py-4 flex flex-col" aria-label="Mobile">
                            {NAV_LINKS.map((link) => (
                                <a
                                    key={link.id}
                                    href={link.href}
                                    onClick={() => setOpen(false)}
                                    className={`flex items-center justify-between py-3.5 text-[15px] font-medium border-b border-slate-100 last:border-0 ${active === link.id ? 'text-brand-green' : 'text-brand-forest'
                                        }`}
                                >
                                    {link.name}
                                    <ArrowRight className="w-4 h-4 text-slate-300" />
                                </a>
                            ))}
                            {onOpenAdmin && (
                                <button
                                    onClick={() => {
                                        setOpen(false);
                                        onOpenAdmin();
                                    }}
                                    className="flex items-center justify-between py-3.5 text-[15px] font-medium border-b border-slate-100 text-slate-600 hover:text-brand-forest"
                                >
                                    <span className="flex items-center gap-2"><Lock className="w-4 h-4 text-brand-green" /> Admin Panel</span>
                                    <ArrowRight className="w-4 h-4 text-slate-300" />
                                </button>
                            )}
                            <div className="grid grid-cols-2 gap-3 pt-4">
                                <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn-whatsapp btn-md">
                                    <WhatsAppIcon className="w-4 h-4" />
                                    WhatsApp
                                </a>
                                <button
                                    onClick={() => {
                                        setOpen(false);
                                        onOpenQuote();
                                    }}
                                    className="btn-primary btn-md"
                                >
                                    Get a Quote
                                </button>
                            </div>
                        </nav>
                    </div>
                </div>
            )}
        </header>
    );
};
