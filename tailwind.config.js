/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#FAF6EE',
          200: '#F4ECE0',
          300: '#EADCCE',
          400: '#D6C1AE',
        },
        blush: {
          50: '#FFF7F8',
          100: '#FFEBF0',
          200: '#FDCED8',
          300: '#FAA5B8',
          400: '#F67290',
          500: '#E8456C',
        },
        dusty: {
          light: '#E5BAC2',
          DEFAULT: '#C17B88',
          deep: '#9B515E',
          dark: '#682C36',
        },
        lavender: {
          50: '#FAF7FD',
          100: '#F3ECFC',
          200: '#E4D5F8',
          300: '#CDB2F1',
        },
        wine: {
          DEFAULT: '#882236',
          deep: '#5E1322',
        },
        romance: {
          gold: '#D4AF37',
          champagne: '#F7E7CE',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        script: ['"Alex Brush"', 'cursive'],
        handwriting: ['Caveat', 'cursive'],
        sans: ['Outfit', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft-glow': '0 0 25px rgba(232, 69, 108, 0.15)',
        'heart-glow': '0 0 35px rgba(225, 29, 72, 0.25)',
        'letter': '0 10px 40px -10px rgba(104, 44, 54, 0.08), 0 2px 10px -2px rgba(104, 44, 54, 0.04)',
        'polaroid': '0 12px 30px -6px rgba(104, 44, 54, 0.12), 0 4px 10px -2px rgba(104, 44, 54, 0.06)',
        'polaroid-hover': '0 20px 40px -8px rgba(104, 44, 54, 0.2), 0 8px 16px -4px rgba(104, 44, 54, 0.1)',
        'wax': '0 4px 12px rgba(136, 34, 54, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.3)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-reverse': 'floatReverse 7s ease-in-out infinite',
        'pulse-gentle': 'pulseGentle 3s ease-in-out infinite',
        'sway': 'sway 4s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'heartbeat': 'heartbeat 1.8s ease-in-out infinite',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'envelope-bounce': 'envelopeBounce 2.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(2deg)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(10px) rotate(-2deg)' },
        },
        pulseGentle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.03)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.15)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.15)' },
          '70%': { transform: 'scale(1)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        envelopeBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}

