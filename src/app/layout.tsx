import type { Metadata } from "next";
import "./globals.css";
import { Manrope } from 'next/font/google';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import CartDrawer from "@/components/cart/CartDrawer";
import AuthGate from "@/components/auth/AuthGate";
import ScrollToTop from "@/components/ui/ScrollToTop";

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-manrope',
});

export const metadata: Metadata = {
  title: "Rwanda Market - E-Commerce au Rwanda",
  description: "Votre marketplace rwandaise de confiance. Produits de qualité, livraison rapide.",
  keywords: ["e-commerce", "Rwanda", "boutique en ligne", "marketplace"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning className={manrope.variable}>
      <body className="flex flex-col min-h-screen bg-background text-foreground relative selection:bg-primary-500/30">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-gray-900 focus:text-white focus:rounded-lg focus:shadow-lg"
        >
          Aller au contenu principal
        </a>
        <AuthProvider>
          <CartProvider>
            <Header />
            <main id="main-content" className="flex-grow">{children}</main>
            <Footer />
            <CartDrawer />
            <AuthGate />
            <ScrollToTop />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
