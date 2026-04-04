// Footer Navigation
// ------------
// Description: The footer navigation data for the website.
export interface FooterAbout {
	aboutText: string
	aboutLink: string
}

export interface SubCategory {
	subCategory: string
	subCategoryLink: string
}

export interface FooterColumn {
	category: string
	subCategories: SubCategory[]
}

export interface SubFooter {
	copywriteText: string
}

export interface FooterData {
	footerAbout: FooterAbout
	footerColumns: FooterColumn[]
	subFooter: SubFooter
}

export async function getFooterNavigationData() {
	const { default: data } = await import('../data/json-files/footerNavigationData.json')
	return data as FooterData
}
