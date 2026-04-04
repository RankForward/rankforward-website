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
	siteTitle: 'RankForward — AI Search Optimization Agency',
	siteDescription:
		'RankForward helps businesses get recommended by ChatGPT, Perplexity, Gemini, and Claude. Built on Princeton University GEO research. Free AI visibility score.',
	ogImage: '/og.jpg',
	logo: {
		src: '/logo.svg',
		srcDark: '/logo.svg',
		alt: 'RankForward'
	},
	canonical: true,
	noindex: false,
	mode: 'light',
	scrollAnimations: true
}
