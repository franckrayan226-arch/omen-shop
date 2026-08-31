import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getProductBySlug } from '../lib/api';
import { normalizeString } from '../data/products';
import ProductVisual from '../components/ProductVisual';
import PaymentModal from '../components/PaymentModal';

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [payOpen, setPayOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    setProduct(null);
    getProductBySlug(null, slug).then((p) => {
      if (mounted) setProduct(p);
    });
    return () => { mounted = false; };
  }, [slug]);

  const availableSizes = (product?.sizes || []).filter((s) => s.available);

  const sizeLabel =
    product?.section === 'mode' ? 'Pointures' :
    product?.section === 'bienetre' ? 'Formats' : 'Versions';

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <p className="font-body text-sm text-ink-muted">Chargement…</p>
      </div>
    );
  }

  const activeColor = selectedColor || product.colors?.[0] || null;

  return (
    <motion.div
      className="min-h-screen bg-bg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Top bar */}
      <div className="sticky top-0 z-40 flex items-center gap-3 border-b border-border bg-bg/80 backdrop-blur-md px-4 sm:px-6 lg:px-8 h-[56px]">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex h-8 w-8 items-center justify-center rounded border border-border text-ink-muted hover:text-ink hover:border-ink transition-colors"
          aria-label="Retour"
        >
          ←
        </button>
        <div className="flex-1 min-w-0">
          <p className="font-mono text-[10px] font-medium uppercase tracking-wider text-ink-muted truncate">
            {product.brand} / {product.section}
          </p>
        </div>
        <Link
          to="/boutique"
          className="font-body text-sm font-medium text-ink-muted hover:text-ink transition-colors"
        >
          Boutique
        </Link>
      </div>

      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Image */}
          <div className="rounded bg-[#F0EFEB] aspect-square flex items-center justify-center overflow-hidden">
            {product.image ? (
              <ProductVisual product={product} color={activeColor} className="w-full h-full" />
            ) : (
              <span className="text-6xl opacity-20">👟</span>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-4 sm:gap-5">
            <div className="flex items-center gap-2">
              {normalizeString(product.brand) !== 'omen' && (
                <span className="font-mono text-label-xs font-medium uppercase tracking-wider text-ink-muted">
                  {product.brand}
                </span>
              )}
              {product.isNew && (
                <span className="bg-ink px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-white">
                  New
                </span>
              )}
            </div>

            <h1 className="font-display text-display-md font-bold text-ink leading-tight">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-3">
              <span className="font-mono text-xl font-semibold text-ink" style={{ fontVariantNumeric: 'tabular-nums' }}>
                {product.price}
              </span>
              {product.oldPrice && (
                <span className="font-mono text-sm text-ink-muted line-through" style={{ fontVariantNumeric: 'tabular-nums' }}>
                  {product.oldPrice}
                </span>
              )}
            </div>

            {product.description && (
              <p className="font-body text-sm text-ink-muted leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Colors */}
            {product.colors?.length > 0 && (
              <div>
                <p className="font-mono text-label-xs font-medium uppercase tracking-wider text-ink-muted mb-3">
                  Couleur — {activeColor?.name}
                </p>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      aria-label={color.name}
                      aria-pressed={activeColor?.name === color.name}
                      className={`h-8 w-8 rounded-full border-2 transition-all ${
                        activeColor?.name === color.name
                          ? 'border-ink scale-110'
                          : 'border-border hover:border-ink-muted'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {availableSizes.length > 0 && (
              <div>
                <p className="font-mono text-label-xs font-medium uppercase tracking-wider text-ink-muted mb-3">
                  {sizeLabel}
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {availableSizes.map((s) => (
                    <button
                      key={s.size}
                      type="button"
                      onClick={() => setSelectedSize(s.size)}
                      className={`h-11 min-w-[44px] rounded px-3 font-mono text-sm transition-all ${
                        selectedSize === s.size
                          ? 'bg-ink text-white'
                          : 'bg-white border border-border text-ink hover:border-ink-muted'
                      }`}
                    >
                      {s.size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Meta */}
            {product.meta && (
              <p className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">
                {product.meta}
              </p>
            )}

            {/* CTA */}
            <div className="mt-auto pt-4">
              <button
                type="button"
                onClick={() => setPayOpen(true)}
                className="w-full rounded bg-ink py-4 font-body text-sm font-semibold text-white hover:bg-ink/90 transition-colors"
              >
                Commander — {product.price}
              </button>
              <p className="mt-3 text-center font-mono text-[10px] text-ink-muted">
                Paiement en ligne · Livraison 24–48h
              </p>
            </div>
          </div>
        </div>
      </div>

      <PaymentModal
        open={payOpen}
        onClose={() => setPayOpen(false)}
        product={product}
        section={product.section}
        size={selectedSize}
      />
    </motion.div>
  );
};

export default ProductDetail;
