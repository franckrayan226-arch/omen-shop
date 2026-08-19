import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navigation = () => {
  const location = useLocation();

  // Masquer la nav sur les fiches produit (header dédié dans la page)
  const isProductPage = /^\/(mode|bienetre|electronique)\/[^/]+$/.test(location.pathname);
  if (isProductPage) return null;

  const navVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const linkVariants = {
    hover: { scale: 1.05, color: '#FF3B1F' },
    tap: { scale: 0.95 }
  };

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50"
      style={{ backgroundColor: '#FAFAFA', borderBottom: '1px solid #E2E2E2' }}
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        <Link to="/" className="font-anton text-xl sm:text-2xl" style={{ color: '#0A0A0A' }}>
          OMEN SHOP
        </Link>
        
        <div className="flex items-center gap-4 ml-3 sm:gap-8 no-scrollbar overflow-x-auto">
          <Link to="/boutique">
            <motion.span
              className="font-manrope text-[11px] sm:text-sm uppercase tracking-wider flex-none"
              style={{ color: '#0A0A0A' }}
              variants={linkVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Boutique
            </motion.span>
          </Link>
          <Link to="/favoris">
            <motion.span
              className="font-manrope text-[11px] sm:text-sm uppercase tracking-wider flex-none"
              style={{ color: '#0A0A0A' }}
              variants={linkVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Favoris
            </motion.span>
          </Link>
          <Link to="/compte">
            <motion.span
              className="font-manrope text-[11px] sm:text-sm uppercase tracking-wider flex-none"
              style={{ color: '#0A0A0A' }}
              variants={linkVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Compte
            </motion.span>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;