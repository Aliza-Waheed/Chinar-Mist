import React from 'react';

/**
 * Chinar Mist brand.
 *
 * - `Emblem`   — the official circular emblem (chinar leaf over the Abbottabad mountains).
 * - `LogoMark` — a simplified vector mark (droplet + leaf) used where the emblem would be too
 *                detailed: favicon, tiny icons, admin UI.
 * - `Logo`     — emblem + "CHINAR MIST" wordmark lockup for headers and footers.
 */

export const EMBLEM_SRC = '/assets/chinar_mist_logo.jpg';

interface EmblemProps {
    size?: number;
    className?: string;
}

export const Emblem: React.FC<EmblemProps> = ({ size = 44, className = '' }) => (
    <img
        src={EMBLEM_SRC}
        alt=""
        aria-hidden="true"
        width={size}
        height={size}
        className={`rounded-full bg-white object-cover ring-1 ring-brand-forest/10 shrink-0 ${className}`}
        style={{ width: size, height: size }}
    />
);

interface LogoMarkProps {
    size?: number;
    className?: string;
    /** 'color' = blue droplet with green leaf. 'mono' = single colour (currentColor). */
    variant?: 'color' | 'mono';
}

export const LogoMark: React.FC<LogoMarkProps> = ({ size = 40, className = '', variant = 'color' }) => {
    const id = React.useId().replace(/:/g, '');
    return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
            {variant === 'color' && (
                <defs>
                    <linearGradient id={`drop-${id}`} x1="14" y1="8" x2="52" y2="60" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#4A90E2" />
                        <stop offset="0.6" stopColor="#1D4FA8" />
                        <stop offset="1" stopColor="#123A7A" />
                    </linearGradient>
                    <linearGradient id={`leaf-${id}`} x1="18" y1="22" x2="46" y2="56" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#6CC271" />
                        <stop offset="1" stopColor="#2E7D32" />
                    </linearGradient>
                    <linearGradient id={`shine-${id}`} x1="20" y1="12" x2="36" y2="40" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.55" />
                        <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
                    </linearGradient>
                </defs>
            )}

            {/* Droplet */}
            <path
                d="M32 3C32 3 10.5 27.2 10.5 41.2C10.5 53.2 20.1 62.5 32 62.5C43.9 62.5 53.5 53.2 53.5 41.2C53.5 27.2 32 3 32 3Z"
                fill={variant === 'color' ? `url(#drop-${id})` : 'currentColor'}
            />

            {variant === 'color' && (
                <path
                    d="M23.5 18.5C19 25 15.5 31.5 15.5 40C15.5 42.4 15.9 44.6 16.6 46.6C17.2 47.9 15.5 48.5 14.9 47.2C13.7 44.9 13.1 42.4 13.1 40.2C13.1 30.8 18.3 22.7 22.3 17.4C23 16.5 24.1 17.6 23.5 18.5Z"
                    fill={`url(#shine-${id})`}
                />
            )}

            {/* Chinar leaf */}
            <path
                d="M32 20C33.5 24.8 35.3 28.1 37.7 30.4C40.5 28 44 27.1 48.2 27.6C47.1 32.2 44.9 35.6 41.7 38C45.1 39.3 46.9 42.3 46.7 46.8C42.1 46.2 38.5 44.8 35.5 42.4L33.7 49.6C33.4 51.7 33.3 53.9 33.4 57H30.6C30.7 53.9 30.6 51.7 30.3 49.6L28.5 42.4C25.5 44.8 21.9 46.2 17.3 46.8C17.1 42.3 18.9 39.3 22.3 38C19.1 35.6 16.9 32.2 15.8 27.6C20 27.1 23.5 28 26.3 30.4C28.7 28.1 30.5 24.8 32 20Z"
                fill={variant === 'color' ? `url(#leaf-${id})` : '#FFFFFF'}
                stroke={variant === 'color' ? '#FFFFFF' : 'none'}
                strokeWidth="0.8"
                strokeLinejoin="round"
                strokeOpacity="0.9"
            />

            {/* Midrib + veins */}
            <path d="M32 25V48.5" stroke="#FFFFFF" strokeOpacity="0.75" strokeWidth="1.1" strokeLinecap="round" />
            <path d="M32 36.5L21.5 30.5M32 36.5L42.5 30.5M32 41.5L23 45M32 41.5L41 45" stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="0.9" strokeLinecap="round" />
        </svg>
    );
};

interface LogoProps {
    /** Colour of wordmark: dark for light backgrounds, light for green backgrounds */
    tone?: 'dark' | 'light';
    size?: 'sm' | 'md' | 'lg';
    showTagline?: boolean;
    className?: string;
}

const SIZES = {
    sm: { mark: 36, word: 'text-[15px]', tag: 'text-[8.5px]' },
    md: { mark: 46, word: 'text-lg', tag: 'text-[10px]' },
    lg: { mark: 64, word: 'text-2xl', tag: 'text-[12px]' },
};

export const Logo: React.FC<LogoProps> = ({ tone = 'dark', size = 'md', showTagline = true, className = '' }) => {
    const s = SIZES[size];
    const primary = tone === 'dark' ? 'text-brand-forest' : 'text-white';
    const accent = tone === 'dark' ? 'text-brand-blue' : 'text-sky-300';
    const tagline = tone === 'dark' ? 'text-slate-500/90' : 'text-slate-300/90';

    return (
        <span className={`inline-flex items-center gap-2.5 ${className}`}>
            <Emblem size={s.mark} className={tone === 'light' ? 'ring-2 ring-white/80' : ''} />
            <span className="flex flex-col leading-none">
                <span className={`font-heading font-extrabold tracking-[0.14em] uppercase ${s.word} ${primary}`}>
                    Chinar<span className={accent}> Mist</span>
                </span>
                {showTagline && (
                    <span
                        className={`mt-1 font-serif italic tracking-wide font-medium ${s.tag} ${tagline}`}
                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                        From the Misty Mountains of Abbottabad
                    </span>
                )}
            </span>
        </span>
    );
};
