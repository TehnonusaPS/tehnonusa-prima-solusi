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

### 1.1 Data & Kontak Resmi Perusahaan

Gunakan data resmi berikut di seluruh komponen (Navbar, Contact, Footer, Meta, Schema Org):

- **Nama Resmi:** PT. Tehnonusa Prima Solusi
- **Alamat Kantor:** `Jl. Bima II Blok CF 5 No. 5 Villa Pamulang, Tangerang Selatan`
- **Telepon / WhatsApp:** `+62 813-1902-7707`
- **Email:** `contact@tehnonusa.com` (placeholder resmi)
- **Social Media (Dummy / Placeholder UI):**
  - LinkedIn: `https://linkedin.com/company/tehnonusa-prima-solusi`
  - GitHub: `https://github.com/tehnonusa`
  - Instagram: `https://instagram.com/tehnonusa`
  - WhatsApp Direct: `https://wa.me/6281319027707`

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

# 2. Brand Direction & Official Logo

Logo resmi telah ditambahkan oleh user dan diolah menjadi aset transparan berkualitas tinggi:

- **Aset Logo Tersedia (`public/images/logo/`):**
  - `logo.png` — Logo vertikal lengkap (Emblem + "TEHNONUSA PRIMA SOLUSI") dengan background transparan.
  - `logo-horizontal.png` — Logo orientasi horizontal (Emblem kiri + teks kanan) khusus Navbar / Header (Light mode).
  - `logo-horizontal-white.png` — Logo orientasi horizontal untuk Dark mode (Emblem biru + teks putih kontras tinggi).
  - `logo-icon.png` — Standalone emblem huruf "T" kotak membulat (untuk Favicon, mobile shortcut, avatar).
  - `logo-white.png` — Logo vertikal lengkap dengan teks putih untuk latar gelap.

## Brand Color System

Warna identitas resmi yang diekstrak langsung dari pixel logo:

```css
--color-primary: #0085EB; /* Biru vibran khas PT Tehnonusa Prima Solusi */
```

Gunakan semantic color token, bukan hardcoded color di setiap component.

Konsep implementasi di `src/app/globals.css`:

```css
--primary: #0085EB;
--primary-foreground: #FFFFFF;
--primary-dark: #006EC4;
--primary-light: #4DABF7;

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

## 2.2 Typography System & Font Pairing Strategy

Untuk menciptakan diferensiasi visual yang tegas antara **judul besar**, **deskripsi panjang**, dan **data teknis**, sistem tipografi tidak menggunakan satu font tunggal. Digunakan kombinasi 3 jenis font dengan peran spesifik:

```text
┌────────────────────────────────────────────────────────────────────────┐
│  1. PLUS JAKARTA SANS (--font-heading)                                  │
│     → Display, Judul H1, H2, H3, Hero Headline, Stat Numbers           │
│     → Karakter: Geometris, modern, kokoh, berwibawa enterprise tech     │
├────────────────────────────────────────────────────────────────────────┤
│  2. INTER (--font-sans)                                                │
│     → Deskripsi, Paragraf Body, Card Content, Form & Nav Controls      │
│     → Karakter: Bersih, netral, legibilitas tinggi & nyaman di mata     │
├────────────────────────────────────────────────────────────────────────┤
│  3. GEIST MONO (--font-mono)                                           │
│     → Eyebrow Badges, Kicker Tags, SLA, API specs, Terminal snippets   │
│     → Karakter: Monospaced, tabular figures, engineering precision     │
└────────────────────────────────────────────────────────────────────────┘
```

### Tabel Matriks Hierarki Tipografi

| Level / Elemen | Font Family | Bobot & Ukuran Standar | Peran & Penggunaan |
| :--- | :--- | :--- | :--- |
| **Hero Title (H1)** | `font-heading` (`Plus Jakarta Sans`) | `font-black text-4xl sm:text-6xl md:text-7xl leading-[1.08] tracking-tight` | Pernyataan nilai utama pada Hero; memberikan *punch* pertama visitor. |
| **Section Title (H2)** | `font-heading` (`Plus Jakarta Sans`) | `font-extrabold text-2xl sm:text-4xl md:text-5xl leading-tight tracking-tight` | Judul setiap bagian (Layanan, Arsitektur, Kredibilitas, FAQ). |
| **Card / Feature (H3)** | `font-heading` (`Plus Jakarta Sans`) | `font-bold text-lg sm:text-xl tracking-tight text-foreground` | Nama modul sistem, judul pilar layanan, nama paket solusi. |
| **Stat / Metric Numbers** | `font-heading` (`Plus Jakarta Sans`) | `font-black text-3xl sm:text-5xl text-primary tracking-tight` | Angka metrik kredibilitas (misal: `99.9%`, `24/7`, `<100ms`). |
| **Hero Subtitle** | `font-sans` (`Inter`) | `text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl` | Kalimat persuasif penjelas di bawah Hero Headline. |
| **Body / Paragraf** | `font-sans` (`Inter`) | `text-sm sm:text-base text-muted-foreground leading-relaxed` | Penjelasan alur kerja, studi kasus, detail fitur, dan teks FAQ. |
| **UI Buttons & Controls** | `font-sans` (`Inter`) | `text-sm sm:text-base font-semibold tracking-normal` | Label tombol aksi primer/sekunder dan navigasi navbar. |
| **Eyebrow Badges / Tags** | `font-mono` (`Geist Mono`) | `text-xs uppercase tracking-wider font-semibold` | Label kategori di atas judul (misal: `// CLOUD ARCHITECTURE`). |
| **SLA / Code / Terminal** | `font-mono` (`Geist Mono`) | `text-xs sm:text-sm text-foreground/90 font-medium` | Parameter teknis arsitektur, JSON schema, atau kutipan konfigurasi. |

