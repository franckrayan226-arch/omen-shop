import { Link } from 'react-router-dom';
import ProductVisual from './ProductVisual';

const ProductCard = ({ product, section }) => {
  return (
    <Link to={`/${section}/${product.slug}`} className="block h-full">
      <div
        className="h-full border overflow-hidden"
        style={{
          borderColor: '#E2E2E2',
          backgroundColor: '#FAFAFA',
          transition: 'transform 220ms ease, border-color 220ms ease'
        }}
      >
        {/* Visuel studio uniforme : ratio 4:5, fond clair, image teintée comme les sections */}
        <div
          className="overflow-hidden"
          style={{ backgroundColor: '#F4F4F6', aspectRatio: '4 / 5' }}
        >
          <ProductVisual
            product={product}
            color={product.colors?.[0] || null}
            className="h-full w-full"
          />
        </div>

        {/* Nom + prix alignés à gauche, typographie sombre */}
        <div className="p-3 sm:p-4">
          <h3
            className="font-manrope text-sm font-semibold leading-snug"
            style={{ color: '#0A0A0A' }}
          >
            {product.name}
          </h3>
          <p className="font-manrope text-sm mt-1" style={{ color: '#666666' }}>
            {product.price}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
