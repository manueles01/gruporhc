import type { Product } from '../types/product';

export interface AIAnalysis {
  confidence: number;
  detectedType: string;
  material: string;
  diameter: string;
  application: string;
  suggestions: string[];
}

export function generateMockAnalysis(): AIAnalysis {
  return {
    confidence: Math.floor(Math.random() * 15) + 85,
    detectedType: 'Manguera de Radiador',
    material: 'EPDM con refuerzo textil',
    diameter: '32mm - 38mm',
    application: 'Sistema de refrigeración automotriz',
    suggestions: [
      'Verificar compatibilidad con el modelo del vehículo',
      'Revisar estado de las abrazaderas',
      'Considerar reemplazo preventivo si tiene más de 5 años',
    ],
  };
}

export function findMatchingProducts(
  products: Product[],
  _imageAnalysis?: AIAnalysis
): Product[] {
  // Mock: return random selection of products
  const shuffled = [...products].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(6, shuffled.length));
}