### Penerapan Teknis di Kode:
1. **Next.js Font Optimization:** Dimuat via `next/font/google` di `src/app/[locale]/layout.tsx` dengan `display: "swap"` tanpa pergeseran tata letak (*zero CLS*).
2. **Global CSS Mapping:** Di `src/app/globals.css`, semua tag heading `<h1>` sampai `<h6>` otomatis mengadopsi `var(--font-heading)`, sedangkan `<body>` mengadopsi `var(--font-sans)`.
3. **Utility Classes:** Siap digunakan secara eksplisit dengan class `font-heading`, `font-sans`, dan `font-mono`.

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

# 9. Visual Assets & AI Generated Images Strategy

### 9.1 Kebijakan Aset Visual: Dummy / Placeholder vs Dynamic AI Generation

Dalam pengembangan landing page ini, visual memegang peranan krusial untuk menciptakan impresi *high-tech enterprise*. Kebijakan penggunaan gambar:

1. **Fleksibilitas Penuh Men-generate Gambar Baru (Tidak Terbatas pada Gambar yang Ada):**
   - **PENTING:** Agent **TIDAK HANYA** terbatas pada 4 gambar yang sudah ada di `public/images/`.
   - Kapan pun ada kebutuhan visual pada section mana pun (misalnya untuk kartu layanan, studi kasus portfolio, showcase arsitektur, visual pendukung testimonial, dll.), Agent **DIPERBOLEHKAN & DIANJURKAN** untuk membuat atau men-generate gambar baru secara dinamis menggunakan AI Image Generation.
   - Pilihan gambar boleh acak/random, asalkan estetik, berkelas, dan selaras dengan tema sistem teknologi modern.

2. **Placeholder / Dummy Frame Terlebih Dahulu (Jika Diperlukan):**
   - Jika suatu section sedang dibangun dan belum memerlukan visual final, boleh menggunakan **placeholder dummy / frame kosongan yang rapi** (misal: subtle tinted glass container atau wireframe box ber-icon).

3. **Kriteria Mutlak untuk Gambar AI (Baru maupun Eksisting):**
   - **Gaya Visual:** Modern, berkelas, ultra-sleek, clean, atmosfer teknologi enterprise (nuansa dark sapphire, electric cyan, deep navy, prisma cahaya halus).
   - **Relevansi Industri:** Merepresentasikan rekayasa perangkat lunak, sistem komputasi terdistribusi, data core, arsitektur cloud, dan transformasi digital.
   - **MUTLAK TANPA MANUSIA:** Tidak boleh menampilkan figur, wajah, atau siluet manusia. Fokus 100% pada elemen teknologi abstrak, node interkoneksi, sirkuit isometrik, fiber optik, dan kubus data 3D.
   - **Random & Bebas Asal Harmonis:** Tema spesifik visual boleh acak/random selama tetap menyatu (*cohesive*) dengan identitas visual PT Tehnonusa Prima Solusi dan enak dipandang (*aesthetically pleasing*).

