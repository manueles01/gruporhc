import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle } from 'lucide-react';
import type { AIAnalysis } from '../../types/ai';
import { fadeInUp } from '../../animations/variants';

interface AIAnalysisCardProps {
  analysis: AIAnalysis;
}

export function AIAnalysisCard({ analysis }: AIAnalysisCardProps) {
  const isHighConfidence = analysis.confidence >= 90;

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="bg-white/[0.04] border border-border rounded-lg p-6"
    >
      <div className="flex items-start gap-4 mb-6">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center ${
            isHighConfidence ? 'bg-green-500/10' : 'bg-yellow-500/10'
          }`}
        >
          {isHighConfidence ? (
            <CheckCircle className="w-6 h-6 text-green-500" />
          ) : (
            <AlertCircle className="w-6 h-6 text-yellow-500" />
          )}
        </div>
        <div>
          <h4 className="text-lg font-bold text-white mb-1">Análisis IA</h4>
          <p className="text-sm text-muted">
            Confianza:{' '}
            <span className={isHighConfidence ? 'text-green-500' : 'text-yellow-500'}>
              {analysis.confidence}%
            </span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-1">
            Tipo Detectado
          </p>
          <p className="text-sm text-light">{analysis.detectedType}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-1">
            Material
          </p>
          <p className="text-sm text-light">{analysis.material}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-1">
            Diámetro Estimado
          </p>
          <p className="text-sm text-light">{analysis.diameter}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-1">
            Aplicación
          </p>
          <p className="text-sm text-light">{analysis.application}</p>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-2">
          Recomendaciones
        </p>
        <ul className="space-y-2">
          {analysis.suggestions.map((suggestion, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-light">
              <span className="w-1.5 h-1.5 rounded-full bg-red mt-1.5 shrink-0" />
              {suggestion}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
