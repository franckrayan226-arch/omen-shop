import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProductBySlug } from '../lib/api';
import ProductVisual from '../components/ProductVisual';
import PaymentModal from '../components/PaymentModal';

const PALE_PINK = '#F1CCCC';

const SneakerGlyph = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 340 240"
    preserveAspectRatio="xMidYMid meet"
    style={{ maxWidth: '88%' }}
  >
    {/* Ombre au sol */}
    <ellipse cx="170" cy="205" rx="150" ry="12" fill="#EDEDED" />
    {/* Semelle */}
    <path
      d="M 30 170 L 300 170 Q 312 170 312 180 L 312 188 Q 312 198 300 198 L 30 198 Q 18 198 18 188 L 18 180 Q 18 170 30 170 Z"
      fill="#DCDCDC"
    />
    {/* Tige / silhouette de profil, orientée vers la droite */}
    <path
      d="M 36 170 L 36 122 Q 36 92 62 90 Q 86 88 104 98 L 146 122 Q 196 137 250 131 Q 300 126 310 150 Q 314 162 308 170 Z"
      fill="#E8E8E8"
      stroke="#C9C9C9"
      strokeWidth="1.5"
    />
    {/* Ligne de lacets suggérée */}
    <path
      d="M 96 100 Q 120 106 140 120"
      fill="none"
      stroke="#CFCFCF"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const ProductDetail = ({ section }) => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [payOpen, setPayOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    setProduct(null);
    getProductBySlug(section, slug).then((p) => {
      if (mounted) setProduct(p);
    });
    return () => {
      mounted = false;
    };
  }, [section, slug]);

  const availableSizes = (product?.sizes || []).filter((s) => s.available);

  const label =
    section === 'mode' ? 'Pointures dispo' : section === 'bienetre' ? 'Formats' : 'Versions';

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <p className="text-sm" style={{ fontFamily: '"Manrope", sans-serif', color: '#8C8C8C' }}>
          Chargement…
        </p>
      </div>
    );
  }

  const activeColor = selectedColor || product.colors?.[0] || null;

  return (
    <motion.div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: '#FFFFFF', paddingBottom: 'calc(100px + env(safe-area-inset-bottom))' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* En-tête : OMEN SHOP + slogan + ligne rose */}
      <div className="relative px-6 pt-5 pb-2 text-center">
        <button
          onClick={() => navigate(-1)}
          aria-label="Retour"
          className="absolute left-4 top-3 flex items-center justify-center"
          style={{
            width: 44,
            height: 44,
            background: 'none',
            border: 'none',
            color: '#8C8C8C',
            cursor: 'pointer',
            fontFamily: '"Manrope", sans-serif',
            fontSize: 16
          }}
        >
          ←
        </button>

        <div
          className="uppercase"
          style={{
            fontFamily: '"Anton", sans-serif',
            fontSize: 22,
            letterSpacing: '0.22em',
            color: '#0A0A0A'
          }}
        >
          OMEN SHOP
        </div>
        <div
          className="mt-1.5 uppercase"
          style={{
            fontFamily: '"Manrope", sans-serif',
            fontSize: 10,
            letterSpacing: '0.42em',
            color: '#B5B5B5',
            fontWeight: 500
          }}
        >
          Dare to be different
        </div>
        <div className="mx-auto mt-3" style={{ width: 32, height: 2, backgroundColor: PALE_PINK }} />
      </div>

      {/* Grande photo produit */}
      <div className="px-4 mt-2">
        <div
          className="w-full flex items-center justify-center overflow-hidden"
          style={{
            backgroundColor: '#F7F7F7',
            minHeight: 300,
            padding: '20px 16px'
          }}
        >
          {product.image ? (
            <ProductVisual product={product} color={activeColor} className="w-full h-[260px] sm:h-[320px]" />
          ) : (
            <SneakerGlyph />
          )}
        </div>
        {/* Ligne horizontale fine de séparation */}
        <div className="h-px w-full" style={{ backgroundColor: '#E2E2E2' }} />
      </div>

      {/* Informations produit */}
      <div className="px-6 pt-6">
        <h1
          className="uppercase"
          style={{ fontFamily: '"Anton", sans-serif', fontSize: 42, color: '#0A0A0A' }}
        >
          {product.brand}
        </h1>
        <p className="mt-1.5" style={{ fontFamily: '"Manrope", sans-serif', fontSize: 13.5, color: '#6B6B6B' }}>
          {product.name}
        </p>
        <p className="mt-3 font-manrope font-bold" style={{ fontSize: 20, color: '#0A0A0A' }}>
          {product.price}
        </p>
        <p className="font-mono text-label mt-3 uppercase" style={{ color: product.stock <= 2 ? '#FF3B1F' : '#8C8C8C' }}>
          {product.stock <= 0 ? 'Rupture de stock' : `Stock : ${product.stock}`}
        </p>
        {product.description && (
          <p className="mt-1" style={{ fontFamily: '"Manrope", sans-serif', fontSize: 13, color: '#6B6B6B' }}>
            {product.description}
          </p>
        )}
        {product.colors?.length > 0 && (
          <div className="mt-5 flex items-center gap-3">
            <span className="font-manrope text-label uppercase" style={{ color: '#8C8C8C' }}>Couleur</span>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <button key={color.name} type="button" onClick={() => setSelectedColor(color)} aria-label={color.name} aria-pressed={activeColor?.name === color.name} style={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: color.hex, border: activeColor?.name === color.name ? '2px solid #0A0A0A' : '1px solid #E2E2E2', outline: '1px solid #FFFFFF', outlineOffset: -4, cursor: 'pointer' }} />
              ))}
            </div>
            <span className="font-manrope text-label" style={{ color: '#8C8C8C' }}>{activeColor?.name}</span>
          </div>
        )}
      </div>

      {/* Sélection des tailles */}
      <div className="px-6 pt-7">
        <p
          className="uppercase"
          style={{
            fontFamily: '"Manrope", sans-serif',
            fontSize: 10,
            letterSpacing: '0.3em',
            color: '#A8A8A8',
            fontWeight: 600
          }}
        >
          {label}
        </p>
        <div className="mt-3 grid grid-cols-5 gap-2" style={{ maxWidth: 360 }}>
          {availableSizes.map((s) => (
            <button
              key={s.size}
              onClick={() => setSelectedSize(s.size)}
              className="aspect-square flex items-center justify-center"
              style={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: 13,
                border: selectedSize === s.size ? '1px solid #0A0A0A' : '1px solid #E2E2E2',
                backgroundColor: selectedSize === s.size ? '#F5F5F5' : '#FFFFFF',
                color: selectedSize === s.size ? '#0A0A0A' : '#2B2B2B',
                minHeight: 44,
                cursor: 'pointer'
              }}
            >
              {s.size}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1" />

      {/* Barre de commande en bas de la zone visible */}
      <div
        className="fixed bottom-0 left-0 right-0"
        style={{
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid #F0F0F0',
          padding: '14px 24px calc(14px + env(safe-area-inset-bottom))'
        }}
      >
        <button
          onClick={() => setPayOpen(true)}
          className="flex items-center justify-center gap-3 py-3 w-full"
          style={{
            border: '1px solid #0A0A0A',
            backgroundColor: '#FFFFFF',
            minHeight: 52,
            cursor: 'pointer'
          }}
        >
          <span style={{ width: 8, height: 8, backgroundColor: PALE_PINK }} />
          <span
            className="uppercase"
            style={{
              fontFamily: '"Manrope", sans-serif',
              fontSize: 12,
              letterSpacing: '0.24em',
              color: '#0A0A0A',
              fontWeight: 600
            }}
          >
            Sur commande
          </span>
        </button>
      </div>

      <PaymentModal
        open={payOpen}
        onClose={() => setPayOpen(false)}
        product={product}
        section={section}
        size={selectedSize}
      />
    </motion.div>
  );
};

export default ProductDetail;
