import React, { useEffect, useRef, useState } from 'react';

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Stagger delay in ms */
    delay?: number;
    as?: keyof JSX.IntrinsicElements;
}

/**
 * Subtle fade-up on scroll. Respects prefers-reduced-motion via CSS.
 */
export const Reveal: React.FC<RevealProps> = ({ delay = 0, className = '', children, as = 'div', style, ...rest }) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (typeof IntersectionObserver === 'undefined') {
            setVisible(true);
            return;
        }
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisible(true);
                        io.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    const Tag = as as any;
    return (
        <Tag
            ref={ref}
            className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
            style={{ transitionDelay: `${delay}ms`, ...style }}
            {...rest}
        >
            {children}
        </Tag>
    );
};
