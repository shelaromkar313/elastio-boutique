/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: {
          DEFAULT: '#F0C4CB',
          light: '#F8DFE3',
          dark: '#E29EA8'
        },
        rose: {
          antique: '#C87D87',
          deep: '#A25964'
        },
        champagne: {
          DEFAULT: '#FBEAD6',
          light: '#FFF5EA',
          dark: '#F3D4B3'
        },
        thyme: {
          DEFAULT: '#6B7556',
          light: '#8E9976',
          dark: '#4B533C'
        },
        bisque: {
          DEFAULT: '#E5BCA9',
          light: '#F2D7CB',
          dark: '#D29C85'
        },
        gold: {
          muted: '#D4AF37',
          soft: '#E6CA65'
        },
        ebony: '#1A1818',
        offwhite: '#FDFBF7'
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Cinzel', 'Cormorant Garamond', 'serif']
      },
      boxShadow: {
        'soft': '0 10px 30px -10px rgba(200, 125, 135, 0.15)',
        'luxury': '0 20px 40px -15px rgba(26, 24, 24, 0.08)',
        'floating': '0 30px 60px -12px rgba(107, 117, 86, 0.18)'
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      }
    },
  },
  plugins: [],
}
