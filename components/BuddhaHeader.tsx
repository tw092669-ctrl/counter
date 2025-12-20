import React, { useState, useEffect, useMemo } from 'react';
import { Quote } from '../types';
import { BUDDHA_IMAGES, QUOTES } from '../constants';
import { Link2 } from 'lucide-react';

interface BuddhaHeaderProps {
  onOpenSettings: () => void;
}

export const BuddhaHeader: React.FC<BuddhaHeaderProps> = ({ onOpenSettings }) => {
  const [currentImage, setCurrentImage] = useState<string>('');
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);

  const randomize = () => {
    const randomImg = BUDDHA_IMAGES[Math.floor(Math.random() * BUDDHA_IMAGES.length)];
    const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    setCurrentImage(randomImg);
    setCurrentQuote(randomQuote);
  };

  useEffect(() => {
    randomize();
  }, []);

  // Dynamically calculate font size based on text length to ensure it fits well
  const fontSizeClass = useMemo(() => {
    const text = currentQuote?.text || '';
    const len = text.length;
    // Longer text gets smaller font (Reduced sizes slightly per user request)
    if (len > 60) return 'text-lg md:text-2xl';
    if (len > 30) return 'text-xl md:text-3xl';
    return 'text-2xl md:text-4xl';
  }, [currentQuote]);

  return (
    <div className="relative w-full h-[75vh] bg-stone-900 overflow-hidden shadow-lg mb-6">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-90 transition-opacity duration-1000"
        style={{ backgroundImage: `url(${currentImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/20 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-end p-6 pb-24 text-center">
        <div 
          onClick={randomize}
          className="p-8 max-w-4xl transform transition-all hover:scale-105 cursor-pointer"
          title="點擊更換法語"
        >
           {/* Removed line-clamp to show full text. Added dynamic fontSizeClass. */}
           <p className={`font-calligraphy text-white ${fontSizeClass} leading-relaxed text-glow tracking-wide transition-all duration-300`}>
             {currentQuote?.text}
           </p>
        </div>
      </div>

      <button 
        onClick={onOpenSettings}
        className="absolute top-4 right-4 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors flex items-center gap-2 backdrop-blur-sm"
        title="連結雲端試算表"
      >
        <Link2 size={20} />
      </button>
    </div>
  );
};