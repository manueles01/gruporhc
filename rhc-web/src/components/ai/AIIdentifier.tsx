import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Search, CheckCircle } from 'lucide-react';
import { Container } from '../layout/Container';
import { Tag } from '../ui/Tag';
import { SectionTitle } from '../ui/SectionTitle';
import { ImageUploader } from './ImageUploader';
import { TextSearch } from './TextSearch';
import { ProductResults } from './ProductResults';
import { AIAnalysisCard } from './AIAnalysisCard';
import { useInventory, useSearch } from '../../hooks';
import { generateMockAnalysis, findMatchingProducts } from '../../data/mockAIResponses';
import type { AITab, AIAnalysis } from '../../types/ai';
import { fadeInUp } from '../../animations/variants';

const tabs = [
  { id: 'photo' as AITab, label: 'Foto', icon: Camera },
  { id: 'text' as AITab, label: 'Texto', icon: Search },
  { id: 'match' as AITab, label: 'Match', icon: CheckCircle },
];

export function AIIdentifier() {
  const [activeTab, setActiveTab] = useState<AITab>('photo');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [matchedProducts, setMatchedProducts] = useState<typeof products>([]);

  const { products, loading } = useInventory();
  const { query, setQuery, category, setCategory, filteredProducts } = useSearch(products);

  const handleImageUpload = useCallback(
    (_file: File) => {
      setIsAnalyzing(true);
      setAnalysis(null);

      // Simulate AI processing delay
      setTimeout(() => {
        const mockAnalysis = generateMockAnalysis();
        setAnalysis(mockAnalysis);
        setMatchedProducts(findMatchingProducts(products, mockAnalysis));
        setIsAnalyzing(false);
        setActiveTab('match');
      }, 1500);
    },
    [products]
  );

  return (
    <section id="identificador-ia" className="py-20 border-t border-border">
      <Container>
        <motion.div
          className="text-center mb-10"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Tag>Nuevo</Tag>
          <SectionTitle className="mx-auto">Identificador IA de Mangueras</SectionTitle>
          <p className="text-[1.05rem] text-muted leading-relaxed max-w-[640px] mx-auto">
            Sube una foto o describe lo que necesitas — nuestra inteligencia artificial
            identifica el producto correcto del catálogo RHC en segundos.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          className="flex justify-center gap-2 mb-8"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-red text-white'
                  : 'bg-white/[0.04] text-muted hover:text-light border border-border'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'photo' && (
            <motion.div
              key="photo"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto"
            >
              <ImageUploader onImageUpload={handleImageUpload} isAnalyzing={isAnalyzing} />

              {analysis && (
                <div className="mt-6">
                  <AIAnalysisCard analysis={analysis} />
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'text' && (
            <motion.div
              key="text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="max-w-2xl mx-auto mb-8">
                <TextSearch
                  query={query}
                  setQuery={setQuery}
                  category={category}
                  setCategory={setCategory}
                />
              </div>

              <ProductResults
                products={filteredProducts.slice(0, 9)}
                loading={loading}
                emptyMessage="No se encontraron productos con esos criterios"
              />

              {filteredProducts.length > 9 && (
                <p className="text-center text-sm text-muted mt-6">
                  Mostrando 9 de {filteredProducts.length} resultados
                </p>
              )}
            </motion.div>
          )}

          {activeTab === 'match' && (
            <motion.div
              key="match"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {analysis ? (
                <>
                  <div className="max-w-2xl mx-auto mb-8">
                    <AIAnalysisCard analysis={analysis} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-6 text-center">
                    Productos Recomendados
                  </h3>
                  <ProductResults products={matchedProducts} />
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted mb-4">
                    Sube una foto para ver los productos recomendados
                  </p>
                  <button
                    onClick={() => setActiveTab('photo')}
                    className="text-red hover:underline font-medium"
                  >
                    Ir a la pestaña de Foto
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Feature cards */}
        <motion.div
          className="grid grid-cols-3 gap-6 max-w-[700px] mx-auto mt-12"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { icon: '📷', title: 'Foto', desc: 'Sube una imagen de la manguera' },
            { icon: '🔍', title: 'Texto', desc: 'Describe la aplicación o vehículo' },
            { icon: '✅', title: 'Match', desc: 'Producto exacto con especificaciones' },
          ].map((feature) => (
            <div
              key={feature.title}
              className="bg-white/[0.04] border border-border rounded-lg p-6 text-center"
            >
              <div className="text-2xl mb-2">{feature.icon}</div>
              <h4 className="text-white text-[0.9rem] font-semibold mb-1">{feature.title}</h4>
              <p className="text-muted text-[0.78rem]">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