### 9.2 Inventori Aset Awal yang Sudah Tersedia

Sebagai permulaan (*starter pack*), 4 aset awal telah di-generate di `public/images/`:

```text
public/
└── images/
    ├── hero-tech.jpg       # Holographic computing core & glowing optic ring (Hero Section)
    ├── systems-mesh.jpg     # Isometric enterprise architecture & network lattice (Trust / Tech Stack)
    ├── data-core.jpg        # High-tech glowing server infrastructure & laser data paths (Process / Workflow)
    └── tech-grid.jpg        # Cyber matrix landscape & abstract isometric grid (Portfolio / Case Studies)
```

> **Catatan Operasional:** Gambar di atas adalah aset awal. Saat mengerjakan Task berikutnya (Task 04, 05, 07, dsb.), Agent bebas men-generate gambar tambahan baru (misal: `case-erp.jpg`, `mobile-mesh.jpg`, `cloud-node.jpg`, dll.) sesuai kebutuhan tampilan tanpa ragu.

Aturan teknis implementasi gambar di komponen:
- Gunakan Next.js `<Image />` dengan properti `priority` untuk LCP (seperti hero image) dan `loading="lazy"` untuk section berikutnya.
- Berikan rasio aspek yang konsisten dan fallback placeholder blur / background skeleton.
- Seluruh komponen visual siap menerima aset resmi saat branding final perusahaan diluncurkan.

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

# 17. COMPONENT HARMONY MAP & TASK ROADMAP

> **Prinsip Utama Harmonisasi & Seleksi Komponen UI/UX:**
> 1. **Gunakan yang Terpakai, Jangan Paksakan yang Tidak Perlu:**  
>    Semua komponen di `src/components/ui/` adalah *modular building blocks*. Gunakan komponen **hanya jika** memiliki fungsi nyata, memperjelas informasi, atau meningkatkan interaksi visitor. Jika suatu komponen dirasa berlebihan (*overkill*), mengalihkan perhatian dari pesan bisnis, atau membuat layout sesak, **tidak perlu digunakan**.
> 2. **Kebebasan Modifikasi Komponen demi Konsistensi & Harmoni:**  
>    Komponen yang sudah ada **boleh dan dianjurkan untuk dirubah** (styling, warna semantic token, ukuran, prop, animasi, layout) agar menyatu secara harmonis dengan komponen lainnya. Tujuannya adalah kesatuan estetika (*visual coherence*) dan konsistensi UI/UX kelas dunia untuk perusahaan teknologi modern.
> 3. **Strategi Aset Visual (Dummy / Placeholder vs AI High-Tech):**  
>    Gunakan placeholder frame / dummy kosongan terlebih dahulu jika aset belum siap. Jika memerlukan ilustrasi visual, gunakan AI Image Generation bergaya modern enterprise tech abstrak (tanpa figur manusia, estetik, dan enak dipandang).

---

### Peta Penempatan Komponen (UI/UX Harmony Matrix)

