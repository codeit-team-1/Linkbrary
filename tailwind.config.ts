import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/styles/**/*.css',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6d6afe',
        black: '#111322',
        white: '#ffffff',
        bg: '#f0f6ff',
        secondary: {
          10: '#e7effb',
          20: '#ccd5e3',
          60: '#9fa6b2',
          100: '#3e3e43',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        red: {
          DEFAULT: '#ff5b56',
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        yellow: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        green: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        blue: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        indigo: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        purple: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        pink: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
      },
      backgroundImage: {
        'gradient-color': 'linear-gradient(to right, #6D6AFE 0%, #6AE3FE 100%)',
        'gradient-text-blue-to-pink':
          'linear-gradient(to right, #6D6AFE 0%, #FF9F9F 100%)',
        'gradient-text-red-to-blue':
          'linear-gradient(to right, #FE8A8A 2%, #A4CEFF 100%)',
        'gradient-text-blue-to-yellow':
          'linear-gradient(to left, #6FBAFF 0%, #FFD88B 100%)',
        'gradient-text-blue-to-skyblue':
          'linear-gradient(to right, #6D7CCD 0%, #728EB8 100%)',
        'gradient-text-skyblue-to-blue':
          'linear-gradient(to right, #7DD4EB 0%, #9AB8D6 100%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'card-image': 'url("/images/landingCard3-1.png")',
      },
    },

    minHeight: {
      /* 컨텐츠 높이와 상관없이 footer 하단 고정 */
      'custom-footer-height': 'calc(100vh - 250px)',
    },
    keyframes: {
      bounce: {
        '100%': {
          top: '-20px',
          textShadow:
            '0 1px 0 #CCC, 0 2px #CCC, 0 3px #CCC, 0 4px #CCC, 0 5px #CCC, 0 6px #CCC, 0 7px #CCC, 0 8px #CCC, 0 9px #CCC, 0 50px 25px rgba(0, 0, 0, .3)',
        },
      },
      cardRotate: {
        /* 랜딩 페이지 카드 rotate 애니메이션 */
        '0%': { transform: 'rotateY(0deg)' },
        '50%': { transform: 'rotateY(360deg)' },
        '100%': { transform: 'rotateY(360deg)' },
      },
      cardScale: {
        /* 랜딩 페이지 카드 scale애니메이션 */
        '0%': { transform: 'scale(1)' },
        '40%': { transform: 'scale(1.4)' },
        '60%': { transform: 'scale(1.4)' },
        '80%': { transform: 'scale(1)' },
        '100%': { transform: 'scale(1)' },
      },
      loadingSpinner: {
        '100%': {
          transform: 'rotate(360deg)',
        },
      },
      textSlide: {
        /* 키비주얼 텍스트 상하 슬라이드 애니메이션(pc, tab) */
        '0%': { marginTop: '0' },
        '25%': { marginTop: '-79px' },
        '35%': { marginTop: '-79px' },
        '60%': { marginTop: '-158px' },
        '70%': { marginTop: '-158px' },
        '90%': { marginTop: '0' },
        '100%': { marginTop: '0' },
      },
      textSlideMo: {
        /* 키비주얼 텍스트 상하 슬라이드 애니메이션(mo) */
        '0%': { marginTop: '0' },
        '25%': { marginTop: '-47px' },
        '35%': { marginTop: '-47px' },
        '60%': { marginTop: '-94px' },
        '70%': { marginTop: '-94px' },
        '90%': { marginTop: '0' },
        '100%': { marginTop: '0' },
      },
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
    },
    animation: {
      bounce10: 'bounce .7s ease infinite alternate 100ms',
      bounce20: 'bounce .7s ease infinite alternate 200ms',
      bounce30: 'bounce .7s ease infinite alternate 300ms',
      bounce40: 'bounce .7s ease infinite alternate 400ms',
      bounce50: 'bounce .7s ease infinite alternate 500ms',
      bounce60: 'bounce .7s ease infinite alternate 600ms',
      bounce70: 'bounce .7s ease infinite alternate 700ms',
      bounce80: 'bounce .7s ease infinite alternate 800ms',
      bounce90: 'bounce .7s ease infinite alternate 900ms',
      cardRotate: 'cardRotate 4s ease-in-out infinite',
      cardRotateDelay: 'cardRotate 4s ease-in-out infinite 2s',
      cardScale: 'cardScale 5s linear infinite',
      textSlide: 'textSlide 6s ease-in-out infinite 1s',
      textSlideMo: 'textSlideMo 6s ease-in-out infinite 1s',
      spinner: 'loadingSpinner 1s linear infinite',
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
export default config;
