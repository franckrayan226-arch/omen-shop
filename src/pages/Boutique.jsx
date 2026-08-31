import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ProductGrid from '../components/ProductGrid';
import Logo from '../components/Logo';
import products, { SECTIONS, normalizeString } from '../data/products';

const SORT_OPTIONS = [
  { id: 'default', label: 'Par défaut' },
  { id: 'price-asc', label: 'Prix croissant' },
  { id: 'price-desc', label: 'Prix décroissant' },
  { id: 'name-asc', label: 'Nom A-Z' },
  { id: 'newest', label: 'Nouveautés' },
];

const Boutique = () => {
  const { section } = useParams();
  const [filters, setFilters] = useState({
    section: section || null,
    brands: [],
    genders: [],
    sizes: [],
    priceRange: null,
  });
  const [sort, setSort] = useState('default');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    let result = [...products];

    const activeSection = filters.section || section;
    if (activeSection) {
      result = result.filter((p) => p.section === activeSection);
    }

    // Filtre recherche
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((p) =>
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.category?.toLowerCase().includes(query)
      );
    }

    // Filtre marque (normalisé)
    if (filters.brands?.length) {
      result = result.filter((p) => {
        const norm = normalizeString(p.brand);
        return filters.brands.includes(norm);
      });
    }

    // Filtre genre (normalisé)
    if (filters.genders?.length) {
      result = result.filter((p) => {
        const norm = normalizeString(p.gender);
        return filters.genders.includes(norm);
      });
    }

    if (filters.sizes?.length) {
      result = result.filter((p) =>
        p.sizes.some((s) => filters.sizes.includes(s.size) && s.available)
      );
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      result = result.filter((p) => {
        const n = parseInt(String(p.price).replace(/[^\d]/g, ''), 10);
        return Number.isFinite(n) && n >= min && n <= max;
      });
    }

    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => {
          const pa = parseInt(String(a.price).replace(/[^\d]/g, ''), 10) || 0;
          const pb = parseInt(String(b.price).replace(/[^\d]/g, ''), 10) || 0;
          return pa - pb;
        });
        break;
      case 'price-desc':
        result.sort((a, b) => {
          const pa = parseInt(String(a.price).replace(/[^\d]/g, ''), 10) || 0;
          const pb = parseInt(String(b.price).replace(/[^\d]/g, ''), 10) || 0;
          return pb - pa;
        });
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        break;
    }

    return result;
  }, [filters, section, sort, searchQuery]);

  const activeSection = filters.section || section;
  const sectionLabel = activeSection
    ? SECTIONS.find((s) => s.id === activeSection)?.label
    : 'Tout';

  return (
    <div className="min-h-screen bg-bg">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Header avec logo centré plus grand au-dessus du titre */}
        <div className="mb-6 sm:mb-8">
          <div className="flex justify-center mb-6">
            <Logo size="default" className="scale-125 sm:scale-150 origin-center" />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h1 className="font-display text-display-lg font-bold text-ink">
              {activeSection ? sectionLabel : 'Produits'}
            </h1>
            <div className="flex items-center gap-3 flex-shrink-0 flex-wrap">
              {/* Search input */}
              <div className="relative w-full sm:w-[200px]">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted"
                  width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-9 pl-9 pr-3 rounded border border-border bg-white font-body text-xs text-ink placeholder:text-ink-muted/50 focus:outline-none focus:border-ink-muted"
                />
              </div>
              <span className="hidden sm:inline font-mono text-xs text-ink-muted">
                {filtered.length} produit{filtered.length > 1 ? 's' : ''}
              </span>
              {/* Sort dropdown */}
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="appearance-none bg-white border border-border rounded px-3 py-2 pr-8 font-mono text-xs text-ink cursor-pointer focus:outline-none focus:border-ink-muted"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>{opt.label}</option>
                  ))}
                </select>
                <svg
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-ink-muted"
                  width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"
                >
                  <path d="M3 5l3 3 3-3" />
                </svg>
              </div>
              {/* Mobile filter button */}
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="flex items-center gap-2 rounded border border-border bg-white px-3 py-2 text-sm font-medium text-ink lg:hidden"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 4h12M2 8h8M2 12h10" />
                </svg>
                Filtres
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-6 lg:gap-8">
          <Sidebar
            filters={filters}
            onFilterChange={setFilters}
            products={products}
            mobileOpen={mobileOpen}
            onCloseMobile={() => setMobileOpen(false)}
          />
          <main className="flex-1 min-w-0">
            <ProductGrid products={filtered} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Boutique;
