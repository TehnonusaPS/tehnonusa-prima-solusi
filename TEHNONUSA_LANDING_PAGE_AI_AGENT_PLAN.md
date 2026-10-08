# PT Tehnonusa Prima Solusi — Landing Page Development Plan

> **Purpose:** Master instruction / roadmap untuk AI Coding Agent di IDE (Cursor, Windsurf, Claude Code, Copilot Agent, atau agent sejenis).
>
> **Rule utama:** Kerjakan project **task-by-task**. Jangan langsung membuat seluruh landing page. Setelah satu task selesai, lakukan verification, laporkan hasilnya, lalu **STOP dan tunggu instruksi berikutnya**.

---

## 1. Project Overview

Bangun landing page profesional untuk:

**PT. Tehnonusa Prima Solusi**

Perusahaan/startup yang menyediakan solusi digital seperti:

- Pembuatan sistem berbasis web
- Pembuatan aplikasi
- Custom software development
- Digital transformation
- Sistem internal perusahaan
- Integrasi API / third-party services
- Solusi digital sesuai kebutuhan bisnis

Landing page harus terasa seperti website perusahaan teknologi modern: **professional, credible, modern, informative, persuasive, responsive, fast, dan visually engaging**.

Website bukan sekadar "company profile". Tujuannya adalah mengubah visitor menjadi calon client.

### Target impression

Visitor harus mendapatkan kesan:

> "Mereka ngerti teknologi, ngerti kebutuhan bisnis, dan bisa dipercaya untuk membangun solusi digital."

Hindari desain yang terasa seperti:

- template company profile generik
- website pemerintahan
- landing page terlalu kaku
- terlalu banyak gradient tanpa tujuan
- terlalu banyak animasi sampai mengganggu
- layout yang hanya berisi text + card
- UI yang terlihat seperti hasil generate AI tanpa product thinking

---

# 2. Brand Direction

Logo referensi diberikan oleh user.

Logo menggunakan identitas utama warna **biru**.

Karena logo masih berupa referensi/dummy pada tahap awal, gunakan design token agar warna dapat diganti dengan mudah ketika brand guideline resmi tersedia.

## Initial Color System

Gunakan warna utama yang terinspirasi dari logo:

```css
--color-primary: #4C86D8;
```

Gunakan semantic color token, bukan hardcoded color di setiap component.

Contoh konsep:

```css
--primary: #4C86D8;
--primary-foreground: #FFFFFF;

--secondary: #0F2747;
--secondary-foreground: #FFFFFF;

--accent: #6EA8FE;

--background: #FFFFFF;
--foreground: #0F172A;

--muted: #F4F7FB;
--muted-foreground: #64748B;

--border: #E2E8F0;

--success: #16A34A;
--warning: #F59E0B;
--danger: #DC2626;
```

**Catatan:**

Jangan menganggap nilai di atas sebagai brand guideline final. Jadikan sebagai initial design system.

Tujuan utamanya:

1. Semua warna terpusat.
2. Dark/light mode mudah dibuat.
3. Perubahan branding di masa depan mudah.
4. Component tidak memiliki warna random.
5. UI konsisten.

---

# 3. Product Requirements

Landing page minimal memiliki struktur:

1. Navbar
2. Hero
3. Trust / credibility section
4. Services
5. Solutions / capabilities
6. Why choose us
7. Process / workflow
8. Technology / expertise
9. Portfolio / case studies
10. Testimonials
11. FAQ
12. CTA
13. Footer

Struktur final boleh berkembang setelah content strategy dibuat.

Jangan membuat semua section pada Task 1.

---

# 4. Core Features

Website harus mendukung:

### 4.1 Responsive

Target:

- Mobile
- Tablet
- Laptop
- Desktop
- Large desktop

Mobile-first.

---

### 4.2 Dark / Light Mode

User dapat mengganti:

- Light
- Dark
- System

Gunakan library yang sesuai dan stabil, misalnya:

- `next-themes`

Theme harus memengaruhi:

- background
- text
- border
- card
- navbar
- section
- button
- form
- footer
- animation visual

Jangan hanya membuat background hitam lalu menyebutnya dark mode.

---

### 4.3 Indonesian / English

Gunakan i18n.

Target language:

```text
id
en
```

Bahasa default:

```text
id
```

