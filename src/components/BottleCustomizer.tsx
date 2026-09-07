import React, { useMemo, useState } from 'react';
import { Upload, RotateCcw, Check, ArrowRight, X } from 'lucide-react';
import { BottleProduct } from '../data/store';
import { Reveal } from './Reveal';

export interface CustomDesign {
    brandText: string;
    tagline: string;
    bottleSizes: string[];
    labelStyle: string;
    category: string;
    logoDataUrl?: string;
}

interface BottleCustomizerProps {
    products: BottleProduct[];
    onQuoteWithDesign: (design: CustomDesign) => void;
}

type ColorMode = 'preset' | 'solid' | 'gradient' | 'foil';

const PALETTES = [
    { name: 'Midnight', primary: '#0B1D33', secondary: '#1656C7', text: '#FFFFFF', accent: '#4A90E2' },
    { name: 'Black & Gold', primary: '#121212', secondary: '#2A2214', text: '#E8C77A', accent: '#D4AF37' },
    { name: 'Ivory', primary: '#FAF7F0', secondary: '#EFE9DC', text: '#1F2937', accent: '#B8A67A' },
    { name: 'Forest', primary: '#0F3D2E', secondary: '#1B5E48', text: '#E6F4EC', accent: '#7FCBA4' },
    { name: 'Ocean', primary: '#0E7490', secondary: '#0284C7', text: '#FFFFFF', accent: '#7DD3FC' },
    { name: 'Rose', primary: '#4C0519', secondary: '#9F1239', text: '#FFE4E6', accent: '#FB7185' },
    { name: 'Slate', primary: '#1E293B', secondary: '#334155', text: '#F8FAFC', accent: '#94A3B8' },
    { name: 'Pure White', primary: '#FFFFFF', secondary: '#F1F5F9', text: '#0B1D33', accent: '#1656C7' },
];

const CATEGORIES = ['Corporate', 'Restaurant', 'Hotel', 'Wedding', 'Event', 'Café', 'School', 'Promotional'];

const FALLBACK_SIZES = [
    { size: '250ml', moq: 100 },
    { size: '330ml', moq: 100 },
    { size: '500ml', moq: 100 },
    { size: '1.5L', moq: 50 },
];

const ColorInput: React.FC<{ label: string; value: string; onChange: (v: string) => void }> = ({ label, value, onChange }) => (
    <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2">
        <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="h-8 w-8 cursor-pointer rounded-md border-0 bg-transparent p-0" aria-label={label} />
        <span className="flex-1 text-xs">
            <span className="block text-slate-500">{label}</span>
            <span className="font-mono font-medium text-brand-forest uppercase">{value}</span>
        </span>
    </label>
);

