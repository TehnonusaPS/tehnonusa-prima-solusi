export const siteConfig = {
  name: "PT Tehnonusa Prima Solusi",
  description:
    "Solusi digital untuk bisnis Anda — pembuatan sistem web, aplikasi, custom software, dan transformasi digital.",
  url: "https://tehnonusa.com", // Placeholder — update when domain is ready
  email: "hello@tehnonusa.com", // Placeholder
  phone: "+62 xxx xxxx xxxx", // Placeholder
  address: "Indonesia", // Placeholder
  socials: {
    linkedin: "", // Placeholder
    instagram: "", // Placeholder
    github: "", // Placeholder
  },
} as const;

export type SiteConfig = typeof siteConfig;
