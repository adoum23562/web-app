import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-bg text-gray-400 border-t border-dark-border relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent"></div>
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4 group cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl shadow-glow flex items-center justify-center transform transition-transform group-hover:scale-105 group-hover:rotate-3">
                <span className="text-white font-bold text-xl">R</span>
              </div>
              <span className="text-xl font-bold text-white">
                Rwanda Market
              </span>
            </div>
            <p className="text-sm text-gray-400">
              Votre marketplace rwandaise de confiance. Produits de qualité,
              livraison rapide, service client exceptionnel.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Liens Rapides</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm hover:text-primary-400 transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-sm hover:text-primary-400 transition-colors">
                  Produits
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-sm hover:text-primary-400 transition-colors">
                  Catégories
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-sm hover:text-primary-400 transition-colors">
                  Panier
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-semibold mb-6">Service Client</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm hover:text-primary-400 transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm hover:text-primary-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-sm hover:text-primary-400 transition-colors">
                  Livraison
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-sm hover:text-primary-400 transition-colors">
                  Retours
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-6">Contact</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3 group">
                <svg aria-hidden="true" className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5 group-hover:text-primary-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="group-hover:text-gray-300 transition-colors">Kigali, Rwanda</span>
              </li>
              <li className="flex items-start space-x-3 group">
                <svg aria-hidden="true" className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5 group-hover:text-primary-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="group-hover:text-gray-300 transition-colors">contact@rwandamarket.rw</span>
              </li>
              <li className="flex items-start space-x-3 group">
                <svg aria-hidden="true" className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5 group-hover:text-primary-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="group-hover:text-gray-300 transition-colors">+250 788 123 456</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-dark-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} Rwanda Market. Tous droits réservés.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-sm text-gray-500 hover:text-primary-400 transition-colors">
              Confidentialité
            </Link>
            <Link href="/terms" className="text-sm text-gray-500 hover:text-primary-400 transition-colors">
              Conditions
            </Link>
            <Link href="/cookies" className="text-sm text-gray-500 hover:text-primary-400 transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
