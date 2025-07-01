/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				'bagnard-serif': ['Bagnard Regular', 'Times New Roman', 'Georgia', 'serif'],
				'bagnard-sans': ['Bagnard Sans Regular', 'Helvetica Neue', 'Arial', 'sans-serif'],
				'bagnard-bold': ['Bagnard Bold', 'Times New Roman', 'Georgia', 'serif'],
				'bagnard-italic': ['Bagnard Italic', 'Times New Roman', 'Georgia', 'serif']
			},
			typography: {
				DEFAULT: {
					css: {
						fontFamily: 'var(--font-bagnard-serif)',
						h1: {
							fontFamily: 'var(--font-bagnard-bold)'
						},
						h2: {
							fontFamily: 'var(--font-bagnard-bold)'
						},
						h3: {
							fontFamily: 'var(--font-bagnard-italic)'
						},
						h4: {
							fontFamily: 'var(--font-bagnard-bold)'
						}
					}
				}
			}
		}
	},
	plugins: []
};
