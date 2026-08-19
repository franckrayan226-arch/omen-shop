import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AmbientBackground from '../components/AmbientBackground';

const universes = [
  { path: '/mode', title: 'MODE', caption: 'Sneakers et streetwear sélectionnés pièce par pièce.', accent: '#FF3B1F', font: 'font-anton', number: '01' },
  { path: '/bienetre', title: 'BIEN-ÊTRE', caption: 'Des essentiels de soin pensés comme un rituel.', accent: '#7A8B5C', font: 'font-fraunces', number: '02' },
  { path: '/electronique', title: 'ÉLECTRONIQUE', caption: 'Des objets techniques qui méritent leur place.', accent: '#00D4FF', font: 'font-mono', number: '03' }
];

const tileMotion = {
  rest: { y: 0, rotate: 0 },
  hover: { y: -8, rotate: -0.35, transition: { type: 'spring', stiffness: 260, damping: 18, mass: 0.7 } }
};

const Home = () => (
  <main className="min-h-screen relative" style={{ backgroundColor: '#FAFAFA' }}>
    <AmbientBackground section="common" />
    <div className="relative px-5 pb-12 pt-28 sm:px-8 sm:pb-20 sm:pt-36" style={{ zIndex: 1 }}>
      <section className="mx-auto max-w-7xl grid grid-cols-1 gap-8 pb-12 lg:grid-cols-12 lg:items-end lg:gap-12 lg:pb-20">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }} className="font-anton text-[56px] leading-[0.9] sm:text-[84px] lg:col-span-8 lg:text-[116px]" style={{ color: '#0A0A0A', letterSpacing: '-0.02em' }}>OMEN<br />SHOP</motion.h1>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.16 }} className="lg:col-span-4 lg:pb-2">
          <p className="font-mono text-label mb-4" style={{ color: '#FF3B1F' }}>CURATED GOODS / 2026</p>
          <p className="font-manrope text-body-lg max-w-sm" style={{ color: '#8C8C8C' }}>Trois univers, une sélection exigeante. Entrez par ce qui vous ressemble.</p>
        </motion.div>
      </section>

      {/* Bande défilante animée */}
      <motion.div
        className="-mx-5 overflow-hidden border-y sm:-mx-8"
        style={{ borderColor: '#E2E2E2', backgroundColor: '#FFFFFF' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        aria-hidden="true"
      >
        <div className="omen-marquee-track">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex flex-none items-center">
              {['OMEN SHOP', 'CURATED GOODS', 'MODE', 'BIEN-ÊTRE', 'ÉLECTRONIQUE', 'BOUTIQUE'].map((word, i) => (
                <span
                  key={i}
                  className="flex items-center font-anton uppercase"
                  style={{
                    fontSize: 18,
                    letterSpacing: '0.08em',
                    color: i % 2 === 0 ? '#0A0A0A' : '#8C8C8C',
                    padding: '14px 22px',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {word}
                  <span style={{ color: '#FF3B1F', fontSize: 10, marginLeft: 44 }}>•</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </motion.div>

      <motion.section className="mx-auto max-w-7xl mt-10 sm:mt-12 grid grid-cols-1 gap-4 md:grid-cols-3" initial="hidden" animate="visible" transition={{ staggerChildren: 0.12, delayChildren: 0.25 }} aria-label="Nos univers">
        {universes.map((universe) => (
          <motion.div key={universe.path} variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55 } } }}>
            <Link to={universe.path} className="group block focus:outline-none">
              <motion.article initial="rest" animate="rest" whileHover="hover" whileTap={{ scale: 0.985 }} variants={tileMotion} className="home-tile relative min-h-[310px] overflow-hidden p-6 sm:min-h-[390px] sm:p-7" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E2E2' }}>
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{ background: `linear-gradient(150deg, ${universe.accent}26 0%, rgba(255,255,255,0) 40%)` }}
                />
                <motion.div
                  className={`${universe.font} pointer-events-none absolute bottom-[-0.08em] right-2 leading-[0.8]`}
                  style={{ fontSize: 'clamp(96px, 22vw, 150px)', color: universe.accent, opacity: 0.2, letterSpacing: '-0.02em' }}
                  variants={{ rest: { scale: 1, rotate: 0 }, hover: { scale: 1.06, rotate: -2 } }}
                  aria-hidden="true"
                >
                  {universe.number}
                </motion.div>
                <div className="relative flex h-full min-h-[262px] flex-col justify-between sm:min-h-[334px]">
                  <div className="flex justify-between"><p className="font-mono text-label home-tile-text" style={{ color: '#0A0A0A' }}>OMEN SHOP</p><span className="font-mono text-label home-tile-text" style={{ color: universe.accent }}>{universe.number}</span></div>
                  <div>
                    <h2 className={`${universe.font} text-hero home-tile-title`}>{universe.title}</h2>
                    <p className="font-manrope text-body mt-4 max-w-[26ch] home-tile-text">{universe.caption}</p>
                    <p className="font-manrope text-label mt-7 uppercase home-tile-cta" style={{ color: universe.accent }}>Explorer la collection</p>
                  </div>
                </div>
              </motion.article>
            </Link>
          </motion.div>
        ))}
      </motion.section>
    </div>
  </main>
);

export default Home;
