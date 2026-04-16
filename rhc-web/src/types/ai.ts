export interface AIAnalysis {
  confidence: number;
  detectedType: string;
  material: string;
  diameter: string;
  application: string;
  suggestions: string[];
}

export type AITab = 'photo' | 'text' | 'match';
