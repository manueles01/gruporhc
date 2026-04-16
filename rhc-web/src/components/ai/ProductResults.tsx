import { motion } from 'framer-motion';
import { ProductCard } from '../ui/ProductCard';
import { staggerContainer, fadeInUp } from '../../animations/variants';
import type { Product } from '../../types/product';

interface ProductResultsProps {
  products: Product[];
  loading?: boolean;
  emptyMessage?: string;
}

export function ProductResults({
  products,
  loading = false,
  emptyMessage = 'No se encontraron productos',
}: ProductResultsProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-red border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted">Cargando productos...</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <motion.div
      className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {products.map((product) => (
        <motion.div key={product.rhc_code} variants={fadeInUp}>
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
}
