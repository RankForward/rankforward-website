# Toki Astro Theme

A standout agency template with striking design, blazing speed, built for modern agencies and creatives

![toki](https://oxygenna-themes.b-cdn.net/toki-astro/promo/toki.png)

[![View live Demo](https://oxygenna-themes.b-cdn.net/toki-astro/promo/demo-button.svg)](https://toki-theme.netlify.app/) [![Page Speed Insights (100%)](https://oxygenna-themes.b-cdn.net/toki-astro/promo/button-pagespeed.svg)](https://pagespeed.web.dev/analysis/https-toki-theme-netlify-app/3qen1cfq0t?form_factor=desktop)

## Introduction

### About

Toki is a premium Astro template built for creative agencies, studios, and freelancers who want to stand out. With a truly unique design and a flawless 100/100 Google PageSpeed score, Toki combines cutting-edge visuals with best-in-class performance. Whether you're launching a portfolio, agency site, or creative showcase, Toki is the perfect starting point—flexible, fast, and future-ready.

### Features

- **Astro v6 Ready:** Built with the latest Astro framework for optimal performance and modern development features.
- **14 Pre-Built Pages (and more to come):** Launch your site quickly with a complete set of professionally designed pages ready to go.
- **Perfect 100/100 PageSpeed Score:** Built for maximum performance and lightning-fast load times, Toki delivers a flawless Google PageSpeed score.
- **Modular Block Sections:** All pages are built using flexible, reusable block sections—easily insert, rearrange, or extend with new content from our growing library.
- **Reusable Components:** Save time and stay consistent with a full suite of customizable, reusable UI components.
- **Built with Astro v5 & Tailwind CSS v4:** Enjoy the latest development features and speed with Astro’s cutting-edge framework and Tailwind's newest utility-first release.
- **Sitepins CMS Integration:** Manage your content visually and inline with the Git-friendly Sitepins CMS—modern, flexible, and developer-approved.
- **Light & Dark Mode:** Give users full control with a seamless toggle between light and dark themes.
- **SEO Optimized:** Toki is built with clean, semantic HTML and optimized metadata to boost visibility and search engine ranking.
- **Mega Menu Navigation:** Support complex navigation structures with a built-in, responsive mega menu—ideal for large sites.
- **Content Collections:** Organize and manage your content with Astro’s powerful content collections system.
- **Premium Support via Discord:** Gain access to our private Discord channel for direct support, updates, and guidance.
- **Free Ongoing Updates:** Your purchase includes regular updates with new features, performance improvements, and refinements.

## Getting Started

### Commands

After downloading the theme, install the dependencies and run it on your local server. Check the `package.json` file for available scripts.

> **Note**: Requires Node.js version 22.12.0 or later.

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Installs dependencies                        |
| `npm run dev`     | Starts local dev server at `localhost:4321`  |
| `npm run build`   | Build your production site to `./dist/`      |
| `npm run preview` | Preview your build locally, before deploying |

### Folder structure

Inside Toki Astro project, you'll see the following folders and files:

```plaintext
/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── blocks/
│   │   │   └── ...
│   │   ├── scripts/
│   │   │   └── ...
│   │   └── ui/
│   │       └── ...
│   ├── config/
│   │   └── ...
│   ├── content/
│   │   ├── blog/
│   │   │   └── ...
│   │   └── work/
│   │       └── ...
│   ├── data/
│   │   └── ...
│   ├── icons/
│   │   └── ...
│   ├── layouts/
│   │   └── ...
│   └── pages/
│       └── ...
└── package.json
```

| Directory/File           | Description                                                                                                                        |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| `public/`                | Contains static assets like images and the favicon. These files are served directly at the root URL.                               |
| `src/assets/`            | Contains all images and assets used in the project.                                                                                |
| `src/components/`        | Contains reusable components for your site. This directory is divided into `ui` for UI components and `blocks` for section blocks. |
| `src/components/blocks/` | Contains Section blocks used throughout the site.                                                                                  |
| `src/components/ui/`     | Contains individual UI components.                                                                                                 |
| `src/config/`            | Contains configuration files for the project in typescript format.                                                                 |
| `src/content/`           | Holds collection data, such as case studies.                                                                                       |
| `src/data/`              | Contains JSON files with content data (like features, testimonials etc).                                                           |
| `src/icons/`             | Contains all icons used in the project, most are sourced from [Heroicons](https://heroicons.com/).                                 |
| `src/layouts/`           | Contains layout components that define the overall structure of your pages.                                                        |
| `src/pages/`             | Contains `.astro` files for each page. Each file here is exposed as a route based on its file name.                                |
| `package.json`           | Lists dependencies and scripts for your project, including metadata and various package requirements.                              |

## Theme Configuration

The configuration files are located in the `src/config` directory, written in TypeScript. They contain various settings for the theme, including:

| Configuration Files        | Description                                                              |
| -------------------------- | ------------------------------------------------------------------------ |
| `src/config/config.ts`     | Basic configuration settings including SEO, mode, and scroll animations. |
| `src/config/navigation.ts` | Menu TypeScript interface options and JSON files for navigation.         |
| `src/config/analytics.ts`  | Analytics configuration file.                                            |

## Theme Customization

### Customize the Colors

The theme uses two main colors: primary and neutral. These colors are defined in the Tailwind CSS configuration file. To personalize the color scheme of your project, you can easily modify these color values.

To customize the colors, follow these steps:

1. Open the `global.css` file.
2. Find the `theme` section within the file.
3. Under `theme`, locate the `Colors`.
4. Modify the color values for `primary` and `neutral` to suit your preferred color palette.

You can use the [tailwind CSS colors](https://nodejs.org/en/download/) or create your [own palette](https://uicolors.app/create) .

### Customize the Fonts

To customize the fonts used in your project, follow these steps:

1. **Add Your Custom Font Files**
   Replace or add the desired font files in the public directory of your project.

2. **Update the Tailwind CSS Configuration**

   Open the `global.css` file. In the `@font-face` section, find the `font-family` property and update the `font-family` object.

### Dark/Light Mode

By default, the site uses forced modes, which can be either light or dark, depending on the chosen layout. The light layout sets the class to **`mode-light`** and the dark layout sets it to **`mode-dark`**. This setting allows you to maintain a fixed appearance across the site regardless of user preferences or system settings.

However, if you want to give users the ability to switch between themes, you can configure the theme to use the **`mode-auto`** class. You can easily do this by adding the **`mode-auto`** class to the **`src/layouts/Layout.astro`** file instead of using **`mode-light`** or **`mode-dark`** and uncommenting the ThemeSwitcher component in the NavigationBar component.

## Content Management

Toki uses **Sitepins CMS** for content management, allowing you to create and manage collections, edit content visually, and handle media directly in the browser.

For setup and guides, see the [Sitepins Docs](https://docs.sitepins.com/docs/guides/add-new-site).

## Internationalization (i18n)

Toki provides **optional multilingual support**, available in the dedicated **`i18n` branch**.  
If you want to add localization to your project, you can pull or merge this branch and use the tools provided below.

1. **Translation Files**

   JSON translation files for each supported language are stored in the `data/json-files/` folder. These files provide the text used across various components such as the navigation bar, feature blocks, and highlight sections.

   For example, `json-files/en/navigationBarData.json` contains the English content for the navigation bar. You can modify menu items directly by editing the JSON file.

2. **Inline Component Translations**

   Some components handle translations directly in the template using `Astro.currentLocale`.  
   This is useful for sections where the text is tightly coupled to the component, or if you want to create custom structures and prefer to keep translations close to the UI code.

3. **Language Switcher**

   The `i18n` branch includes a fully functional language switcher. When a user changes the language, the page automatically redirects to the corresponding translated version.

For more details on localization, refer to Astro’s official
[Internationalization guide](https://docs.astro.build/en/guides/internationalization/).

## Want more themes?

### Mizu

Check out **Mizu**, a product launch template designed for modern SaaS companies, digital products, and ambitious startups.

![mizu](https://oxygenna-themes.b-cdn.net/mizu-astro/mizu-theme.png)

[![Get Mizu](https://oxygenna-themes.b-cdn.net/mizu-astro/primary-button-get-mizu.svg)](https://astro.build/themes/details/mizu/)
[![View live Demo](https://oxygenna-themes.b-cdn.net/mizu-astro/secondary-button-mizu-demo.svg)](https://mizu-theme.netlify.app/)

### Foxi Pro

Check out **Foxi Pro**, our premium Astro website template with fully responsive, customizable Tailwind CSS components.

![foxi-pro](https://oxygenna-themes.b-cdn.net/foxi-pro-astro/foxi-pro.png)

[![Get Foxi Pro](https://oxygenna-themes.b-cdn.net/foxi-pro-astro/primary-button-get-foxi-pro.svg)](https://astro.build/themes/details/foxi-pro/)
[![View live Demo](https://oxygenna-themes.b-cdn.net/foxi-pro-astro/secondary-button-foxi-pro-demo.svg)](https://foxi-pro.netlify.app)

### Milo

Check out **Milo**, a clean and modern resume template for Astro, built with Tailwind CSS, perfect for showcasing your professional profile online.

![milo-theme](https://oxygenna-themes.b-cdn.net/milo-astro/milo-theme-promo.png)

[![Get Milo](https://oxygenna-themes.b-cdn.net/milo-astro/primary-button-get-milo.svg)](https://astro.build/themes/details/milo/)
[![View live Demo](https://oxygenna-themes.b-cdn.net/milo-astro/secondary-button-milo-demo.svg)](https://milo-theme.netlify.app/)

## License

Copyright 2026 - Designed & Developed by [Oxygenna](http://www.oxygenna.com/)

[![Hire Us](https://oxygenna-themes.b-cdn.net/foxi-astro/hireus.png)](mailto:themes@oxygenna.com,christos@oxygenna.com)
