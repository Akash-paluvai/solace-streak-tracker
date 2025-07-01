
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'orbitron': ['Orbitron', 'sans-serif'],
				'exo': ['Exo 2', 'sans-serif'],
				'rajdhani': ['Rajdhani', 'sans-serif'],
				'mono': ['Roboto Mono', 'monospace'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// J.A.R.V.I.S Theme Colors
				'jarvis-cyan': '#00fff7',
				'jarvis-blue': '#007cf8',
				'jarvis-green': '#39ff14',
				'jarvis-aqua': '#00ffff',
				'jarvis-dark': '#0a0f1c',
				'jarvis-darker': '#000000',
				'jarvis-surface': 'rgba(16, 24, 42, 0.9)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'jarvis-pulse': {
					'0%, 100%': {
						boxShadow: '0 0 20px rgba(0,255,247,0.4)',
						transform: 'scale(1)'
					},
					'50%': {
						boxShadow: '0 0 40px rgba(0,255,247,0.8)',
						transform: 'scale(1.02)'
					}
				},
				'jarvis-scan': {
					'0%': {
						backgroundPosition: '-100% 0'
					},
					'100%': {
						backgroundPosition: '100% 0'
					}
				},
				'floating': {
					'0%, 100%': {
						transform: 'translateY(0px)'
					},
					'50%': {
						transform: 'translateY(-15px)'
					}
				},
				'mindra-pulse': {
					'0%, 100%': {
						boxShadow: '0 0 15px rgba(0,255,247,0.6)',
						transform: 'scale(1)'
					},
					'50%': {
						boxShadow: '0 0 30px rgba(0,255,247,1)',
						transform: 'scale(1.1)'
					}
				},
				'mindra-active': {
					'0%, 100%': {
						boxShadow: '0 0 20px rgba(57,255,20,0.8)'
					},
					'50%': {
						boxShadow: '0 0 40px rgba(57,255,20,1)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'jarvis-pulse': 'jarvis-pulse 2s ease-in-out infinite',
				'jarvis-scan': 'jarvis-scan 3s linear infinite',
				'floating': 'floating 4s ease-in-out infinite',
				'mindra-pulse': 'mindra-pulse 2s ease-in-out infinite',
				'mindra-active': 'mindra-active 1s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
