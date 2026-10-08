export const siteConfig = {
  name: "PT Tehnonusa Prima Solusi",
  description:
    "Solusi digital untuk bisnis Anda — pembuatan sistem web, aplikasi, custom software, dan transformasi digital.",
  url: "https://tehnonusa.com",
  email: "contact@tehnonusa.com",
  phone: "+62 813-1902-7707",
  address: "Jl. Bima II Blok CF 5 No. 5 Villa Pamulang, Tangerang Selatan",
  socials: {
    linkedin: "https://linkedin.com/company/tehnonusa-prima-solusi",
    instagram: "https://instagram.com/tehnonusa",
    github: "https://github.com/tehnonusa",
    whatsapp: "https://wa.me/6281319027707",
  },
} as const;

export type SiteConfig = typeof siteConfig;
