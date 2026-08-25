import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { getProductsForSection } from '../lib/api';
import { WHATSAPP_NUMBER } from '../data/payments';

const GREEN = '#4C5B3C';
const GREEN_SOFT = '#8A9B78';
const INK = '#262218';
const BG = '#FAF8F3';

const ease = [0.33, 1, 0.68, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 }
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1, duration: 0.6, ease } }
};

const viewOnce = { once: true, margin: '-60px' };

const parsePrice = (value) => {
  const n = parseInt(String(value).replace(/[^\d]/g, ''), 10);
  return Number.isNaN(n) ? null : n;
};

const discountPercent = (price, oldPrice) => {
  const p = parsePrice(price);
  const o = parsePrice(oldPrice);
  if (!p || !o || o <= p) return null;
  return `-${Math.round((1 - p / o) * 100)}%`;
};

const ProductImage = ({ product, className = '' }) => {
  if (product.image) {
    return (
      <img
        src={product.image}
        alt={product.name}
        loading="lazy"
        className={`h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] ${className}`}
      />
    );
  }
  return (
    <div className={`flex h-full w-full flex-col items-center justify-center gap-3 ${className}`} style={{ backgroundColor: '#EFF1E8' }}>
      <span className="font-fraunces text-6xl italic" style={{ color: 'rgba(76,91,60,0.45)' }}>
        {product.name.charAt(0)}
      </span>
      <span className="font-manrope text-[10px] font-semibold uppercase tracking-[0.22em] text-black/35">
        Visuel à venir
      </span>
    </div>
  );
};

const EssentialCard = ({ product, index = 0 }) => {
  const discount = discountPercent(product.price, product.oldPrice);

  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: 8, transition: { duration: 0.25, ease } }}
      transition={{ duration: 0.6, ease, delay: index * 0.07 }}
      layout
      className="group relative"
    >
      <Link to={`/bienetre/${product.slug}`} className="absolute inset-0 z-20" aria-label={`Découvrir ${product.name}`} />

      <div className="relative flex h-full flex-col overflow-hidden rounded-[24px] border bg-white transition-shadow duration-300 group-hover:shadow-[0_24px_50px_-24px_rgba(38,34,24,0.25)]" style={{ borderColor: 'rgba(38,34,24,0.1)' }}>
        {discount && (
          <span className="absolute left-4 top-4 z-30 rounded-full px-3 py-1 font-manrope text-[11px] font-semibold text-white" style={{ backgroundColor: GREEN }}>
            {discount}
          </span>
        )}
        {product.isNew && !discount && (
          <span className="absolute left-4 top-4 z-30 rounded-full border px-3 py-1 font-manrope text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ borderColor: GREEN, color: GREEN, backgroundColor: '#FFFFFF' }}>
            Nouveau
          </span>
        )}

        <div className="aspect-[4/5] overflow-hidden" style={{ backgroundColor: '#EFF1E8' }}>
          <ProductImage product={product} />
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <p className="font-manrope text-[10px] font-semibold uppercase tracking-[0.18em] text-black/40">{product.brand} — {product.category}</p>
            <p className="font-manrope text-[10px] uppercase tracking-[0.14em] text-black/40">{product.meta}</p>
          </div>

          <h3 className="mt-2.5 font-fraunces text-[24px] leading-tight" style={{ color: INK }}>{product.name}</h3>

          <div className="mt-auto flex items-center justify-between gap-3 pt-5">
            <div className="flex items-baseline gap-2">
              <span className="font-manrope text-lg font-semibold" style={{ color: INK, fontVariantNumeric: 'tabular-nums' }}>{product.price}</span>
              {product.oldPrice && (
                <span className="font-manrope text-sm text-black/35 line-through" style={{ fontVariantNumeric: 'tabular-nums' }}>{product.oldPrice}</span>
              )}
            </div>
            <span className="font-manrope text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors duration-200 group-hover:text-[#4C5B3C]" style={{ color: 'rgba(38,34,24,0.45)' }}>
              Découvrir →
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