export const BottleCustomizer: React.FC<BottleCustomizerProps> = ({ products, onQuoteWithDesign }) => {
    const sizes = useMemo(() => {
        const custom = products.filter((p) => p.category === 'custom');
        return custom.length ? custom.map((p) => ({ size: p.size, moq: p.moq })) : FALLBACK_SIZES;
    }, [products]);

    const [brandText, setBrandText] = useState('YOUR BRAND');
    const [tagline, setTagline] = useState('Premium Mineral Water');
    const [selectedSizes, setSelectedSizes] = useState<string[]>([sizes[Math.min(2, sizes.length - 1)]?.size || '500ml']);
    const [category, setCategory] = useState('Corporate');
    const [mode, setMode] = useState<ColorMode>('preset');
    const [palette, setPalette] = useState(PALETTES[0]);
    const [primary, setPrimary] = useState(PALETTES[0].primary);
    const [secondary, setSecondary] = useState(PALETTES[0].secondary);
    const [text, setText] = useState(PALETTES[0].text);
    const [accent, setAccent] = useState(PALETTES[0].accent);
    const [angle, setAngle] = useState('160deg');
    const [logo, setLogo] = useState<string | null>(null);

    const applyPalette = (p: typeof PALETTES[number]) => {
        setPalette(p);
        setPrimary(p.primary);
        setSecondary(p.secondary);
        setText(p.text);
        setAccent(p.accent);
    };

    const toggleSize = (s: string) =>
        setSelectedSizes((prev) => (prev.includes(s) ? (prev.length === 1 ? prev : prev.filter((x) => x !== s)) : [...prev, s]));

    const onLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (!f) return;
        const r = new FileReader();
        r.onload = (ev) => setLogo(ev.target?.result as string);
        r.readAsDataURL(f);
    };

    const reset = () => {
        setBrandText('YOUR BRAND');
        setTagline('Premium Mineral Water');
        setSelectedSizes([sizes[Math.min(2, sizes.length - 1)]?.size || '500ml']);
        setCategory('Corporate');
        setMode('preset');
        applyPalette(PALETTES[0]);
        setAngle('160deg');
        setLogo(null);
    };

    const labelBackground = (() => {
        if (mode === 'solid') return primary;
        if (mode === 'gradient') return angle === 'radial' ? `radial-gradient(circle at 50% 40%, ${primary}, ${secondary})` : `linear-gradient(${angle}, ${primary}, ${secondary})`;
        if (mode === 'foil') return `linear-gradient(135deg, ${primary} 0%, ${secondary} 35%, #FFFFFF 50%, ${secondary} 65%, ${primary} 100%)`;
        return `linear-gradient(160deg, ${primary}, ${secondary})`;
    })();

    const labelStyleLabel = (() => {
        if (mode === 'preset') return `${palette.name} preset`;
        if (mode === 'solid') return `Solid ${primary}`;
        if (mode === 'gradient') return `Gradient ${primary} → ${secondary}`;
        return `Metallic foil ${primary}`;
    })();

    const previewSize = selectedSizes[selectedSizes.length - 1];

    return (
        <section id="customizer" className="section bg-brand-mist scroll-mt-20">
            <div className="container-x">
                <Reveal className="max-w-2xl">
                    <span className="eyebrow">Design it live</span>
                    <h2 className="h-section mt-4">Preview your label before you ask for a quote</h2>
                    <p className="lead mt-5">
                        Type your brand name, pick colours and sizes, or drop in your logo. Your choices are attached to the quote request so we can start from the right place.
                    </p>
                </Reveal>

                <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                    {/* Controls */}
                    <Reveal className="lg:col-span-7 card p-6 sm:p-8 space-y-8">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">Your design</h3>
                            <button type="button" onClick={reset} className="btn-ghost btn-sm text-slate-500">
                                <RotateCcw className="w-3.5 h-3.5" />
                                Reset
                            </button>
                        </div>

                        {/* 1. Text & logo */}
                        <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-green">1 · Brand name & logo</p>
                            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label htmlFor="c-brand" className="field-label">Brand name</label>
                                    <input id="c-brand" className="field-sm" value={brandText} onChange={(e) => setBrandText(e.target.value)} maxLength={28} placeholder="e.g. Serene Hotel" />
                                </div>
                                <div>
                                    <label htmlFor="c-tag" className="field-label">Tagline</label>
                                    <input id="c-tag" className="field-sm" value={tagline} onChange={(e) => setTagline(e.target.value)} maxLength={40} placeholder="e.g. Natural Mineral Water" />
                                </div>
                            </div>
                            <div className="mt-3">
                                {logo ? (
                                    <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2">
                                        <span className="flex items-center gap-3 text-sm text-slate-600">
                                            <img src={logo} alt="Uploaded logo" className="h-9 w-9 rounded-md object-contain bg-slate-50" />
                                            Logo added to label
                                        </span>
                                        <button type="button" onClick={() => setLogo(null)} className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100" aria-label="Remove logo">
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-brand-mist px-4 py-3 text-sm text-slate-600 transition-colors hover:border-brand-green hover:text-brand-green">
                                        <Upload className="w-4 h-4" />
                                        Upload your logo (optional)
                                        <input type="file" accept="image/*" onChange={onLogo} className="sr-only" />
                                    </label>
                                )}
                            </div>
                        </div>

                        {/* 2. Sizes */}
                        <div>
                            <div className="flex items-center justify-between">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-green">2 · Bottle sizes</p>
                                <span className="text-xs text-slate-500">{selectedSizes.length} selected</span>
                            </div>
                            <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                                {sizes.map((s) => {
                                    const on = selectedSizes.includes(s.size);
                                    return (
                                        <button
                                            key={s.size}
                                            type="button"
                                            onClick={() => toggleSize(s.size)}
                                            aria-pressed={on}
                                            className={`relative rounded-xl border px-3 py-3 text-left transition-all ${on ? 'border-brand-forest bg-brand-forest text-white shadow-soft' : 'border-slate-200 bg-white text-brand-forest hover:border-slate-300'}`}
                                        >
                                            <span className="block text-sm font-bold">{s.size}</span>
                                            <span className={`block text-[11px] ${on ? 'text-slate-300' : 'text-slate-500'}`}>MOQ {s.moq}</span>
                                            {on && (
                                                <span className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-white text-brand-forest">
                                                    <Check className="w-2.5 h-2.5" strokeWidth={4} />
                                                </span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* 3. Colours */}
                        <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-green">3 · Label colours</p>
                            <div className="mt-3 inline-flex rounded-full border border-slate-200 bg-white p-1 text-xs font-semibold">
                                {([
                                    ['preset', 'Presets'],
                                    ['solid', 'Solid'],
                                    ['gradient', 'Gradient'],
                                    ['foil', 'Metallic foil'],
                                ] as [ColorMode, string][]).map(([m, l]) => (
                                    <button key={m} type="button" onClick={() => setMode(m)} className={`rounded-full px-3.5 py-1.5 transition-colors ${mode === m ? 'bg-brand-forest text-white' : 'text-slate-600 hover:text-brand-forest'}`}>
                                        {l}
                                    </button>
                                ))}
                            </div>

                            {mode === 'preset' && (
                                <div className="mt-3 grid grid-cols-4 sm:grid-cols-8 gap-2">
                                    {PALETTES.map((p) => {
                                        const on = palette.name === p.name && primary === p.primary;
                                        return (
                                            <button
                                                key={p.name}
                                                type="button"
                                                onClick={() => applyPalette(p)}
                                                title={p.name}
                                                aria-pressed={on}
                                                className={`flex flex-col items-center gap-1.5 rounded-xl border p-2 transition-all ${on ? 'border-brand-forest bg-white shadow-soft' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                                            >
                                                <span className="h-8 w-8 rounded-full ring-1 ring-black/5" style={{ background: `linear-gradient(160deg, ${p.primary}, ${p.secondary})` }} />
                                                <span className="text-[10px] font-medium text-slate-600 truncate w-full text-center">{p.name}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}

                            {mode === 'solid' && (
                                <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <ColorInput label="Label" value={primary} onChange={setPrimary} />
                                    <ColorInput label="Text" value={text} onChange={setText} />
                                    <ColorInput label="Accent" value={accent} onChange={setAccent} />
                                </div>
                            )}

                            {mode === 'gradient' && (
                                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <ColorInput label="Start" value={primary} onChange={setPrimary} />
                                    <ColorInput label="End" value={secondary} onChange={setSecondary} />
                                    <ColorInput label="Text" value={text} onChange={setText} />
                                    <div>
                                        <label htmlFor="c-angle" className="sr-only">Direction</label>
                                        <select id="c-angle" className="field-sm h-full" value={angle} onChange={(e) => setAngle(e.target.value)}>
                                            <option value="160deg">Diagonal</option>
                                            <option value="90deg">Left to right</option>
                                            <option value="180deg">Top to bottom</option>
                                            <option value="radial">Radial</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            {mode === 'foil' && (
                                <div className="mt-3 space-y-3">
                                    <p className="text-sm text-slate-600">Simulates a metallic foil finish. Choose a base tone:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {[
                                            { n: 'Gold', p: '#8A6A1E', s: '#E5C15A', t: '#1A1200', a: '#FFE9A8' },
                                            { n: 'Silver', p: '#4B5563', s: '#C7CDD6', t: '#0B1D33', a: '#FFFFFF' },
                                            { n: 'Rose gold', p: '#8C4A3E', s: '#E7B4A6', t: '#2A0F0A', a: '#FFE4DC' },
                                            { n: 'Navy chrome', p: '#0B1D33', s: '#4A90E2', t: '#FFFFFF', a: '#DCEBFF' },
                                        ].map((f) => (
                                            <button
                                                key={f.n}
                                                type="button"
                                                onClick={() => {
                                                    setPrimary(f.p);
                                                    setSecondary(f.s);
                                                    setText(f.t);
                                                    setAccent(f.a);
                                                }}
                                                className={`pill px-3.5 py-1.5 ${primary === f.p ? 'pill-active' : ''}`}
                                            >
                                                <span className="h-3 w-3 rounded-full" style={{ background: `linear-gradient(135deg, ${f.p}, ${f.s})` }} />
                                                {f.n}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* 4. Category */}
                        <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-green">4 · Use</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {CATEGORIES.map((c) => (
                                    <button key={c} type="button" onClick={() => setCategory(c)} className={`pill px-3.5 py-1.5 ${category === c ? 'pill-active' : 'hover:border-slate-300'}`} aria-pressed={category === c}>
                                        {c}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </Reveal>

                    {/* Preview */}
                    <Reveal delay={100} className="lg:col-span-5 lg:sticky lg:top-24">
                        <div className="card overflow-hidden">
                            <div className="surface-forest relative px-6 pt-8 pb-10 flex flex-col items-center">
                                <div className="absolute top-4 left-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">Live preview</div>
                                <div className="absolute top-3.5 right-4 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white">{previewSize}</div>

                                {/* Bottle */}
                                <div className="mt-6 flex flex-col items-center" aria-hidden="true">
                                    {/* Cap */}
                                    <div className="h-7 w-12 rounded-t-md bg-gradient-to-b from-slate-700 to-slate-900 shadow-md" style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0 2px, transparent 2px 5px), linear-gradient(#334155, #0f172a)' }} />
                                    <div className="h-2 w-14 rounded-sm bg-slate-800" />
                                    {/* Neck + shoulder */}
                                    <div className="h-5 w-16 bg-white/15 border-x border-white/25" />
                                    <div className="h-12 w-40 rounded-t-[70px] bg-gradient-to-b from-white/25 to-white/10 border-t border-x border-white/30" />
                                    {/* Body */}
                                    <div className="relative w-40 h-[280px] rounded-b-[26px] bg-gradient-to-r from-white/10 via-white/20 to-white/10 border-x border-b border-white/30 overflow-hidden backdrop-blur-[2px]">
                                        {/* glass highlight */}
                                        <div className="absolute left-4 top-0 bottom-0 w-2.5 bg-white/25 blur-[2px]" />
                                        <div className="absolute right-5 top-0 bottom-0 w-1 bg-white/15 blur-[1px]" />
                                        {/* texture bottom */}
                                        <div className="absolute inset-x-0 bottom-0 h-20 opacity-40" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.35) 1.2px, transparent 1.2px)', backgroundSize: '7px 7px' }} />

                                        {/* Label */}
                                        <div
                                            className="absolute inset-x-0 top-[62px] h-[132px] flex flex-col items-center justify-center px-4 text-center shadow-[0_6px_18px_-6px_rgba(0,0,0,0.5)]"
                                            style={{ background: labelBackground, color: text, borderTop: `2px solid ${accent}`, borderBottom: `2px solid ${accent}` }}
                                        >
                                            <span className="text-[7px] font-semibold uppercase tracking-[0.25em] opacity-80">Premium bottled water</span>
                                            {logo ? (
                                                <img src={logo} alt="" className="my-1.5 max-h-10 max-w-[120px] object-contain" />
                                            ) : (
                                                <span className="mt-1.5 font-heading text-[15px] font-extrabold uppercase tracking-wide leading-tight line-clamp-2 break-words max-w-full">
                                                    {brandText || 'YOUR BRAND'}
                                                </span>
                                            )}
                                            <span className="mt-1 text-[8.5px] font-medium tracking-wide opacity-90 line-clamp-1">{tagline}</span>
                                            <span className="mt-2 pt-1.5 border-t text-[7px] uppercase tracking-[0.2em] opacity-75" style={{ borderColor: `${accent}66` }}>
                                                {previewSize} · Abbottabad
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-2 h-4 w-32 rounded-full bg-black/40 blur-md" />
                                </div>
                            </div>

                            {/* Summary */}
                            <div className="p-6">
                                <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                                    <div>
                                        <dt className="text-xs text-slate-500">Sizes</dt>
                                        <dd className="font-semibold text-brand-forest">{selectedSizes.join(', ')}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-xs text-slate-500">Use</dt>
                                        <dd className="font-semibold text-brand-forest">{category}</dd>
                                    </div>
                                    <div className="col-span-2">
                                        <dt className="text-xs text-slate-500">Label</dt>
                                        <dd className="font-semibold text-brand-forest truncate">{labelStyleLabel}</dd>
                                    </div>
                                </dl>
                                <button
                                    type="button"
                                    onClick={() =>
                                        onQuoteWithDesign({
                                            brandText,
                                            tagline,
                                            bottleSizes: selectedSizes,
                                            labelStyle: labelStyleLabel,
                                            category,
                                            logoDataUrl: logo || undefined,
                                        })
                                    }
                                    className="btn-primary btn-lg w-full mt-5"
                                >
                                    Request a quote with this design
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                                <p className="mt-3 text-center text-xs text-slate-500">The preview is indicative. We send an exact label proof before printing.</p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
};
