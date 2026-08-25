import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ease = [0.25, 0.1, 0.25, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 }
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15, duration: 0.7, ease } }
};

const viewOnce = { once: true, margin: '-60px' };

const PAPER = '#FAFAF7';
const INK = '#0B0D12';
const INK_MUTE = 'rgba(11,13,18,0.55)';

const universes = [
  {
    path: '/mode',
    index: '01',
    name: 'MODE',
    nameClass: 'font-anton uppercase',
    tag: 'Sneakers & streetwear',
    caption: 'Du classique intemporel à l’édition limitée.',
    field: '#0A0A0A',
    hoverInk: '#FFFFFF',
    numeral: '#FF3B1F'
  },
  {
    path: '/bienetre',
    index: '02',
    name: 'Bien-être',
    nameClass: 'font-fraunces italic',
    tag: 'Grooming & soin',
    caption: 'Minoxidil, derma roller et essentiels testés.',
    field: '#EDEAE0',
    hoverInk: '#2B2621',
    numeral: '#7A8B5C'
  },
  {
    path: '/electronique',
    index: '03',
    name: 'ÉLECTRO',
    nameClass: 'font-manrope font-extrabold uppercase tracking-tight',
    tag: 'Audio · Wearables · Optique',
    caption: 'Des devices scannés sur 12 points de contrôle.',
    field: '#E9E7F5',
    hoverInk: '#14142B',
    numeral: '#1D4ED8'
  }
];

const Hero = () => (
  <header className="relative overflow-hidden" style={{ backgroundColor: PAPER }}>
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 1 }}
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 left-[33.33%] hidden w-px bg-black/[0.05] lg:block"
    />
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.9, duration: 1 }}
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 left-[66.66%] hidden w-px bg-black/[0.05] lg:block"
    />

    <div className="relative z-10 mx-auto flex min-h-[86vh] max-w-7xl flex-col justify-center px-5 pb-16 pt-[140px] sm:px-8">
      <motion.div variants={stagger} initial="hidden" animate="visible">
        <motion.p variants={fadeUp} className="flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-black/40">
          <motion.span
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.4, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            aria-hidden="true"
            className="inline-block h-2 w-2 rounded-[2px]"
            style={{ backgroundColor: '#FF3B1F' }}
          />
          <motion.span
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            aria-hidden="true"
            className="inline-block h-2 w-2 rounded-[2px]"
            style={{ backgroundColor: '#7A8B5C' }}
          />
          <motion.span
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.6, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            aria-hidden="true"
            className="inline-block h-2 w-2 rounded-[2px]"
            style={{ backgroundColor: '#1D4ED8' }}
          />
          Omen Shop — Curated goods
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="mt-12 select-none"
          style={{ fontSize: 'clamp(3rem, 8.5vw, 7rem)', lineHeight: 0.96, letterSpacing: '-0.015em', color: INK }}
        >
          <span className="font-anton uppercase">Trois univers,</span>
          <br />
          <span className="font-fraunces italic font-light">
            une{' '}
            <motion.span
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0% 0 0)' }}
              transition={{ delay: 1.2, duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="inline-block"
              style={{ color: '#FF3B1F' }}
            >
              exigence.
            </motion.span>
          </span>
        </motion.h1>

        <motion.p variants={fadeUp} className="mt-8 max-w-md font-manrope text-body-lg leading-relaxed" style={{ color: INK_MUTE }}>
          Sneakers, soin et tech — chaque monde a sa propre signature, la même exigence partout.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-11 flex flex-wrap items-center gap-6">
          <motion.a
            href="#index"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('index')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border-2 border-[#0B0D12] font-manrope text-[13px] font-bold text-[#0B0D12] transition-all duration-300 hover:bg-[#0B0D12] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            style={{ minHeight: 54, padding: '0 32px' }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Explorer</span>
            <motion.span
              className="relative z-10"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              ↓
            </motion.span>
          </motion.a>
          <span className="font-mono text-[10px]" style={{ color: INK_MUTE }}>Ouaga — depuis 2024</span>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-black/35"
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-block"
        >
          défiler ↓
        </motion.span>
      </motion.div>
    </div>
  </header>
);

const IndexRow = ({ u }) => (
  <motion.div variants={fadeUp}>
    <Link
      to={u.path}
      className="group relative block overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px]"
      style={{ outlineColor: u.numeral }}
      aria-label={`${u.name} — ${u.tag}`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 origin-left scale-x-0 transition-transform duration-[600ms] ease-out group-hover:scale-x-100"
        style={{ backgroundColor: u.field }}
      />

      <span className="relative grid grid-cols-[auto_1fr_auto] items-center gap-5 px-2 py-10 transition-colors duration-[600ms] group-hover:text-inherit sm:gap-10 sm:px-6 sm:py-12">
        <span
          className="font-fraunces text-[clamp(1.8rem,4.2vw,3.2rem)] font-light italic leading-none transition-colors duration-[600ms]"
          style={{ color: u.numeral }}
        >
          {u.index}
        </span>

        <span className="min-w-0">
          <span
            className={`block truncate text-[clamp(2rem,5vw,4rem)] leading-none transition-all duration-[600ms] group-hover:translate-x-3 ${u.nameClass}`}
            style={{ color: 'inherit' }}
          >
            {u.name}
          </span>
          <span
            className="mt-2 block font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-[600ms]"
            style={{ color: 'rgba(11,13,18,0.35)' }}
          >
            {u.tag}
          </span>
        </span>

        <span className="flex flex-col items-end gap-3">
          <span className="hidden max-w-[240px] text-right font-manrope text-[13px] leading-relaxed opacity-0 transition-opacity duration-[600ms] group-hover:opacity-100 md:block" style={{ color: 'inherit' }}>
            {u.caption}
          </span>
          <span
            aria-hidden="true"
            className="flex items-center transition-all duration-[600ms] group-hover:pr-1"
            style={{ color: 'inherit' }}
          >
            <span className="mr-2 flex items-center gap-1">
              {u.index === '01' && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              )}
              {u.index === '02' && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:rotate-45">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 8v8M8 12h8"/>
                </svg>
              )}
              {u.index === '03' && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:scale-110">
                  <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5"/>
                  <path d="M12 22v-8M12 14l-4-4M12 14l4-4"/>
                </svg>
              )}
            </span>
          </span>
        </span>
      </span>
    </Link>
  </motion.div>
);

