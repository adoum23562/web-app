'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { itemCount, openCart } = useCart();
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/products', label: 'Produits' },
    { href: '/categories', label: 'Catégories' },
  ];

  return (
    <>
      <div className={`fixed top-0 w-full z-50 transition-all duration-500 pointer-events-none ${scrolled ? 'py-2' : 'py-6'}`}>
        <header 
          className={`pointer-events-auto transition-all duration-500 mx-auto ${
            scrolled 
              ? 'max-w-5xl bg-white/70 dark:bg-dark-card/70 backdrop-blur-xl shadow-glass border border-gray-200/50 dark:border-white/10 rounded-full px-4' 
              : 'max-w-7xl bg-transparent px-6'
          }`}
        >
          <div className={`flex items-center justify-between transition-all duration-500 ${scrolled ? 'h-14' : 'h-16'}`}>
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group relative z-50">
              <div
                aria-hidden="true"
                className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl shadow-glow flex items-center justify-center transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
              >
                <span className="text-white font-black text-xl">R</span>
              </div>
              <span className={`font-extrabold tracking-tight transition-all duration-300 ${scrolled ? 'text-lg text-gray-900 dark:text-white' : 'text-xl text-gray-900 dark:text-white'}`}>
                Rwanda Market
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav aria-label="Navigation principale" className="hidden md:flex items-center space-x-1 absolute left-1/2 transform -translate-x-1/2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors group"
                  >
                    <span className="relative z-10 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {link.label}
                    </span>
                    <span className={`absolute inset-0 bg-gray-100 dark:bg-dark-border/50 rounded-full scale-50 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 ${isActive ? 'scale-100 opacity-100 bg-primary-50 dark:bg-primary-900/20' : ''}`} />
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-2">
              <Link href="/products" aria-label="Rechercher" className="p-2 text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-dark-border/50">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </Link>
              <Link href="/cart" aria-label="Mon compte" className="p-2 text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-dark-border/50">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
              
              <div className="h-6 w-px bg-gray-200 dark:bg-white/10 mx-2" />

              <button
                onClick={openCart}
                aria-label="Panier"
                className="flex items-center space-x-2 bg-gray-900 hover:bg-primary-600 dark:bg-white dark:hover:bg-primary-400 dark:text-gray-900 text-white transition-colors rounded-full px-4 py-2 font-semibold shadow-sm hover:shadow-glow group"
              >
                <div className="relative">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-2 bg-primary-500 border-2 border-gray-900 dark:border-white text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                      {itemCount}
                    </span>
                  )}
                </div>
                <span>Panier</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center space-x-4 z-50">
              <button
                onClick={openCart}
                aria-label="Panier"
                className="relative p-2 text-gray-900 dark:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {itemCount > 0 && (
                  <span className="absolute top-1 right-1 bg-primary-500 border-2 border-white dark:border-dark-bg text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                    {itemCount}
                  </span>
                )}
              </button>
              
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-full bg-gray-100 dark:bg-dark-border text-gray-900 dark:text-white"
                aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                aria-expanded={mobileMenuOpen}
              >
                <div className="w-5 h-5 flex flex-col justify-center space-y-1.5">
                  <span className={`block w-5 h-0.5 bg-current transform transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                  <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                  <span className={`block w-5 h-0.5 bg-current transform transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </div>
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* Full-screen Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-white/95 dark:bg-dark-bg/95 backdrop-blur-xl z-40 transition-all duration-500 flex flex-col pt-28 px-6 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        <nav className="flex flex-col space-y-6">
          {navLinks.map((link, idx) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-3xl font-black text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto pb-12 flex items-center space-x-6 border-t border-gray-200 dark:border-dark-border pt-6">
          <Link
            href="/products"
            aria-label="Rechercher"
            className="flex items-center space-x-3 text-lg font-bold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Rechercher</span>
          </Link>
          <div className="h-6 w-px bg-gray-200 dark:bg-dark-border" />
          <Link
            href="/cart"
            aria-label="Mon compte"
            className="flex items-center space-x-3 text-lg font-bold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>Compte</span>
          </Link>
        </div>
      </div>
    </>
  );
}
