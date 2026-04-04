// Config
// ------------
// Description: The configuration file for the website.

export interface Logo {
	src: string
	srcDark: string
	alt: string
}

export type Mode = 'auto' | 'light' | 'dark'

export interface Config {
	siteTitle: string
	siteDescription: string
	ogImage: string
	logo: Logo
	canonical: boolean
	noindex: boolean
	mode: Mode
	scrollAnimations: boolean
}

export const configData: Config = {
	siteTitle: 'Toki - Agency Theme Built with Astro by Oxygenna',
	siteDescription:
		'Toki is a standout agency template with striking design, blazing speed, built for modern agencies and creatives',
	ogImage: '/og.jpg',
	logo: {
		src: '/logo-light.webp',
		srcDark: '/logo-dark.webp',
		alt: 'Toki logo'
	},
	canonical: true,
	noindex: false,
	mode: 'auto',
	scrollAnimations: true
}
