import React, { useEffect, useRef, useState } from 'react';
import {
    X, Inbox, Package, Image as ImageIcon, Award, FileText, Settings2, LogOut, Lock, Eye, EyeOff, Plus, Trash2,
    ArrowUp, ArrowDown, Upload, Check, Download, RefreshCw, Pencil, Save, Paperclip,
} from 'lucide-react';
import {
    BottleProduct, GalleryItem, SiteSettings, QuoteSubmission, BrandLogo, QuoteStatus, GalleryCategory, BrandLogoCategory, FAQ,
    getStoredAdminCredentials, saveStoredAdminCredentials, verifyAdminCredentials, isAdminAuthenticatedSession, setAdminAuthenticatedSession,
    DEFAULT_SETTINGS,
} from '../data/store';
import { LogoMark } from './Logo';

/* ========================================================================== */
/* Shared helpers                                                             */
/* ========================================================================== */

type Tab = 'quotes' | 'products' | 'gallery' | 'logos' | 'content' | 'settings';
type Notify = (msg?: string) => void;

const TABS: { id: Tab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'quotes', label: 'Quote requests', icon: Inbox },
    { id: 'products', label: 'Bottles & sizes', icon: Package },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
    { id: 'logos', label: 'Client logos', icon: Award },
    { id: 'content', label: 'Website text', icon: FileText },
    { id: 'settings', label: 'Contact & security', icon: Settings2 },
];

const GALLERY_CATEGORIES: GalleryCategory[] = ['Hotel', 'Restaurant', 'Wedding', 'Corporate', 'Event', 'Mineral Water'];
const LOGO_CATEGORIES: BrandLogoCategory[] = ['Hotel', 'Restaurant', 'Corporate', 'Wedding', 'Event', 'Retail'];

