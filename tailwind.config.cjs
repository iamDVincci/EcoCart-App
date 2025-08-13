/**** Tailwind Config: tokens per PRD ****/
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#059669', // emerald 600
          foreground: '#FFFFFF',
        },
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b'
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
          900: '#111827'
        },
        neutral: {
          400: '#a3a3a3', // accent earth per PRD
        },
        green: {
          100: '#dcfce7',
          500: '#22c55e',
          800: '#166534',
        },
        amber: {
          500: '#f59e0b',
        },
        success: '#22c55e',
        warning: '#f59e0b',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        'xs': ['12px', { lineHeight: '1.5', letterSpacing: 'normal' }],
        'sm': ['14px', { lineHeight: '1.5', letterSpacing: 'normal' }],
        'base': ['16px', { lineHeight: '1.6', letterSpacing: 'normal' }],
        'lg': ['18px', { lineHeight: '1.4', letterSpacing: 'normal' }],
        'xl': ['20px', { lineHeight: '1.4', letterSpacing: 'normal' }],
        '2xl': ['24px', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        '3xl': ['32px', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        '4xl': ['32px', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        '5xl': ['48px', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
      },
      fontWeight: {
        'medium': '500',
        'semibold': '600',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
        '3xl': '64px',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1)',
        'elevation': '0 4px 10px -2px rgba(0,0,0,0.08), 0 2px 4px -1px rgba(0,0,0,0.04)'
      },
      transitionTimingFunction: {
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'out': 'cubic-bezier(0, 0, 0.2, 1)',
        'in': 'cubic-bezier(0.4, 0, 1, 1)',
      },
      transitionDuration: {
        'fast': '150ms',
        'normal': '300ms',
        'slow': '500ms',
      },
    },
  },
  plugins: [],
};
