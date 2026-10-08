# PT Tehnonusa Prima Solusi

Landing page perusahaan teknologi PT. Tehnonusa Prima Solusi.

## Tech Stack

- **Next.js 16** — App Router, Server Components
- **React 19** — UI library
- **TypeScript 5** — Type safety
- **Tailwind CSS 4** — Utility-first styling
- **next-intl 4** — Internationalization (id / en)
- **next-themes** — Dark / light / system mode
- **Motion** — Animations
- **lucide-react** — Icons
- **clsx + tailwind-merge** — Class merging utility

## Development

Install dependencies:

```bash
pnpm install
```

Run development server:

```bash
pnpm dev
```

Build production:

```bash
pnpm build
```

Lint:

```bash
pnpm lint
```

Type check:

```bash
pnpm tsc --noEmit
```

## Project Structure

```
src/
├── app/
│   ├── [locale]/       # Locale-aware routes
│   │   ├── layout.tsx  # Locale layout (theme + i18n providers)
│   │   └── page.tsx    # Home page
│   └── globals.css     # Design tokens + base styles
│
├── components/
│   ├── layout/         # Navbar, Footer
│   ├── sections/       # Landing page sections
│   ├── ui/             # Reusable UI primitives
│   └── providers/      # React context providers
│
├── config/
│   └── site.ts         # Site-wide configuration
│
├── i18n/
│   ├── routing.ts      # Locale routing config
│   └── request.ts      # next-intl server config
│
├── lib/
│   └── utils.ts        # Utility functions (cn)
│
├── messages/
│   ├── id.json         # Indonesian translations
│   └── en.json         # English translations
│
└── types/              # Shared TypeScript types
```

## Localization

Default language: **Indonesian (id)**

Supported: `id`, `en`

English URL example: `/en`

## Theme

Supports: **Light**, **Dark**, **System**

All colors use CSS custom properties — defined in `globals.css`.
