import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, ArrowRight, Clock } from "lucide-react";
import { NewsItem, MOCK_NEWS } from "../types";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (item: NewsItem) => void;
}

export default function SearchOverlay({ isOpen, onClose, onSelect }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<NewsItem[]>([]);
  const [history, setHistory] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("search_history");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      setQuery("");
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length > 1) {
      const filtered = MOCK_NEWS.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.excerpt.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6);
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSelect = (item: NewsItem) => {
    // Add to history
    const newHistory = [query, ...history.filter(h => h !== query)].slice(0, 5);
    setHistory(newHistory);
    localStorage.setItem("search_history", JSON.stringify(newHistory));
    
    onSelect(item);
    onClose();
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("search_history");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-xl"
        >
          <div className="max-w-3xl mx-auto px-6 pt-12 md:pt-20">
            <div className="flex items-center gap-3 md:gap-4 border-b-2 border-zinc-900 pb-3 md:pb-4">
              <Search className="text-zinc-400" size={24} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cerca notizie..."
                className="flex-1 bg-transparent text-xl md:text-2xl font-serif outline-none placeholder:text-zinc-300"
              />
              <button
                onClick={onClose}
                className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="mt-12">
              {query.trim().length === 0 ? (
                <div className="space-y-8">
                  {history.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Ricerche recenti</h3>
                        <button onClick={clearHistory} className="text-xs font-bold text-zinc-900 hover:underline">Cancella</button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {history.map((h, i) => (
                          <button
                            key={i}
                            onClick={() => setQuery(h)}
                            className="flex items-center gap-2 px-4 py-2 bg-zinc-50 hover:bg-zinc-100 rounded-full text-sm transition-colors"
                          >
                            <Clock size={14} className="text-zinc-400" />
                            {h}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">Temi caldi</h3>
                    <div className="flex flex-wrap gap-2">
                      {["Intelligenza Artificiale", "Cambiamento Climatico", "Economia Digitale", "Cinema Europeo", "Spazio"].map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setQuery(tag)}
                          className="px-4 py-2 bg-zinc-50 hover:bg-zinc-100 rounded-full text-sm transition-colors"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {results.length > 0 ? (
                    <>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Risultati suggeriti</h3>
                      <div className="space-y-4">
                        {results.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => handleSelect(item)}
                            className="w-full flex items-center justify-between p-4 hover:bg-zinc-50 rounded-2xl transition-all group text-left"
                          >
                            <div className="flex-1 pr-8">
                              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1 block">
                                {item.category}
                              </span>
                              <h4 className="font-serif font-bold text-lg group-hover:text-zinc-900 transition-colors">
                                {item.title}
                              </h4>
                            </div>
                            <ArrowRight className="text-zinc-300 group-hover:text-zinc-900 group-hover:translate-x-1 transition-all" size={20} />
                          </button>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-20">
                      <p className="text-zinc-400 font-serif italic text-lg">Nessun risultato trovato per "{query}"</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
