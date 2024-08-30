import { type Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'gentle-wind-1': 'gentle-wind-1 8s ease-in-out infinite',
        'gentle-wind-2': 'gentle-wind-2 10s ease-in-out infinite',
        'gentle-wind-3': 'gentle-wind-3 12s ease-in-out infinite',
        'gentle-wind-4': 'gentle-wind-4 14s ease-in-out infinite',
        'grow-shrink-1': 'grow-shrink-1 4s ease-in-out infinite',
        'grow-shrink-2': 'grow-shrink-2 5s ease-in-out infinite',
        'grow-shrink-3': 'grow-shrink-3 6s ease-in-out infinite',
        'grow-shrink-4': 'grow-shrink-4 7s ease-in-out infinite',
        'shrink-spiral': 'shrinkSpiral 0.4s ease-in-out forwards',
      },
      keyframes: {
        'gentle-wind-1': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(1deg)' },
        },
        'gentle-wind-2': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(-1deg)' },
        },
        'gentle-wind-3': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '33%': { transform: 'rotate(1deg)' },
          '66%': { transform: 'rotate(-1deg)' },
        },
        'gentle-wind-4': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(1deg)' },
          '75%': { transform: 'rotate(-1deg)' },
        },
        'grow-shrink-1': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        'grow-shrink-2': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.95)' },
        },
        'grow-shrink-3': {
          '0%, 100%': { transform: 'scale(1)' },
          '33%': { transform: 'scale(1.07)' },
          '66%': { transform: 'scale(0.93)' },
        },
        'grow-shrink-4': {
          '0%, 100%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.03)' },
          '75%': { transform: 'scale(0.97)' },
        },
        shrinkSpiral: {
          '0%': { transform: 'scale(1) rotate(0deg)' },
          '100%': { transform: 'scale(0) rotate(360deg)' },
        },
      },
      brightness: {
        '115': '1.9',
      },
      transitionProperty: {
        'opacity': 'opacity',
      },
      transitionDuration: {
        '1000': '1000ms',
      },
    },
  },
  plugins: [
    typography,
  ],
} satisfies Config;