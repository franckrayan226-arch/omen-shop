import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProductsForSection } from '../lib/api';
import { WHATSAPP_NUMBER } from '../data/payments';

const LIME = '#D7F545';
const DARK = '#17162B';
const INDIGO = '#4F46C8';
const PURPLE = '#8B7CF6';
const LAV = '#E9E7F5';
const INK = '#14142B';
const TILE_BG = '#0F0F1D';

const ease = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 }
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1, duration: 0.55, ease } }
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

const Icon = ({ name, className = 'h-6 w-6' }) => {
  const icons = {
    home: <path d="M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5" />,
    grid: <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />,
    box: <path d="M21 8l-9-5-9 5v8l9 5 9-5V8zM3 8l9 5 9-5M12 13v8" />,
    headphones: <path d="M4 14v-2a8 8 0 0 1 16 0v2M4 14h3v6H4zM17 14h3v6h-3z" />,
    user: <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21c0-4 3.6-6 8-6s8 2 8 6" />,
    bolt: <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />,
    cube: <path d="M21 8l-9-5-9 5v8l9 5 9-5V8zM3 8l9 5 9-5M12 13v8" />,
    wifi: <path d="M2 9a15 15 0 0 1 20 0M5.5 12.5a10 10 0 0 1 13 0M9 16a5 5 0 0 1 6 0M12 19.5h.01" />,
    shield: <path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5l8-3zM9 12l2 2 4-4" />,
    users: <path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM2 21c0-3.5 3-6 7-6M16 3.5a4 4 0 0 1 0 7M22 21c0-3-2-5-5-5.5" />,
    award: <path d="M12 14a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM8.5 13 7 22l5-3 5 3-1.5-9" />,
    support: <path d="M4 14v-2a8 8 0 0 1 16 0v2M4 14h3v6H4zM17 14h3v6h-3z" />,
    layers: <path d="M12 2 2 7l10 5 10-5-10-5zM2 12l10 5 10-5M2 17l10 5 10-5" />
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {icons[name]}
    </svg>
  );
};

