
## Goal

Make this project buildable with plain `npm install && npm run build` and deployable as static files to GitHub Pages on a custom domain. Keep all visuals, components, theme, and behavior identical.

## Why changes are needed

The project is currently a **TanStack Start** app:
- It targets Cloudflare Workers (`wrangler.jsonc`, `@cloudflare/vite-plugin`).
- `vite build` produces a Worker bundle, not a static site.
- There is no `index.html`; HTML is rendered by the server from `src/routes/__root.tsx`.

GitHub Pages only serves static files, so we need a plain Vite SPA build that emits `dist/index.html` plus hashed JS/CSS assets. We'll keep TanStack **Router** (the routing library) but drop TanStack **Start** (the SSR framework).

## Approach

Switch to: **Vite 7 + React 19 + TanStack Router (client-side, file-based routing)**. This is the smallest possible change — same routes, same components, same styles, same router API — only the SSR shell and Cloudflare bits go away.

## File-by-file changes

### 1. `package.json`
- Remove SSR-only deps: `@tanstack/react-start`, `@tanstack/router-plugin` (replaced), `@cloudflare/vite-plugin`, `@lovable.dev/vite-tanstack-config`.
- Add: `@tanstack/router-plugin` (kept, gives file-based routing for plain Vite) and `@vitejs/plugin-react` (already a devDep).
- Scripts stay the same: `dev`, `build`, `preview`. `npm run build` will output to `dist/`.

### 2. `vite.config.ts` (rewrite)
Plain Vite config with the React plugin, Tailwind v4 plugin, `vite-tsconfig-paths` (already installed for the `@/` alias), and TanStack Router's Vite plugin in **non-Start mode** so it still auto-generates `routeTree.gen.ts` from `src/routes/`.

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig({
  base: "/", // custom domain → root
  plugins: [
    TanStackRouterVite({ routesDirectory: "src/routes", generatedRouteTree: "src/routeTree.gen.ts" }),
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],
  build: { outDir: "dist" },
});
```

### 3. `index.html` (new, at project root)
Vite needs an HTML entry point. Mirror the current `<head>` content from `src/routes/__root.tsx` (charset, viewport, title, description, OG/Twitter meta, theme-init script) so SEO and the no-flash dark theme keep working. Add `<div id="root"></div>` and `<script type="module" src="/src/main.tsx">`.

### 4. `src/main.tsx` (new — client entry)
Replaces TanStack Start's automatic SSR entry:

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { getRouter } from "./router";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./styles.css";

const router = getRouter();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);
```

### 5. `src/router.tsx` (minor)
Already exports `getRouter()` — keep as-is. Only TS imports stay; no SSR-specific code is in this file.

### 6. `src/routes/__root.tsx` (simplify)
Remove the SSR shell (`<html>/<head>/<body>`, `HeadContent`, `Scripts`, `shellComponent`, `appCss?url` import, `themeInitScript`). Keep the route definition as a normal layout that just renders `<Outlet />`. The `<head>` data already lives in `index.html`, and `ThemeProvider` already handles the theme-init flicker prevention via the inline script we move to `index.html`.

```tsx
import { Outlet, Link, createRootRoute } from "@tanstack/react-router";

function NotFoundComponent() { /* unchanged */ }

export const Route = createRootRoute({
  component: () => <Outlet />,
  notFoundComponent: NotFoundComponent,
});
```

### 7. `src/routes/index.tsx` (minor)
Remove the `head()` block (Vite SPA serves a single `index.html`, so all per-route `head()` data wouldn't take effect statically anyway). Keep the rest exactly as-is — the lazy-loaded sections, `<Navbar />`, `<Hero />`, etc. are pure React and need zero changes.

### 8. `wrangler.jsonc` — delete
No longer needed.

### 9. `public/CNAME` (new)
Static file with your custom domain on a single line (e.g. `aadiratham.com`). GitHub Pages reads this on every deploy to keep the custom domain bound. Vite copies anything in `public/` straight into `dist/` untouched.

### 10. `public/.nojekyll` (new, empty file)
Tells GitHub Pages to skip Jekyll processing so files/folders starting with `_` (Vite emits some) are served correctly.

### 11. `public/404.html` (new, copy of `index.html`)
GitHub Pages serves this on any unknown path. Because TanStack Router is client-side here, copying `index.html` to `404.html` makes deep-link refreshes work (the SPA boots and the router resolves the URL). For a single-route landing page this is belt-and-braces but worth including.

### 12. `.github/workflows/deploy.yml` (new — replaces the Jekyll workflow)
Replace the existing `jekyll-gh-pages.yml` with a Node build + Pages deploy:

```yaml
name: Deploy site to GitHub Pages
on:
  push: { branches: ["main"] }
  workflow_dispatch:
permissions: { contents: read, pages: write, id-token: write }
concurrency: { group: "pages", cancel-in-progress: false }
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: "20", cache: "npm" }
      - run: npm ci
      - run: npm run build
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with: { path: ./dist }
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v5
```

### 13. `.lovable/plan.md`, `bunfig.toml` — leave as-is (harmless).

## What stays untouched (visuals/behavior)

- Every file under `src/components/**` (Navbar, Hero, EventsSection, AboutSection, ContactSection, Footer, ThemeProvider, ThemeToggle, all `ui/*`).
- `src/styles.css`, Tailwind v4 setup, theme tokens.
- `src/lib/**`, `src/hooks/**`.
- The route file `src/routes/index.tsx`'s component (only the `head()` block is removed).
- `tsconfig.json`, `components.json`, `eslint.config.js`, `.prettierrc`.

## What you'll do after I implement

1. Push to GitHub (auto-syncs from Lovable).
2. In repo **Settings → Pages**, set **Source = GitHub Actions**.
3. In repo **Settings → Pages → Custom domain**, enter your domain and save (this confirms the `CNAME` file).
4. At your DNS provider, add either:
   - Apex domain: 4 A records to GitHub Pages IPs (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`), **or**
   - Subdomain (e.g. `www`): one CNAME pointing to `<username>.github.io`.
5. Wait for DNS + GitHub's auto-SSL (a few minutes to a few hours).

Let me know the exact custom domain and I'll bake it into `public/CNAME` during implementation. If you'd rather fill it in yourself after, I'll leave a placeholder.

## Trade-offs to be aware of

- **No SSR / no per-route HTML meta tags.** All pages share the meta in `index.html`. For a single-page landing site this is fine; if you later add multiple shareable routes (`/about`, `/events`, etc.) and want unique social preview cards, you'd need to either reintroduce SSR/SSG or use a small prerender step.
- **No server functions.** None are used in the project today, so nothing breaks.
- **Lovable Cloud features** (DB, auth, edge functions) — not currently used in this project, but they would not work on GitHub Pages if you add them later. You'd need to host elsewhere (or call them from the static site as APIs) in that case.
