"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface LightboxProps {
  images: string[];
}

export const Lightbox = ({ images }: LightboxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => setIsOpen(false);

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((src, index) => (
          <div 
            key={index} 
            className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
            onClick={() => openLightbox(index)}
          >
            <img 
              src={src} 
              alt={`Gallery image ${index + 1}`} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
              <ZoomIn className="w-8 h-8 text-white" />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 md:p-8"
            onClick={closeLightbox}
          >
            <button 
              className="absolute top-8 right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              onClick={closeLightbox}
            >
              <X className="w-6 h-6" />
            </button>

            <button 
              className="absolute left-4 md:left-12 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              onClick={prevImage}
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <img 
              src={images[currentIndex]} 
              alt={`Expanded view ${currentIndex + 1}`} 
              className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
            />

            <button 
              className="absolute right-4 md:right-12 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              onClick={nextImage}
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <div className="absolute bottom-8 text-white/50 text-sm font-bold uppercase tracking-widest">
              {currentIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