const Index = () => (
  <section id="index" aria-label="Index des univers" className="relative scroll-mt-16 bg-white">
    <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewOnce} className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <motion.p variants={fadeUp} className="font-mono text-[10px] font-medium uppercase tracking-[0.32em] text-black/35">
            L’index
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-5 font-manrope text-[clamp(1.9rem,4.2vw,3rem)] font-extrabold tracking-tight"
            style={{ color: INK }}
          >
            Choisissez votre <span className="font-fraunces italic font-medium">chapitre.</span>
          </motion.h2>
        </div>
        <motion.p variants={fadeUp} className="max-w-xs font-manrope text-body leading-relaxed" style={{ color: INK_MUTE }}>
          Survolez un chapitre — chaque univers peint la page à sa couleur.
        </motion.p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewOnce}
        variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        className="mt-16 border-t"
        style={{ borderColor: 'rgba(11,13,18,0.12)' }}
      >
        {universes.map((u) => (
          <IndexRow key={u.path} u={u} />
        ))}
      </motion.div>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewOnce}
        className="mt-20 text-center font-fraunces text-lg italic" style={{ color: INK_MUTE }}
      >
        Une seule exigence — l’authenticité.
      </motion.p>
    </div>
  </section>
);

const MetaStrip = () => (
  <div
    className="flex h-11 items-center justify-between border-t px-5 font-mono text-[9px] font-medium uppercase tracking-[0.18em] text-black/40 sm:px-8"
    style={{ borderColor: 'rgba(11,13,18,0.1)', backgroundColor: '#FAFAFA' }}
  >
    <span>Omen Shop © 2026</span>
    <span className="hidden sm:inline">Livraison 24–48h</span>
    <span className="hidden md:inline">Paiement 100% en ligne</span>
    <span>Support WhatsApp</span>
  </div>
);

const Home = () => (
  <main className="min-h-screen" style={{ backgroundColor: PAPER }}>
    <Hero />
    <Index />
    <MetaStrip />
  </main>
);

export default Home;