| Section / Bagian | Komponen Utama | Komponen Pendukung (Gunakan Jika Cocok) | Catatan Modifikasi & Harmonisasi UI/UX | Aset Visual |
| :--- | :--- | :--- | :--- | :--- |
| **0. Global Shell & Nav** | `Navbar`, `ShiftingDropDown` | `SlideTabs`, `SliderToggle`, `LanguageSwitcher`, `AnimatedHamburgerButton` | Sesuaikan transisi dropdown & ukuran pill agar ringkas dan tidak menutupi konten penting. | Logo brand Tehnonusa |
| **1. Hero Section** | `CircleHighlight`, `SpotlightButton` / `EncryptButton` | `AuroraHero` (ambient glow lembut) / `FuzzyOverlay` (tekstur film grain) | Modifikasi intensitas glow agar teks headline tetap memiliki kontras tinggi dan mudah dibaca. | `public/images/hero-tech.jpg` |
| **2. Services (Layanan)** | `SectionHeading`, `Card` (interactive) | `AIGradientBorder` (hanya pada kartu featured), `StaggerContainer` | Jaga keseragaman grid kartu; efek border gradient hanya untuk aksen pembeda. | Dummy icon / tech badges |
| **3. Trust & Tech Stack** | `DivOrigami` (`LogoRolodex`) | `ParticleRing` (3D interactive drag/zoom jika relevan) | Sederhanakan rotasi agar tidak pusing; padukan dengan metrik uptime & SLA enterprise. | `public/images/systems-mesh.jpg` |
| **4. Process & Workflow** | `SlideTabs` (navigasi fase kerja) | `FadeIn`, `SlideUp` motion primitives | Sesuaikan warna active tab pill dengan `--primary` agar konsisten. | `public/images/data-core.jpg` |
| **5. Portfolio / Projects** | `TextParallaxContent` | `MouseImageTrail` (interaktif cursor showcase jika cocok) | Jaga agar efek parallax tetap smooth di mobile atau fallback ke grid kartu jika diperlukan. | `public/images/tech-grid.jpg` |
| **6. FAQ & Support** | `BlockInTextCard` (`Typewrite`) | Accordion / FAQ clean list | Teks animasi disesuaikan dengan pertanyaan seputar project software & SLA. | Dummy frame / Glass card |
| **7. Conversion CTA** | `AIGradientAnimationCard` | `SpringModal` (pop-up form konsultasi cepat), `EncryptButton` | Kontras tinggi; pemicu langsung aksi konsultasi & inquiry klien. | Glassmorphism backdrop |
| **8. Footer** | `RevealLinks` (`FlipLink`), Info Kontak Resmi | Alamat kantor resmi, Telepon/WA, Media sosial dummy | Wajib memuat alamat lengkap Villa Pamulang & No HP resmi dengan layout elegan. | Clean typography & icons |

---

## TASK 02 — Design System & UI Foundation [COMPLETED ✅]

- [x] Design token foundation (`globals.css` semantic variables)
- [x] `Container` polymorphic responsive gutters
- [x] `Button` variants (`cva` based)
- [x] `Badge` variants & status indicators
- [x] `Card` family (`CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`)
- [x] `SectionHeading` standardizer
- [x] `ThemeToggle` & `SliderToggle` (NextThemes integration & layout spring pill)
- [x] `LanguageSwitcher` (`next-intl` reactive switcher)
- [x] `MotionPrimitives` (`FadeIn`, `SlideUp`, `ScaleIn`, `StaggerContainer`)
- [x] `SmoothScrollProvider` & `lenis` configuration
- [x] Creative Micro-interaction library (`EncryptButton`, `SpotlightButton`, `DrawOutlineButton`, `DottedButton`, `NeumorphismButton`, `NeuButton`)
- [x] Navigation components (`AnimatedHamburgerButton`, `SlideTabs`, `ShiftingDropDown`)
- [x] Advanced Visuals (`AuroraHero`, `ParticleRing`, `TextParallaxContent`, `FuzzyOverlay`, `CircleHighlight`, `DivOrigami`, `BlockInTextCard`, `SpringModal`, `MouseImageTrail`, `CutoutTextLoader`)
- [x] AI Generated local high-tech imagery di `public/images/`

---

## TASK 03 — Navbar + Hero Section [NEXT UP 🚀]

**Tujuan:** Membangun *first impression* yang memukau (*WOW effect*) namun tetap profesional, berwibawa, dan bernilai bisnis tinggi.

**Fokus Implementasi:**
1. **Header / Navbar Modern:**
   - Sticky navbar dengan latar glassmorphism saat di-scroll (`backdrop-blur-md`).
   - Desktop Menu: Integrasi `ShiftingDropDown` untuk dropdown informatif (*Layanan*, *Solusi*, *Tentang Kami*) atau `SlideTabs` untuk navigasi cepat.
   - Quick Controls: `SliderToggle` (Light/Dark mode) dan `LanguageSwitcher` (ID/EN).
   - Mobile: `AnimatedHamburgerButton` morphing ke drawer menu yang rapi.
   - Tombol CTA utama: "Diskusi Proyek".

