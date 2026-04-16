import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import type { Product } from '../../types/product';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const category = getCategoryFromDescription(product.description);

  return (
    <motion.div
      className="bg-mid border border-border rounded-lg overflow-hidden"
      whileHover={{ y: -4, borderColor: 'rgba(191,9,47,0.35)' }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="w-full aspect-video bg-gradient-to-br from-[#0d2322] to-[#142f2d] flex items-center justify-center border-b border-border">
        <svg
          className="w-12 h-12 stroke-border"
          fill="none"
          strokeWidth={1}
          viewBox="0 0 64 64"
        >
          <circle cx="32" cy="32" r="20" strokeDasharray="6 4" />
          <circle cx="32" cy="32" r="10" />
        </svg>
      </div>
      <div className="p-6">
        <div className="text-[0.7rem] font-bold tracking-widest uppercase text-red mb-2">
          {category}
        </div>
        <h3 className="text-[1.05rem] font-bold text-white mb-2 leading-snug">
          {product.rhc_code}
        </h3>
        <p className="text-[0.82rem] text-muted leading-relaxed mb-5 line-clamp-2">
          {product.description}
        </p>
        {product.oem_code && (
          <p className="text-[0.75rem] text-muted mb-4">
            OEM: <span className="text-light">{product.oem_code}</span>
          </p>
        )}
        <a
          href="#"
          className="inline-flex items-center gap-1.5 text-[0.8rem] font-bold text-light tracking-wide hover:text-white hover:gap-2.5 transition-all"
        >
          Ver Especificaciones
          <ChevronRight size={14} />
        </a>
      </div>
    </motion.div>
  );
}

function getCategoryFromDescription(description: string): string {
  const lower = description.toLowerCase();
  if (lower.includes('radiador')) return 'Radiador';
  if (lower.includes('calefaccion') || lower.includes('calefacción')) return 'Calefacción';
  if (lower.includes('intercooler')) return 'Intercooler';
  if (lower.includes('aceite')) return 'Aceite';
  if (lower.includes('bomba')) return 'Bomba de Agua';
  return 'Automotriz';
}
