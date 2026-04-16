import { useState, useEffect } from 'react';
import type { Product } from '../types/product';
import inventory from '../data/inventory.json';

export function useInventory() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate async loading
    const timer = setTimeout(() => {
      setProducts(inventory as Product[]);
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return { products, loading };
}
