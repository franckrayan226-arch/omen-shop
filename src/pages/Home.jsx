import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import products, { SECTIONS } from '../data/products';
import Logo from '../components/Logo';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const viewOnce = { once: true, margin: '-60px' };

// ─── HERO ─────────────────────────────────────────
const Hero = () => (
  <section className="relative bg-bg overflow-hidden">
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 min-h-[70vh] flex flex-col justify-center py-16 sm:py-24">
      <motion.div variants={stagger} initial="hidden" animate="visible">
        {/* Logo centré en haut */}
        <motion.div variants={fadeIn} className="flex justify-center mb-10">
          <div className="scale-[1.6] sm:scale-[1.9] origin-center">
            <Logo />
          </div>
        </motion.div>

        <motion.div variants={fadeIn} className="flex items-center gap-3 mb-8">
          <span className="w-8 h-px bg-accent" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-ink-muted">
            Curated goods — Ouaga
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="font-display text-[clamp(3rem,8vw,7rem)] font-black text-ink leading-[0.88] tracking-[-0.03em]"
        >
          SNEAKERS.
          <br />
          <span className="text-ink/25">SOIN.</span>
          <br />
          <span className="text-accent">TECH.</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-8 max-w-md font-body text-[15px] text-ink-muted leading-relaxed"
        >
          Mode, bien-être et électronique — sélection pièce par pièce.
          Commande sur mesure, livraison 24–48h.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-10">
          <Link to="/boutique" className="group inline-flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-ink">
            <span className="relative pb-1.5">
              La boutique
              <span className="absolute left-0 bottom-0 w-full h-px bg-ink/15 overflow-hidden">
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-0 bg-ink"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.7 }}
                />
              </span>
            </span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-flex"
            >
              —
            </motion.span>
            <motion.span
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
              className="inline-flex"
            >
              →
            </motion.span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

// ─── MARQUEES ─────────────────────────────────────
const marqueeItems = [
  { text: 'Authentique', icon: '✓' },
  { text: 'Inspecté', icon: '◉' },
  { text: 'Premium', icon: '★' },
  { text: 'Sur commande', icon: '◇' },
  { text: 'Pièce par pièce', icon: '✦' },
  { text: 'Ouaga', icon: '●' },
  { text: 'Qualité', icon: '◆' },
  { text: 'Style', icon: '✧' },
];

const Marquee = () => (
  <div className="border-y border-border bg-gradient-to-r from-white via-[#FAFAFA] to-white overflow-hidden">
    <div className="flex animate-marquee whitespace-nowrap py-5">
      {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
        <span key={i} className="flex items-center gap-3 mx-8">
          <span className="text-accent text-xs">{item.icon}</span>
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink-muted">
            {item.text}
          </span>
        </span>
      ))}
    </div>
  </div>
);

// ─── TRUST STRIP ──────────────────────────────────
const trustItems = [
  { 
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12l2 2 4-4" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
    title: 'Inspecté', 
    sub: 'Chaque pièce vérifiée avant expédition' 
  },
  { 
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: 'Rapide', 
    sub: 'Expédition et livraison express' 
  },
  { 
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: 'Sécurisé', 
    sub: 'Paiement 100% sécurisé' 
  },
  { 
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    title: 'Premium', 
    sub: 'Sélection exclusive et qualité' 
  },
];

const TrustStrip = () => (
  <section className="bg-gradient-to-b from-bg to-[#F5F5F5]">
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewOnce}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
      >
        {trustItems.map((item, index) => (
          <motion.div 
            key={index} 
            variants={fadeUp}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="relative group"
          >
            <div className="mb-4 text-accent opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
              {item.icon}
            </div>
            <h3 className="font-display text-lg font-bold text-ink mb-2">
              {item.title}
            </h3>
            <p className="font-body text-sm text-ink-muted leading-relaxed">
              {item.sub}
            </p>
            <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

// ─── BENTO — UNE SECTION PAR UNIVERS ─────────────
const BentoVisual = ({ section }) => {
  if (section.id === 'mode') {
    return (
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://i.pinimg.com/736x/8e/ee/ab/8eeeabde22a51cbd0d204215e77939f5.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-800 ease-out"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/20 to-transparent group-hover:from-ink/50 group-hover:via-ink/10 transition-all duration-500" />
        {/* Texture subtile */}
        <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noise)"/%3E%3C/svg%3E")'
        }} />
      </div>
    );
  }
  if (section.id === 'bienetre') {
    return (
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://i.pinimg.com/736x/91/32/97/913297b872df5a6e3d91ed5424af2de3.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-800 ease-out"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-[#2B2621]/20 to-transparent group-hover:from-ink/40 group-hover:via-[#2B2621]/10 transition-all duration-500" />
        <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noise)"/%3E%3C/svg%3E")'
        }} />
      </div>
    );
  }
  return (
    <div className="absolute inset-0 overflow-hidden">
      <img
        src="https://i.pinimg.com/736x/11/96/66/1196662cb4162488ec50176efe29d7e1.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-800 ease-out"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/30 to-transparent group-hover:from-ink/60 group-hover:via-ink/20 transition-all duration-500" />
      <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noise)"/%3E%3C/svg%3E")'
      }} />
    </div>
  );
};

