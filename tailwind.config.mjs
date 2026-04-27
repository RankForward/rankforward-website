/**
 * @type {import('tailwindcss').Config}
 *
 * INERT — Tailwind v4 + @tailwindcss/vite ignores this file unless a
 * CSS-side `@config "./tailwind.config.mjs";` directive imports it.
 * No such directive exists in src/styles/global.css, so this config
 * has zero effect on the build. Real Tailwind config lives in
 * src/styles/global.css (@import 'tailwindcss', @source inline,
 * @theme block). File retained as a v3→v4 migration breadcrumb and
 * IDE extension compatibility hedge. See audit B1 / WAVE_3_CLOSED.md
 * §(h) for the closure record.
 */
export default {
  content: ["./src/pages/index.astro"],
  theme: { extend: {} },
  plugins: [],
};
