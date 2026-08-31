import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { normalizeString } from '../data/products';

const ProductCard = ({ product, index = 0 }) => {
  const discount = (() => {
    if (!product.oldPrice) return null;
    const p = parseInt(String(product.price).replace(/[^\d]/g, ''), 10);
    const o = parseInt(String(product.oldPrice).replace(/[^\d]/g, ''), 10);
    if (!p || !o || o <= p) return null;
    return `-${Math.round((1 - p / o) * 100)}%`;
  })();

  const availableSizes = (product.sizes || []).filter((s) => s.available);
  const totalSizes = (product.sizes || []).length;
  const sizeText = totalSizes === 0
    ? null
    : availableSizes.length === totalSizes
      ? `Toutes tailles (${totalSizes})`
      : availableSizes.length === 0
        ? 'Rupture de tailles'
        : `${availableSizes.length} taille${availableSizes.length > 1 ? 's' : ''} sur ${totalSizes}`;

  // Marque: ignorer "omen" (c'est le nom du store, pas une marque)
  const brandNorm = normalizeString(product.brand);
  const displayBrand = brandNorm && brandNorm !== 'omen' ? product.brand.trim() : null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <Link
        to={`/produit/${product.slug}`}
        className="block"
        aria-label={`Voir ${product.name}`}
      >
        {/* Image */}
        <div className="relative aspect-square overflow-hidden rounded bg-[#F0EFEB]">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-105"
          />

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="bg-ink px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-white">
                New
              </span>
            )}
            {discount && (
              <span className="bg-accent px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-white">
                {discount}
              </span>
            )}
            {availableSizes.length === 0 && totalSizes > 0 && (
              <span className="bg-accent px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-white">
                Sold Out
              </span>
            )}
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="mb-4 translate-y-2 font-mono text-[10px] font-bold uppercase tracking-wider text-white transition-transform duration-300 group-hover:translate-y-0">
              Voir le produit →
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="mt-3 flex flex-col gap-0.5">
          {displayBrand && (
            <span className="font-mono text-[10px] font-medium uppercase tracking-wider text-ink-muted">
              {displayBrand}
            </span>
          )}
          <h3 className="font-display text-sm font-bold text-ink leading-tight line-clamp-1">
            {product.name}
          </h3>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="font-mono text-sm font-medium text-ink" style={{ fontVariantNumeric: 'tabular-nums' }}>
              {product.price}
            </span>
            {product.oldPrice && (
              <span className="font-mono text-xs text-ink-muted line-through" style={{ fontVariantNumeric: 'tabular-nums' }}>
                {product.oldPrice}
              </span>
            )}
          </div>
          {sizeText && (
            <span className="font-mono text-[10px] text-ink-muted mt-0.5">
              {sizeText}
            </span>
          )}
        </div>
      </Link>
    </motion.article>
  );
};

export default ProductCard;
