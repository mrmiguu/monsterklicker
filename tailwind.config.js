const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      dropShadow: {
        pixel: '2px 3px 0 black',
        'pixel-inv': '2px 3px 0 white',
      },
      fontFamily: {
        sans: ['Pixelade', ...defaultTheme.fontFamily.sans],
        damage: ['_04b_30'],
      },
      animation: {
        'day-night-cycle': 'day-night-cycle 1200s linear infinite',
        breathe: 'breathe 3s infinite',
        jump: 'jump 500ms 1',
        'fade-in-out': 'fade-in-out 0.7s',
        'drift-up': 'drift-up 1.5s linear',
        'face-pulse': 'face-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'face-pulse': {
          '50%': {
            filter: 'brightness(0.8)',
          },
        },
        'day-night-cycle': {
          '0%, 100%': {
            // noon
            filter: 'hue-rotate(0deg)',
          },
          '24%, 77%': {
            // start:sunset, end:sunrise
            filter: 'hue-rotate(45deg)',
          },
          '25%, 75%': {
            // sunset, sunrise
            filter: 'hue-rotate(90deg)',
          },
          '26%, 74%': {
            // end:sunset, start:sunrise
            filter: 'hue-rotate(135deg)',
          },
          '50%': {
            // midnight
            filter: 'hue-rotate(180deg)',
          },
        },
        breathe: {
          '0%, 100%': {
            transform: 'scale(0.975, 0.95)',
            animationTimingFunction: 'cubic-bezier(0.11, 0, 0.5, 0)',
          },
          '50%': {
            transform: 'scale(1, 1)',
            animationTimingFunction: 'cubic-bezier(0.5, 1, 0.89, 1)',
          },
        },
        jump: {
          '0%, 100%': { transform: `translateY(0)`, animationTimingFunction: 'cubic-bezier(0.5, 1, 0.89, 1)' },
          '50%': { transform: `translateY(${-48}px)`, animationTimingFunction: 'cubic-bezier(0.11, 0, 0.5, 0)' },
        },
        'fade-in-out': {
          '10%': {
            opacity: '1',
          },
          '0%, 100%': {
            opacity: '0',
          },
        },
        'fade-out': {
          '0%': {
            opacity: '1',
          },
          '100%': {
            opacity: '0',
          },
        },
        'drift-up': {
          '0%': {
            transform: 'translateY(0)',
          },
          '100%': {
            transform: 'translateY(-64px)',
          },
        },
      },
    },
  },
  plugins: [],
}
