import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import Chips from '../components/Chips';
import { loadProducts } from '../lib/api';

const CHIP_OPTIONS = [
  { id: 'all', label: 'Tous' },
  { id: 'mode', label: 'Sneakers' },
  { id: 'electronique', label: 'Tech' },
  { id: 'bienetre', label: 'Soins' }
];

const Boutique = () => {
  const [activeChip, setActiveChip] = useState('all');
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    loadProducts().then(setAllProducts);
  }, []);

  const filtered =
    activeChip === 'all'
      ? allProducts
      : allProducts.filter((p) => p.section === activeChip);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAFAFA' }}>
      <div className="relative z-10 pt-24 md:pt-28 pb-28 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-anton text-4xl sm:text-5xl mb-2" style={{ color: '#0A0A0A' }}>
            BOUTIQUE
          </h1>
          <p className="font-manrope text-sm mb-6" style={{ color: '#666666' }}>
            Toute la collection OMEN SHOP.
          </p>

          <div className="mb-6">
            <Chips options={CHIP_OPTIONS} active={activeChip} onChange={setActiveChip} />
          </div>

          <motion.div
            className="no-scrollbar overflow-x-auto -mx-4 px-4 sm:-mx-6 sm:px-6"
            style={{ scrollSnapType: 'x mandatory' }}
            key={activeChip}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex gap-3 sm:gap-4">
              {filtered.map((product) => (
                <div
                  key={`${product.section}-${product.slug}`}
                  className="flex-none h-full"
                  style={{ width: 200, scrollSnapAlign: 'start' }}
                >
                  <ProductCard product={product} section={product.section} />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Boutique;
