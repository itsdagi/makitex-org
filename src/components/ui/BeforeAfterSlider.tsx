"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";
import { MoveHorizontal } from "lucide-react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
}

export const BeforeAfterSlider = ({ beforeImage, afterImage }: BeforeAfterSliderProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDrag = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    
    let clientX = 0;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = (e as MouseEvent).clientX;
    }

    const position = ((clientX - left) / width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, position)));
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-video rounded-3xl overflow-hidden cursor-ew-resize select-none"
      onMouseMove={(e) => e.buttons === 1 && handleDrag(e)}
      onTouchMove={handleDrag}
    >
      {/* After image acts as base background */}
      <img 
        src={afterImage} 
        alt="After" 
        className="absolute inset-0 w-full h-full object-cover pointer-events-none" 
      />

      {/* Before image sits on top and is clipped */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img 
          src={beforeImage} 
          alt="Before" 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none" 
        />
      </div>

      {/* Slider Line & Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white pointer-events-none"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center text-primary pointer-events-auto shadow-black/50">
          <MoveHorizontal className="w-6 h-6" />
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-6 left-6 px-4 py-2 bg-black/50 backdrop-blur-md rounded-xl text-white font-bold text-xs uppercase tracking-widest pointer-events-none">
        Before
      </div>
      <div className="absolute top-6 right-6 px-4 py-2 bg-black/50 backdrop-blur-md rounded-xl text-white font-bold text-xs uppercase tracking-widest pointer-events-none">
        After
      </div>
    </div>
  );
};
