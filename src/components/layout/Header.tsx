'use client';

import Link from 'next/link';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { usePathname, useRouter } from 'next/navigation';

// Sections présentes sur la homepage, dans l'ordre de haut en bas
const HOME_SECTIONS = [
  { id: 'hero',             label: 'Accueil' },
  { id: 'trending',         label: 'Tendances' },
  { id: 'categories-section', label: 'Catégories' },
  { id: 'avantages',        label: 'Avantages' },
  { id: 'temoignages',      label: 'Avis clients' },
  { id: 'newsletter',       label: 'Offres' },
];

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const headerH = 80;
  const top = el.getBoundingClientRect().top + window.scrollY - headerH;
  window.scrollTo({ top, behavior: 'smooth' });
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled]             = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection]   = useState('hero');
  const [userMenuOpen, setUserMenuOpen]     = useState(false);
  const [searchOpen, setSearchOpen]         = useState(false);
  const [searchQuery, setSearchQuery]       = useState('');

  const { itemCount, openCart } = useCart();
  const { user, signOut, loading } = useAuth();
  const pathname  = usePathname();
  const router    = useRouter();
  const userMenuRef  = useRef<HTMLDivElement>(null);
  const searchRef    = useRef<HTMLInputElement>(null);
  const isHome = pathname === '/';

  // ── Scroll tracking ──────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);

      // Progress bar
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docH > 0 ? (y / docH) * 100 : 0);

      // Active section (homepage only)
      if (!isHome) return;
      let current = 'hero';
      for (const s of HOME_SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= 100) current = s.id;
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  // Lock body when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  // Close user dropdown on outside click
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  // Close search on Escape
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setSearchOpen(false); setUserMenuOpen(false); }
    };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setUserMenuOpen(false);
    router.push('/');
  };

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    setSearchOpen(false);
    setSearchQuery('');
  }, [searchQuery, router]);

  // Smart nav click: anchor on homepage, navigate elsewhere
  const handleNavClick = (e: React.MouseEvent, sectionId: string) => {
    if (!isHome) return; // let Next router handle it normally
    e.preventDefault();
    setMobileMenuOpen(false);
    scrollToSection(sectionId);
  };

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Mon compte';

  // Desktop nav items — pages + homepage section anchors
  const pageLinks = [
    { href: '/', label: 'Accueil',    sectionId: 'hero' },
    { href: '/products',  label: 'Produits',   sectionId: null },
    { href: '/categories',label: 'Catégories', sectionId: null },
    { href: '/about',     label: 'À propos',   sectionId: null },
  ];

  // Homepage section anchors shown only on homepage
  const homeSectionLinks = [
    { id: 'tendances',          label: 'Tendances',    href: '#trending' },
    { id: 'avantages',          label: 'Avantages',    href: '#avantages' },
    { id: 'temoignages',        label: 'Avis clients', href: '#temoignages' },
  ];

  return (
    <>
      {/* ── Scroll progress bar ── */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 h-0.5 bg-primary-500 z-[60] transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* ── Header wrapper ── */}
      <div className={`fixed top-0 w-full z-50 transition-all duration-500 pointer-events-none ${scrolled ? 'pt-2 pb-1' : 'py-4'}`}>
        <header
          className={`pointer-events-auto transition-all duration-500 mx-auto ${
            scrolled
              ? 'max-w-5xl bg-white/80 dark:bg-dark-card/80 backdrop-blur-xl shadow-glass border border-gray-200/60 dark:border-white/10 rounded-2xl px-5'
              : 'max-w-7xl bg-transparent px-6'
          }`}
        >
          <div className={`flex items-center justify-between gap-4 transition-all duration-300 ${scrolled ? 'h-14' : 'h-16'}`}>

            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-2.5 group shrink-0 z-50">
              <div
                aria-hidden="true"
                className="w-9 h-9 bg-primary-500 rounded-xl shadow-glow flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
              >
                <span className="text-white font-black text-lg">R</span>
              </div>
              <span className="font-extrabold tracking-tight text-gray-900 dark:text-white text-lg hidden sm:block">
                Rwanda Market
              </span>
            </Link>

            {/* ── Desktop nav (centre) ── */}
            <nav aria-label="Navigation principale" className="hidden lg:flex items-center gap-0.5">
              {pageLinks.map(link => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={link.sectionId ? (e) => handleNavClick(e, link.sectionId!) : undefined}
                    className={`relative px-3.5 py-2 text-sm font-semibold rounded-xl transition-all duration-200 group ${
                      isActive
                        ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                        : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-dark-border/50'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-primary-500 rounded-full" />
                    )}
                  </Link>
                );
              })}

              {/* Section anchors — homepage only */}
              {isHome && (
                <>
                  <span aria-hidden="true" className="w-px h-5 bg-gray-200 dark:bg-dark-border mx-1" />
                  {homeSectionLinks.map(s => (
                    <button
                      key={s.id}
                      onClick={() => scrollToSection(s.id)}
                      className={`px-3.5 py-2 text-sm font-semibold rounded-xl transition-all duration-200 ${
                        activeSection === s.id
                          ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                          : 'text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-dark-border/50'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </>
              )}
            </nav>

            {/* ── Desktop actions (droite) ── */}
            <div className="hidden lg:flex items-center gap-1.5">

              {/* Barre de recherche expandable */}
              <div className="relative flex items-center">
                {searchOpen ? (
                  <form onSubmit={handleSearch} className="flex items-center gap-2 animate-slide-down">
                    <input
                      ref={searchRef}
                      type="text"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder="Rechercher un produit…"
                      className="w-52 px-4 py-2 text-sm bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white placeholder-gray-400"
                      aria-label="Rechercher"
                    />
                    <button
                      type="submit"
                      className="p-2 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-xl transition-colors"
                      aria-label="Lancer la recherche"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-dark-border/50 rounded-xl transition-colors"
                      aria-label="Fermer la recherche"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </form>
                ) : (
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-dark-border/50 rounded-xl transition-colors"
                    aria-label="Ouvrir la recherche"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Séparateur */}
              <span aria-hidden="true" className="w-px h-6 bg-gray-200 dark:bg-dark-border mx-1" />

              {/* Auth */}
              {!loading && (
                user ? (
                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      aria-expanded={userMenuOpen}
                      aria-label="Menu utilisateur"
                      className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-dark-border/50 rounded-xl transition-all"
                    >
                      <span className="w-7 h-7 rounded-full bg-primary-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {userName.charAt(0).toUpperCase()}
                      </span>
                      <span className="max-w-[88px] truncate">{userName}</span>
                      <svg className={`w-3.5 h-3.5 shrink-0 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {userMenuOpen && (
                      <div className="absolute right-0 top-full mt-2 w-52 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-2xl shadow-lg overflow-hidden z-50">
                        <div className="px-4 py-3 bg-gray-50 dark:bg-dark-bg border-b border-gray-100 dark:border-dark-border">
                          <p className="text-xs text-gray-500 dark:text-gray-400">Connecté en tant que</p>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{user.email}</p>
                        </div>
                        <Link
                          href="/cart"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-border/50 transition-colors"
                        >
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                          Mon panier
                        </Link>
                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Se déconnecter
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link
                      href="/login"
                      className="px-3.5 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-dark-border/50 rounded-xl transition-all"
                    >
                      Connexion
                    </Link>
                    <Link
                      href="/register"
                      className="px-3.5 py-2 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-xl transition-all shadow-sm hover:shadow-glow"
                    >
                      S&apos;inscrire
                    </Link>
                  </div>
                )
              )}

              {/* Séparateur */}
              <span aria-hidden="true" className="w-px h-6 bg-gray-200 dark:bg-dark-border mx-1" />

              {/* Panier */}
              <button
                onClick={openCart}
                aria-label={`Panier${itemCount > 0 ? ` — ${itemCount} article${itemCount > 1 ? 's' : ''}` : ''}`}
                className="relative flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-gray-900 hover:bg-primary-600 dark:bg-white dark:text-gray-900 dark:hover:bg-primary-400 rounded-xl transition-all shadow-sm hover:shadow-glow"
              >
                <svg className="w-4.5 h-4.5" style={{width:'1.125rem',height:'1.125rem'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span>Panier</span>
                {itemCount > 0 && (
                  <span aria-hidden="true" className="absolute -top-1.5 -right-1.5 min-w-[1.1rem] h-[1.1rem] px-1 bg-primary-500 border-2 border-white dark:border-dark-bg text-white text-[10px] rounded-full flex items-center justify-center font-bold leading-none">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </button>
            </div>

            {/* ── Mobile actions ── */}
            <div className="flex lg:hidden items-center gap-2">
              {/* Recherche mobile */}
              <button
                onClick={() => { setSearchOpen(!searchOpen); setMobileMenuOpen(false); }}
                className="p-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 rounded-xl transition-colors"
                aria-label="Rechercher"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Panier mobile */}
              <button
                onClick={openCart}
                aria-label="Panier"
                className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 rounded-xl transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {itemCount > 0 && (
                  <span aria-hidden="true" className="absolute top-0.5 right-0.5 w-4 h-4 bg-primary-500 border-2 border-white dark:border-dark-bg text-white text-[9px] rounded-full flex items-center justify-center font-bold">
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </button>

              {/* Burger */}
              <button
                onClick={() => { setMobileMenuOpen(!mobileMenuOpen); setSearchOpen(false); }}
                className="p-2 rounded-xl bg-gray-100 dark:bg-dark-border text-gray-900 dark:text-white"
                aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                aria-expanded={mobileMenuOpen}
              >
                <div className="w-5 h-4 flex flex-col justify-between">
                  <span className={`block w-5 h-0.5 bg-current rounded transform transition-all duration-300 origin-center ${mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                  <span className={`block w-5 h-0.5 bg-current rounded transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 scale-x-0' : ''}`} />
                  <span className={`block w-5 h-0.5 bg-current rounded transform transition-all duration-300 origin-center ${mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
                </div>
              </button>
            </div>
          </div>

          {/* ── Search bar mobile (sous le header) ── */}
          {searchOpen && (
            <div className="lg:hidden pb-3 pt-1 animate-slide-down">
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Rechercher un produit…"
                  className="flex-1 px-4 py-2.5 text-sm bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
                  aria-label="Rechercher"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-xl hover:bg-primary-700 transition-colors"
                >
                  OK
                </button>
              </form>
            </div>
          )}
        </header>
      </div>

      {/* ── Mobile full-screen menu ── */}
      <div
        aria-hidden={!mobileMenuOpen}
        className={`fixed inset-0 bg-white dark:bg-dark-bg z-40 flex flex-col transition-all duration-400 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Top padding to clear header */}
        <div className="pt-24 px-6 flex-1 overflow-y-auto">
          {/* Main pages */}
          <nav className="flex flex-col gap-1 mb-6">
            {pageLinks.map((link, i) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={e => { handleNavClick(e, link.sectionId ?? 'hero'); setMobileMenuOpen(false); }}
                  className={`flex items-center justify-between px-4 py-3.5 rounded-2xl text-lg font-bold transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                      : 'text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-dark-card/50'
                  }`}
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  {link.label}
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              );
            })}
          </nav>

          {/* Section anchors — homepage only */}
          {isHome && (
            <>
              <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Cette page</p>
              <div className="flex flex-col gap-1 mb-6">
                {homeSectionLinks.map(s => (
                  <button
                    key={s.id}
                    onClick={() => { scrollToSection(s.id); setMobileMenuOpen(false); }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-base font-semibold transition-all text-left ${
                      activeSection === s.id
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-card/50'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                    {s.label}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Scroll top button in mobile menu */}
          <button
            onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setMobileMenuOpen(false); }}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl text-base font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-card/50 transition-all w-full text-left mb-6"
          >
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            Retour en haut
          </button>
        </div>

        {/* Bottom auth */}
        <div className="px-6 pb-10 pt-4 border-t border-gray-100 dark:border-dark-border">
          {!loading && (
            user ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-dark-card rounded-2xl">
                  <span className="w-9 h-9 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold shrink-0">
                    {userName.charAt(0).toUpperCase()}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{userName}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => { handleSignOut(); setMobileMenuOpen(false); }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-semibold rounded-2xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Se déconnecter
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 flex items-center justify-center px-4 py-3.5 text-base font-bold text-gray-900 dark:text-white border-2 border-gray-200 dark:border-dark-border rounded-2xl hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-all"
                >
                  Connexion
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 flex items-center justify-center px-4 py-3.5 text-base font-bold text-white bg-primary-600 hover:bg-primary-700 rounded-2xl transition-all shadow-sm"
                >
                  S&apos;inscrire
                </Link>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}
