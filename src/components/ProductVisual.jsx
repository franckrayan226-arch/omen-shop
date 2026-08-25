import { AnimatePresence, motion } from 'framer-motion';

const colorFilters = {
  '#FF3B1F': 'none',
  '#F1CCCC': 'hue-rotate(315deg) saturate(0.68) brightness(1.12)',
  '#1E3A5F': 'hue-rotate(175deg) saturate(0.9) brightness(0.78)',
  '#23365C': 'hue-rotate(178deg) saturate(0.82) brightness(0.76)',
  '#7A8B5C': 'hue-rotate(66deg) saturate(0.72)',
  '#C9D4C5': 'hue-rotate(75deg) saturate(0.32) brightness(1.12)',
  '#C98A3D': 'hue-rotate(18deg) saturate(1.14)',
  '#C9A227': 'hue-rotate(35deg) saturate(1.2)',
  '#C0C0C0': 'grayscale(1) brightness(1.12)',
  '#8C8C8C': 'grayscale(1) brightness(0.86)',
  '#9E9E9E': 'grayscale(1) brightness(0.94)',
  '#3A3A3A': 'grayscale(1) brightness(0.66)',
  '#0A0A0A': 'grayscale(1) brightness(0.42)',
  '#FFFFFF': 'grayscale(1) brightness(1.22)'
};

const ProductVisual = ({ product, color, className = '', dark = false }) => {
  const src = color?.image || product.image;
  if (!src) return null;
  const hasOwnImage = Boolean(color?.image);
  const filter = hasOwnImage ? 'none' : colorFilters[color?.hex] || 'none';

  return (
    <div className={`relative overflow-hidden ${className}`} aria-live="polite">
      <AnimatePresence mode="wait" initial={false}>
        <motion.img
          key={`${product.slug}-${color?.name || 'default'}`}
          src={src}
          alt={product.name}
          className="h-full w-full object-contain"
          initial={{ x: 34, opacity: 0, scale: 0.96 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: -34, opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.23, ease: [0.22, 1, 0.36, 1] }}
          style={{ filter, opacity: dark ? 0.9 : 0.96 }}
        />
      </AnimatePresence>
    </div>
  );
};

export default ProductVisual;
