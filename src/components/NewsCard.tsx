import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Clock, User, Bookmark, BookmarkCheck, Share2, Sparkles } from "lucide-react";
import { NewsItem } from "../types";
import { generateSummary } from "../services/aiService";

export interface NewsCardProps {
  item: NewsItem;
  variant?: "default" | "compact" | "featured" | "portrait";
  isSaved?: boolean;
  onToggleSave?: (e: React.MouseEvent) => void;
  onShare?: (e: React.MouseEvent) => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ item, variant = "default", isSaved = false, onToggleSave, onShare }) => {
  const [aiSummary, setAiSummary] = useState<string | null>(item.aiSummary || null);
  const [isLoading, setIsLoading] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.1 });

  useEffect(() => {
    const getSummary = async () => {
      if (!aiSummary && !isLoading && isInView) {
        setIsLoading(true);
        // Small random delay to jitter requests and avoid hitting rate limit simultaneously
        await new Promise(resolve => setTimeout(resolve, Math.random() * 800));
        const summary = await generateSummary(item.id, item.title, item.excerpt);
        setAiSummary(summary);
        setIsLoading(false);
      }
    };
    getSummary();
  }, [item.id, isInView]);

  if (variant === "compact") {
    return (
      <motion.div
        ref={cardRef}
        whileHover={{ y: -4, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="flex gap-3 md:gap-4 p-3 md:p-4 bg-white rounded-2xl border border-zinc-100 hover:border-zinc-200 hover:shadow-xl hover:shadow-zinc-100/50 transition-all cursor-pointer relative group h-full"
      >
        <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-xl overflow-hidden">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex flex-col justify-between py-1 flex-1 min-w-0">
          <div>
            <div className="flex justify-between items-start mb-1">
              <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 block truncate">
                {item.category}
              </span>
              <div className="flex items-center gap-2 text-[9px] text-zinc-400 whitespace-nowrap">
                <span className="flex items-center gap-1"><Clock size={10} /> {item.readTime}</span>
                <span>•</span>
                <span>{item.date}</span>
              </div>
            </div>
            <h3 className="text-xs md:text-sm font-bold leading-snug line-clamp-2 group-hover:text-zinc-600 transition-colors">
              {item.title}
            </h3>
            {aiSummary && (
              <div className="mt-1 flex items-start gap-1.5 p-1.5 bg-zinc-50 rounded-lg border border-zinc-100">
                <Sparkles size={10} className="text-amber-500 mt-0.5 flex-shrink-0" />
                <p className="text-[8px] text-zinc-600 leading-tight italic line-clamp-1">
                  {aiSummary}
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  if (variant === "featured") {
    return (
      <motion.div
        ref={cardRef}
        whileHover={{ y: -8, scale: 1.01 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="group relative flex flex-col h-full bg-zinc-900 rounded-[2rem] overflow-hidden cursor-pointer"
      >
        <img
          src={item.imageUrl}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="relative mt-auto p-6 md:p-8 text-white">
          <div className="flex justify-between items-start mb-3 md:mb-4">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest">
              {item.category}
            </span>
            <div className="flex gap-2">
              <button onClick={onShare} className="p-2 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full transition-all">
                <Share2 size={18} />
              </button>
              <button onClick={onToggleSave} className="p-2 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full transition-all">
                {isSaved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
              </button>
            </div>
          </div>
          <h3 className="text-xl md:text-4xl font-serif font-bold leading-tight mb-4 line-clamp-3">
            {item.title}
          </h3>
          <p className="text-zinc-300 line-clamp-3 text-sm md:text-base mb-6 max-w-2xl">
            {item.excerpt}
          </p>
          {aiSummary && (
            <div className="mb-6 flex items-start gap-3 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 max-w-xl">
              <Sparkles size={18} className="text-amber-400 mt-1 flex-shrink-0" />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 block mb-1">Riassunto AI</span>
                <p className="text-sm text-white/90 italic leading-relaxed">
                  {aiSummary}
                </p>
              </div>
            </div>
          )}
          <div className="flex items-center gap-4 text-xs text-zinc-400">
            <span className="flex items-center gap-1.5"><Clock size={14} /> {item.readTime}</span>
            <span>•</span>
            <span>{item.date}</span>
          </div>
        </div>
      </motion.div>
    );
  }

  if (variant === "portrait") {
    return (
      <motion.div
        ref={cardRef}
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="group relative flex flex-col h-full bg-zinc-100 rounded-[2rem] overflow-hidden cursor-pointer border border-zinc-200"
      >
        <img
          src={item.imageUrl}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
        <div className="relative mt-auto p-6 text-white">
          <div className="flex justify-between items-start mb-3">
            <span className="px-2 py-0.5 bg-white/20 backdrop-blur-md rounded-full text-[9px] font-bold uppercase tracking-widest">
              {item.category}
            </span>
          </div>
          <h3 className="text-lg font-bold leading-tight mb-2 line-clamp-2">
            {item.title}
          </h3>
          {aiSummary && (
            <div className="mb-2 flex items-start gap-1 p-1.5 bg-black/40 backdrop-blur-sm rounded-lg border border-white/10">
              <Sparkles size={10} className="text-amber-400 mt-0.5 flex-shrink-0" />
              <p className="text-[9px] text-white/80 italic leading-tight line-clamp-2">
                {aiSummary}
              </p>
            </div>
          )}
          <div className="flex items-center gap-2 text-[10px] text-zinc-300">
            <Clock size={12} /> {item.readTime}
          </div>
        </div>
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={onShare} className="p-2 bg-white/90 backdrop-blur-md rounded-full text-zinc-900 shadow-lg">
            <Share2 size={16} />
          </button>
          <button onClick={onToggleSave} className="p-2 bg-white/90 backdrop-blur-md rounded-full text-zinc-900 shadow-lg">
            {isSaved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      whileHover={{ y: -12, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="group flex flex-col bg-white rounded-3xl border border-zinc-100 overflow-hidden hover:border-zinc-200 hover:shadow-2xl hover:shadow-zinc-100/50 transition-all cursor-pointer h-full"
    >
      <div className="h-[178px] md:h-36 overflow-hidden relative flex-shrink-0">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-2 left-2 flex justify-between right-2 items-start">
          <span className="px-2 py-0.5 bg-white/90 backdrop-blur-md rounded-full text-[8px] font-bold uppercase tracking-widest text-zinc-900 shadow-sm">
            {item.category}
          </span>
        </div>
      </div>
      <div className="p-3 md:p-4 flex flex-col flex-1 min-w-0 overflow-hidden">
        <h3 className="text-sm md:text-base font-serif font-bold leading-tight mb-2 group-hover:text-zinc-600 transition-colors line-clamp-2">
          {item.title}
        </h3>
        <p className="text-[10px] md:text-xs text-zinc-500 line-clamp-2 mb-2">
          {item.excerpt}
        </p>
        
        {aiSummary && (
          <div className="mt-1 mb-3 flex items-start gap-2 p-2.5 bg-zinc-50 rounded-xl border border-zinc-100">
            <Sparkles size={12} className="text-amber-500 mt-0.5 flex-shrink-0" />
            <p className="text-[9px] md:text-[10px] text-zinc-600 italic leading-snug">
              {aiSummary}
            </p>
          </div>
        )}

        <div className="flex items-center justify-between pt-1 mt-auto border-t border-zinc-50">
          <span className="flex items-center gap-1 text-[9px] font-medium text-zinc-400">
            <Clock size={10} /> {item.readTime}
          </span>
          <span className="text-[9px] font-medium text-zinc-400">
            {item.date}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsCard;
