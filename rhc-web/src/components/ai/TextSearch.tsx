import { Search } from 'lucide-react';

interface TextSearchProps {
  query: string;
  setQuery: (query: string) => void;
  category: string;
  setCategory: (category: string) => void;
}

const categories = [
  { value: 'all', label: 'Todas las categorías' },
  { value: 'radiador', label: 'Radiador' },
  { value: 'calefaccion', label: 'Calefacción' },
  { value: 'intercooler', label: 'Intercooler' },
  { value: 'aceite', label: 'Aceite' },
];

export function TextSearch({ query, setQuery, category, setCategory }: TextSearchProps) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por marca, modelo, código OEM o descripción..."
          className="w-full pl-12 pr-4 py-3.5 bg-white/[0.04] border border-border rounded-lg text-light placeholder:text-muted focus:outline-none focus:border-red/50 transition-colors"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setCategory(cat.value)}
            className={`px-4 py-2 text-sm rounded-md transition-colors ${
              category === cat.value
                ? 'bg-red text-white'
                : 'bg-white/[0.04] text-muted hover:text-light border border-border hover:border-muted'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}
