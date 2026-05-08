/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './App.{js,jsx,ts,tsx}',
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    presets: [require('nativewind/preset')],
    theme: {
        extend: {
            colors: {
                ink: {
                    DEFAULT: '#0E0E0E',
                    soft: '#2A2723',
                },
                orange: {
                    DEFAULT: '#FF5B1F',
                    soft: '#FFE7DB',
                    deep: '#D9421A',
                },
                paper: '#FFFFFF',
                cream: '#FAF6F1',
                'warm-gray': '#F2EEE8',
                border: {
                    DEFAULT: '#EFEAE2',
                    strong: '#E2DBD0',
                },
                muted: '#6F675C',
                subtle: '#A39B8E',
                green: '#1F8A5B',
                yellow: '#E8B62B',
            },
            fontFamily: {
                display: ['DM Serif Display', 'Times New Roman', 'serif'],
                ui: ['Plus Jakarta Sans', 'System'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            borderRadius: {
                sm: '10px',
                md: '14px',
                lg: '20px',
                xl: '28px',
                pill: '9999px',
            },
            spacing: {
                'safe-bottom': '34px',
            },
        },
    },
    plugins: [],
};
