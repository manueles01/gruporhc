import type { Industry } from '../types/industry';

export const industries: Industry[] = [
  {
    id: 'automotriz',
    name: 'Automotriz',
    description: 'Mangueras para radiador y calefacción. Sistemas de conducción de fluidos para vehículos de alta exigencia.',
    icon: 'car',
  },
  {
    id: 'agricola',
    name: 'Agrícola',
    description: 'Sistemas de riego y succión para maquinaria pesada. Soluciones para el campo colombiano.',
    icon: 'sprout',
  },
  {
    id: 'industrial',
    name: 'Industrial',
    description: 'Alta presión, vapor y grado alimenticio. Mangueras para procesos industriales exigentes.',
    icon: 'factory',
  },
  {
    id: 'exploracion',
    name: 'Exploración',
    description: 'Resistencia ambiental para minería y petróleo. Soluciones para condiciones extremas.',
    icon: 'globe',
  },
  {
    id: 'infraestructura',
    name: 'Infraestructura',
    description: 'Obras públicas y construcción. Mangueras para proyectos de infraestructura civil.',
    icon: 'building',
  },
  {
    id: 'datacenters',
    name: 'Data Centers',
    description: 'Sistemas de enfriamiento líquido especializado. Direct-to-Chip y heat exchangers de alta confiabilidad.',
    icon: 'server',
  },
];