Jangan hardcode text UI langsung di component jika text tersebut perlu diterjemahkan.

Contoh:

```ts
t("hero.title")
t("hero.description")
t("hero.cta")
```

Pertimbangkan penggunaan `next-intl` atau solusi i18n modern yang kompatibel dengan Next.js App Router.

Agent harus memilih implementation yang paling sesuai dengan versi Next.js yang digunakan dan mengikuti dokumentasi resminya.

---

### 4.4 Animation

Animation harus digunakan untuk meningkatkan UX, bukan sekadar pamer package.

Pertimbangkan:

- `motion` / Motion for React
- CSS transitions
- Intersection Observer
- scroll reveal
- hover interaction
- navbar transition
- button micro-interaction
- card hover
- subtle parallax
- animated counters jika memang relevan

Gunakan `prefers-reduced-motion`.

Jangan membuat:

- semua element bouncing
- terlalu banyak parallax
- animation yang menghambat reading
- animation yang membuat mobile berat

---

### 4.5 Icons

Gunakan icon library seperti:

```text
lucide-react
```

Hindari membuat SVG icon manual jika icon yang sama sudah tersedia di library.

---

# 5. Tech Stack Direction

Gunakan:

- Next.js
- React
- TypeScript
- App Router
- Tailwind CSS
- ESLint
- Prettier jika diperlukan
- next-intl / i18n solution
- next-themes
- Motion
- lucide-react
- class-variance-authority jika diperlukan
- clsx / tailwind-merge jika diperlukan

Gunakan versi **stable/latest yang kompatibel** ketika project dibuat.

Agent wajib memeriksa compatibility antar package sebelum installation.

Jangan install package hanya karena populer.

Setiap dependency harus memiliki alasan yang jelas.

---

# 6. Architecture Principle

Gunakan architecture yang mudah dikembangkan.

Jangan membuat semua code di:

```text
app/page.tsx
```

Jangan membuat satu file component berisi ratusan baris.

Gunakan separation of concerns.

Prinsip:

```text
Page
 ↓
Section
 ↓
Reusable Component
 ↓
UI Primitive
```

Contoh:

```text
app/
components/
features/
lib/
config/
messages/
styles/
types/
```

Architecture harus scalable jika nantinya website berkembang menjadi aplikasi yang lebih besar.

---

# 7. Suggested Folder Structure

Struktur awal yang disarankan:

```text
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── globals.css
│   └── ...
│
├── components/
│   ├── layout/
│   │   ├── navbar.tsx
│   │   └── footer.tsx
│   │
│   ├── sections/
│   │   ├── hero/
│   │   ├── services/
│   │   ├── solutions/
│   │   ├── process/
│   │   ├── portfolio/
│   │   ├── testimonials/
│   │   ├── faq/
│   │   └── cta/
│   │
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── container.tsx
│   │   ├── section-heading.tsx
│   │   └── ...
│   │
│   └── providers/
│       └── ...
│
├── config/
│   ├── site.ts
│   ├── navigation.ts
│   └── ...
│
├── lib/
│   ├── utils.ts
│   └── ...
│
├── messages/
│   ├── id.json
│   └── en.json
│
├── types/
│   └── ...
│
└── styles/
    └── ...
```

**Catatan penting:**

Jangan membuat folder hanya demi terlihat "enterprise".

Folder harus memiliki fungsi.

Jika suatu folder belum diperlukan, jangan dibuat secara berlebihan.

---

# 8. Content Architecture

Content harus dipisahkan dari UI jika memungkinkan.

Contoh:

```ts
const services = [
  {
    title: "...",
    description: "...",
    icon: "...",
  },
];
```

Jangan melakukan:

```tsx
<div>
  <h2>Jasa Pembuatan Website</h2>
  <p>Kami menyediakan...</p>
</div>
```

berulang-ulang jika datanya dapat dibuat reusable.

Namun jangan membuat abstraction yang terlalu rumit.

**Rule:**

> Abstract repeated patterns, not hypothetical future patterns.

---

# 9. Dummy Assets

Pada tahap awal:

- Logo boleh menggunakan dummy
- Foto team boleh dummy
- Portfolio image boleh dummy
- Illustration boleh dummy
- Client logo boleh dummy

Tetapi struktur asset harus siap diganti.

Gunakan:

