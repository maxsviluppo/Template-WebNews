import { motion, AnimatePresence } from "motion/react";
import { X, Share2, Twitter, Facebook, Link as LinkIcon, Check } from "lucide-react";
import { useState } from "react";
import { NewsItem } from "../types";

interface ShareModalProps {
  item: NewsItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ShareModal({ item, isOpen, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!item) return null;

  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/articolo/${item.id}` : "";

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOptions = [
    { 
      name: "Twitter", 
      icon: <Twitter size={20} />, 
      color: "bg-[#1DA1F2]",
      action: () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(item.title)}&url=${encodeURIComponent(shareUrl)}`, "_blank")
    },
    { 
      name: "Facebook", 
      icon: <Facebook size={20} />, 
      color: "bg-[#4267B2]",
      action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank")
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white rounded-3xl z-[70] overflow-hidden shadow-2xl"
          >
            <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
              <h3 className="text-xl font-bold">Condividi articolo</h3>
              <button onClick={onClose} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-8">
              <div className="flex gap-4 mb-8">
                {shareOptions.map((option) => (
                  <button
                    key={option.name}
                    onClick={option.action}
                    className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-2xl text-white ${option.color} transition-transform active:scale-95`}
                  >
                    {option.icon}
                    <span className="text-xs font-bold">{option.name}</span>
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">Link diretto</p>
                <div className="flex items-center gap-2 p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                  <input 
                    type="text" 
                    readOnly 
                    value={shareUrl} 
                    className="bg-transparent text-sm flex-1 outline-none text-zinc-500 truncate"
                  />
                  <button 
                    onClick={handleCopy}
                    className={`p-2 rounded-lg transition-all ${copied ? "bg-green-500 text-white" : "bg-zinc-900 text-white hover:bg-zinc-800"}`}
                  >
                    {copied ? <Check size={16} /> : <LinkIcon size={16} />}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
