
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
				// Jarvis Theme Colors
				'jarvis-blue': '#00BFFF',
				'jarvis-gold': '#FFC700',
				'jarvis-red': '#FF2D55',
				'space-navy': '#050812',
				'surface-panel': 'rgba(16, 24, 42, 0.75)',
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
						boxShadow: '0 0 20px rgba(0,191,255,0.3)',
						transform: 'scale(1)'
					},
					'50%': {
						boxShadow: '0 0 40px rgba(0,191,255,0.6)',
						transform: 'scale(1.02)'
					}
				},
				'health-core-pulse': {
					'0%, 100%': {
						transform: 'scale(1)',
						filter: 'drop-shadow(0 0 20px rgba(0,191,255,0.6))'
					},
					'50%': {
						transform: 'scale(1.05)',
						filter: 'drop-shadow(0 0 40px rgba(0,191,255,0.9))'
					}
				},
				'floating': {
					'0%, 100%': {
						transform: 'translateY(0px)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				},
				'glow-intensity': {
					'0%, 100%': {
						boxShadow: '0 0 15px rgba(0,191,255,0.2)'
					},
					'50%': {
						boxShadow: '0 0 30px rgba(0,191,255,0.5)'
					}
				},
				'level-up-burst': {
					'0%': {
						transform: 'scale(1)',
						opacity: '1'
					},
					'50%': {
						transform: 'scale(1.2)',
						opacity: '0.8'
					},
					'100%': {
						transform: 'scale(1.5)',
						opacity: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'jarvis-pulse': 'jarvis-pulse 2s ease-in-out infinite',
				'health-core-pulse': 'health-core-pulse 2.5s ease-in-out infinite',
				'floating': 'floating 3s ease-in-out infinite',
				'glow-intensity': 'glow-intensity 2s ease-in-out infinite alternate',
				'level-up-burst': 'level-up-burst 0.6s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
