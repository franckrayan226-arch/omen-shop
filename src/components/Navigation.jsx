import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SECTIONS } from '../data/products';
import Logo from './Logo';

const Navigation = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isProductPage = /^\/produit\//.test(location.pathname);

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

return (
    <nav className="bg-bg border-b border-border">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center">
          {/* Left: section links (desktop only, hidden on product pages) */}
          {!isProductPage && (
            <div className="hidden lg:flex items-center gap-6">
              <Link
                to="/boutique"
                className={`relative py-1 font-mono text-[11px] font-bold uppercase tracking-[0.14em] transition-colors ${
                  isActive('/boutique') && !location.pathname.includes('/boutique/')
                    ? 'text-ink'
                    : 'text-ink-muted hover:text-ink'
                }`}
              >
                Boutique
                {isActive('/boutique') && !location.pathname.includes('/boutique/') && (
                  <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-ink" />
                )}
              </Link>
              {SECTIONS.map((s) => (
                <Link
                  key={s.id}
                  to={`/boutique/${s.id}`}
                  className={`relative py-1 font-mono text-[11px] font-bold uppercase tracking-[0.14em] transition-colors ${
                    location.pathname === `/boutique/${s.id}`
                      ? 'text-ink'
                      : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  {s.label}
                  {location.pathname === `/boutique/${s.id}` && (
                    <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-ink" />
                  )}
                </Link>
              ))}
            </div>
          )}

          {/* Logo removed from header - now centered in Hero */}

          {/* Right: search (desktop, not on product pages) + action icons */}
          <div className="flex items-center gap-4 ml-auto flex-1 justify-end">
            {/* Search bar (desktop only, hidden on product pages) */}
            {!isProductPage && (
              <div className="hidden sm:flex">
                <div className="relative w-[240px] sm:w-[280px]">
                  <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted"
                    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Rechercher sneakers, marques, tailles…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-10 pl-10 pr-4 rounded border border-border bg-white font-body text-sm text-ink placeholder:text-ink-muted/50 focus:outline-none focus:border-ink-muted transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Action icons — grouped at far right */}
            <div className="flex items-center gap-2">
              <Link
                to="/favoris"
                className="flex h-10 w-10 items-center justify-center rounded text-ink/60 hover:text-ink hover:bg-ink/5 transition-colors"
                aria-label="Favoris"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </Link>
              <Link
                to="/compte"
                className="flex h-10 w-10 items-center justify-center rounded text-ink/60 hover:text-ink hover:bg-ink/5 transition-colors"
                aria-label="Compte"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </Link>
              <Link
                to="/boutique"
                className="flex h-10 w-10 items-center justify-center rounded text-ink/60 hover:text-ink hover:bg-ink/5 transition-colors"
                aria-label="Panier"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </Link>

              {/* Mobile menu toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex h-10 w-10 items-center justify-center rounded text-ink/60 hover:text-ink hover:bg-ink/5 transition-colors lg:hidden"
                aria-label="Menu"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
                  {mobileMenuOpen ? (
                    <path d="M4 4l10 10M14 4L4 14" />
                  ) : (
                    <path d="M2 5h14M2 9h14M2 13h14" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border bg-bg lg:hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {/* Mobile search */}
              <div className="relative mb-2">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted"
                  width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  placeholder="Rechercher…"
                  className="w-full h-10 pl-10 pr-4 rounded border border-border bg-white font-body text-sm text-ink placeholder:text-ink-muted/50 focus:outline-none focus:border-ink-muted"
                />
              </div>
              <Link
                to="/boutique"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded px-3 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink hover:bg-ink/5"
              >
                Boutique
              </Link>
              {SECTIONS.map((s) => (
                <Link
                  key={s.id}
                  to={`/boutique/${s.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded px-3 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink hover:bg-ink/5"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
