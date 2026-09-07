# Chinar Mist — website

Marketing website for Chinar Mist, an Abbottabad bottled-water company whose primary product is
**customized, branded water bottles** for hotels, restaurants, corporate clients, weddings and events.

Built with React 18, TypeScript, Vite and Tailwind CSS. No backend: all editable content lives in the
browser's `localStorage` and is managed through the built-in admin panel.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the production build locally
```

On Windows you can also double-click `start_website.bat`.

Deploy `dist/` to any static host. `vercel.json` and `public/_redirects` already route every path to
`index.html`.

## Admin panel

Open it from the small **Admin** link in the footer, or by visiting `/#admin`.

| Default username | Default password |
| ---------------- | ---------------- |
| `admin`          | `chinarmist123`  |

Change these straight away in **Contact & security → Admin sign-in**.

What you can edit without touching code:

- **Quote requests** — every form submission, with status (New / Contacted / Completed) and any attached file.
- **Bottles & sizes** — name, size, minimum order, description, image and order of appearance.
- **Gallery** — upload photos of finished bottles, set title, category and description.
- **Client logos** — an optional "Brands we have bottled for" strip (hidden until you add logos).
- **Website text** — hero heading and supporting text, about copy, tagline, brand name, FAQs.
- **Contact & security** — WhatsApp number, phone, email, Instagram, address, admin sign-in, JSON backup and restore.

> Content is stored in the browser you edit it in. Use **Download backup** to keep a copy and
> **Restore from backup** to move it to another browser or computer. Quote requests are also only
> stored locally, so keep WhatsApp/email as the primary contact channel until a backend is added.

## Brand assets

- `public/assets/chinar_mist_logo.jpg` — the official circular emblem, used in the header, footer and about section
- `public/brand/` — emblem copy, simplified vector mark (droplet + leaf) and wordmark lockups in SVG and PNG
- `public/favicon.svg` — the simplified mark, used as the favicon
- `src/components/Logo.tsx` — React components `Emblem`, `LogoMark` and `Logo` (emblem + wordmark, light or dark)

Colours come from the emblem: chinar green `#0F3D22` / `#1F6B3A`, leaf `#3E8E4C`, ribbon blue `#1D4FA8`,
sky `#4A90E2`, light tints `#E7F3EB` / `#F4F9F5`. Typefaces: Manrope (headings and wordmark) and Inter (body).

## Project layout

```
index.html                 SEO metadata, fonts, structured data
src/App.tsx                page composition and state
src/data/store.ts          types, defaults and localStorage helpers
src/components/            one file per section, plus Logo, Reveal (scroll fade-in) and AdminPanel
src/index.css              design tokens and reusable classes (.btn-*, .card, .field, .section …)
tailwind.config.js         brand colours, fonts, shadows, animations
public/assets/             photography
```
