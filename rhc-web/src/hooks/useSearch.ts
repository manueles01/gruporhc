import { useState, useMemo } from 'react';
import type { Product } from '../types/product';

export function useSearch(products: Product[]) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('all');

  const filteredProducts = useMemo(() => {
    let results = products;

    if (category !== 'all') {
      results = results.filter((p) => {
        const desc = p.description.toLowerCase();
        switch (category) {
          case 'radiador':
            return desc.includes('radiador');
          case 'calefaccion':
            return desc.includes('calefaccion') || desc.includes('calefacción');
          case 'intercooler':
            return desc.includes('intercooler');
          case 'aceite':
            return desc.includes('aceite');
          default:
            return true;
        }
      });
    }

    if (query.trim()) {
      const searchTerms = query.toLowerCase().split(' ').filter(Boolean);
      results = results.filter((p) => {
        const searchText = `${p.description} ${p.rhc_code} ${p.oem_code || ''}`.toLowerCase();
        return searchTerms.every((term) => searchText.includes(term));
      });
    }

    return results;
  }, [products, query, category]);

  return {
    query,
    setQuery,
    category,
    setCategory,
    filteredProducts,
  };
}
