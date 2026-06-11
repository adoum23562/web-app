import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rwanda E-Commerce",
  description: "Boutique en ligne au Rwanda",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
