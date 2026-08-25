import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import ProductVisual from './ProductVisual';
import { getProductsForSection } from '../lib/api';
import { WHATSAPP_NUMBER } from '../data/payments';

const ACCENT = '#FF3B1F';
const BONE = '#F4F2EE';
const INK = '#0C0C0C';

const ease = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 }
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1, duration: 0.55, ease } }
};

const viewOnce = { once: true, margin: '-70px' };

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

const scrollToSelection = () => {
  const target = document.getElementById('selection');
  if (!target) return;
  const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
  target.scrollIntoView({ behavior, block: 'start' });
};

const Grain = () => (
  <div aria-hidden="true" className="omen-grain pointer-events-none absolute inset-0 opacity-[0.07]" />
);

const MarqueeRow = ({ words, duration, reverse = false, dark = false }) => (
  <div className="overflow-hidden" style={{ backgroundColor: dark ? '#0A0A0A' : '#FAFAFA' }} aria-hidden="true">
    <div className="omen-marquee-track" style={{ animationDuration: `${duration}s`, animationDirection: reverse ? 'reverse' : 'normal' }}>
      {[0, 1].map((dup) => (
        <div key={dup} className="flex flex-none items-center">
          {words.map((word, i) => (
            <span key={i} className={`flex items-center whitespace-nowrap px-7 py-3 font-anton text-base uppercase tracking-[0.08em] ${dark ? 'text-white' : 'text-[#0A0A0A]'}`}>
              {word}
              <span className={`ml-14 text-[8px] ${dark ? 'text-white/50' : 'text-black/50'}`}>•</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);

const MarqueeBand = ({ words, duration = 22 }) => (
  <div className="border-y border-black/15" aria-hidden="true">
    <MarqueeRow words={words} duration={duration} />
    <MarqueeRow words={[...words].reverse()} duration={duration + 6} reverse dark />
  </div>
);

const ColorDots = ({ colors, selected, onSelect, dark = false }) => (
  <div className="relative z-30 flex items-center gap-2">
    {colors?.map((color) => {
      const active = selected?.name === color.name;
      return (
        <button
          key={color.name}
          type="button"
          aria-label={color.name}
          aria-pressed={active}
          onClick={() => onSelect(color)}
          className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF3B1F]"
          style={{
            width: 16,
            height: 16,
            borderRadius: '50%',
            backgroundColor: color.hex,
            border: active ? `2px solid ${ACCENT}` : `1px solid ${dark ? 'rgba(255,255,255,0.35)' : 'rgba(10,10,10,0.25)'}`,
            boxShadow: dark ? 'none' : '0 0 0 2px #FFFFFF',
            cursor: 'pointer',
            transition: 'transform 180ms ease'
          }}
        />
      );
    })}
  </div>
);

const ProductCard = ({ product, index = 0 }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || null);
  const discount = discountPercent(product.price, product.oldPrice);
  const number = String(index + 1).padStart(2, '0');

  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.22, ease } }}
      transition={{ duration: 0.55, ease, delay: index * 0.06 }}
      layout
      className={`group relative ${index % 2 === 1 ? 'lg:mt-20' : ''}`}
    >
      <Link to={`/mode/${product.slug}`} className="absolute inset-0 z-20" aria-label={`Voir ${product.name}`} />

      <div className="flex items-baseline justify-between pb-3">
        <p className="font-mono text-xs tracking-[0.1em] text-black/40">{number}</p>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-black/40">{product.brand}</p>
      </div>

      <div className="relative aspect-[4/3] overflow-hidden bg-[#E9E5DD] transition-colors duration-500 ease-out group-hover:bg-[#FF3B1F]">
        <div className="absolute inset-0 p-9 sm:p-11">
          <div className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.09] group-hover:-rotate-2">
            <ProductVisual product={product} color={selectedColor} className="h-full w-full" />
          </div>
        </div>

        <div className="absolute -top-2 right-6 z-30 flex gap-2" aria-hidden="true">
          {discount && (
            <motion.span
              layoutId={`sticker-${product.slug}`}
              className="-rotate-6 bg-[#FF3B1F] px-3 py-2 font-anton text-sm uppercase tracking-wider text-white shadow-[3px_3px_0_rgba(12,12,12,1)] transition-transform duration-300 group-hover:rotate-0 group-hover:scale-110"
            >
              {discount}
            </motion.span>
          )}
          {product.isNew && !discount && (
            <span className="rotate-3 bg-[#0A0A0A] px-3 py-2 font-anton text-sm uppercase tracking-wider text-white shadow-[3px_3px_0_rgba(255,59,31,1)] transition-transform duration-300 group-hover:rotate-0">
              New
            </span>
          )}
        </div>

        <span className="absolute bottom-5 left-5 z-30 translate-y-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          Voir la pièce →
        </span>
      </div>

      <div className="flex items-start justify-between gap-4 pt-5">
        <h3 className="font-anton text-2xl uppercase leading-none tracking-wide text-[#0A0A0A]">{product.name}</h3>
        <div className="flex flex-none items-baseline gap-2 pt-1">
          <span className="font-mono text-base text-[#0A0A0A]" style={{ fontVariantNumeric: 'tabular-nums' }}>{product.price}</span>
          {product.oldPrice && (
            <span className="font-mono text-xs text-black/35 line-through" style={{ fontVariantNumeric: 'tabular-nums' }}>{product.oldPrice}</span>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-black/10 pt-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-black/40">{product.category} — {product.meta}</p>
        <ColorDots colors={product.colors} selected={selectedColor} onSelect={setSelectedColor} />
      </div>
    </motion.article>
  );
};

const Hero = ({ products }) => {
  const heroProduct = products[0];
  const count = String(products.length || 0).padStart(2, '0');

  return (
    <>
      <header className="relative overflow-hidden" style={{ backgroundColor: INK }}>
        <Grain />
        <div className="relative z-10 mx-auto max-w-7xl px-5 pt-[58px] sm:px-8">
          <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col items-center pb-14 pt-10 text-center sm:pb-16 sm:pt-14">
            <motion.p variants={fadeUp} className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] sm:text-[11px]" style={{ color: ACCENT }}>
              <span className="inline-block h-2 w-2" style={{ backgroundColor: ACCENT }} />
              New Drop — Collection 2026
            </motion.p>

            <div className="relative mt-4 w-full">
              <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-12 z-0 h-[135%]" style={{ background: 'radial-gradient(55% 55% at 50% 40%, rgba(255,255,255,0.1), transparent 70%)' }} />
              <motion.h1
                variants={fadeUp}
                className="relative z-0 select-none text-center font-anton uppercase leading-[0.8] text-white"
                style={{ fontSize: 'clamp(6.5rem, 32vw, 19rem)', letterSpacing: '0.01em' }}
              >
                MODE
              </motion.h1>

              {heroProduct && (
                <motion.div variants={fadeUp} className="relative z-10 mx-auto w-[min(560px,88vw)]" style={{ marginTop: 'clamp(-12rem, -27vw, -4.5rem)' }}>
                  <div aria-hidden="true" className="absolute bottom-[9%] left-1/2 z-0 h-[9%] w-[60%] -translate-x-1/2 rounded-[100%] bg-black blur-2xl" style={{ opacity: 0.75 }} />
                  <div aria-hidden="true" className="absolute inset-x-16 bottom-8 z-0 h-16" style={{ background: 'radial-gradient(50% 60% at 50% 60%, rgba(255,59,31,0.28), transparent 72%)' }} />
                  <div className="relative z-10" style={{ filter: 'saturate(0.6) drop-shadow(0 40px 32px rgba(0,0,0,0.6))' }}>
                    <ProductVisual product={heroProduct} className="aspect-square w-full" />
                  </div>
                </motion.div>
              )}
            </div>

            <motion.div variants={fadeUp} className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={scrollToSelection}
                className="bg-white font-anton text-base uppercase tracking-[0.18em] text-[#0A0A0A] transition-colors duration-200 hover:bg-[#FF3B1F] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                style={{ minHeight: 66, padding: '0 48px', cursor: 'pointer', border: 'none' }}
              >
                Découvrir la sélection ↓
              </button>
            </motion.div>

            <motion.p variants={fadeUp} className="mt-7 max-w-md font-fraunces text-lg italic leading-relaxed text-white/60">
              Rare pairs, hand-picked — verified & ready to ship.
            </motion.p>
          </motion.div>

          <div className="relative z-10 grid grid-cols-1 border-t border-white/10 sm:grid-cols-3 sm:divide-x sm:divide-white/10">
            {[
              [`${count} pièces`, 'Curatées à la main'],
              ['24–48h', 'Livraison express'],
              ['Mobile Money', 'Paiement 100% en ligne']
            ].map(([value, label], i) => (
              <div key={label} className={`py-6 sm:px-8 ${i === 0 ? 'sm:pl-0' : ''}`}>
                <p className="font-anton text-xl uppercase text-white sm:text-2xl">{value}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <MarqueeBand words={['SNEAKERS', 'STREETWEAR', 'ÉDITION LIMITÉE', 'NEW DROP']} />
    </>
  );
};

const Selection = ({ products }) => {
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
    <section id="selection" aria-label="Sélection sneakers" className="relative scroll-mt-20" style={{ backgroundColor: BONE }}>
      <span aria-hidden="true" className="absolute left-5 top-6 font-mono text-lg text-black/25 sm:left-8">+</span>
      <span aria-hidden="true" className="absolute right-5 top-6 font-mono text-lg text-black/25 sm:right-8">+</span>
      <span aria-hidden="true" className="absolute bottom-6 left-5 hidden font-mono text-lg text-black/25 sm:left-8 lg:block">+</span>
      <span aria-hidden="true" className="absolute bottom-6 right-5 hidden font-mono text-lg text-black/25 sm:right-8 lg:block">+</span>

      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewOnce}>
            <motion.p variants={fadeUp} className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: ACCENT }}>
              The Selection
            </motion.p>
            <motion.h2 variants={fadeUp} className="mt-4 leading-[0.9] text-[#0A0A0A]" style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}>
              <span className="font-anton uppercase">Pièces </span>
              <span className="font-fraunces italic" style={{ color: ACCENT }}>disponibles</span>
              <sup className="ml-3 align-super font-mono text-sm tracking-normal text-black/40">({String(visibleProducts.length).padStart(2, '0')})</sup>
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 font-fraunces text-lg italic text-black/55">
              Unique pieces. Never restocked.
            </motion.p>
          </motion.div>

          {categories.length > 2 && (
            <motion.nav
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewOnce}
              transition={{ duration: 0.5, ease }}
              className="flex flex-wrap gap-x-7 gap-y-3"
              aria-label="Filtrer par catégorie"
            >
              {categories.map((cat) => {
                const active = activeFilter === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveFilter(cat)}
                    aria-pressed={active}
                    className={`border-b-2 pb-1.5 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF3B1F] ${active ? 'border-[#FF3B1F] text-[#0A0A0A]' : 'border-transparent text-black/40 hover:text-black'}`}
                    style={{ cursor: 'pointer', backgroundColor: 'transparent' }}
                  >
                    {cat}
                  </button>
                );
              })}
            </motion.nav>
          )}
        </div>

        <motion.div layout className="mt-14 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visibleProducts.map((product, index) => (
              <ProductCard key={product.slug} product={product} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {visibleProducts.length === 0 && (
          <p className="py-20 text-center font-mono text-xs uppercase tracking-[0.16em] text-black/40">
            Aucune pièce dans cette catégorie pour le moment.
          </p>
        )}
      </div>
    </section>
  );
};