```text
public/
├── images/
├── icons/
├── logos/
└── ...
```

Jangan menggunakan URL random dari internet sebagai dependency utama website.

Untuk sementara boleh gunakan placeholder yang stabil.

---

# 10. SEO Requirements

Landing page harus SEO-friendly.

Minimal siapkan:

- metadata
- title
- description
- Open Graph
- favicon
- semantic HTML
- heading hierarchy
- image alt text
- sitemap jika diperlukan
- robots.txt jika diperlukan

Jangan menggunakan banyak `<div>` untuk hal yang seharusnya menggunakan semantic HTML.

Gunakan:

```html
<header>
<nav>
<main>
<section>
<article>
<footer>
```

sesuai konteks.

---

# 11. Performance Requirements

Prioritas:

1. Fast initial load
2. Good Core Web Vitals
3. Optimized images
4. Minimal unnecessary JavaScript
5. Lazy loading bila relevan
6. Server Components sebagai default
7. Client Components hanya jika memang membutuhkan interactivity/browser API

Jangan menambahkan:

```tsx
"use client"
```

ke semua component.

Gunakan Client Component hanya ketika dibutuhkan.

---

# 12. Accessibility Requirements

Minimal:

- semantic HTML
- keyboard navigation
- visible focus state
- accessible button
- accessible navigation
- proper color contrast
- alt text
- aria-label jika diperlukan
- reduced motion support

Dark mode juga harus mempertahankan readability.

---

# 13. Git Strategy

Gunakan Git sejak awal.

Branch:

```text
main
develop
feature/*
```

Untuk Task 1:

```text
main
```

boleh digunakan sebagai initial branch jika repository masih benar-benar baru.

Setiap task berikutnya sebaiknya menggunakan:

```text
feature/<task-name>
```

Contoh:

```text
feature/hero-section
feature/services-section
feature/dark-mode
feature/i18n
```

Commit harus kecil dan meaningful.

Contoh:

```text
chore: initialize nextjs project
chore: configure tailwind and theme tokens
chore: configure i18n
feat: add navbar
feat: add hero section
feat: add services section
```

Hindari:

```text
update
fix
changes
final
final-final
fix-beneran-final
```

Git bukan tempat menyimpan misteri.

---

# 14. TASK ROADMAP

## TASK 01 — Project Initialization

**Fokus HANYA setup project.**

Jangan membuat landing page.

### Objective

Membuat project Next.js yang:

- dapat dijalankan
- TypeScript aktif
- App Router aktif
- Tailwind CSS aktif
- linting aktif
- formatting siap
- Git aktif
- struktur dasar siap dikembangkan
- initial commit dibuat
- repository GitHub dibuat / dihubungkan
- project berhasil di-push ke GitHub

### Step 01 — Environment Check

Sebelum melakukan install:

Check:

```bash
node -v
npm -v
git --version
```

Jika menggunakan pnpm:

```bash
pnpm -v
```

Pilih package manager yang paling sesuai.

Prefer:

```text
pnpm
```

jika environment mendukung.

Jika tidak tersedia, gunakan npm.

Jangan mengubah environment global tanpa alasan.

---

### Step 02 — Create Next.js Project

Gunakan:

```text
Next.js
TypeScript
App Router
ESLint
Tailwind CSS
src directory
```

Gunakan latest stable compatible version.

Jangan langsung membuat:

- Hero
- Navbar
- Services
- Portfolio
- Footer
- Animation section

Task ini hanya initialization.

---

### Step 03 — Install Initial Dependencies

Install hanya dependency foundational yang memang diperlukan.

Minimal pertimbangkan:

```text
next-themes
next-intl
motion
lucide-react
clsx
tailwind-merge
```

Tetapi agent harus memverifikasi apakah semua dependency tersebut memang kompatibel dan diperlukan pada versi project saat ini.

Jangan install library UI besar jika belum diperlukan.

---

### Step 04 — Initial Architecture

Buat folder dasar yang memang akan digunakan:

```text
src/
├── app/
├── components/
│   ├── layout/
│   ├── sections/
│   ├── ui/
│   └── providers/
├── config/
├── lib/
├── messages/
├── types/
└── ...
```

Jangan membuat file component landing page dulu.

---

### Step 05 — Design Token Foundation

Siapkan fondasi theme di global stylesheet.

Buat semantic tokens untuk:

