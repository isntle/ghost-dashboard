/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        ink:     { DEFAULT: '#0E1014', 2: '#2B2F36' },
        muted:   { DEFAULT: '#6B7280', 2: '#9CA3AF' },
        line:    { DEFAULT: '#ECECE6', strong: '#DDDCD3' },
        paper:   { DEFAULT: '#FAFAF7', elev: '#FFFFFF', soft: '#FBFAF4', warm: '#F4F2EB' },
        brand:   { DEFAULT: '#5B3DF5', ink: '#2A1A8E', tint: '#EFEBFF', light: '#B4A2FF' },
        good:    { DEFAULT: '#047857', tint: '#D9F3E6' },
        warn:    { DEFAULT: '#D97706', tint: '#FDF1DC' },
        bad:     { DEFAULT: '#DC2626', tint: '#FEE7E5' },
        sidebar: { DEFAULT: '#0E1014', ink: '#ECECE6', muted: '#6B7280', line: '#1A1D24', card: '#15181F' },
      },
      boxShadow: {
        card: '0 1px 0 rgba(14,16,20,.04), 0 1px 2px rgba(14,16,20,.04)',
      },
      borderRadius: {
        'md2': '10px',
        'lg2': '14px',
        'xl2': '18px',
      },
    },
  },
}