2. **Hero Section:**
   - Headline persuasif dengan `CircleHighlight` untuk melingkari kata kunci:  
     `"Membangun Solusi Digital Andal untuk Skalabilitas Bisnis"`.
   - Subtitle deskriptif yang menjawab kebutuhan klien enterprise & startup.
   - Call-to-action ganda: Tombol primer beranimasi micro-interaction (`EncryptButton` / `SpotlightButton`) dan tombol sekunder outline.
   - Elemen visual: Perpaduan ambient glow `AuroraHero` / 3D Stars halus di background, diperkaya tekstur `FuzzyOverlay`, dan thumbnail visual showcase `public/images/hero-tech.jpg`.

---

## TASK 04 — Services Section (Layanan Digital)

**Fokus:** Menjelaskan kapabilitas teknologi tanpa bahasa yang membingungkan.
- `SectionHeading` dengan eyebrow badge.
- Kategori layanan utama:
  1. **Enterprise Web Systems** (Portal internal, ERP, arsitektur modular).
  2. **High-Performance Mobile Apps** (Aplikasi bisnis native/cross-platform).
  3. **Custom Software & Cloud Architecture** (Sistem kustom spesifik industri).
  4. **Digital Transformation & API Integration** (Payment gateway, third-party connectors, otomatisasi).
- Komponen: `Card` interaktif dengan aksen `AIGradientBorder` pada layanan unggulan (ubah styling border & glow agar selaras dengan palet tema).

---

## TASK 05 — Trust & Technology Expertise (Kredibilitas & Tech Stack)

**Fokus:** Memberikan keyakinan bahwa PT Tehnonusa Prima Solusi adalah mitra teknologi yang kompeten.
- Metrik bisnis realistis (SLA 99.9%, clean code architecture, keamanan data enterprise).
- Komponen Interaktif:
  - `DivOrigami` (`LogoRolodex`) untuk menampilkan pilar teknologi (Next.js, TypeScript, Cloud Infrastructure, Scalable DB, Security, Microservices).
  - Integrasi modular `ParticleRing` (3D mesh teknologi yang dapat di-drag & zoom oleh visitor) atau visual `public/images/systems-mesh.jpg`. Gunakan yang paling harmonis; jangan membebani performa browser jika aset gambar lebih efisien.

---

## TASK 06 — Process / Workflow (Alur Kerja)

**Fokus:** Menunjukkan transparansi metodologi rekayasa software.
- Tahapan jelas: *Discovery & Consultation → Solution Architecture → UI/UX Prototyping → Agile Development → Rigorous QA & Testing → Deployment & SLA Support*.
- Integrasi `SlideTabs` untuk berpindah antar fase alur kerja secara interaktif (sesuaikan warna pill seleksi).
- Visual backdrop: `public/images/data-core.jpg` atau placeholder wireframe yang rapi.

---

## TASK 07 — Portfolio / Case Studies (Studi Kasus)

**Fokus:** Membuktikan kemampuan tim melalui showcase proyek representatif.
- Menggunakan `TextParallaxContent` untuk storytelling studi kasus utama (gambar sticky scaling + floating typography).
- Atau `MouseImageTrail` untuk interaksi visual showcase yang dinamis dan berkelas.
- Visual asset: `public/images/tech-grid.jpg` dan mockups sistem (dummy screens/wireframes).

---

## TASK 08 — Testimonials & FAQ Consultation

**Fokus:** Menghapus keraguan calon klien dan menjawab pertanyaan umum.
- Kartu testimoni kredibel klien bisnis.
- Interactive Consultation Support: Menggunakan `BlockInTextCard` dengan `Typewrite` animasi mengetik contoh pertanyaan nyata seputar estimasi proyek, integrasi, dan SLA.

---

## TASK 09 — Conversion CTA & Footer

