import React, { useCallback, useEffect, useState } from 'react';
import {
    getStoredProducts, saveStoredProducts,
    getStoredGallery, saveStoredGallery,
    getStoredSettings, saveStoredSettings,
    getStoredQuotes, updateQuoteStatus, deleteQuote,
    getStoredBrandLogos, saveStoredBrandLogos,
    BottleProduct, GalleryItem, SiteSettings, QuoteSubmission, BrandLogo, QuoteStatus,
} from './data/store';

import { Navbar, PageRoute } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { AdminPanel } from './components/AdminPanel';
import { CustomDesign } from './components/BottleCustomizer';

import { HomePage } from './pages/HomePage';
import { CustomBottlesPage } from './pages/CustomBottlesPage';
import { MineralWaterPage } from './pages/MineralWaterPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { GalleryPage } from './pages/GalleryPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

function getPageRouteFromHash(): PageRoute {
    const hash = window.location.hash.replace(/^#\/?/, '');
    if (hash === 'custom-bottles' || hash === 'customizer' || hash === 'bottle-options') return 'custom-bottles';
    if (hash === 'mineral-water') return 'mineral-water';
    if (hash === 'how-it-works' || hash === 'process') return 'how-it-works';
    if (hash === 'gallery') return 'gallery';
    if (hash === 'about') return 'about';
    if (hash === 'contact' || hash === 'quote' || hash === 'faq') return 'contact';
    return 'home';
}

export function App() {
    const [products, setProducts] = useState<BottleProduct[]>(() => getStoredProducts());
    const [gallery, setGallery] = useState<GalleryItem[]>(() => getStoredGallery());
    const [settings, setSettings] = useState<SiteSettings>(() => getStoredSettings());
    const [quotes, setQuotes] = useState<QuoteSubmission[]>(() => getStoredQuotes());
    const [brandLogos, setBrandLogos] = useState<BrandLogo[]>(() => getStoredBrandLogos());

    const [currentPage, setCurrentPage] = useState<PageRoute>(() => getPageRouteFromHash());
    const [adminOpen, setAdminOpen] = useState(false);
    const [prefillSize, setPrefillSize] = useState<string | undefined>();
    const [prefillNote, setPrefillNote] = useState<string | undefined>();
    const [prefillLogoDataUrl, setPrefillLogoDataUrl] = useState<string | undefined>();
    const [prefillLogoFileName, setPrefillLogoFileName] = useState<string | undefined>();

    // Keep the document title in sync with the editable brand name
    useEffect(() => {
        document.title = `${settings.brandName} — Customized Water Bottles for Your Brand | Abbottabad`;
    }, [settings.brandName]);

    // Handle hash-based routing & browser back/forward navigation
    useEffect(() => {
        const handleHashChange = () => {
            if (window.location.hash === '#admin') {
                setAdminOpen(true);
                return;
            }
            const page = getPageRouteFromHash();
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };

        if (window.location.hash === '#admin') {
            setAdminOpen(true);
        }

        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const handleNavigate = (page: PageRoute) => {
        setCurrentPage(page);
        window.location.hash = page === 'home' ? '#/' : `#/${page}`;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleOpenQuote = useCallback(
        (size?: string, note?: string, logoDataUrl?: string, logoFileName?: string) => {
            if (size) setPrefillSize(size);
            if (note) setPrefillNote(note);
            if (logoDataUrl) setPrefillLogoDataUrl(logoDataUrl);
            if (logoFileName) setPrefillLogoFileName(logoFileName);
            handleNavigate('contact');
        },
        []
    );

    const handleQuoteWithDesign = (d: CustomDesign) => {
        const note = [
            `Design from the live preview:`,
            `Brand: ${d.brandText}${d.tagline ? ` — ${d.tagline}` : ''}`,
            `Sizes: ${d.bottleSizes.join(', ')}`,
            `Label: ${d.labelStyle}`,
            `Use: ${d.category}`,
        ]
            .filter(Boolean)
            .join('\n');
        handleOpenQuote(
            d.bottleSizes[0],
            note,
            d.logoDataUrl,
            d.logoDataUrl ? `${d.brandText.toLowerCase().replace(/[^a-z0-9]/g, '_')}_logo.png` : undefined
        );
    };

    const handleSaveProducts = (p: BottleProduct[]) => { setProducts(p); saveStoredProducts(p); };
    const handleSaveGallery = (g: GalleryItem[]) => { setGallery(g); saveStoredGallery(g); };
    const handleSaveSettings = (s: SiteSettings) => { setSettings(s); saveStoredSettings(s); };
    const handleSaveBrandLogos = (l: BrandLogo[]) => { setBrandLogos(l); saveStoredBrandLogos(l); };
    const handleUpdateQuoteStatus = (id: string, status: QuoteStatus) => setQuotes(updateQuoteStatus(id, status));
    const handleDeleteQuote = (id: string) => setQuotes(deleteQuote(id));
    const refreshQuotes = () => setQuotes(getStoredQuotes());

    const renderPage = () => {
        switch (currentPage) {
            case 'custom-bottles':
                return (
                    <CustomBottlesPage
                        settings={settings}
                        products={products}
                        onOpenQuote={handleOpenQuote}
                        onQuoteWithDesign={handleQuoteWithDesign}
                    />
                );
            case 'mineral-water':
                return (
                    <MineralWaterPage
                        settings={settings}
                        products={products}
                        onOpenQuote={handleOpenQuote}
                    />
                );
            case 'how-it-works':
                return (
                    <HowItWorksPage
                        settings={settings}
                        products={products}
                        onOpenQuote={handleOpenQuote}
                    />
                );
            case 'gallery':
                return (
                    <GalleryPage
                        settings={settings}
                        items={gallery}
                        brandLogos={brandLogos}
                        products={products}
                        onOpenQuote={handleOpenQuote}
                    />
                );
            case 'about':
                return (
                    <AboutPage
                        settings={settings}
                        products={products}
                        onOpenQuote={handleOpenQuote}
                    />
                );
            case 'contact':
                return (
                    <ContactPage
                        settings={settings}
                        products={products}
                        prefillSize={prefillSize}
                        prefillNote={prefillNote}
                        prefillLogoDataUrl={prefillLogoDataUrl}
                        prefillLogoFileName={prefillLogoFileName}
                    />
                );
            case 'home':
            default:
                return (
                    <HomePage
                        settings={settings}
                        products={products}
                        onOpenQuote={handleOpenQuote}
                        onNavigate={handleNavigate}
                    />
                );
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar
                settings={settings}
                activePage={currentPage}
                onNavigate={handleNavigate}
                onOpenQuote={() => handleOpenQuote()}
                onOpenAdmin={() => setAdminOpen(true)}
            />

            <main className="flex-1">
                {renderPage()}
            </main>

            <Footer
                settings={settings}
                onNavigate={handleNavigate}
                onOpenAdmin={() => setAdminOpen(true)}
                onOpenQuote={() => handleOpenQuote()}
            />

            <WhatsAppWidget whatsAppNumber={settings.whatsAppNumber} contactPhone={settings.contactPhone} />

            {adminOpen && (
                <AdminPanel
                    products={products}
                    gallery={gallery}
                    settings={settings}
                    quotes={quotes}
                    brandLogos={brandLogos}
                    onSaveProducts={handleSaveProducts}
                    onSaveGallery={handleSaveGallery}
                    onSaveSettings={handleSaveSettings}
                    onSaveBrandLogos={handleSaveBrandLogos}
                    onUpdateQuoteStatus={handleUpdateQuoteStatus}
                    onDeleteQuote={handleDeleteQuote}
                    onRefreshQuotes={refreshQuotes}
                    onClose={() => setAdminOpen(false)}
                />
            )}
        </div>
    );
}

export default App;
