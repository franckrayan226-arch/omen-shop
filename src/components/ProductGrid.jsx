import ProductCard from './ProductCard';

const ProductGrid = ({ products }) => {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-4 text-4xl opacity-30">🔍</div>
        <p className="font-display text-lg font-bold text-ink">Aucun produit trouvé</p>
        <p className="mt-1 font-body text-sm text-ink-muted">Essayez de modifier vos filtres.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-5 sm:gap-y-10">
      {products.map((product, i) => (
        <ProductCard key={`${product.section}-${product.slug}`} product={product} index={i} />
      ))}
    </div>
  );
};

export default ProductGrid;