const Hero = ({ products }) => (
  <header className="relative overflow-hidden" style={{ backgroundColor: BG }}>
    <div aria-hidden="true" className="absolute inset-0">
      <img src="/products/huile-barbe.jpg" alt="" className="h-full w-full object-cover" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(250,248,243,0.98) 0%, rgba(250,248,243,0.5) 32%, rgba(250,248,243,0.1) 62%), linear-gradient(90deg, rgba(250,248,243,0.97) 0%, rgba(250,248,243,0.9) 35%, rgba(250,248,243,0.35) 68%, rgba(250,248,243,0.06) 100%)'
        }}
      />
    </div>

    <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-center px-5 pb-24 pt-[110px] sm:px-8">
      <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-xl">
        <motion.p variants={fadeUp} className="font-manrope text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: GREEN }}>
          OMEN Care — Grooming & Soin
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="mt-6 select-none font-fraunces"
          style={{ fontSize: 'clamp(3.2rem, 8.5vw, 6.5rem)', fontWeight: 500, lineHeight: 1.02, letterSpacing: '-0.015em', color: INK }}
        >
          Bien-être,<br />
          <span className="italic" style={{ color: GREEN }}>sans détour.</span>
        </motion.h1>

        <motion.p variants={fadeUp} className="mt-7 max-w-md font-manrope text-body-lg leading-relaxed" style={{ color: 'rgba(38,34,24,0.68)' }}>
          Minoxidil, derma roller, soins barbe et capillaires : une sélection courte, testée, et qui fait ce qu’elle promet.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-9">
          <a
            href="#essentiels"
            onClick={(e) => {
              e.preventDefault();
              const target = document.getElementById('essentiels');
              if (!target) return;
              const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
              target.scrollIntoView({ behavior, block: 'start' });
            }}
            className="inline-flex items-center justify-center rounded-full font-manrope text-[13px] font-semibold uppercase tracking-[0.14em] text-[#FAF8F3] transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#262218]"
            style={{ backgroundColor: INK, minHeight: 56, padding: '0 36px' }}
          >
            Voir les essentiels ↓
          </a>
        </motion.div>

        <motion.p variants={fadeUp} className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-1.5 font-manrope text-xs font-medium text-black/55">
          <span>✦ Livraison 24–48h</span>
          <span>✦ Paiement 100% en ligne</span>
          <span>✦ Reçu automatique</span>
        </motion.p>
      </motion.div>
    </div>
  </header>
);

const Essentials = ({ products }) => {
  const categories = useMemo(
    () => ['Tous', ...Array.from(new Set(products.map((p) => p.category).filter(Boolean)))],
    [products]
  );
  const [activeFilter, setActiveFilter] = useState('Tous');
  const visibleProducts = useMemo(
    () => (activeFilter === 'Tous' ? products : products.filter((p) => p.category === activeFilter)),
    [products, activeFilter]
  );

  return (
    <section id="essentiels" aria-label="Les essentiels" className="relative scroll-mt-24" style={{ backgroundColor: BG }}>
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewOnce} className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <motion.p variants={fadeUp} className="font-manrope text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: GREEN }}>
              The Essentials
            </motion.p>
            <motion.h2 variants={fadeUp} className="mt-4 font-fraunces" style={{ fontSize: 'clamp(2.3rem, 5vw, 3.6rem)', fontWeight: 500, lineHeight: 1.05, color: INK }}>
              Les essentiels <span className="italic" style={{ color: GREEN }}>du quotidien</span>
            </motion.h2>
          </div>

          {categories.length > 2 && (
            <motion.nav variants={fadeUp} className="flex flex-wrap gap-x-7 gap-y-3" aria-label="Filtrer par catégorie">
              {categories.map((cat) => {
                const active = activeFilter === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveFilter(cat)}
                    aria-pressed={active}
                    className={`border-b pb-1.5 font-manrope text-[12px] font-semibold uppercase tracking-[0.14em] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4C5B3C] ${active ? '' : 'border-transparent text-black/40 hover:text-black'}`}
                    style={{ cursor: 'pointer', backgroundColor: 'transparent', borderColor: active ? GREEN : 'transparent', color: active ? INK : undefined }}
                  >
                    {cat}
                  </button>
                );
              })}
            </motion.nav>
          )}
        </motion.div>

        <motion.div layout className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visibleProducts.map((product, index) => (
              <EssentialCard key={product.slug} product={product} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {visibleProducts.length === 0 && (
          <p className="py-16 text-center font-fraunces text-lg italic text-black/40">
            Rien dans cette catégorie pour l’instant.
          </p>
        )}
      </div>
    </section>
  );
};

const Spotlight = ({ product }) => (
  <section aria-label="Best-seller" className="relative px-3 sm:px-5">
    <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[36px] py-16 sm:py-20" style={{ backgroundColor: '#EDF0E6' }}>
      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-6 sm:px-10 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewOnce}
          transition={{ duration: 0.7, ease }}
          className="group relative order-2 lg:order-1"
        >
          <div className="aspect-[4/5] overflow-hidden rounded-[24px]" style={{ backgroundColor: '#FFFFFF' }}>
            <ProductImage product={product} />
          </div>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewOnce} className="order-1 lg:order-2">
          <motion.p variants={fadeUp} className="font-manrope text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: GREEN }}>
            Best-seller — N°{String(product.id).padStart(2, '0')}
          </motion.p>

          <motion.h2 variants={fadeUp} className="mt-5 font-fraunces" style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 500, lineHeight: 1.05, color: INK }}>
            {product.name}
          </motion.h2>

          <motion.p variants={fadeUp} className="mt-5 max-w-md font-manrope text-body-lg leading-relaxed" style={{ color: 'rgba(38,34,24,0.62)' }}>
            {product.description}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-7 flex items-baseline gap-3">
            <span className="font-manrope text-2xl font-semibold" style={{ color: INK, fontVariantNumeric: 'tabular-nums' }}>{product.price}</span>
            <span className="font-manrope text-xs uppercase tracking-[0.14em] text-black/40">{product.meta}</span>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-9">
            <Link
              to={`/bienetre/${product.slug}`}
              className="inline-flex items-center justify-center rounded-full border-2 px-8 font-manrope text-[13px] font-semibold uppercase tracking-[0.14em] transition-all duration-300 hover:-translate-y-0.5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4C5B3C]"
              style={{ borderColor: GREEN, color: GREEN, minHeight: 54 }}
            >
              Découvrir le produit
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  </section>
);