```text
primary
secondary
accent
background
foreground
muted
border
success
warning
danger
```

Pastikan light/dark architecture memungkinkan perubahan token tanpa mengubah setiap component satu per satu.

Gunakan warna brand awal:

```text
Primary: #4C86D8
```

Jangan mengambil warna secara acak dari logo setiap kali membuat component.

---

### Step 06 — Theme Foundation

Siapkan provider untuk dark/light/system.

Belum perlu membuat UI toggle yang kompleks.

Yang penting:

```text
ThemeProvider
light
dark
system
```

berfungsi dengan benar.

---

### Step 07 — i18n Foundation

Siapkan architecture i18n.

Buat:

```text
messages/
├── id.json
└── en.json
```

Default locale:

```text
id
```

Untuk tahap ini cukup pastikan routing / translation foundation berjalan.

Belum perlu menerjemahkan seluruh landing page.

Buat satu text sederhana untuk memastikan i18n berhasil.

---

### Step 08 — Basic Utilities

Buat utility seperti:

```text
cn()
```

jika memang menggunakan `clsx` + `tailwind-merge`.

Pastikan lint/typecheck tidak error.

---

### Step 09 — Quality Check

Jalankan:

```bash
npm run lint
npm run build
```

atau command equivalent sesuai package manager.

Jika tersedia:

```bash
npm run typecheck
```

Semua harus clean.

Jangan lanjut GitHub jika project belum build dengan benar.

---

### Step 10 — Git Initialization

Jika repository belum menggunakan Git:

```bash
git init
```

Buat `.gitignore`.

Pastikan file sensitif tidak masuk repository:

```text
.env
.env.local
node_modules
.next
```

Jangan commit secret.

---

### Step 11 — README

Buat README awal yang menjelaskan:

```text
# PT Tehnonusa Prima Solusi

Landing page perusahaan teknologi PT. Tehnonusa Prima Solusi.

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- next-intl
- next-themes
- Motion

## Development

Install dependencies.

Run development server.

Build production.

Lint.

## Project Structure

Penjelasan singkat folder utama.
```

Jangan membuat README terlalu panjang pada tahap ini.

---

### Step 12 — Initial Commit

Gunakan commit:

```bash
git add .
git commit -m "chore: initialize landing page project"
```

---

### Step 13 — GitHub Repository

Buat repository GitHub:

```text
Nama yang disarankan:

tehnonusa-landing-page
```

Repository:

```text
public
```

kecuali user meminta private.

Hubungkan remote:

```bash
git remote add origin <GITHUB_REPOSITORY_URL>
```

Push:

```bash
git branch -M main
git push -u origin main
```

---

# 15. TASK 01 DEFINITION OF DONE

Task 01 dianggap selesai hanya jika:

- [ ] Next.js berjalan
- [ ] TypeScript berjalan
- [ ] App Router aktif
- [ ] Tailwind berjalan
- [ ] ESLint clean
- [ ] Production build berhasil
- [ ] Theme foundation tersedia
- [ ] i18n foundation tersedia
- [ ] `id` dan `en` tersedia
- [ ] semantic color token tersedia
- [ ] folder architecture dasar tersedia
- [ ] README tersedia
- [ ] `.gitignore` benar
- [ ] Git repository aktif
- [ ] Initial commit berhasil
- [ ] GitHub repository terhubung
- [ ] branch `main` berhasil di-push
- [ ] tidak ada secret yang ter-commit
- [ ] tidak ada landing page section yang dibuat sebelum Task 01 selesai

---

# 16. TASK 01 STOP RULE

Setelah Task 01 selesai:

**STOP.**

Jangan mengerjakan Task 02 secara otomatis.

Agent harus memberikan laporan:

```text
TASK 01 COMPLETED

Project:
...

Next.js:
...

Node:
...

Package Manager:
...

Installed Dependencies:
...

Architecture:
...

Theme:
...

i18n:
...

Build:
PASS / FAIL

Lint:
PASS / FAIL

Git:
...

GitHub:
...

Commit:
...

Next recommended task:
TASK 02 — Design System & UI Foundation
```

Jika ada error:

```text
TASK 01 BLOCKED

Error:
...

Root cause:
...

What was attempted:
...

What needs to be fixed:
...
```

**Jangan menyembunyikan error.**

---