**Fokus:** Menutup landing page dengan konversi tinggi, kredibilitas legal, dan informasi kontak resmi yang jelas.
- **Conversion CTA:** Banner penutup dengan `AIGradientAnimationCard`, tombol aksi pemicu `SpringModal` (pop-up konsultasi cepat).
- **Footer Komprehensif & Berwibawa:**
  - **Identitas:** PT. Tehnonusa Prima Solusi & deskripsi singkat solusi digital.
  - **Informasi Kontak Resmi:**
    - Alamat: `Jl. Bima II Blok CF 5 No. 5 Villa Pamulang, Tangerang Selatan`
    - Telepon / WhatsApp: `+62 813-1902-7707`
    - Email: `contact@tehnonusa.com`
  - **Social Media (Dummy/Placeholder Elegan):** LinkedIn, GitHub, Instagram, WhatsApp Direct.
  - **Navigasi Cepat:** Kinetic typography `RevealLinks` (`FlipLink`) jika cocok secara estetika, atau tautan footer modern yang rapi.
  - **Legalitas & Hak Cipta:** Hak Cipta & Kebijakan Privasi standar enterprise.

---

## TASK 10 — SEO + Performance + Accessibility

**Fokus:** Mengoptimalkan Core Web Vitals dan keterbacaan mesin pencari.
- Metadata lengkap, Open Graph, twitter cards, canonical URL.
- Semantics HTML (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
- Audit keyboard navigation, visible focus state, dan `prefers-reduced-motion`.

---

## TASK 11 — Final QA & Polishing

**Fokus:** Pengujian menyeluruh sebelum rilis.
- Cross-device QA (Mobile, Tablet, Desktop, Large Screens).
- Dark Mode & Light Mode consistency check.
- Indonesian & English routing check (`/` dan `/en`).
- Production build validation (`pnpm build` & `pnpm lint`).

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

### Rule 11 — Selektivitas Komponen & Harmoni Desain

Library komponen di `src/components/ui/` adalah penyedia opsi interaksi:
- Gunakan komponen **jika memang terpakai** dan menambah kenyamanan pengguna atau kejelasan informasi.
- Jika suatu komponen tidak terpakai atau berpotensi merusak keselarasan layout, **tak perlu dipaksakan**.
- Jika perlu **merubah komponen yang ada**, lakukan penyesuaian (warna token, ukuran font, padding, timing animasi) agar seluruh section **selaras, harmonis, dan konsisten secara UI/UX**.

---

### Rule 12 — Kebijakan Aset Visual & AI Image Generation

- **Tidak Terbatas Hanya pada Gambar yang Ada:** Agent **TIDAK HANYA** terpaku pada 4 gambar yang sudah ada. Kapan pun ada kebutuhan gambar visual tambahan pada section mana pun (misal: Services, Portfolio/Case Studies, Testimonials, dll.), Agent **BEBAS & DIANJURKAN** untuk membuat/men-generate foto AI baru secara on-demand.
- **Dummy / Kosongan Dulu:** Boleh menyisipkan frame dummy atau container placeholder terlebih dahulu saat menyusun layout awal sebelum aset visual final dipasang.
- **Karakteristik Gambar AI (Acak/Bebas tapi Selaras):**
  - Konsep gambar boleh acak/random asalkan **modern, keren, dan sesuai dengan identitas project software & teknologi enterprise**.
  - **MUTLAK TANPA FIGUR MANUSIA** (fokus pada visual 3D abstrak, arsitektur data, sirkuit isometrik, laser core, cyber grid).
  - Tampilan visual harus berestetika tinggi dan enak dilihat.

---

### Rule 13 — Konsistensi Data Kontak Resmi

Wajib menggunakan data kontak resmi yang telah diverifikasi:
- **Alamat:** `Jl. Bima II Blok CF 5 No. 5 Villa Pamulang, Tangerang Selatan`
- **Telepon / WhatsApp:** `+62 813-1902-7707`
- **Email & Media Sosial:** Gunakan data terpusat di `src/config/site.ts` dan dictionary `messages/`.

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

---

**Status Saat Ini:**
- **TASK 01 (Project Init):** COMPLETED ✅
- **TASK 02 (Design System & UI Foundation):** COMPLETED ✅
- **NEXT UP:** **TASK 03 — Navbar + Hero Section 🚀** (Menunggu konfirmasi user untuk memulai).

