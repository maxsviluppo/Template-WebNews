import { motion, AnimatePresence } from "motion/react";
import { X, Clock, User, Share2, Bookmark, BookmarkCheck, ArrowLeft, Volume2, VolumeX, Play, Pause, Sparkles } from "lucide-react";
import { NewsItem } from "../types";
import { useState, useEffect, useRef } from "react";
import { generateSummary } from "../services/aiService";

interface ArticleDetailProps {
  item: NewsItem | null;
  isOpen: boolean;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: () => void;
  onShare: () => void;
}

export default function ArticleDetail({ item, isOpen, onClose, isSaved, onToggleSave, onShare }: ArticleDetailProps) {
  const [isReading, setIsReading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>("");
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const synth = typeof window !== "undefined" ? window.speechSynthesis : null;
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    // AI generation disabled for now as per user request
    /*
    if (item && !item.aiSummary) {
      generateSummary(item.id, item.title, item.excerpt).then(summary => {
        setAiSummary(summary);
      });
    } else if (item?.aiSummary) {
      setAiSummary(item.aiSummary);
    }
    */
  }, [item?.id]);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = synth.getVoices();
      const italianVoices = availableVoices.filter(v => v.lang.startsWith('it'));
      setVoices(italianVoices);
      if (italianVoices.length > 0 && !selectedVoice) {
        // Prefer Google or Natural voices if available
        const bestVoice = italianVoices.find(v => v.name.includes('Google') || v.name.includes('Natural')) || italianVoices[0];
        setSelectedVoice(bestVoice.name);
      }
    };

    loadVoices();
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices;
    }

    return () => {
      synth.cancel();
    };
  }, []);

  if (!item) return null;

  const handleToggleRead = () => {
    if (isReading) {
      if (isPaused) {
        synth.resume();
        setIsPaused(false);
      } else {
        synth.pause();
        setIsPaused(true);
      }
    } else {
      const textToRead = `${item.title}. ${item.excerpt}. Articolo di ${item.author}.`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      
      const voice = voices.find(v => v.name === selectedVoice);
      if (voice) utterance.voice = voice;
      
      utterance.lang = 'it-IT';
      utterance.rate = 0.95;
      utterance.pitch = 1;
      
      utterance.onend = () => {
        setIsReading(false);
        setIsPaused(false);
      };

      utteranceRef.current = utterance;
      synth.speak(utterance);
      setIsReading(true);
      setIsPaused(false);
    }
  };

  const handleStopRead = () => {
    synth.cancel();
    setIsReading(false);
    setIsPaused(false);
  };

  const handleClose = () => {
    handleStopRead();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="fixed inset-0 bg-white z-[80] overflow-y-auto"
        >
          {/* Header */}
          <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl border-b border-zinc-100 px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
            <button onClick={handleClose} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
              <ArrowLeft size={24} />
            </button>
            <div className="flex items-center gap-1 md:gap-2">
              {voices.length > 1 && !isReading && (
                <select 
                  value={selectedVoice}
                  onChange={(e) => setSelectedVoice(e.target.value)}
                  className="hidden sm:block text-[10px] font-bold uppercase tracking-widest bg-zinc-50 border-none rounded-lg px-2 py-1 outline-none focus:ring-1 focus:ring-zinc-200"
                >
                  {voices.map(v => (
                    <option key={v.name} value={v.name}>
                      {v.name.replace('Google ', '').replace('Microsoft ', '').split(' ')[0]}
                    </option>
                  ))}
                </select>
              )}
              <button 
                onClick={handleToggleRead}
                className={`p-2 rounded-full transition-all flex items-center gap-2 px-3 md:px-4 ${
                  isReading ? "bg-zinc-900 text-white" : "hover:bg-zinc-100 text-zinc-600"
                }`}
              >
                {isReading ? (isPaused ? <Play size={18} /> : <Pause size={18} />) : <Volume2 size={22} />}
                {isReading && <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">{isPaused ? "Riprendi" : "In lettura"}</span>}
              </button>
              {isReading && (
                <button 
                  onClick={handleStopRead}
                  className="p-2 hover:bg-zinc-100 rounded-full transition-colors text-red-500"
                >
                  <VolumeX size={22} />
                </button>
              )}
              <div className="w-px h-6 bg-zinc-100 mx-1 md:mx-2" />
              <button 
                onClick={onShare}
                className="p-2 hover:bg-zinc-100 rounded-full transition-colors text-zinc-600"
              >
                <Share2 size={20} />
              </button>
              <button 
                onClick={onToggleSave}
                className="p-2 hover:bg-zinc-100 rounded-full transition-colors text-zinc-600"
              >
                {isSaved ? <BookmarkCheck size={20} className="text-zinc-900" /> : <Bookmark size={20} />}
              </button>
            </div>
          </header>

          <article className="max-w-3xl mx-auto px-6 py-8 md:py-12">
            <span className="inline-block px-3 py-1 bg-zinc-100 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-600 mb-4 md:mb-6">
              {item.category}
            </span>
            <h1 className="text-3xl md:text-6xl font-serif font-bold leading-tight mb-6 md:mb-8">
              {item.title}
            </h1>

            <div className="flex items-center gap-4 mb-12 pb-8 border-b border-zinc-100">
              <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center">
                <User size={24} className="text-zinc-400" />
              </div>
              <div>
                <p className="font-bold">{item.author}</p>
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                  <span>{item.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} /> {item.readTime} di lettura
                  </span>
                </div>
              </div>
            </div>

            <div className="aspect-[16/9] rounded-3xl overflow-hidden mb-12">
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="prose prose-zinc lg:prose-xl max-w-none">
              <p className="text-xl leading-relaxed text-zinc-700 mb-4 font-medium italic">
                {item.excerpt}
              </p>

              {aiSummary && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8 p-6 bg-zinc-50 rounded-3xl border border-zinc-100 flex gap-4 items-start shadow-sm"
                >
                  <div className="p-2 bg-amber-50 rounded-xl">
                    <Sparkles size={24} className="text-amber-500" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-600 block mb-1">Riassunto Generato dall'IA</span>
                    <p className="text-zinc-700 italic leading-relaxed">
                      {aiSummary}
                    </p>
                  </div>
                </motion.div>
              )}

              <p className="text-lg leading-relaxed text-zinc-600 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="text-lg leading-relaxed text-zinc-600 mb-6">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <h2 className="text-2xl font-serif font-bold mt-12 mb-6">L'impatto delle nuove tecnologie</h2>
              <p className="text-lg leading-relaxed text-zinc-600 mb-6">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>
            </div>
          </article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
