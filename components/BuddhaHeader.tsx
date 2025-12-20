import React, { useState, useEffect, useMemo } from 'react';
import { Quote } from '../types';
import { BUDDHA_IMAGES, QUOTES } from '../constants';
import { Link2 } from 'lucide-react';

interface BuddhaHeaderProps {
  onOpenShortcut: () => void;
}

export const BuddhaHeader: React.FC<BuddhaHeaderProps> = ({ onOpenShortcut }) => {
  const [currentImage, setCurrentImage] = useState<string>('');
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const randomize = () => {
    setIsAnimating(true);
    
    // Fade out effect
    setTimeout(() => {
      const randomImg = BUDDHA_IMAGES[Math.floor(Math.random() * BUDDHA_IMAGES.length)];
      const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
      setCurrentImage(randomImg);
      setCurrentQuote(randomQuote);
      
      // Fade in effect
      setTimeout(() => {
        setIsAnimating(false);
      }, 50);
    }, 300);
  };

  useEffect(() => {
    randomize();
  }, []);

  // Dynamically calculate font size based on text length to ensure it fits well
  const fontSizeClass = useMemo(() => {
    const text = currentQuote?.text || '';
    const len = text.length;
    // More granular font size adjustments for better display
    if (len > 100) return 'text-sm md:text-base lg:text-lg';
    if (len > 70) return 'text-base md:text-lg lg:text-xl';
    if (len > 50) return 'text-lg md:text-xl lg:text-2xl';
    if (len > 30) return 'text-xl md:text-2xl lg:text-3xl';
    return 'text-2xl md:text-3xl lg:text-4xl';
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
      <div className="absolute inset-0 flex flex-col items-center justify-end p-4 pb-20 text-center">
        <div className="w-full max-w-5xl px-4">
           <p 
             className={`font-calligraphy text-white ${fontSizeClass} leading-relaxed text-glow tracking-wide transition-all duration-500 ${
               isAnimating 
                 ? 'opacity-0 scale-95 -translate-y-4' 
                 : 'opacity-100 scale-100 translate-y-0'
             }`}
           >
             {currentQuote?.text}
           </p>
           <button
             onClick={randomize}
             className="mt-6 text-amber-300 text-sm hover:text-amber-100 transition-colors hover:scale-110 active:scale-95"
           >
             更換法語
           </button>
        </div>
      </div>

      <button 
        onClick={onOpenShortcut}
        className="absolute top-4 right-4 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors flex items-center gap-2 backdrop-blur-sm"
        title="建立桌面快捷方式"
      >
        <Link2 size={20} />
      </button>
    </div>
  );
};