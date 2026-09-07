import React from 'react';

interface ImageFrameProps {
    src: string;
    alt: string;
    /** Aspect/size classes for the frame, e.g. "aspect-[4/3]" */
    className?: string;
    imgClassName?: string;
    loading?: 'lazy' | 'eager';
}

/**
 * Shows a photo of any aspect ratio without cropping it: the image sits
 * object-contain on top of a blurred, enlarged copy of itself, so tall bottle
 * shots and wide photos both fill the frame cleanly.
 */
export const ImageFrame: React.FC<ImageFrameProps> = ({ src, alt, className = '', imgClassName = '', loading = 'lazy' }) => (
    // Callers may position the frame themselves (e.g. "absolute inset-0"); otherwise it is relative.
    <div className={`${/\b(absolute|fixed)\b/.test(className) ? '' : 'relative'} overflow-hidden bg-brand-mist ${className}`}>
        <img src={src} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover scale-125 blur-2xl opacity-80" loading={loading} />
        <div className="absolute inset-0 bg-brand-forest/10" />
        <img src={src} alt={alt} className={`relative h-full w-full object-contain ${imgClassName}`} loading={loading} />
    </div>
);
