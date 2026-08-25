import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import VideoBackground from './VideoBackground';
import ProductVisual from './ProductVisual';
import { getProductsForSection } from '../lib/api';
import { WHATSAPP_NUMBER } from '../data/payments';

const reveal = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
};

const CollectionCard = ({ product, section, accent, font, ink, muted, dark, calm }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || null);

  return (
    <div className="relative flex min-h-[365px] h-full flex-col justify-between overflow-hidden p-5 sm:min-h-[410px] sm:p-6" style={{ border: '1px solid rgba(255,255,255,0.28)', background: dark ? 'linear-gradient(150deg, rgba(255,255,255,0.14), rgba(255,255,255,0.045))' : 'linear-gradient(150deg, rgba(255,255,255,0.18), rgba(255,255,255,0.06))', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
      <Link to={`/${section}/${product.slug}`} className="absolute inset-0 z-10" aria-label={`Voir ${product.name}`} />
      <div className="pointer-events-none relative z-10">
        <p className="font-mono text-label" style={{ color: accent }}>{product.category}</p>
        <ProductVisual product={product} color={selectedColor} dark={dark} className="mt-2 h-[145px] sm:h-[170px]" />
        <h2 className={`${font} mt-3 text-section-title`} style={{ color: ink, fontWeight: calm ? 600 : undefined }}>{product.name}</h2>
        <p className="font-manrope text-body mt-3 max-w-[25ch]" style={{ color: muted }}>{product.description}</p>
      </div>
      <div className="pointer-events-none relative z-20 flex items-end justify-between gap-3 border-t pt-4" style={{ borderColor: 'rgba(255,255,255,0.20)' }}>
        <div>
          <p className="font-mono text-data" style={{ color: accent }}>{product.price}</p>
          <div className="pointer-events-auto mt-3 flex gap-2" aria-label={`Couleurs de ${product.name}`}>
            {product.colors?.map((color) => <button key={color.name} type="button" aria-label={color.name} aria-pressed={selectedColor?.name === color.name} onClick={() => setSelectedColor(color)} style={{ width: 18, height: 18, borderRadius: '50%', backgroundColor: color.hex, border: selectedColor?.name === color.name ? `2px solid ${accent}` : '1px solid rgba(255,255,255,0.65)', outline: '1px solid rgba(0,0,0,0.2)', outlineOffset: 2, cursor: 'pointer' }} />)}
          </div>
        </div>
        <span className="font-manrope text-label uppercase" style={{ color: ink }}>Découvrir</span>
      </div>
    </div>
  );
};

const CategoryCollection = ({ section, title, intro, videoName, accent, font, dark = false, calm = false, bandWords = [], marqueeDuration = 30 }) => {
  const [products, setProducts] = useState([]);
  const ink = dark ? '#F5F5F5' : '#FFFFFF';
  const muted = dark ? 'rgba(245,245,245,0.72)' : 'rgba(255,255,255,0.82)';

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
    <main className="min-h-screen relative" style={{ backgroundColor: dark ? '#0A0A0A' : '#2B2621' }}>
      <VideoBackground videoName={videoName} overlayOpacity={dark ? 0.42 : 0.48} />
      <div className="relative px-5 sm:px-8" style={{ zIndex: 1 }}>
        <section className="mx-auto max-w-7xl pt-28 pb-10 sm:pt-32 sm:pb-16">
          <motion.div initial="hidden" animate="visible" variants={reveal} className="max-w-2xl">
            <p className="font-mono text-label mb-4" style={{ color: accent }}>COLLECTION OMEN SHOP</p>
            <h1 className={`${font} text-hero sm:text-hero-lg`} style={{ color: ink, fontWeight: calm ? 600 : undefined }}>{title}</h1>
            <p className="font-manrope text-body-lg mt-5 max-w-xl" style={{ color: muted }}>{intro}</p>
          </motion.div>
        </section>
        {bandWords.length > 0 && (
          <div className="-mx-5 overflow-hidden border-y sm:-mx-8" style={{ borderColor: accent, backgroundColor: accent }} aria-hidden="true">
            <div className="omen-marquee-track" style={{ animationDuration: `${marqueeDuration}s` }}>
              {[0, 1].map((dup) => (
                <div key={dup} className="flex flex-none items-center">
                  {bandWords.map((word, i) => (
                    <span
                      key={i}
                      className={`${font} flex items-center uppercase`}
                      style={{
                        fontSize: 16,
                        letterSpacing: '0.08em',
                        color: '#0A0A0A',
                        padding: '13px 26px',
                        whiteSpace: 'nowrap',
                        fontWeight: calm ? 600 : undefined
                      }}
                    >
                      {word}
                      <span style={{ color: 'rgba(10,10,10,0.55)', fontSize: 8, marginLeft: 52 }}>•</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
        <motion.section className="no-scrollbar overflow-x-auto -mx-5 px-5 pb-12 sm:-mx-8 sm:px-8 sm:pb-20" style={{ scrollSnapType: 'x mandatory' }} initial="hidden" animate="visible" transition={{ staggerChildren: calm ? 0.16 : 0.09, delayChildren: 0.15 }} aria-label={`Produits ${title}`}>
          <div className="flex gap-4 sm:gap-5">
            {products.map((product) => (
              <motion.article key={product.slug} variants={reveal} className="flex-none" style={{ width: '290px', scrollSnapAlign: 'start' }}>
                <CollectionCard product={product} section={section} accent={accent} font={font} ink={ink} muted={muted} dark={dark} calm={calm} />
              </motion.article>
            ))}
          </div>
        </motion.section>
        <div className="mx-auto max-w-7xl pt-10 pb-12 sm:pb-16">
          <div className="flex flex-col gap-6 border p-6 sm:flex-row sm:items-center sm:justify-between sm:p-10" style={{ borderColor: 'rgba(255,255,255,0.28)', background: dark ? 'linear-gradient(150deg, rgba(255,255,255,0.14), rgba(255,255,255,0.045))' : 'linear-gradient(150deg, rgba(255,255,255,0.18), rgba(255,255,255,0.06))', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
            <div>
              <p className="font-mono text-label" style={{ color: accent }}>COMMANDE DIRECTE</p>
              <h2 className={`${font} text-2xl sm:text-3xl`} style={{ color: ink, fontWeight: calm ? 600 : undefined }}>Une pièce vous parle ?</h2>
              <p className="font-manrope text-body mt-3 max-w-md" style={{ color: muted }}>Envoyez votre choix sur WhatsApp, nous confirmons la disponibilité et on finalise ensemble.</p>
            </div>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Bonjour OMEN SHOP, je souhaite commander un article.')}`} target="_blank" rel="noopener noreferrer" className="font-manrope text-label flex flex-none items-center justify-center uppercase" style={{ backgroundColor: accent, color: '#0A0A0A', minHeight: 52, padding: '0 28px' }}>Discuter sur WhatsApp</a>
          </div>
          <div className="mt-6"><Link to="/" className="font-manrope text-body" style={{ color: muted }}>Retour à l'accueil</Link></div>
        </div>
      </div>
    </main>
  );
};

export default CategoryCollection;
