import { type Config } from "tailwindcss";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'wiggle': 'wiggle 3s ease-in-out infinite',
        'float': 'float 5s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'shrink-spiral': 'shrinkSpiral 0.5s ease-in-out forwards',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shrinkSpiral: {
          '0%': { transform: 'scale(1) rotate(0deg)' },
          '100%': { transform: 'scale(0.5) rotate(360deg)' },
        },
      },
      brightness: {
        '115': '1.9',
      },
    },
  },
} satisfies Config;