const Spotlight = ({ product }) => (
  <section aria-label="Pièce iconique" className="relative overflow-hidden" style={{ backgroundColor: INK }}>
    <Grain />

    <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center overflow-hidden">
      <div className="omen-marquee-track" style={{ animationDuration: '48s' }}>
        {[0, 1].map((dup) => (
          <div key={dup} className="flex flex-none items-center">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="whitespace-nowrap px-10 font-anton uppercase leading-none" style={{ fontSize: 'clamp(6rem, 15vw, 13rem)', color: 'rgba(255,255,255,0.06)' }}>
                {product.brand} — Retro —
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>

    <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-2 lg:gap-10">
      <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewOnce}>
        <motion.p variants={fadeUp} className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: ACCENT }}>
          Icon Piece — N°{String(product.id).padStart(2, '0')}
        </motion.p>

        <motion.h2 variants={fadeUp} className="mt-5 uppercase text-white" style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)', lineHeight: 0.88 }}>
          <span className="font-anton">{product.name.split(' ').slice(0, 2).join(' ')}</span>{' '}
          <span className="text-stroke-strong font-anton">{product.name.split(' ').slice(2).join(' ')}</span>
        </motion.h2>

        <motion.p variants={fadeUp} className="mt-7 max-w-md font-manrope text-body-lg leading-relaxed text-white/60">
          Une silhouette de collection qui traverse les époques sans perdre une once de sa présence. Cuir premium, finitions soignées, confort durable — la définition du classique moderne.
        </motion.p>

        <motion.dl variants={fadeUp} className="mt-9 max-w-md">
          {[
            ['Coloris', product.colors?.map((c) => c.name).join(' / ')],
            ['Pointures', product.meta],
            ['Prix', product.price]
          ].map(([label, value]) => (
            <div key={label} className="flex items-baseline justify-between gap-6 border-t border-white/12 py-3.5">
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">{label}</dt>
              <dd className="font-manrope text-sm text-white/90">{value}</dd>
            </div>
          ))}
        </motion.dl>

        <motion.div variants={fadeUp} className="mt-10">
          <Link
            to={`/mode/${product.slug}`}
            className="inline-flex items-center justify-center border-2 border-white px-9 font-anton text-base uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:bg-[#FF3B1F] hover:border-[#FF3B1F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            style={{ minHeight: 54 }}
          >
            View Product
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewOnce}
        transition={{ duration: 0.75, ease }}
        className="group relative mx-auto w-full max-w-md lg:max-w-[460px]"
      >
        <div aria-hidden="true" className="absolute inset-0 translate-x-5 translate-y-5" style={{ backgroundColor: ACCENT }} />
        <div className="omen-float relative -rotate-3 bg-[#EBE7DF] p-11 transition-transform duration-500 ease-out group-hover:rotate-0 sm:p-14">
          <ProductVisual product={product} className="aspect-square w-full" />
        </div>
        <p className="mt-6 text-right font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">Fig. {String(product.id).padStart(2, '0')} — vue principale</p>
      </motion.div>
    </div>
  </section>
);

