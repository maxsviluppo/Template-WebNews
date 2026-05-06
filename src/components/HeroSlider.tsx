import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { NewsItem } from "../types";
import { generateSummary } from "../services/aiService";

interface HeroSliderProps {
  items: NewsItem[];
  onSelect: (item: NewsItem) => void;
}

export default function HeroSlider({ items, onSelect }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [summaries, setSummaries] = useState<Record<string, string>>({});

  useEffect(() => {
    const item = items[currentIndex];
    if (item && !summaries[item.id] && !item.aiSummary) {
      generateSummary(item.id, item.title, item.excerpt).then(summary => {
        if (summary) {
          setSummaries(prev => ({ ...prev, [item.id]: summary }));
        }
      });
    }
  }, [currentIndex, items]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [items.length]);

  const currentItem = items[currentIndex];
  const currentSummary = summaries[currentItem.id] || currentItem.aiSummary;

  const next = () => setCurrentIndex((prev) => (prev + 1) % items.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);

  return (
    <div className="relative w-full aspect-[4/5] md:aspect-[21/9] overflow-hidden rounded-2xl md:rounded-3xl group">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute inset-0 cursor-pointer"
          onClick={() => onSelect(items[currentIndex])}
        >
          <img
            src={items[currentIndex].imageUrl}
            alt={items[currentIndex].title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
            >
              {items[currentIndex].category}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl md:text-5xl font-serif font-bold leading-tight max-w-3xl mb-2"
            >
              {items[currentIndex].title}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="max-w-2xl mb-4"
            >
              <p className="hidden md:block text-lg text-zinc-200 mb-4 line-clamp-1">
                {items[currentIndex].excerpt}
              </p>
              
              {currentSummary && (
                <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 flex gap-3 items-center">
                  <Sparkles size={16} className="text-amber-400 flex-shrink-0" />
                  <p className="text-xs md:text-sm text-white/90 italic line-clamp-1">
                    {currentSummary}
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <button
          onClick={prev}
          className="p-3 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-full pointer-events-auto transition-all"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={next}
          className="p-3 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-full pointer-events-auto transition-all"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 right-6 flex gap-2">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1 rounded-full transition-all duration-300 ${
              idx === currentIndex ? "w-8 bg-white" : "w-2 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