const uid = (p: string) => `${p}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

function readFileAsDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const r = new FileReader();
        r.onload = () => resolve(r.result as string);
        r.onerror = reject;
        r.readAsDataURL(file);
    });
}

function swap<T>(list: T[], i: number, dir: -1 | 1): T[] | null {
    const j = i + dir;
    if (i < 0 || j < 0 || j >= list.length) return null;
    const next = [...list];
    [next[i], next[j]] = [next[j], next[i]];
    return next;
}

const STATUS_STYLES: Record<QuoteStatus, string> = {
    New: 'bg-brand-ice text-brand-green',
    Contacted: 'bg-amber-50 text-amber-700',
    Completed: 'bg-emerald-50 text-emerald-700',
};

const IconBtn: React.FC<{ onClick: () => void; label: string; danger?: boolean; disabled?: boolean; children: React.ReactNode }> = ({ onClick, label, danger, disabled, children }) => (
    <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        aria-label={label}
        title={label}
        className={`inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-500 disabled:opacity-30 ${danger ? 'hover:bg-rose-50 hover:text-rose-600' : 'hover:bg-slate-100 hover:text-brand-forest'}`}
    >
        {children}
    </button>
);

const MoveBtns: React.FC<{ onUp: () => void; onDown: () => void; first: boolean; last: boolean }> = ({ onUp, onDown, first, last }) => (
    <div className="flex flex-col gap-0.5">
        <button type="button" onClick={onUp} disabled={first} className="p-1 rounded text-slate-400 hover:text-brand-forest disabled:opacity-30" aria-label="Move up"><ArrowUp className="w-3.5 h-3.5" /></button>
        <button type="button" onClick={onDown} disabled={last} className="p-1 rounded text-slate-400 hover:text-brand-forest disabled:opacity-30" aria-label="Move down"><ArrowDown className="w-3.5 h-3.5" /></button>
    </div>
);

/* ========================================================================== */
/* Quotes                                                                     */
/* ========================================================================== */

const QuotesTab: React.FC<{
    quotes: QuoteSubmission[];
    onUpdateStatus: (id: string, s: QuoteStatus) => void;
    onDelete: (id: string) => void;
    onRefresh: () => void;
}> = ({ quotes, onUpdateStatus, onDelete, onRefresh }) => {
    const [filter, setFilter] = useState<'All' | QuoteStatus>('All');
    const list = filter === 'All' ? quotes : quotes.filter((q) => q.status === filter);
    const newCount = quotes.filter((q) => q.status === 'New').length;

    return (
        <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h3 className="text-base font-bold">Quote requests</h3>
                    <p className="text-sm text-slate-500">{quotes.length} total · {newCount} new. Requests are stored in this browser.</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    {(['All', 'New', 'Contacted', 'Completed'] as const).map((f) => (
                        <button key={f} type="button" onClick={() => setFilter(f)} className={`pill ${filter === f ? 'pill-active' : ''}`}>{f}</button>
                    ))}
                    <IconBtn onClick={onRefresh} label="Refresh"><RefreshCw className="w-4 h-4" /></IconBtn>
                </div>
            </div>

            {list.length === 0 ? (
                <p className="card p-10 text-center text-sm text-slate-500">No quote requests{filter !== 'All' ? ` with status “${filter}”` : ' yet'}.</p>
            ) : (
                <ul className="space-y-4">
                    {list.map((q) => (
                        <li key={q.id} className="card p-5 space-y-4 border border-slate-200/80 hover:border-brand-green/30 transition-colors">
                            {/* Header row: Client & Status */}
                            <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-slate-100">
                                <div>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h4 className="text-base font-bold text-brand-forest">{q.name}</h4>
                                        {q.company && (
                                            <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                                                {q.company}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-slate-400 mt-1">Submitted on {q.timestamp}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <select
                                        value={q.status}
                                        onChange={(e) => onUpdateStatus(q.id, e.target.value as QuoteStatus)}
                                        className={`field-sm py-1.5 w-auto font-semibold border-0 ${STATUS_STYLES[q.status]}`}
                                    >
                                        <option>New</option>
                                        <option>Contacted</option>
                                        <option>Completed</option>
                                    </select>
                                    <IconBtn
                                        danger
                                        label="Delete request"
                                        onClick={() => {
                                            if (window.confirm('Delete this quote request?')) onDelete(q.id);
                                        }}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </IconBtn>
                                </div>
                            </div>

                            {/* Order Summary Badges: Bottle Size & Amount / Quantity */}
                            <div className="flex flex-wrap items-center gap-2.5 bg-brand-mist/60 p-3 rounded-xl border border-brand-green/10">
                                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-brand-forest shadow-xs">
                                    <Package className="w-4 h-4 text-brand-green shrink-0" />
                                    <span>Size:</span>
                                    <span className="text-brand-green font-bold">{q.bottleSize || 'Not specified'}</span>
                                </div>
                                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-brand-forest shadow-xs">
                                    <span className="text-emerald-600 font-bold text-sm">📦</span>
                                    <span>Amount / Quantity:</span>
                                    <span className="text-emerald-700 font-bold">{q.quantity || 'Not specified'}</span>
                                </div>
                                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700">
                                    <span>Customization:</span>
                                    <span className="font-semibold text-slate-800">{q.customizationRequired || 'Standard'}</span>
                                </div>
                            </div>

                            {/* Main Details: Logo Preview Image + Client Contact */}
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                                {/* Logo Image Box */}
                                <div className="md:col-span-4 bg-slate-50 rounded-xl p-3 border border-slate-200 flex flex-col items-center justify-center text-center">
                                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                                        Client Logo / Design
                                    </span>
                                    {q.logoDataUrl ? (
                                        <div className="space-y-2 w-full flex flex-col items-center">
                                            <div className="relative group h-28 w-full max-w-[180px] rounded-lg bg-white p-2 border border-slate-200 flex items-center justify-center overflow-hidden shadow-xs">
                                                <img
                                                    src={q.logoDataUrl}
                                                    alt={q.logoFileName || 'Client Logo'}
                                                    className="max-h-full max-w-full object-contain"
                                                />
                                            </div>
                                            <a
                                                href={q.logoDataUrl}
                                                download={q.logoFileName || `logo-${q.name.replace(/\s+/g, '_')}`}
                                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-green hover:underline pt-1"
                                            >
                                                <Download className="w-3.5 h-3.5" />
                                                {q.logoFileName || 'Download logo file'}
                                            </a>
                                        </div>
                                    ) : (
                                        <div className="py-4 text-slate-400 text-xs flex flex-col items-center gap-1">
                                            <ImageIcon className="w-6 h-6 stroke-[1.5]" />
                                            <span>No image uploaded</span>
                                            <span className="text-[10px] text-slate-400">(Requested via text note)</span>
                                        </div>
                                    )}
                                </div>

                                {/* Contact Details Grid */}
                                <div className="md:col-span-8 space-y-3">
                                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
                                        <div>
                                            <dt className="text-xs font-semibold text-slate-400">Phone / WhatsApp</dt>
                                            <dd className="font-medium text-brand-forest mt-0.5 flex items-center gap-2">
                                                <a href={`tel:${q.phone}`} className="hover:underline">{q.phone}</a>
                                                {q.phone && (
                                                    <a
                                                        href={`https://wa.me/${q.phone.replace(/[^0-9]/g, '')}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full hover:bg-emerald-100"
                                                    >
                                                        WhatsApp
                                                    </a>
                                                )}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-xs font-semibold text-slate-400">Email</dt>
                                            <dd className="font-medium text-brand-forest mt-0.5">
                                                <a href={`mailto:${q.email}`} className="hover:underline break-all">{q.email}</a>
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-xs font-semibold text-slate-400">City</dt>
                                            <dd className="font-medium text-brand-forest mt-0.5">{q.city}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-xs font-semibold text-slate-400">Delivery Address</dt>
                                            <dd className="font-medium text-brand-forest mt-0.5">{q.deliveryLocation || 'Not specified'}</dd>
                                        </div>
                                    </dl>

                                    {q.additionalRequirements && (
                                        <div className="pt-2 border-t border-slate-100">
                                            <dt className="text-xs font-semibold text-slate-400 mb-1">Additional Requirements / Notes</dt>
                                            <dd className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200/60 whitespace-pre-line leading-relaxed">
                                                {q.additionalRequirements}
                                            </dd>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

/* ========================================================================== */
/* Products                                                                   */
/* ========================================================================== */

const ProductForm: React.FC<{
    draft: BottleProduct;
    setDraft: (p: BottleProduct) => void;
    onSave: () => void;
    onCancel: () => void;
}> = ({ draft, setDraft, onSave, onCancel }) => {
    const onImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (f) setDraft({ ...draft, image: await readFileAsDataUrl(f) });
    };
    return (
        <div className="card p-5 space-y-4 border-brand-green/30">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                    <label className="field-label">Name</label>
                    <input className="field-sm" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="e.g. 500ml Standard Bottle" autoFocus />
                </div>
                <div>
                    <label className="field-label">Size</label>
                    <input className="field-sm" value={draft.size} onChange={(e) => setDraft({ ...draft, size: e.target.value })} placeholder="e.g. 500ml" />
                </div>
                <div>
                    <label className="field-label">Minimum order</label>
                    <input type="number" min={1} className="field-sm" value={draft.moq} onChange={(e) => setDraft({ ...draft, moq: Number(e.target.value) || 0 })} />
                </div>
                <div>
                    <label className="field-label">Type</label>
                    <select className="field-sm" value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value as BottleProduct['category'] })}>
                        <option value="custom">Customized bottle</option>
                        <option value="mineral">Standard mineral water</option>
                    </select>
                </div>
                <label className="flex items-center gap-2 self-end pb-2 text-sm text-slate-700">
                    <input type="checkbox" checked={draft.customizable} onChange={(e) => setDraft({ ...draft, customizable: e.target.checked })} className="h-4 w-4 accent-brand-green" />
                    Show “Customizable” badge
                </label>
                <div className="sm:col-span-2">
                    <label className="field-label">Description</label>
                    <textarea rows={2} className="field-sm" value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
                </div>
                <div className="sm:col-span-2">
                    <label className="field-label">Short note (shown under minimum order)</label>
                    <input className="field-sm" value={draft.priceQuoteNote} onChange={(e) => setDraft({ ...draft, priceQuoteNote: e.target.value })} placeholder="e.g. Custom label included." />
                </div>
                <div className="sm:col-span-2 flex items-center gap-3">
                    <img src={draft.image} alt="" className="h-16 w-16 rounded-lg object-cover bg-slate-100 ring-1 ring-slate-200" />
                    <div className="flex-1 space-y-2">
                        {!draft.image.startsWith('data:') && (
                            <input className="field-sm" value={draft.image} onChange={(e) => setDraft({ ...draft, image: e.target.value })} placeholder="Image URL" />
                        )}
                        <label className="btn-secondary btn-sm cursor-pointer">
                            <Upload className="w-3.5 h-3.5" />
                            Upload image
                            <input type="file" accept="image/*" className="sr-only" onChange={onImage} />
                        </label>
                    </div>
                </div>
            </div>
            <div className="flex justify-end gap-2">
                <button type="button" onClick={onCancel} className="btn-ghost btn-sm">Cancel</button>
                <button type="button" onClick={onSave} disabled={!draft.name.trim() || !draft.size.trim()} className="btn-primary btn-sm"><Save className="w-3.5 h-3.5" />Save</button>
            </div>
        </div>
    );
};

