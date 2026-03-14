import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0B0F0D',
        night: '#111715',
        leaf: '#2ECC71',
        leafDark: '#1D9E55',
        ember: '#F5A623',
        forest: '#0F3D2E',
        snow: '#F5F5F5'
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif']
      },
      boxShadow: {
        glow: '0 0 40px rgba(22, 193, 114, 0.35)'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        pop: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' }
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 rgba(46, 204, 113, 0.1)' },
          '50%': { boxShadow: '0 0 28px rgba(46, 204, 113, 0.5)' }
        },
        revealUp: {
          '0%': { opacity: '0', transform: 'translateY(22px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pop: 'pop 0.35s ease-out',
        pulseGlow: 'pulseGlow 2.6s ease-in-out infinite',
        revealUp: 'revealUp 0.6s ease-out forwards'
      }
    }
  },
  plugins: []
};

export default config;