const bentoConfigs = [
  { bg: 'bg-ink', text: 'text-white', sub: 'text-white/60', num: 'text-white', accent: '#FF3B1F' },
  { bg: 'bg-[#F5F1EA]', text: 'text-[#2B2621]', sub: 'text-[#2B2621]/60', num: 'text-[#2B2621]', accent: '#7A8B5C' },
  { bg: 'bg-[#0A0A0A]', text: 'text-[#F5F5F5]', sub: 'text-[#F5F5F5]/60', num: 'text-[#F5F5F5]', accent: '#00D4FF' },
];

const BentoGrid = () => (
  <section className="bg-gradient-to-b from-white to-[#FAFAFA]">
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewOnce}
      >
        <motion.div variants={fadeUp} className="flex items-center gap-3 mb-12">
          <motion.span 
            initial={{ width: 0 }}
            whileInView={{ width: '32px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-px bg-accent"
          />
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-ink-muted">
            Nos univers
          </p>
          <motion.span 
            initial={{ width: 0 }}
            whileInView={{ width: '32px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-px bg-accent"
          />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {SECTIONS.map((section, i) => {
            const config = bentoConfigs[i];
            const jerseyNum = section.id === 'mode' ? '01' : section.id === 'bienetre' ? '02' : '03';
            return (
              <motion.div key={section.id} variants={fadeUp}>
                <Link
                  to={`/boutique/${section.id}`}
                  className={`group relative flex flex-col justify-between ${config.bg} aspect-square p-6 sm:p-8 overflow-hidden rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500`}
                >
                  {/* Visuel */}
                  <BentoVisual section={section} />

                  {/* Effet de brillance au hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Numéro style maillot */}
                  <div className="relative z-10 flex items-start justify-between">
                    <h3 className={`font-display text-2xl sm:text-3xl font-bold ${config.text} leading-[1.1]`}>
                      {section.label}
                    </h3>
                    <span
                      className={`font-display text-[70px] sm:text-[90px] font-black ${config.num} leading-none select-none -mt-4 sm:-mt-6`}
                      style={{
                        WebkitTextStroke: section.id === 'mode' ? '1px rgba(255,255,255,0.4)' : '1px rgba(0,0,0,0.2)',
                        textShadow: section.id === 'mode' ? '0 0 60px rgba(255,255,255,0.15)' : '0 0 60px rgba(0,0,0,0.1)',
                      }}
                    >
                      {jerseyNum}
                    </span>
                  </div>

                  {/* Bas — bouton orbital amélioré */}
                  <div className="relative z-10 flex items-end justify-between gap-4">
                    <p className={`font-body text-sm ${config.sub} leading-relaxed max-w-[55%]`}>
                      {section.description}
                    </p>
                    <span className="relative flex-shrink-0 w-12 h-12 flex items-center justify-center">
                      {/* Cercle avec effet de lueur */}
                      <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 48 48" aria-hidden="true">
                        <circle cx="24" cy="24" r="22" fill="none" stroke={section.id === 'mode' ? 'rgba(255,255,255,0.2)' : 'rgba(10,10,10,0.15)'} strokeWidth="1" />
                        <motion.circle
                          cx="24" cy="24" r="22" fill="none"
                          stroke={config.accent}
                          strokeWidth="1.5" strokeLinecap="round" strokeDasharray="16 100"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                          style={{ transformOrigin: '50% 50%' }}
                        />
                      </svg>
                      {/* Pastille avec effet de glow */}
                      <motion.span 
                        className={`absolute inset-[5px] rounded-full transition-all duration-400 ${section.id === 'mode' ? 'bg-white opacity-0 group-hover:opacity-100' : 'bg-ink opacity-0 group-hover:opacity-100'}`}
                        whileHover={{ scale: 1.1 }}
                      />
                      {/* Flèche améliorée */}
                      <motion.span
                        animate={{ x: [0, 2, 0], y: [0, -2, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                        className={`relative z-10 transition-colors duration-300 ${section.id === 'mode' ? 'text-white group-hover:text-ink' : 'text-ink group-hover:text-white'}`}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M7 17L17 7M17 7H9M17 7V15" />
                        </svg>
                      </motion.span>
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  </section>
);

// ─── PAGE ─────────────────────────────────────────
const Home = () => (
  <main className="min-h-screen bg-bg">
    <Hero />
    <Marquee />
    <TrustStrip />
    <BentoGrid />
  </main>
);

export default Home;