const ProductsTab: React.FC<{ products: BottleProduct[]; onSave: (p: BottleProduct[]) => void; notify: Notify }> = ({ products, onSave, notify }) => {
    const [editing, setEditing] = useState<string | null>(null);
    const [adding, setAdding] = useState(false);
    const [draft, setDraft] = useState<BottleProduct | null>(null);

    const blank = (): BottleProduct => ({ id: uid('b'), name: '', size: '500ml', moq: 100, image: '/assets/hero_bottles.png', customizable: true, category: 'custom', description: '', priceQuoteNote: '' });
    const cancel = () => { setEditing(null); setAdding(false); setDraft(null); };

    const save = () => {
        if (!draft) return;
        onSave(adding ? [...products, draft] : products.map((p) => (p.id === draft.id ? draft : p)));
        notify(adding ? 'Bottle added' : 'Bottle updated');
        cancel();
    };
    const remove = (id: string) => {
        if (!window.confirm('Remove this bottle from the website?')) return;
        onSave(products.filter((p) => p.id !== id));
        notify('Bottle removed');
    };
    const move = (i: number, dir: -1 | 1) => { const next = swap(products, i, dir); if (next) onSave(next); };

    return (
        <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h3 className="text-base font-bold">Bottles & sizes</h3>
                    <p className="text-sm text-slate-500">Shown in the bottle options grid, the live preview and the quote form.</p>
                </div>
                <button type="button" onClick={() => { setAdding(true); setEditing(null); setDraft(blank()); }} className="btn-primary btn-sm"><Plus className="w-3.5 h-3.5" />Add bottle</button>
            </div>

            {adding && draft && <ProductForm draft={draft} setDraft={setDraft} onSave={save} onCancel={cancel} />}

            <ul className="space-y-3">
                {products.map((p, i) => (
                    <li key={p.id}>
                        {editing === p.id && draft ? (
                            <ProductForm draft={draft} setDraft={setDraft} onSave={save} onCancel={cancel} />
                        ) : (
                            <div className="card p-4 flex items-center gap-4">
                                <MoveBtns onUp={() => move(i, -1)} onDown={() => move(i, 1)} first={i === 0} last={i === products.length - 1} />
                                <img src={p.image} alt="" className="h-14 w-14 rounded-lg object-cover bg-slate-100 ring-1 ring-slate-200 shrink-0" />
                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="font-semibold text-brand-forest truncate">{p.name}</span>
                                        <span className="rounded-full bg-brand-ice px-2 py-0.5 text-[11px] font-semibold text-brand-green">{p.size}</span>
                                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">{p.category === 'custom' ? 'Customized' : 'Mineral water'}</span>
                                    </div>
                                    <p className="mt-0.5 text-xs text-slate-500 truncate">MOQ {p.moq} · {p.description}</p>
                                </div>
                                <IconBtn label="Edit" onClick={() => { setEditing(p.id); setAdding(false); setDraft({ ...p }); }}><Pencil className="w-4 h-4" /></IconBtn>
                                <IconBtn danger label="Delete" onClick={() => remove(p.id)}><Trash2 className="w-4 h-4" /></IconBtn>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

/* ========================================================================== */
/* Gallery                                                                    */
/* ========================================================================== */

const GalleryTab: React.FC<{ gallery: GalleryItem[]; onSave: (g: GalleryItem[]) => void; notify: Notify }> = ({ gallery, onSave, notify }) => {
    const [uploadCategory, setUploadCategory] = useState<GalleryCategory>('Corporate');
    const [busy, setBusy] = useState(false);

    const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;
        setBusy(true);
        const items: GalleryItem[] = [];
        for (const f of files) {
            const image = await readFileAsDataUrl(f);
            const clean = f.name.replace(/\.[^/.]+$/, '').replace(/[-_]+/g, ' ').trim();
            items.push({ id: uid('g'), title: clean ? clean[0].toUpperCase() + clean.slice(1) : 'Custom bottle', category: uploadCategory, image, description: '' });
        }
        onSave([...items, ...gallery]);
        setBusy(false);
        e.target.value = '';
        notify(`${items.length} image${items.length > 1 ? 's' : ''} added`);
    };

    const update = (id: string, patch: Partial<GalleryItem>) => onSave(gallery.map((g) => (g.id === id ? { ...g, ...patch } : g)));
    const remove = (id: string) => {
        if (!window.confirm('Remove this image from the gallery?')) return;
        onSave(gallery.filter((g) => g.id !== id));
        notify('Image removed');
    };

    return (
        <div className="space-y-5">
            <div className="card p-5 flex flex-wrap items-end gap-3">
                <div className="flex-1 min-w-[200px]">
                    <h3 className="text-base font-bold">Gallery</h3>
                    <p className="text-sm text-slate-500">Upload photos of finished bottles. Titles and categories save as you type.</p>
                </div>
                <div>
                    <label className="field-label">Category for new uploads</label>
                    <select className="field-sm" value={uploadCategory} onChange={(e) => setUploadCategory(e.target.value as GalleryCategory)}>
                        {GALLERY_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                    </select>
                </div>
                <label className={`btn-primary btn-md cursor-pointer ${busy ? 'opacity-60 pointer-events-none' : ''}`}>
                    <Upload className="w-4 h-4" />
                    {busy ? 'Uploading…' : 'Upload images'}
                    <input type="file" accept="image/*" multiple className="sr-only" onChange={onUpload} />
                </label>
            </div>

            {gallery.length === 0 ? (
                <p className="card p-10 text-center text-sm text-slate-500">No images yet.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {gallery.map((g) => (
                        <div key={g.id} className="card overflow-hidden">
                            <div className="aspect-[4/3] bg-slate-100">
                                <img src={g.image} alt={g.title} className="h-full w-full object-cover" />
                            </div>
                            <div className="p-3 space-y-2">
                                <input className="field-sm font-semibold" value={g.title} onChange={(e) => update(g.id, { title: e.target.value })} placeholder="Title" />
                                <select className="field-sm" value={g.category} onChange={(e) => update(g.id, { category: e.target.value as GalleryCategory })}>
                                    {GALLERY_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                                </select>
                                <input className="field-sm" value={g.description} onChange={(e) => update(g.id, { description: e.target.value })} placeholder="Short description" />
                                <div className="flex justify-end">
                                    <button type="button" onClick={() => remove(g.id)} className="btn-ghost btn-sm text-rose-600 hover:bg-rose-50"><Trash2 className="w-3.5 h-3.5" />Remove</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

/* ========================================================================== */
/* Client logos                                                               */
/* ========================================================================== */

const LogosTab: React.FC<{ brandLogos: BrandLogo[]; onSave: (l: BrandLogo[]) => void; notify: Notify }> = ({ brandLogos, onSave, notify }) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState<BrandLogoCategory>('Hotel');
    const [website, setWebsite] = useState('');
    const [image, setImage] = useState('');

    const sorted = [...brandLogos].sort((a, b) => a.order - b.order);
    const persist = (list: BrandLogo[]) => onSave(list.map((l, i) => ({ ...l, order: i + 1 })));

    const add = () => {
        if (!name.trim() || !image) return;
        persist([...sorted, { id: uid('bl'), name: name.trim(), logoUrl: image, category, enabled: true, order: sorted.length + 1, websiteUrl: website.trim() }]);
        setName(''); setWebsite(''); setImage('');
        notify('Logo added');
    };
    const remove = (id: string) => {
        if (!window.confirm('Remove this client logo?')) return;
        persist(sorted.filter((l) => l.id !== id));
        notify('Logo removed');
    };
    const toggle = (id: string) => persist(sorted.map((l) => (l.id === id ? { ...l, enabled: !l.enabled } : l)));
    const move = (i: number, dir: -1 | 1) => { const next = swap(sorted, i, dir); if (next) persist(next); };
    const replace = async (id: string, f: File) => {
        const url = await readFileAsDataUrl(f);
        persist(sorted.map((l) => (l.id === id ? { ...l, logoUrl: url } : l)));
        notify('Logo image replaced');
    };

    return (
        <div className="space-y-5">
            <div>
                <h3 className="text-base font-bold">Client logos</h3>
                <p className="text-sm text-slate-500">Shown as a “Brands we have bottled for” strip in the gallery. Only add clients who have agreed to be listed. The strip stays hidden while this list is empty.</p>
            </div>

            <div className="card p-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                    <label className="field-label">Client name</label>
                    <input className="field-sm" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Pine Hills Hotel" />
                </div>
                <div>
                    <label className="field-label">Category</label>
                    <select className="field-sm" value={category} onChange={(e) => setCategory(e.target.value as BrandLogoCategory)}>
                        {LOGO_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                    </select>
                </div>
                <div>
                    <label className="field-label">Website (optional)</label>
                    <input className="field-sm" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://" />
                </div>
                <div>
                    <label className="field-label">Logo image</label>
                    <div className="flex items-center gap-2">
                        {image && <img src={image} alt="" className="h-9 w-12 object-contain rounded bg-slate-50 ring-1 ring-slate-200" />}
                        <label className="btn-secondary btn-sm cursor-pointer">
                            <Upload className="w-3.5 h-3.5" />
                            {image ? 'Change' : 'Upload'}
                            <input type="file" accept="image/*" className="sr-only" onChange={async (e) => { const f = e.target.files?.[0]; if (f) setImage(await readFileAsDataUrl(f)); }} />
                        </label>
                    </div>
                </div>
                <div className="sm:col-span-2 flex justify-end">
                    <button type="button" onClick={add} disabled={!name.trim() || !image} className="btn-primary btn-sm"><Plus className="w-3.5 h-3.5" />Add logo</button>
                </div>
            </div>

            {sorted.length === 0 ? (
                <p className="card p-10 text-center text-sm text-slate-500">No client logos yet.</p>
            ) : (
                <ul className="space-y-3">
                    {sorted.map((l, i) => (
                        <li key={l.id} className={`card p-4 flex items-center gap-4 ${l.enabled ? '' : 'opacity-60'}`}>
                            <MoveBtns onUp={() => move(i, -1)} onDown={() => move(i, 1)} first={i === 0} last={i === sorted.length - 1} />
                            <label className="relative h-12 w-16 shrink-0 cursor-pointer rounded-lg bg-slate-50 ring-1 ring-slate-200 flex items-center justify-center group" title="Replace image">
                                <img src={l.logoUrl} alt={l.name} className="max-h-full max-w-full object-contain p-1" />
                                <span className="absolute inset-0 hidden items-center justify-center rounded-lg bg-brand-forest/70 text-[10px] font-semibold text-white group-hover:flex">Replace</span>
                                <input type="file" accept="image/*" className="sr-only" onChange={(e) => { const f = e.target.files?.[0]; if (f) replace(l.id, f); }} />
                            </label>
                            <div className="min-w-0 flex-1">
                                <p className="font-semibold text-brand-forest truncate">{l.name}</p>
                                <p className="text-xs text-slate-500 truncate">{l.category}{l.websiteUrl ? ` · ${l.websiteUrl}` : ''}</p>
                            </div>
                            <button type="button" onClick={() => toggle(l.id)} className={`btn btn-sm ${l.enabled ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                                {l.enabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                                {l.enabled ? 'Visible' : 'Hidden'}
                            </button>
                            <IconBtn danger label="Delete" onClick={() => remove(l.id)}><Trash2 className="w-4 h-4" /></IconBtn>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

/* ========================================================================== */
/* Website text + FAQs                                                        */
/* ========================================================================== */

const ContentTab: React.FC<{ settings: SiteSettings; onSave: (s: SiteSettings) => void; notify: Notify }> = ({ settings, onSave, notify }) => {
    const [content, setContent] = useState<SiteSettings>(settings);
    useEffect(() => setContent(settings), [settings]);

    const setF = (k: keyof SiteSettings) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setContent((c) => ({ ...c, [k]: e.target.value }));
    const updateFaq = (id: string, patch: Partial<FAQ>) => setContent((c) => ({ ...c, faqs: c.faqs.map((f) => (f.id === id ? { ...f, ...patch } : f)) }));
    const addFaq = () => setContent((c) => ({ ...c, faqs: [...c.faqs, { id: uid('f'), question: '', answer: '' }] }));
    const removeFaq = (id: string) => setContent((c) => ({ ...c, faqs: c.faqs.filter((f) => f.id !== id) }));
    const moveFaq = (i: number, dir: -1 | 1) => setContent((c) => { const next = swap(c.faqs, i, dir); return next ? { ...c, faqs: next } : c; });

    const save = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ ...settings, ...content, faqs: content.faqs.filter((f) => f.question.trim()) });
        notify('Website text saved');
    };

    return (
        <form onSubmit={save} className="space-y-6">
            <div>
                <h3 className="text-base font-bold">Website text</h3>
                <p className="text-sm text-slate-500">Edit the headline, about copy and FAQs, then click Save.</p>
            </div>
            <div className="card p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="field-label">Brand name</label>
                    <input className="field-sm" value={content.brandName} onChange={setF('brandName')} />
                </div>
                <div>
                    <label className="field-label">Tagline (footer)</label>
                    <input className="field-sm" value={content.tagline} onChange={setF('tagline')} />
                </div>
                <div className="sm:col-span-2">
                    <label className="field-label">Hero heading</label>
                    <input className="field-sm" value={content.heroHeading} onChange={setF('heroHeading')} />
                </div>
                <div className="sm:col-span-2">
                    <label className="field-label">Hero supporting text</label>
                    <textarea rows={3} className="field-sm" value={content.heroSubheading} onChange={setF('heroSubheading')} />
                </div>
                <div className="sm:col-span-2">
                    <label className="field-label">About {content.brandName || 'us'}</label>
                    <textarea rows={4} className="field-sm" value={content.aboutContent} onChange={setF('aboutContent')} />
                </div>
            </div>

            <div className="card p-5 space-y-4">
                <div className="flex items-center justify-between">
                    <h4 className="font-semibold">FAQs</h4>
                    <button type="button" onClick={addFaq} className="btn-secondary btn-sm"><Plus className="w-3.5 h-3.5" />Add question</button>
                </div>
                {content.faqs.length === 0 && <p className="text-sm text-slate-500">No FAQs. The FAQ section is hidden while this list is empty.</p>}
                {content.faqs.map((f, i) => (
                    <div key={f.id} className="rounded-xl border border-slate-200 p-4 space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-slate-400 w-6">{i + 1}.</span>
                            <input className="field-sm font-semibold" value={f.question} onChange={(e) => updateFaq(f.id, { question: e.target.value })} placeholder="Question" />
                            <MoveBtns onUp={() => moveFaq(i, -1)} onDown={() => moveFaq(i, 1)} first={i === 0} last={i === content.faqs.length - 1} />
                            <IconBtn danger label="Remove question" onClick={() => removeFaq(f.id)}><Trash2 className="w-3.5 h-3.5" /></IconBtn>
                        </div>
                        <textarea rows={2} className="field-sm ml-8 w-[calc(100%-2rem)]" value={f.answer} onChange={(e) => updateFaq(f.id, { answer: e.target.value })} placeholder="Answer" />
                    </div>
                ))}
            </div>

            <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setContent(settings)} className="btn-ghost btn-sm">Discard changes</button>
                <button type="submit" className="btn-primary btn-sm"><Save className="w-3.5 h-3.5" />Save website text</button>
            </div>
        </form>
    );
};

/* ========================================================================== */
/* Contact & security                                                         */
/* ========================================================================== */

const SettingsTab: React.FC<{
    settings: SiteSettings;
    products: BottleProduct[];
    gallery: GalleryItem[];
    brandLogos: BrandLogo[];
    quotes: QuoteSubmission[];
    onSaveSettings: (s: SiteSettings) => void;
    onSaveProducts: (p: BottleProduct[]) => void;
    onSaveGallery: (g: GalleryItem[]) => void;
    onSaveBrandLogos: (l: BrandLogo[]) => void;
    notify: Notify;
}> = ({ settings, products, gallery, brandLogos, quotes, onSaveSettings, onSaveProducts, onSaveGallery, onSaveBrandLogos, notify }) => {
    const creds = getStoredAdminCredentials();
    const [contact, setContact] = useState<SiteSettings>(settings);
    useEffect(() => setContact(settings), [settings]);

    const [curPw, setCurPw] = useState('');
    const [newUser, setNewUser] = useState(creds.username);
    const [newPw, setNewPw] = useState('');
    const [newPw2, setNewPw2] = useState('');
    const [credMsg, setCredMsg] = useState<{ ok: boolean; text: string } | null>(null);
    const importRef = useRef<HTMLInputElement>(null);

    const setF = (k: keyof SiteSettings) => (e: React.ChangeEvent<HTMLInputElement>) => setContact((c) => ({ ...c, [k]: e.target.value }));

    const saveContact = (e: React.FormEvent) => {
        e.preventDefault();
        onSaveSettings({ ...settings, whatsAppNumber: contact.whatsAppNumber.replace(/[^0-9]/g, ''), contactPhone: contact.contactPhone, contactEmail: contact.contactEmail, instagramUrl: contact.instagramUrl, address: contact.address });
        notify('Contact details saved');
    };

    const changeCreds = (e: React.FormEvent) => {
        e.preventDefault();
        if (!verifyAdminCredentials(creds.username, curPw)) return setCredMsg({ ok: false, text: 'Current password is incorrect.' });
        if (!newUser.trim()) return setCredMsg({ ok: false, text: 'Username cannot be empty.' });
        if (newPw.length < 8) return setCredMsg({ ok: false, text: 'New password must be at least 8 characters.' });
        if (newPw !== newPw2) return setCredMsg({ ok: false, text: 'New passwords do not match.' });
        saveStoredAdminCredentials({ username: newUser.trim(), passwordHash: newPw });
        setCurPw(''); setNewPw(''); setNewPw2('');
        setCredMsg({ ok: true, text: 'Sign-in details updated. Use them next time you open the admin panel.' });
    };

    const exportData = () => {
        const data = { exportedAt: new Date().toISOString(), settings, products, gallery, brandLogos, quotes };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `chinarmist-backup-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const importData = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (!f) return;
        try {
            const data = JSON.parse(await f.text());
            if (!window.confirm('Replace the current website content with this backup?')) return;
            if (data.settings) onSaveSettings({ ...DEFAULT_SETTINGS, ...data.settings });
            if (Array.isArray(data.products)) onSaveProducts(data.products);
            if (Array.isArray(data.gallery)) onSaveGallery(data.gallery);
            if (Array.isArray(data.brandLogos)) onSaveBrandLogos(data.brandLogos);
            notify('Backup restored');
        } catch {
            window.alert('That file is not a valid backup.');
        } finally {
            e.target.value = '';
        }
    };

    return (
        <div className="space-y-8">
            <form onSubmit={saveContact} className="space-y-4">
                <div>
                    <h3 className="text-base font-bold">Contact details</h3>
                    <p className="text-sm text-slate-500">Used in the header, quote section, footer and every WhatsApp button.</p>
                </div>
                <div className="card p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="field-label">WhatsApp number (digits, with country code)</label>
                        <input className="field-sm" value={contact.whatsAppNumber} onChange={setF('whatsAppNumber')} placeholder="923001234567" inputMode="numeric" />
                    </div>
                    <div>
                        <label className="field-label">Phone (as displayed)</label>
                        <input className="field-sm" value={contact.contactPhone} onChange={setF('contactPhone')} />
                    </div>
                    <div>
                        <label className="field-label">Email</label>
                        <input type="email" className="field-sm" value={contact.contactEmail} onChange={setF('contactEmail')} />
                    </div>
                    <div>
                        <label className="field-label">Instagram URL</label>
                        <input className="field-sm" value={contact.instagramUrl} onChange={setF('instagramUrl')} placeholder="https://www.instagram.com/…" />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="field-label">Address</label>
                        <input className="field-sm" value={contact.address} onChange={setF('address')} />
                    </div>
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="btn-primary btn-sm"><Save className="w-3.5 h-3.5" />Save contact details</button>
                </div>
            </form>

            <form onSubmit={changeCreds} className="space-y-4">
                <div>
                    <h3 className="text-base font-bold">Admin sign-in</h3>
                    <p className="text-sm text-slate-500">Signed in as <span className="font-semibold text-brand-forest">{creds.username}</span>. Change the username and password used to open this panel.</p>
                </div>
                <div className="card p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="field-label">Current password</label>
                        <input type="password" className="field-sm" value={curPw} onChange={(e) => setCurPw(e.target.value)} autoComplete="current-password" />
                    </div>
                    <div>
                        <label className="field-label">Username</label>
                        <input className="field-sm" value={newUser} onChange={(e) => setNewUser(e.target.value)} autoComplete="username" />
                    </div>
                    <div>
                        <label className="field-label">New password</label>
                        <input type="password" className="field-sm" value={newPw} onChange={(e) => setNewPw(e.target.value)} autoComplete="new-password" />
                    </div>
                    <div>
                        <label className="field-label">Confirm new password</label>
                        <input type="password" className="field-sm" value={newPw2} onChange={(e) => setNewPw2(e.target.value)} autoComplete="new-password" />
                    </div>
                    {credMsg && (
                        <p className={`sm:col-span-2 rounded-lg px-3 py-2 text-xs font-medium ${credMsg.ok ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>{credMsg.text}</p>
                    )}
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="btn-secondary btn-sm"><Lock className="w-3.5 h-3.5" />Update sign-in</button>
                </div>
            </form>

            <div className="space-y-4">
                <div>
                    <h3 className="text-base font-bold">Backup</h3>
                    <p className="text-sm text-slate-500">Content is stored in this browser only. Download a backup before clearing browser data or moving to another computer.</p>
                </div>
                <div className="card p-5 flex flex-wrap gap-3">
                    <button type="button" onClick={exportData} className="btn-secondary btn-sm"><Download className="w-3.5 h-3.5" />Download backup</button>
                    <button type="button" onClick={() => importRef.current?.click()} className="btn-secondary btn-sm"><Upload className="w-3.5 h-3.5" />Restore from backup</button>
                    <input ref={importRef} type="file" accept="application/json" className="sr-only" onChange={importData} />
                </div>
            </div>
        </div>
    );
};

/* ========================================================================== */
/* Login gate                                                                 */
/* ========================================================================== */

const LoginGate: React.FC<{ onSuccess: () => void; onClose: () => void }> = ({ onSuccess, onClose }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPw, setShowPw] = useState(false);
    const [error, setError] = useState('');

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (verifyAdminCredentials(username, password)) {
            setAdminAuthenticatedSession(true);
            onSuccess();
        } else {
            setError('Incorrect username or password.');
        }
    };

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Admin sign in">
            <div className="absolute inset-0 bg-brand-forest/70 backdrop-blur-sm" onClick={onClose} />
            <div className="relative card w-full max-w-sm p-8 animate-fade-up">
                <IconBtn label="Close" onClick={onClose}><X className="w-5 h-5" /></IconBtn>
                <div className="flex flex-col items-center text-center -mt-6">
                    <LogoMark size={44} />
                    <h2 className="mt-4 text-xl font-bold">Admin sign in</h2>
                    <p className="mt-1 text-sm text-slate-500">Manage bottles, gallery, website text and quote requests.</p>
                    <div className="mt-3 rounded-xl bg-brand-mist/80 border border-brand-green/20 px-3 py-1.5 text-xs text-brand-forest text-center">
                        <span className="font-semibold">Default credentials:</span> <code className="font-mono bg-white px-1.5 py-0.5 rounded text-brand-green border border-slate-200">admin</code> / <code className="font-mono bg-white px-1.5 py-0.5 rounded text-brand-green border border-slate-200">chinarmist123</code>
                    </div>
                </div>
                <form onSubmit={submit} className="mt-6 space-y-4">
                    <div>
                        <label htmlFor="a-user" className="field-label">Username</label>
                        <input id="a-user" className="field" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" autoFocus />
                    </div>
                    <div>
                        <label htmlFor="a-pass" className="field-label">Password</label>
                        <div className="relative">
                            <input id="a-pass" type={showPw ? 'text' : 'password'} className="field pr-11" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
                            <button type="button" onClick={() => setShowPw((v) => !v)} className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:text-brand-forest" aria-label={showPw ? 'Hide password' : 'Show password'}>
                                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>
                    {error && <p className="rounded-lg bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700">{error}</p>}
                    <button type="submit" className="btn-primary btn-md w-full">
                        <Lock className="w-4 h-4" />
                        Sign in
                    </button>
                </form>
            </div>
        </div>
    );
};

/* ========================================================================== */
/* Panel shell                                                                */
/* ========================================================================== */

interface AdminPanelProps {
    products: BottleProduct[];
    gallery: GalleryItem[];
    settings: SiteSettings;
    quotes: QuoteSubmission[];
    brandLogos: BrandLogo[];
    onSaveProducts: (products: BottleProduct[]) => void;
    onSaveGallery: (gallery: GalleryItem[]) => void;
    onSaveSettings: (settings: SiteSettings) => void;
    onSaveBrandLogos: (logos: BrandLogo[]) => void;
    onUpdateQuoteStatus: (id: string, status: QuoteStatus) => void;
    onDeleteQuote: (id: string) => void;
    onRefreshQuotes: () => void;
    onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
    products, gallery, settings, quotes, brandLogos,
    onSaveProducts, onSaveGallery, onSaveSettings, onSaveBrandLogos, onUpdateQuoteStatus, onDeleteQuote, onRefreshQuotes, onClose,
}) => {
    const [authed, setAuthed] = useState<boolean>(() => isAdminAuthenticatedSession());
    const [tab, setTab] = useState<Tab>('quotes');
    const [toast, setToast] = useState('');
    const toastTimer = useRef<number | undefined>(undefined);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKey);
            window.clearTimeout(toastTimer.current);
        };
    }, [onClose]);

    const notify: Notify = (msg = 'Saved') => {
        setToast(msg);
        window.clearTimeout(toastTimer.current);
        toastTimer.current = window.setTimeout(() => setToast(''), 2200);
    };

    const logout = () => {
        setAdminAuthenticatedSession(false);
        setAuthed(false);
        onClose();
    };

    if (!authed) return <LoginGate onSuccess={() => setAuthed(true)} onClose={onClose} />;

    const newQuotes = quotes.filter((q) => q.status === 'New').length;

    return (
        <div className="fixed inset-0 z-[70] flex items-stretch sm:items-center justify-center sm:p-4" role="dialog" aria-modal="true" aria-label="Admin panel">
            <div className="absolute inset-0 bg-brand-forest/70 backdrop-blur-sm" onClick={onClose} />
            <div className="relative flex w-full max-w-6xl h-full sm:h-[90vh] flex-col overflow-hidden bg-white sm:rounded-3xl shadow-lift animate-fade-up">
                {/* Header */}
                <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-5 sm:px-6 py-3.5">
                    <div className="flex items-center gap-3">
                        <LogoMark size={30} />
                        <div>
                            <p className="text-sm font-bold text-brand-forest leading-tight">Admin panel</p>
                            <p className="text-[11px] text-slate-500">Changes appear on the website immediately</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {toast && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 animate-fade-up">
                                <Check className="w-3.5 h-3.5" />
                                {toast}
                            </span>
                        )}
                        <button type="button" onClick={logout} className="btn-ghost btn-sm text-slate-600"><LogOut className="w-3.5 h-3.5" />Sign out</button>
                        <IconBtn label="Close" onClick={onClose}><X className="w-5 h-5" /></IconBtn>
                    </div>
                </div>

                <div className="flex flex-1 min-h-0 flex-col md:flex-row">
                    {/* Tabs */}
                    <nav className="flex md:w-56 shrink-0 overflow-x-auto md:overflow-visible border-b md:border-b-0 md:border-r border-slate-100 bg-brand-mist/60 px-3 py-2 md:py-4 md:flex-col gap-1" aria-label="Admin sections">
                        {TABS.map((t) => {
                            const Icon = t.icon;
                            const on = tab === t.id;
                            const badge = t.id === 'quotes' ? newQuotes : 0;
                            return (
                                <button
                                    key={t.id}
                                    type="button"
                                    onClick={() => setTab(t.id)}
                                    className={`flex items-center gap-2.5 whitespace-nowrap rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${on ? 'bg-white text-brand-forest shadow-soft' : 'text-slate-600 hover:bg-white/70 hover:text-brand-forest'}`}
                                >
                                    <Icon className={`w-4 h-4 ${on ? 'text-brand-green' : 'text-slate-400'}`} />
                                    {t.label}
                                    {badge > 0 && <span className="ml-auto rounded-full bg-brand-green px-1.5 py-0.5 text-[10px] font-bold text-white">{badge}</span>}
                                </button>
                            );
                        })}
                    </nav>

                    {/* Content */}
                    <div className="flex-1 min-h-0 overflow-y-auto scroll-thin p-5 sm:p-6 lg:p-8 bg-white">
                        {tab === 'quotes' && <QuotesTab quotes={quotes} onUpdateStatus={onUpdateQuoteStatus} onDelete={onDeleteQuote} onRefresh={onRefreshQuotes} />}
                        {tab === 'products' && <ProductsTab products={products} onSave={onSaveProducts} notify={notify} />}
                        {tab === 'gallery' && <GalleryTab gallery={gallery} onSave={onSaveGallery} notify={notify} />}
                        {tab === 'logos' && <LogosTab brandLogos={brandLogos} onSave={onSaveBrandLogos} notify={notify} />}
                        {tab === 'content' && <ContentTab settings={settings} onSave={onSaveSettings} notify={notify} />}
                        {tab === 'settings' && (
                            <SettingsTab
                                settings={settings}
                                products={products}
                                gallery={gallery}
                                brandLogos={brandLogos}
                                quotes={quotes}
                                onSaveSettings={onSaveSettings}
                                onSaveProducts={onSaveProducts}
                                onSaveGallery={onSaveGallery}
                                onSaveBrandLogos={onSaveBrandLogos}
                                notify={notify}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
