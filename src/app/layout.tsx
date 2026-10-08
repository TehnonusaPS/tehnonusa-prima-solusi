// This root layout is intentionally minimal.
// All content is handled by src/app/[locale]/layout.tsx via next-intl middleware routing.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
