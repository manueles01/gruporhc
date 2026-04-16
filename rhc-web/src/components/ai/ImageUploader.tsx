import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, Image, X } from 'lucide-react';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  isAnalyzing: boolean;
}

export function ImageUploader({ onImageUpload, isAnalyzing }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback(
    (file: File) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
        onImageUpload(file);
      }
    },
    [onImageUpload]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const clearImage = () => {
    setPreview(null);
  };

  return (
    <div className="w-full">
      {preview ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative"
        >
          <img
            src={preview}
            alt="Uploaded preview"
            className="w-full max-h-[300px] object-contain rounded-lg border border-border"
          />
          {!isAnalyzing && (
            <button
              onClick={clearImage}
              className="absolute top-2 right-2 w-8 h-8 bg-dark/80 rounded-full flex items-center justify-center text-light hover:text-white hover:bg-dark transition-colors"
            >
              <X size={16} />
            </button>
          )}
          {isAnalyzing && (
            <div className="absolute inset-0 bg-dark/60 rounded-lg flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-red border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-light">Analizando imagen...</p>
              </div>
            </div>
          )}
        </motion.div>
      ) : (
        <label
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`flex flex-col items-center justify-center w-full h-[200px] border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
            isDragging
              ? 'border-red bg-red/5'
              : 'border-border hover:border-muted bg-white/[0.02]'
          }`}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <div className="w-12 h-12 rounded-full bg-red/10 flex items-center justify-center mb-4">
              {isDragging ? (
                <Image className="w-6 h-6 text-red" />
              ) : (
                <Upload className="w-6 h-6 text-red" />
              )}
            </div>
            <p className="mb-2 text-sm text-light">
              <span className="font-semibold">Haz clic para subir</span> o arrastra una imagen
            </p>
            <p className="text-xs text-muted">PNG, JPG o WEBP (máx. 10MB)</p>
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleInputChange}
          />
        </label>
      )}
    </div>
  );
}