# 17. NEXT TASK PREVIEW

## TASK 02 — Design System & UI Foundation

Baru setelah Task 01 disetujui, lanjut:

- typography
- spacing system
- container
- button variants
- card
- section heading
- badge
- theme toggle
- language switcher
- navbar foundation
- responsive utilities
- reusable animation primitives

Belum membuat semua section landing page.

---

## TASK 03 — Navbar + Hero

Fokus:

- Navbar
- Language switcher
- Theme toggle
- CTA
- Hero
- visual dummy
- responsive
- animation

---

## TASK 04 — Services

Fokus:

- service cards
- solution categories
- interaction
- animation

---

## TASK 05 — Trust + Why Us

Fokus:

- metrics
- technology
- credibility
- differentiators

---

## TASK 06 — Process

Fokus:

```text
Discovery
→ Planning
→ Design
→ Development
→ Testing
→ Launch
→ Support
```

---

## TASK 07 — Portfolio / Case Studies

Gunakan dummy project terlebih dahulu.

---

## TASK 08 — Testimonials + FAQ

---

## TASK 09 — CTA + Footer

---

## TASK 10 — SEO + Performance + Accessibility

---

## TASK 11 — Final QA

Check:

- responsive
- dark mode
- light mode
- Indonesian
- English
- animation
- accessibility
- SEO
- performance
- build
- lint
- type safety

---

# 18. IMPORTANT AGENT RULES

### Rule 1 — Jangan over-engineer

Jangan membuat abstraction hanya karena "nanti mungkin dibutuhkan".

---

### Rule 2 — Reusable bukan berarti semuanya harus generic

Component reusable jika:

- pattern berulang
- logic berulang
- UI pattern memang memiliki variasi

---

### Rule 3 — Jangan hardcode brand color

Salah:

```tsx
className="bg-[#4C86D8]"
```

Jika dapat menggunakan semantic token:

```tsx
className="bg-primary"
```

Gunakan design token.

---

### Rule 4 — Jangan membuat Client Component tanpa alasan

Default:

```text
Server Component
```

Gunakan:

```text
"use client"
```

hanya ketika dibutuhkan.

---

### Rule 5 — Jangan install package berlebihan

Setiap package harus punya alasan.

---

### Rule 6 — Animation harus purposeful

Animation harus membantu:

```text
hierarchy
feedback
navigation
engagement
```

bukan sekadar dekorasi.

---

### Rule 7 — Mobile first

Jangan membuat desktop lalu "dipaksa" menjadi mobile.

---

### Rule 8 — Jangan membuat konten perusahaan yang mengada-ada

Dummy content boleh digunakan pada tahap development, tetapi harus jelas bahwa itu placeholder.

Jangan mengarang:

- jumlah client
- revenue
- penghargaan
- client terkenal
- testimonial palsu
- case study palsu

Gunakan placeholder yang mudah diganti.

Contoh:

```text
[Client Logo Placeholder]
```

bukan:

```text
Trusted by Google, Microsoft, Tokopedia
```

jika memang tidak benar.

---

### Rule 9 — Jangan mengubah scope Task

Jika sedang mengerjakan Task 01 dan menemukan ide untuk Hero:

**Catat untuk Task 03. Jangan dikerjakan sekarang.**

---

### Rule 10 — Setiap task harus punya verification

Minimal:

```text
lint
typecheck
build
manual verification
```

sesuai kebutuhan task.

---

# 19. DEVELOPMENT PHILOSOPHY

Gunakan pendekatan:

```text
Plan
→ Implement
→ Verify
→ Refactor
→ Commit
→ Report
→ Stop
```

Bukan:

```text
Plan
→ Generate 200 files
→ Hope it works
→ Pray
```

---

# 20. PRIMARY OBJECTIVE

Hasil akhir harus terasa seperti website perusahaan teknologi modern yang:

- kuat secara visual
- jelas secara informasi
- mudah dipahami calon client
- memiliki conversion path yang jelas
- scalable secara codebase
- maintainable
- accessible
- performant
- SEO-friendly
- responsive
- bilingual
- dark/light mode
- memiliki animation yang tasteful
- siap dikembangkan menjadi website production

**Mulai sekarang hanya kerjakan TASK 01.**

Jangan lanjut ke TASK 02 sebelum user memberikan instruksi berikutnya.