const services = [
  {
    id: '01',
    title: 'Fast Delivery',
    text: 'Expédition en 24–48h dans toute la ville, suivi de commande en temps réel jusqu’à ta porte.'
  },
  {
    id: '02',
    title: '100% Authentic',
    text: 'Chaque paire est vérifiée pièce par pièce avant envoi. Original garanti ou remboursé.'
  },
  {
    id: '03',
    title: 'Mobile Payment',
    text: 'Orange Money, Wave, Moov ou Télécel — tout se règle directement sur le site, ton reçu est envoyé automatiquement.',
    logos: [
      { src: '/logos/orange-money.png', alt: 'Orange Money' },
      { src: '/logos/wave.png', alt: 'Wave' },
      { src: '/logos/moov.png', alt: 'Moov Money' },
      { src: '/logos/telecel.png', alt: 'Télécel Money' }
    ]
  }
];

const Services = () => (
  <section aria-label="Services" style={{ backgroundColor: BONE }}>
    <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
      <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewOnce}>
        <motion.p variants={fadeUp} className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: ACCENT }}>Why OMEN</motion.p>
        <motion.h2 variants={fadeUp} className="mt-4" style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', lineHeight: 0.9 }}>
          <span className="font-anton uppercase text-[#0A0A0A]">Acheter </span>
          <span className="font-fraunces italic text-[#0A0A0A]">autrement.</span>
        </motion.h2>
      </motion.div>

      <motion.div initial="hidden" whileInView="visible" viewport={viewOnce} variants={{ visible: { transition: { staggerChildren: 0.12 } } }} className="mt-14">
        {services.map((service, i) => (
          <motion.article
            key={service.id}
            variants={fadeUp}
            className={`group grid grid-cols-1 items-baseline gap-3 border-t border-black/15 py-8 transition-all duration-300 hover:bg-white sm:grid-cols-12 sm:gap-6 sm:py-10 ${i === services.length - 1 ? 'border-b' : ''} sm:px-4`}
          >
            <p className="font-mono text-sm sm:col-span-1" style={{ color: ACCENT }}>{service.id}</p>
            <h3 className="font-anton text-2xl uppercase tracking-wide text-[#0A0A0A] transition-transform duration-300 group-hover:translate-x-2 sm:col-span-4">{service.title}</h3>
            <div className="sm:col-span-7">
              <p className="max-w-xl font-manrope text-body leading-relaxed text-black/60">{service.text}</p>
              {service.logos && (
                <div className="mt-4 flex items-center gap-5">
                  {service.logos.map((logo) => (
                    <img key={logo.alt} src={logo.src} alt={logo.alt} loading="lazy" className="h-6 w-auto opacity-60 transition-opacity duration-200 hover:opacity-100" />
                  ))}
                </div>
              )}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </div>
  </section>
);

const Finale = () => (
  <section aria-label="Commande directe" className="relative overflow-hidden" style={{ backgroundColor: ACCENT }}>
    <span aria-hidden="true" className="pointer-events-none absolute -bottom-[0.16em] left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-anton uppercase leading-none" style={{ fontSize: 'clamp(7rem, 22vw, 19rem)', color: 'transparent', WebkitTextStroke: '1px rgba(12,12,12,0.16)' }}>
      Omen Shop
    </span>

    <div className="relative z-10 mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewOnce}>
        <motion.p variants={fadeUp} className="font-mono text-[11px] uppercase tracking-[0.2em] text-black/60">Direct Order</motion.p>
        <motion.h2 variants={fadeUp} className="mt-5 uppercase text-[#0A0A0A]" style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', lineHeight: 0.88 }}>
          <span className="font-anton">Ta prochaine </span>
          <span className="font-fraunces normal-case italic">paire</span>
          <br />
          <span className="font-anton">t’attend.</span>
        </motion.h2>

        <motion.p variants={fadeUp} className="mt-7 max-w-md font-manrope text-body-lg leading-relaxed text-black/65">
          Envoie ta sélection sur WhatsApp : disponibilités, pointures et paiement se règlent en quelques minutes.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-11 flex flex-wrap items-center gap-4">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Bonjour OMEN SHOP, je souhaite commander un article.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-[#0A0A0A] font-anton text-sm uppercase tracking-[0.16em] text-white transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black active:translate-y-0"
            style={{ minHeight: 58, padding: '0 36px' }}
          >
            Discuter sur WhatsApp
          </a>
          <Link
            to="/"
            className="inline-flex items-center justify-center border-2 border-black/70 font-manrope text-[12px] uppercase tracking-[0.16em] text-black transition-colors duration-200 hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            style={{ minHeight: 58, padding: '0 28px' }}
          >
            Retour à l’accueil
          </Link>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

const ModeCollection = ({
  section = 'mode'
}) => {
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
    () => products.find((p) => p.slug === 'jordan-3-retro') || products[0] || null,
    [products]
  );

  return (
    <main className="min-h-screen" style={{ backgroundColor: BONE }}>
      <Hero products={products} />
      <Selection products={products} />
      {spotlight && <Spotlight product={spotlight} />}
      <Services />
      <Finale />
    </main>
  );
};

export default ModeCollection;
