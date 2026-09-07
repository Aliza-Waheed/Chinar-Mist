import React, { useCallback, useEffect, useState } from 'react';
import {
    getStoredProducts, saveStoredProducts,
    getStoredGallery, saveStoredGallery,
    getStoredSettings, saveStoredSettings,
    getStoredQuotes, updateQuoteStatus, deleteQuote,
    getStoredBrandLogos, saveStoredBrandLogos,
    BottleProduct, GalleryItem, SiteSettings, QuoteSubmission, BrandLogo, QuoteStatus,
} from './data/store';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { IndustriesStrip } from './components/IndustriesStrip';
import { MainCustomSection } from './components/MainCustomSection';
import { BottleCustomizer, CustomDesign } from './components/BottleCustomizer';
import { ProcessStepper } from './components/ProcessStepper';
import { BottleOptions } from './components/BottleOptions';
import { BrandingFeatures } from './components/BrandingFeatures';
import { SecondaryMineralWater } from './components/SecondaryMineralWater';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Gallery } from './components/Gallery';
import { AboutSection } from './components/AboutSection';
import { FAQ } from './components/FAQ';
import { QuoteForm } from './components/QuoteForm';
import { Footer } from './components/Footer';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { AdminPanel } from './components/AdminPanel';

export function App() {
    const [products, setProducts] = useState<BottleProduct[]>(() => getStoredProducts());
    const [gallery, setGallery] = useState<GalleryItem[]>(() => getStoredGallery());
    const [settings, setSettings] = useState<SiteSettings>(() => getStoredSettings());
    const [quotes, setQuotes] = useState<QuoteSubmission[]>(() => getStoredQuotes());
    const [brandLogos, setBrandLogos] = useState<BrandLogo[]>(() => getStoredBrandLogos());

    const [adminOpen, setAdminOpen] = useState(false);
    const [prefillSize, setPrefillSize] = useState<string | undefined>();
    const [prefillNote, setPrefillNote] = useState<string | undefined>();

    // Keep the document title in sync with the editable brand name
    useEffect(() => {
        document.title = `${settings.brandName} — Customized Water Bottles for Your Brand | Abbottabad`;
    }, [settings.brandName]);

    // Open admin with #admin in the URL (handy for the owner; not linked prominently)
    useEffect(() => {
        if (window.location.hash === '#admin') setAdminOpen(true);
    }, []);

    const scrollToQuote = useCallback(() => {
        const el = document.getElementById('quote');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, []);

    const handleOpenQuote = useCallback(
        (size?: string, note?: string) => {
            if (size) setPrefillSize(size);
            if (note) setPrefillNote(note);
            scrollToQuote();
        },
        [scrollToQuote]
    );

    const handleQuoteWithDesign = (d: CustomDesign) => {
        const note = [
            `Design from the live preview:`,
            `Brand: ${d.brandText}${d.tagline ? ` — ${d.tagline}` : ''}`,
            `Sizes: ${d.bottleSizes.join(', ')}`,
            `Label: ${d.labelStyle}`,
            `Use: ${d.category}`,
            d.logoDataUrl ? 'Logo uploaded in the preview (please attach the file below too).' : '',
        ]
            .filter(Boolean)
            .join('\n');
        handleOpenQuote(d.bottleSizes[0], note);
    };

    const handleSaveProducts = (p: BottleProduct[]) => { setProducts(p); saveStoredProducts(p); };
    const handleSaveGallery = (g: GalleryItem[]) => { setGallery(g); saveStoredGallery(g); };
    const handleSaveSettings = (s: SiteSettings) => { setSettings(s); saveStoredSettings(s); };
    const handleSaveBrandLogos = (l: BrandLogo[]) => { setBrandLogos(l); saveStoredBrandLogos(l); };
    const handleUpdateQuoteStatus = (id: string, status: QuoteStatus) => setQuotes(updateQuoteStatus(id, status));
    const handleDeleteQuote = (id: string) => setQuotes(deleteQuote(id));
    const refreshQuotes = () => setQuotes(getStoredQuotes());

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar settings={settings} onOpenQuote={() => handleOpenQuote()} onOpenAdmin={() => setAdminOpen(true)} />

            <main className="flex-1">
                <Hero settings={settings} products={products} onOpenQuote={() => handleOpenQuote()} />
                <IndustriesStrip />
                <MainCustomSection onOpenQuote={(note) => handleOpenQuote(undefined, note)} />
                <BottleCustomizer products={products} onQuoteWithDesign={handleQuoteWithDesign} />
                <ProcessStepper onOpenQuote={() => handleOpenQuote()} />
                <BottleOptions products={products} onOpenQuote={(size) => handleOpenQuote(size)} />
                <BrandingFeatures onOpenQuote={() => handleOpenQuote()} />
                <SecondaryMineralWater products={products} onOpenQuote={(size) => handleOpenQuote(size)} />
                <WhyChooseUs />
                <Gallery items={gallery} brandLogos={brandLogos} onOpenQuote={(note) => handleOpenQuote(undefined, note)} />
                <AboutSection settings={settings} products={products} />
                <FAQ faqs={settings.faqs} whatsAppNumber={settings.whatsAppNumber} />
                <QuoteForm settings={settings} products={products} prefillSize={prefillSize} prefillNote={prefillNote} />
            </main>

            <Footer settings={settings} onOpenAdmin={() => setAdminOpen(true)} onOpenQuote={() => handleOpenQuote()} />

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
