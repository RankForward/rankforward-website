import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const work = defineCollection({
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/work' }),
	schema: () =>
		z.object({
			title: z.string(),
			subtitle: z.string(),
			description: z.string(),
			list: z.array(z.string()),
			imageThumbnail: z.string(),
			image: z.string().optional(),
			video: z.string().optional(),
			introduction: z.object({
				title: z.string(),
				subtitle: z.string(),
				body: z.string()
			}),
			whatWeDid: z.object({
				title: z.string(),
				subtitle: z.string(),
				images: z.array(z.string()),
				body: z.string()
			}),
			feedback: z.object({
				title: z.string(),
				subtitle: z.string(),
				clientFeedback: z.object({
					blockquote: z.string(),
					figcaption: z.string()
				}),
				body: z.string()
			})
		})
})

const blog = defineCollection({
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/blog' }),
	schema: () =>
		z.object({
			title: z.string(),
			subtitle: z.string().optional(),
			pubDate: z.date(),
			author: z.string(),
			description: z.string(),
			image: z.string().optional(),
			video: z.string().optional(),
			imageThumbnail: z.string().optional(),
			videoThumbnail: z.string().optional()
		})
})

export const collections = {
	work,
	blog
}