const guarantees = [
  {
    id: '01',
    title: 'Fast Delivery',
    text: 'Expédition en 24–48h, colis soigné et suivi jusqu’à chez toi.'
  },
  {
    id: '02',
    title: 'Approved Only',
    text: 'Un produit entre dans la sélection seulement après test et validation.'
  },
  {
    id: '03',
    title: 'Secure Payment',
    text: 'Tout se règle en ligne — Orange Money, Wave, Moov, Télécel. Reçu envoyé automatiquement.',
    logos: [
      { src: '/logos/orange-money.png', alt: 'Orange Money' },
      { src: '/logos/wave.png', alt: 'Wave' },
      { src: '/logos/moov.png', alt: 'Moov Money' },
      { src: '/logos/telecel.png', alt: 'Télécel Money' }
    ]
  }
];

const Guarantees = () => (
  <section aria-label="Garanties" style={{ backgroundColor: BG }}>
    <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
      <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewOnce}>
        <motion.p variants={fadeUp} className="font-manrope text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: GREEN }}>
          The OMEN Standard
        </motion.p>
        <motion.h2 variants={fadeUp} className="mt-4 font-fraunces" style={{ fontSize: 'clamp(2.3rem, 5vw, 3.6rem)', fontWeight: 500, lineHeight: 1.05, color: INK }}>
          Ce qu’on garantit, <span className="italic" style={{ color: GREEN }}>noir sur blanc</span>
        </motion.h2>
      </motion.div>

      <motion.div initial="hidden" whileInView="visible" viewport={viewOnce} variants={{ visible: { transition: { staggerChildren: 0.12 } } }} className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {guarantees.map((item) => (
          <motion.article key={item.id} variants={fadeUp} className="border-t-2 pt-6" style={{ borderColor: GREEN }}>
            <p className="font-manrope text-xs font-semibold tracking-[0.14em]" style={{ color: GREEN }}>{item.id}</p>
            <h3 className="mt-3 font-fraunces text-2xl" style={{ color: INK }}>{item.title}</h3>
            <p className="mt-3 max-w-xs font-manrope text-body leading-relaxed text-black/55">{item.text}</p>
            {item.logos && (
              <div className="mt-5 flex items-center gap-4">
                {item.logos.map((logo) => (
                  <img key={logo.alt} src={logo.src} alt={logo.alt} loading="lazy" className="h-6 w-auto opacity-60 transition-opacity duration-200 hover:opacity-100" />
                ))}
              </div>
            )}
          </motion.article>
        ))}
      </motion.div>
    </div>
  </section>
);

const Finale = () => (
  <section aria-label="Commande" className="relative px-3 pb-3 sm:px-5 sm:pb-5">
    <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[36px] py-16 text-center sm:py-20" style={{ backgroundColor: INK }}>
      <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewOnce} className="relative z-10 mx-auto flex max-w-2xl flex-col items-center px-6">
        <motion.p variants={fadeUp} className="font-manrope text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: GREEN_SOFT }}>
          Une question ?
        </motion.p>
        <motion.h2 variants={fadeUp} className="mt-5 font-fraunces" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', fontWeight: 500, lineHeight: 1.08, color: '#FAF8F3' }}>
          Prendre soin de soi, <span className="italic" style={{ color: GREEN_SOFT }}>simplement.</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-5 max-w-md font-manrope text-body-lg leading-relaxed text-white/60">
          Une question sur un produit, une cure, une utilisation ? Écris-nous, on te répond vite.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-9 flex flex-col items-center gap-5">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Bonjour OMEN SHOP, je souhaite commander un produit bien-être.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[#FAF8F3] px-9 font-manrope text-[13px] font-semibold uppercase tracking-[0.14em] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#D8E0C8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            style={{ minHeight: 56, color: INK }}
          >
            Discuter sur WhatsApp
          </a>
          <Link to="/" className="font-manrope text-[12px] font-semibold uppercase tracking-[0.16em] text-white/40 transition-colors duration-200 hover:text-white">
            Retour à l’accueil
          </Link>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

const BienEtreCollection = ({ section = 'bienetre' }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let mounted = true;
    setProducts([]);
    getProductsForSection(section).then((list) => {
      if (mounted) setProducts(list);
    });
    return () => {
      mounted = false;
    };
  }, [section]);

  const spotlight = useMemo(
    () => products.find((p) => p.slug === 'minoxidil-5') || products[0] || null,
    [products]
  );

  return (
    <main className="min-h-screen" style={{ backgroundColor: BG }}>
      <Hero products={products} />
      <Essentials products={products} />
      {spotlight && <Spotlight product={spotlight} />}
      <Guarantees />
      <Finale />
    </main>
  );
};

export default BienEtreCollection;