const Dock = () => {
  const location = useLocation();
  const items = [
    { icon: 'home', to: '/', label: 'Accueil' },
    { icon: 'grid', to: '/boutique', label: 'Boutique' },
    { icon: 'box', to: '/electronique', label: 'Électronique' },
    { icon: 'headphones', to: '/electronique/#top-picks', label: 'Top picks', hash: true },
    { icon: 'user', to: '/compte', label: 'Compte' }
  ];

  return (
    <motion.aside
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease }}
      className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
      aria-label="Navigation rapide"
    >
      <div className="flex flex-col gap-1 rounded-[24px] bg-white p-2 shadow-[0_18px_40px_-18px_rgba(20,20,43,0.35)]">
        {items.map((item) => {
          const active = !item.hash && location.pathname === item.to;
          return (
            <Link
              key={item.icon}
              to={item.to}
              onClick={item.hash ? (e) => { e.preventDefault(); document.getElementById('top-picks')?.scrollIntoView({ behavior: 'smooth' }); } : undefined}
              aria-label={item.label}
              title={item.label}
              className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-200 ${active ? 'text-black' : 'text-black/45 hover:bg-[#F1F0FA] hover:text-black'}`}
              style={active ? { backgroundColor: LIME } : undefined}
            >
              <Icon name={item.icon} className="h-5 w-5" />
            </Link>
          );
        })}
      </div>
    </motion.aside>
  );
};

const Hero = ({ products }) => {
  const heroProduct = products.find((p) => p.slug === 'casque-pro-x') || products[0];

  return (
    <header className="relative overflow-hidden" style={{ backgroundColor: LAV }}>
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-[120px] sm:px-8 lg:grid-cols-[1fr_1fr] lg:gap-6 lg:pb-20">
        <motion.div variants={stagger} initial="hidden" animate="visible" className="relative z-20">
          <motion.p variants={fadeUp} className="font-mono text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: INK }}>
            Omen Labs — Next-gen tech
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-6 select-none font-manrope font-extrabold uppercase"
            style={{ fontSize: 'clamp(2.9rem, 6.5vw, 5.2rem)', lineHeight: 0.98, letterSpacing: '-0.02em', color: INK }}
          >
            Tech that<br />
            <span style={{ color: PURPLE }}>performs</span><br />
            every day
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 max-w-sm font-manrope text-body-lg leading-relaxed text-black/55">
            Smart. Sleek. Seamless. Une technologie conçue pour élever ton quotidien.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8">
            <a
              href="#top-picks"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('top-picks')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center gap-3 rounded-full font-manrope text-[12px] font-extrabold uppercase tracking-[0.1em] text-black transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              style={{ backgroundColor: LIME, minHeight: 54, padding: '0 14px 0 30px' }}
            >
              Explorer le lineup
              <span aria-hidden="true" className="flex h-8 w-8 items-center justify-center rounded-full bg-black/90 text-[13px]" style={{ color: LIME }}>→</span>
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease }}
          className="relative mx-auto aspect-[5/4] w-full max-w-[560px]"
        >
          <div
            aria-hidden="true"
            className="absolute right-[2%] top-[2%] aspect-square w-[70%] rounded-full"
            style={{ background: 'linear-gradient(140deg, #A99CF9, #7A6BE8)' }}
          />

          {heroProduct && (
            <div className="group absolute inset-x-0 bottom-0 top-[9%] z-10 overflow-hidden rounded-[28px] border border-white/40 shadow-[0_50px_100px_-40px_rgba(20,20,43,0.6)]">
              <img
                src="/products/hero-neon.jpg"
                alt="Casque audio en lumière néon — univers OMEN Tech"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute bottom-5 left-5 rounded-full bg-white/95 px-4 py-2 shadow-sm backdrop-blur-sm">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: INK }}>
                  {heroProduct.name} · {heroProduct.price}
                </span>
              </div>
              <span
                aria-hidden="true"
                className="absolute right-4 top-4 rounded-full px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-black"
                style={{ backgroundColor: LIME }}
              >
                Flagship
              </span>
              <Link to={`/electronique/${heroProduct.slug}`} className="absolute inset-0 z-10" aria-label={`Voir ${heroProduct.name}`} />
            </div>
          )}
        </motion.div>
      </div>
    </header>
  );
};

const features = [
  { icon: 'cube', title: 'Tested only', text: 'Chaque device passe 12 points de contrôle avant la mise en ligne.' },
  { icon: 'bolt', title: 'Fast shipping', text: 'Expédition en 24–48h, colis sécurisé et suivi en temps réel.' },
  { icon: 'wifi', title: 'Secure payment', text: 'Orange Money, Wave, Moov, Télécel — paiement 100% en ligne.' },
  { icon: 'shield', title: 'Real support', text: 'Une équipe qui répond vite, directement sur WhatsApp.' }
];

const FeatureBand = () => (
  <section aria-label="Features" className="relative px-3 sm:px-5" style={{ backgroundColor: LAV }}>
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewOnce}
      className="relative z-10 mx-auto max-w-[1360px] overflow-hidden rounded-[28px] px-8 py-12 sm:px-12 sm:py-14"
      style={{ backgroundColor: DARK }}
    >
      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.24em]" style={{ color: LIME }}>
        Built for the future
      </p>
      <div className="mt-9 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <motion.div key={f.title} variants={fadeUp}>
            <span aria-hidden="true" style={{ color: LIME }}>
              <Icon name={f.icon} className="h-7 w-7" />
            </span>
            <h3 className="mt-5 font-manrope text-[15px] font-extrabold uppercase tracking-[0.06em] text-white">{f.title}</h3>
            <p className="mt-2.5 max-w-[240px] font-manrope text-[13px] leading-relaxed text-white/50">{f.text}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </section>
);

const TopPicks = ({ products }) => {
  const railRef = useRef(null);
  const scroll = (dir) => {
    railRef.current?.scrollBy({ left: dir * 320, behavior: 'smooth' });
  };

  return (
    <section id="top-picks" aria-label="Top picks" className="relative scroll-mt-24" style={{ backgroundColor: LAV }}>
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:pl-[104px]">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewOnce} className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <motion.div variants={fadeUp}>
            <h2 className="font-manrope text-[clamp(1.8rem,3.6vw,2.6rem)] font-extrabold uppercase leading-[1.05] tracking-tight" style={{ color: INK }}>
              Explore our<br />top picks
            </h2>
            <span aria-hidden="true" className="mt-4 block h-[3px] w-10" style={{ backgroundColor: INK }} />
            <div className="mt-8 hidden gap-3 sm:flex">
              <button
                type="button"
                onClick={() => scroll(-1)}
                aria-label="Précédent"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-black/15 bg-white text-lg transition-colors duration-200 hover:bg-[#14142B] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                style={{ cursor: 'pointer' }}
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => scroll(1)}
                aria-label="Suivant"
                className="flex h-12 w-12 items-center justify-center rounded-full font-manrope text-lg transition-colors duration-200 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                style={{ backgroundColor: INK, color: LIME, cursor: 'pointer' }}
              >
                →
              </button>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="min-w-0 flex-1">
            <div ref={railRef} className="no-scrollbar flex snap-x gap-4 overflow-x-auto pb-2">
              {products.map((product) => {
                const discount = discountPercent(product.price, product.oldPrice);
                return (
                  <article key={product.slug} className="group relative w-[240px] flex-none snap-start">
                    <Link to={`/electronique/${product.slug}`} className="absolute inset-0 z-20" aria-label={`Voir ${product.name}`} />
                    <div className="relative aspect-square overflow-hidden rounded-[18px]" style={{ backgroundColor: '#DFDCF4' }}>
                      <div className="absolute inset-3 overflow-hidden rounded-[12px]" style={{ backgroundColor: TILE_BG }}>
                        <img src={product.image} alt={product.name} loading="lazy" className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-[1.06]" />
                      </div>
                      {discount && (
                        <span className="absolute left-3 top-3 rounded-full px-2.5 py-1 font-mono text-[10px] font-bold text-black" style={{ backgroundColor: LIME }}>
                          {discount}
                        </span>
                      )}
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-3 px-1">
                      <div>
                        <h3 className="font-manrope text-[15px] font-bold" style={{ color: INK }}>{product.name}</h3>
                        <p className="mt-0.5 font-manrope text-[14px] font-extrabold" style={{ color: INK, fontVariantNumeric: 'tabular-nums' }}>{product.price}</p>
                      </div>
                      <span
                        aria-hidden="true"
                        className="flex h-9 w-9 flex-none items-center justify-center rounded-full text-black transition-all duration-200 group-hover:scale-110"
                        style={{ backgroundColor: LIME }}
                      >
                        →
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const stats = [
  { icon: 'layers', value: '04', label: 'Devices testés' },
  { icon: 'users', value: '24–48h', label: 'Livraison express' },
  { icon: 'award', value: '12pts', label: 'Contrôle qualité' },
  { icon: 'support', value: '24/7', label: 'Support réactif' }
];

const StatsBand = () => (
  <section aria-label="Chiffres" className="relative px-3 sm:px-5" style={{ backgroundColor: LAV }}>
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewOnce}
      transition={{ duration: 0.6, ease }}
      className="relative z-10 mx-auto grid max-w-[1360px] grid-cols-2 gap-y-8 rounded-[24px] px-8 py-10 sm:py-12 lg:grid-cols-4"
      style={{ backgroundColor: INDIGO }}
    >
      {stats.map((s) => (
        <div key={s.label} className="flex items-center gap-4">
          <span aria-hidden="true" className="text-white">
            <Icon name={s.icon} className="h-8 w-8" />
          </span>
          <div>
            <p className="font-manrope text-2xl font-extrabold text-white">{s.value}</p>
            <p className="font-manrope text-[12px] text-white/65">{s.label}</p>
          </div>
        </div>
      ))}
    </motion.div>
  </section>
);

const Testimonial = () => (
  <section aria-label="Témoignage" className="relative" style={{ backgroundColor: DARK }}>
    <div className="grid lg:grid-cols-[0.85fr_1.15fr_0.9fr]">
      <div className="relative min-h-[300px] lg:min-h-[460px]">
        <img
          src="/products/camera.jpg"
          alt="Caméra Canon — univers OMEN Tech"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0" style={{ background: 'linear-gradient(120deg, rgba(23,22,43,0.25), rgba(79,70,200,0.35))' }} />
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewOnce}
        className="flex flex-col justify-center px-8 py-14 sm:px-12"
      >
        <motion.span variants={fadeUp} aria-hidden="true" className="font-fraunces text-[64px] leading-none" style={{ color: LIME }}>
          “
        </motion.span>
        <motion.blockquote variants={fadeUp} className="mt-2 max-w-md font-fraunces text-[clamp(1.4rem,2.6vw,2rem)] italic leading-snug text-white">
          OMEN livre plus que du matériel — c’est une vraie expérience, du choix à la livraison.
        </motion.blockquote>
        <motion.p variants={fadeUp} className="mt-6 font-manrope text-sm font-bold text-white">
          — Ibrahim T.
        </motion.p>
        <motion.p variants={fadeUp} className="font-manrope text-[12px] text-white/45">
          Gamer & créateur de contenu
        </motion.p>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewOnce}
        transition={{ duration: 0.6, ease }}
        className="flex items-center px-6 pb-12 sm:px-10 lg:py-14"
      >
        <div className="w-full rounded-[22px] border border-white/20 p-8">
          <h3 className="font-manrope text-[22px] font-extrabold uppercase leading-tight tracking-tight text-white">
            Ready to upgrade<br />your tech ?
          </h3>
          <p className="mt-4 font-manrope text-[13px] leading-relaxed text-white/55">
            Rejoins les clients qui nous font confiance pour la qualité, l’innovation et le style.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Bonjour OMEN SHOP, je veux passer à la vitesse supérieure.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center justify-center gap-3 rounded-full font-manrope text-[11px] font-extrabold uppercase tracking-[0.1em] text-black transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            style={{ backgroundColor: LIME, minHeight: 50, padding: '0 12px 0 24px' }}
          >
            Rejoindre la famille
            <span aria-hidden="true" className="flex h-7 w-7 items-center justify-center rounded-full bg-black/90 text-[12px]" style={{ color: LIME }}>→</span>
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

const Finale = () => (
  <section aria-label="Contact" className="relative px-3 pb-3 sm:px-5 sm:pb-5" style={{ backgroundColor: DARK }}>
    <div className="relative mx-auto max-w-[1360px] overflow-hidden rounded-[28px] border border-white/10 px-6 py-16 text-center sm:py-20" style={{ backgroundColor: '#1D1C38' }}>
      <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewOnce} className="relative z-10 mx-auto flex max-w-2xl flex-col items-center">
        <motion.h2 variants={fadeUp} className="font-manrope text-[clamp(1.9rem,4.2vw,3rem)] font-extrabold uppercase tracking-tight text-white">
          Le futur, <span style={{ color: LIME }}>livré chez toi.</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-5 max-w-md font-manrope text-body-lg leading-relaxed text-white/55">
          Compatibilité, specs, disponibilité — notre équipe te répond en direct.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-9 flex flex-col items-center gap-5">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Bonjour OMEN SHOP, j\'ai une question sur un produit tech.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 rounded-full font-manrope text-[12px] font-extrabold uppercase tracking-[0.1em] text-black transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            style={{ backgroundColor: LIME, minHeight: 54, padding: '0 14px 0 28px' }}
          >
            Discuter sur WhatsApp
            <span aria-hidden="true" className="flex h-8 w-8 items-center justify-center rounded-full bg-black/90 text-[13px]" style={{ color: LIME }}>→</span>
          </a>
          <Link to="/" className="font-manrope text-[12px] font-bold uppercase tracking-[0.14em] text-white/35 transition-colors duration-200 hover:text-white">
            Retour à l’accueil
          </Link>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

const ElectroniqueCollection = ({ section = 'electronique' }) => {
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

  return (
    <main className="min-h-screen" style={{ backgroundColor: LAV }}>
      <Dock />
      <Hero products={products} />
      <FeatureBand />
      <TopPicks products={products} />
      <StatsBand />
      <Testimonial />
      <Finale />
    </main>
  );
};

export default ElectroniqueCollection;
