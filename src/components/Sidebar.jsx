import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SECTIONS, getBrands, getGenders, normalizeString } from '../data/products';

const FilterGroup = ({ title, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border py-4">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="font-display text-xs font-bold uppercase tracking-wider text-ink">
          {title}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-ink-muted text-xs"
        >
          ▾
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-3 flex flex-col gap-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Checkbox = ({ label, checked, onChange, count }) => (
  <label className="flex items-center gap-2.5 cursor-pointer group">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="sr-only"
    />
    <span
      className={`flex h-4 w-4 flex-none items-center justify-center rounded border transition-colors ${
        checked
          ? 'bg-ink border-ink'
          : 'border-ink-muted/40 group-hover:border-ink-muted'
      }`}
    >
      {checked && (
        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
    <span className="font-body text-sm text-ink/80 group-hover:text-ink transition-colors">{label}</span>
    {count !== undefined && (
      <span className="ml-auto font-mono text-xs text-ink-muted">{count}</span>
    )}
  </label>
);

const SizePill = ({ size, active, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`h-8 min-w-[32px] rounded px-2.5 font-mono text-xs transition-all ${
      active
        ? 'bg-ink text-white'
        : 'bg-sidebar text-ink/70 hover:bg-ink/10'
    }`}
  >
    {size}
  </button>
);

const PriceRange = ({ min, max, value, onChange }) => {
  const [localMin, setLocalMin] = useState(value[0] ?? min);
  const [localMax, setLocalMax] = useState(value[1] ?? max);

  const handleMinChange = (v) => {
    const n = Math.min(Number(v), localMax);
    setLocalMin(n);
    onChange([n, localMax]);
  };

  const handleMaxChange = (v) => {
    const n = Math.max(Number(v), localMin);
    setLocalMax(n);
    onChange([localMin, n]);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 font-mono text-xs text-ink-muted">$</span>
          <input
            type="number"
            value={localMin}
            onChange={(e) => handleMinChange(e.target.value)}
            className="w-full h-9 pl-7 pr-2 rounded border border-border bg-white font-mono text-xs text-ink focus:outline-none focus:border-ink-muted"
          />
        </div>
        <span className="font-mono text-xs text-ink-muted">à</span>
        <div className="relative flex-1">
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 font-mono text-xs text-ink-muted">$</span>
          <input
            type="number"
            value={localMax}
            onChange={(e) => handleMaxChange(e.target.value)}
            className="w-full h-9 pl-7 pr-2 rounded border border-border bg-white font-mono text-xs text-ink focus:outline-none focus:border-ink-muted"
          />
        </div>
      </div>
      <p className="font-body text-xs text-ink-muted">
        Le prix le plus élevé est de {max} FCFA.
      </p>
    </div>
  );
};

const Sidebar = ({ filters, onFilterChange, products, mobileOpen, onCloseMobile }) => {
  const activeSection = filters.section || null;
  const brands = useMemo(() => getBrands(activeSection), [activeSection]);
  const genders = useMemo(() => getGenders(activeSection), [activeSection]);

  const sectionCounts = SECTIONS.map((s) => ({
    ...s,
    count: products.filter((p) => p.section === s.id).length,
  }));

  const allSizes = useMemo(() => {
    const filtered = activeSection
      ? products.filter((p) => p.section === activeSection)
      : products;
    return [...new Set(
      filtered.flatMap((p) => p.sizes.map((s) => s.size))
    )].sort((a, b) => a - b);
  }, [products, activeSection]);

  const priceRange = useMemo(() => {
    const prices = products.map((p) => {
      const n = parseInt(String(p.price).replace(/[^\d]/g, ''), 10);
      return Number.isFinite(n) ? n : 0;
    }).filter((n) => n > 0);
    return { min: 0, max: Math.max(...prices, 0) };
  }, [products]);

  const handleSectionToggle = (sectionId) => {
    onFilterChange({
      ...filters,
      section: filters.section === sectionId ? null : sectionId,
      brands: [],
      genders: [],
      sizes: [],
    });
  };

  const handleBrandToggle = (brandId) => {
    const current = filters.brands || [];
    const next = current.includes(brandId)
      ? current.filter((b) => b !== brandId)
      : [...current, brandId];
    onFilterChange({ ...filters, brands: next });
  };

  const handleGenderToggle = (genderId) => {
    const current = filters.genders || [];
    const next = current.includes(genderId)
      ? current.filter((g) => g !== genderId)
      : [...current, genderId];
    onFilterChange({ ...filters, genders: next });
  };

  const handleSizeToggle = (size) => {
    const current = filters.sizes || [];
    const next = current.includes(size)
      ? current.filter((s) => s !== size)
      : [...current, size];
    onFilterChange({ ...filters, sizes: next });
  };

  const clearAll = () => {
    onFilterChange({ section: null, brands: [], genders: [], sizes: [], priceRange: null });
  };

  const hasActiveFilters = filters.section || filters.brands?.length || filters.genders?.length || filters.sizes?.length || filters.priceRange;

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between pb-2">
        <h2 className="font-display text-lg font-bold text-ink">Filtres</h2>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearAll}
            className="font-mono text-xs text-accent hover:underline"
          >
            Tout effacer
          </button>
        )}
      </div>

      <FilterGroup title="Section">
        {sectionCounts.map((s) => (
          <Checkbox
            key={s.id}
            label={s.label}
            checked={filters.section === s.id}
            onChange={() => handleSectionToggle(s.id)}
            count={s.count}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Prix" defaultOpen={false}>
        <PriceRange
          min={priceRange.min}
          max={priceRange.max}
          value={filters.priceRange || [priceRange.min, priceRange.max]}
          onChange={(range) => onFilterChange({ ...filters, priceRange: range })}
        />
      </FilterGroup>

      {brands.length > 0 && (
        <FilterGroup title="Marque">
          {brands.map((b) => (
            <Checkbox
              key={b.id}
              label={b.label}
              checked={(filters.brands || []).includes(b.id)}
              onChange={() => handleBrandToggle(b.id)}
              count={b.count}
            />
          ))}
        </FilterGroup>
      )}

      {genders.length > 0 && (
        <FilterGroup title="Genre">
          {genders.map((g) => (
            <Checkbox
              key={g.id}
              label={g.label}
              checked={(filters.genders || []).includes(g.id)}
              onChange={() => handleGenderToggle(g.id)}
              count={g.count}
            />
          ))}
        </FilterGroup>
      )}

      <FilterGroup title="Taille" defaultOpen={false}>
        <div className="flex flex-wrap gap-1.5">
          {allSizes.map((size) => (
            <SizePill
              key={size}
              size={size}
              active={(filters.sizes || []).includes(size)}
              onClick={() => handleSizeToggle(size)}
            />
          ))}
        </div>
      </FilterGroup>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-[260px] flex-none sticky top-[109px] self-start max-h-[calc(100dvh-109px)] overflow-y-auto pr-6">
        {sidebarContent}
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={onCloseMobile}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 w-[300px] bg-bg p-5 overflow-y-auto lg:hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-lg font-bold text-ink">Filtres</h2>
                <button
                  type="button"
                  onClick={onCloseMobile}
                  className="flex h-8 w-8 items-center justify-center rounded border border-border text-ink-muted hover:text-ink"
                >
                  ✕
                </button>
              </div>
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
