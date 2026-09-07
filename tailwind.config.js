/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Taken from the Chinar Mist emblem: deep chinar green, leaf green, ribbon blue.
                brand: {
                    forest: '#0F3D22',
                    deep: '#17512F',
                    green: '#1F6B3A',
                    leaf: '#3E8E4C',
                    blue: '#1D4FA8',
                    sky: '#4A90E2',
                    ice: '#E7F3EB',
                    mist: '#F4F9F5',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
                heading: ['Montserrat', 'Inter', 'system-ui', 'sans-serif'],
                baskerville: ['"Baskerville Old Face"', '"Libre Baskerville"', 'Baskerville', 'Garamond', 'serif'],
            },
            boxShadow: {
                soft: '0 1px 2px rgba(15, 61, 34, 0.04), 0 8px 24px -12px rgba(15, 61, 34, 0.14)',
                lift: '0 2px 4px rgba(15, 61, 34, 0.05), 0 20px 40px -16px rgba(15, 61, 34, 0.24)',
                glow: '0 12px 32px -10px rgba(31, 107, 58, 0.5)',
            },
            maxWidth: {
                '8xl': '88rem',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
                'fade-up': {
                    '0%': { opacity: '0', transform: 'translateY(16px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'float-slow': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-8px)' },
                },
            },
            animation: {
                marquee: 'marquee 40s linear infinite',
                'fade-up': 'fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
                'float-slow': 'float-slow 7s ease-in-out infinite',
            },
        },
    },
    plugins: [],
}
