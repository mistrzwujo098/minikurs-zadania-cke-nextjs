import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paulina od Matematyki brand colors
        'paulina-primary': '#571A47',
        'paulina-primary-dark': '#3E122F',
        'paulina-primary-light': '#7A2563',
        'paulina-accent': '#EC9A4F',
        'paulina-accent-hover': '#E88A3F',
        'paulina-surface': '#F7EEF4',
        'paulina-surface-dark': '#EDD8E8',
        'paulina-bg-yellow': '#FEF1D3',
        'paulina-text': '#1F2937',
        'paulina-text-light': '#6B7280',
        'paulina-success': '#10B981',
        'paulina-error': '#EF4444',
        'paulina-warning': '#F59E0B',
        'paulina-info': '#3B82F6',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Fredoka', 'Comic Sans MS', 'Inter', 'sans-serif'],
      },
      fontSize: {
        'hero-mobile': '3rem',
        'hero-tablet': '3.75rem',
        'hero-desktop': '4.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.7s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
      },
      boxShadow: {
        'card': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.15)',
        'button': '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
        'button-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.15)',
      },
      borderRadius: {
        'card': '1.5rem',
      },
    },
  },
  plugins: [],
};

export default config;
