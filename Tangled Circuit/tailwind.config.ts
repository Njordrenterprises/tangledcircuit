import { type Config } from "tailwindcss";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'slight-wiggle': 'slight-wiggle 3s ease-in-out infinite',
        'gentle-float': 'gentle-float 5s ease-in-out infinite',
        'subtle-pulse': 'subtle-pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'perspective-shift': 'perspective-shift 6s ease-in-out infinite',
        'shrink-spiral': 'shrinkSpiral 0.625s ease-in-out forwards',
      },
      keyframes: {
        'slight-wiggle': {
          '0%, 100%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(1deg)' },
        },
        'gentle-float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'subtle-pulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        'perspective-shift': {
          '0%, 100%': { transform: 'perspective(1000px) rotateY(0deg)' },
          '50%': { transform: 'perspective(1000px) rotateY(5deg)' },
        },
        'shrinkSpiral': {
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
} satisfies Config;