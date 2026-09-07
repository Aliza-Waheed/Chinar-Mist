import React, { useEffect, useMemo, useState } from 'react';
import { Send, Upload, CheckCircle2, Phone, Mail, MapPin, Instagram, FileCheck2, X } from 'lucide-react';
import { saveStoredQuote, SiteSettings, BottleProduct, whatsAppLink } from '../data/store';
import { Reveal } from './Reveal';
import { WhatsAppIcon } from './WhatsAppWidget';

interface QuoteFormProps {
    settings: SiteSettings;
    products: BottleProduct[];
    prefillSize?: string;
    prefillNote?: string;
    prefillLogoDataUrl?: string;
    prefillLogoFileName?: string;
}

const MAX_FILE_MB = 4;

export const QuoteForm: React.FC<QuoteFormProps> = ({ settings, products, prefillSize, prefillNote, prefillLogoDataUrl, prefillLogoFileName }) => {
    const sizeOptions = useMemo(() => {
        const custom = products.filter((p) => p.category === 'custom').map((p) => ({ value: p.size, label: p.name.toLowerCase().includes(p.size.toLowerCase()) ? p.name : `${p.size} — ${p.name}` }));
        return [...custom, { value: 'Standard Mineral Water 500ml', label: 'Standard Chinar Mist mineral water (no custom label)' }, { value: 'Not sure yet', label: 'Not sure yet — please advise' }];
    }, [products]);

    const [form, setForm] = useState({
        name: '',
        company: '',
        phone: '',
        email: '',
        city: '',
        bottleSize: prefillSize || sizeOptions[0]?.value || '500ml',
        quantity: '500',
        customizationRequired: 'Logo and brand name',
        deliveryLocation: '',
        additionalRequirements: prefillNote || '',
    });
    const [file, setFile] = useState<{ name: string; dataUrl: string } | null>(
        prefillLogoDataUrl ? { name: prefillLogoFileName || 'design-logo.png', dataUrl: prefillLogoDataUrl } : null
    );
    const [fileError, setFileError] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (prefillSize) setForm((p) => ({ ...p, bottleSize: prefillSize }));
    }, [prefillSize]);
    useEffect(() => {
        if (prefillNote) setForm((p) => ({ ...p, additionalRequirements: prefillNote }));
    }, [prefillNote]);
    useEffect(() => {
        if (prefillLogoDataUrl) setFile({ name: prefillLogoFileName || 'design-logo.png', dataUrl: prefillLogoDataUrl });
    }, [prefillLogoDataUrl, prefillLogoFileName]);

    const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
        setForm((p) => ({ ...p, [k]: e.target.value }));

    const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        setFileError('');
        if (!f) return;
        if (f.size > MAX_FILE_MB * 1024 * 1024) {
            setFileError(`File is larger than ${MAX_FILE_MB} MB. Please send it on WhatsApp instead.`);
            e.target.value = '';
            return;
        }
        const reader = new FileReader();
        reader.onload = (ev) => setFile({ name: f.name, dataUrl: ev.target?.result as string });
        reader.readAsDataURL(f);
    };

    const summary = () =>
        [
            `Quote request from ${form.name}${form.company ? ` (${form.company})` : ''}`,
            `Bottle size: ${form.bottleSize}`,
            `Quantity: ${form.quantity}`,
            `Customization: ${form.customizationRequired}`,
            `City: ${form.city}`,
            form.deliveryLocation ? `Delivery: ${form.deliveryLocation}` : '',
            form.additionalRequirements ? `Notes: ${form.additionalRequirements}` : '',
        ]
            .filter(Boolean)
            .join('\n');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        window.setTimeout(() => {
            saveStoredQuote({
                ...form,
                logoFileName: file?.name,
                logoDataUrl: file?.dataUrl,
            });
            setLoading(false);
            setSubmitted(true);
        }, 400);
    };

    const reset = () => {
        setSubmitted(false);
        setFile(null);
        setForm((p) => ({ ...p, name: '', company: '', phone: '', email: '', city: '', deliveryLocation: '', additionalRequirements: '' }));
    };

    const waHref = whatsAppLink(settings.whatsAppNumber, 'Hello Chinar Mist, I would like a quote for customized water bottles.');

    return (
        <section id="quote" className="section bg-white scroll-mt-20">
            <div className="container-x">
                <Reveal className="max-w-2xl">
                    <span className="eyebrow">Request a quote</span>
                    <h2 className="h-section mt-4">Tell us about your order</h2>
                    <p className="lead mt-5">
                        Share a few details and we will come back with pricing and a label preview. No obligation.
                    </p>
                </Reveal>

                <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Contact column */}
                    <Reveal className="lg:col-span-4 space-y-5">
                        <div className="surface-forest rounded-3xl p-7 text-white">
                            <h3 className="font-heading text-xl font-bold text-white">Prefer to talk?</h3>
                            <p className="mt-2 text-sm text-slate-300 leading-relaxed">WhatsApp is the fastest way to reach us. Send your logo and quantity and we will reply with a quote.</p>
                            <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn-whatsapp btn-md w-full mt-5">
                                <WhatsAppIcon className="w-4 h-4" />
                                Chat on WhatsApp
                            </a>

                            <ul className="mt-6 space-y-3.5 text-sm">
                                <li className="flex items-start gap-3">
                                    <Phone className="w-4 h-4 mt-0.5 text-sky-300 shrink-0" />
                                    <a href={`tel:${settings.contactPhone.replace(/\s+/g, '')}`} className="hover:text-sky-200">{settings.contactPhone}</a>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Mail className="w-4 h-4 mt-0.5 text-sky-300 shrink-0" />
                                    <a href={`mailto:${settings.contactEmail}`} className="hover:text-sky-200 break-all">{settings.contactEmail}</a>
                                </li>
                                {settings.instagramUrl && (
                                    <li className="flex items-start gap-3">
                                        <Instagram className="w-4 h-4 mt-0.5 text-sky-300 shrink-0" />
                                        <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-sky-200">Instagram</a>
                                    </li>
                                )}
                                <li className="flex items-start gap-3">
                                    <MapPin className="w-4 h-4 mt-0.5 text-sky-300 shrink-0" />
                                    <span className="text-slate-200">{settings.address}</span>
                                </li>
                            </ul>
                        </div>

                        <div className="card p-6">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">What happens next</p>
                            <ol className="mt-4 space-y-3.5 text-sm text-slate-600">
                                {['We confirm size, quantity and delivery date.', 'You receive a quote and a digital label preview.', 'Once approved, we print, bottle and deliver.'].map((t, i) => (
                                    <li key={t} className="flex gap-3">
                                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-ice text-[11px] font-bold text-brand-green">{i + 1}</span>
                                        <span>{t}</span>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </Reveal>

                    {/* Form column */}
                    <Reveal delay={80} className="lg:col-span-8">
                        <div className="card p-6 sm:p-8 lg:p-10">
                            {submitted ? (
                                <div className="py-8 text-center">
                                    <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                                        <CheckCircle2 className="w-8 h-8" />
                                    </span>
                                    <h3 className="mt-6 font-heading text-2xl font-bold">Thanks, {form.name.split(' ')[0] || 'there'}. We have your request.</h3>
                                    <p className="mt-3 text-slate-600 max-w-md mx-auto">
                                        We will contact you at <span className="font-semibold text-brand-forest">{form.phone || form.email}</span> with a quote and label preview.
                                    </p>
                                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                                        <a href={whatsAppLink(settings.whatsAppNumber, summary())} target="_blank" rel="noopener noreferrer" className="btn-whatsapp btn-md">
                                            <WhatsAppIcon className="w-4 h-4" />
                                            Send the same details on WhatsApp
                                        </a>
                                        <button onClick={reset} className="btn-ghost btn-md">Submit another request</button>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-8" noValidate={false}>
                                    <fieldset>
                                        <legend className="text-sm font-semibold text-brand-forest mb-4">Your details</legend>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="q-name" className="field-label">Full name *</label>
                                                <input id="q-name" required className="field" value={form.name} onChange={set('name')} autoComplete="name" />
                                            </div>
                                            <div>
                                                <label htmlFor="q-company" className="field-label">Company / organisation *</label>
                                                <input id="q-company" required className="field" value={form.company} onChange={set('company')} autoComplete="organization" />
                                            </div>
                                            <div>
                                                <label htmlFor="q-phone" className="field-label">Phone / WhatsApp *</label>
                                                <input id="q-phone" type="tel" required className="field" value={form.phone} onChange={set('phone')} autoComplete="tel" placeholder="+92 3xx xxxxxxx" />
                                            </div>
                                            <div>
                                                <label htmlFor="q-email" className="field-label">Email *</label>
                                                <input id="q-email" type="email" required className="field" value={form.email} onChange={set('email')} autoComplete="email" />
                                            </div>
                                            <div className="sm:col-span-2">
                                                <label htmlFor="q-city" className="field-label">City *</label>
                                                <input id="q-city" required className="field" value={form.city} onChange={set('city')} autoComplete="address-level2" />
                                            </div>
                                        </div>
                                    </fieldset>

                                    <fieldset>
                                        <legend className="text-sm font-semibold text-brand-forest mb-4">Your order</legend>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="q-size" className="field-label">Bottle size *</label>
                                                <select id="q-size" className="field" value={form.bottleSize} onChange={set('bottleSize')}>
                                                    {!sizeOptions.some((o) => o.value === form.bottleSize) && <option value={form.bottleSize}>{form.bottleSize}</option>}
                                                    {sizeOptions.map((o) => (
                                                        <option key={o.value} value={o.value}>{o.label}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label htmlFor="q-qty" className="field-label">Estimated quantity *</label>
                                                <select id="q-qty" className="field" value={form.quantity} onChange={set('quantity')}>
                                                    <option value="50">50 bottles (1.5L only)</option>
                                                    <option value="100">100 bottles</option>
                                                    <option value="250">250 bottles</option>
                                                    <option value="500">500 bottles</option>
                                                    <option value="1000">1,000 bottles</option>
                                                    <option value="2500+">2,500+ bottles</option>
                                                    <option value="Recurring supply">Recurring monthly supply</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label htmlFor="q-custom" className="field-label">Customization required *</label>
                                                <select id="q-custom" className="field" value={form.customizationRequired} onChange={set('customizationRequired')}>
                                                    <option>Logo and brand name</option>
                                                    <option>Full custom label design</option>
                                                    <option>Wedding or event design</option>
                                                    <option>Standard Chinar Mist label (no customization)</option>
                                                    <option>Not sure — need advice</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label htmlFor="q-delivery" className="field-label">Delivery location</label>
                                                <input id="q-delivery" className="field" value={form.deliveryLocation} onChange={set('deliveryLocation')} placeholder="Venue, office or address" />
                                            </div>
                                            <div className="sm:col-span-2">
                                                <label htmlFor="q-notes" className="field-label">Additional requirements</label>
                                                <textarea id="q-notes" rows={4} className="field resize-y" value={form.additionalRequirements} onChange={set('additionalRequirements')} placeholder="Event date, colours, label finish, packaging, anything else we should know" />
                                            </div>
                                            <div className="sm:col-span-2">
                                                <span className="field-label">Logo or reference file</span>
                                                {file ? (
                                                    <div className="flex items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm">
                                                        <span className="flex items-center gap-2 text-emerald-800 min-w-0">
                                                            <FileCheck2 className="w-4 h-4 shrink-0" />
                                                            <span className="truncate">{file.name}</span>
                                                        </span>
                                                        <button type="button" onClick={() => setFile(null)} className="text-emerald-800 hover:text-emerald-950" aria-label="Remove file">
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-brand-mist px-4 py-5 text-sm text-slate-600 transition-colors hover:border-brand-green hover:text-brand-green">
                                                        <Upload className="w-4 h-4" />
                                                        Upload logo, label design or reference image (PNG, JPG, SVG, PDF · up to {MAX_FILE_MB} MB)
                                                        <input type="file" accept="image/*,.pdf,.ai,.svg" onChange={onFile} className="sr-only" />
                                                    </label>
                                                )}
                                                {fileError && <p className="mt-2 text-xs text-rose-600">{fileError}</p>}
                                            </div>
                                        </div>
                                    </fieldset>

                                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
                                        <button type="submit" disabled={loading} className="btn-primary btn-lg w-full sm:w-auto">
                                            {loading ? 'Sending…' : 'Get My Quote'}
                                            {!loading && <Send className="w-4 h-4" />}
                                        </button>
                                        <p className="text-xs text-slate-500">We only use your details to respond to this request.</p>
                                    </div>
                                </form>
                            )}
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
};
