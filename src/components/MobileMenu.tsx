import { motion, AnimatePresence } from "motion/react";
import { X, ChevronRight, Bookmark, Newspaper } from "lucide-react";
import { CATEGORIES } from "../types";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSaved?: () => void;
  onOpenNewspaper?: () => void;
}

export default function MobileMenu({ isOpen, onClose, onSelectSaved, onOpenNewspaper }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 w-[80%] max-w-sm bg-white/80 backdrop-blur-2xl z-50 shadow-2xl flex flex-col border-r border-white/20"
          >
            <div className="p-6 flex items-center justify-between border-bottom border-zinc-100">
              <div className="flex items-center gap-1">
                <div className="logo-text text-xl">
                EDITOR<span className="logo-text-i">I</span>ALE
              </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-6">
              <div className="mb-8">
                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(24, 24, 27, 1)" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center gap-3 p-4 text-left text-lg font-bold bg-zinc-900/90 backdrop-blur-md text-white rounded-2xl shadow-xl shadow-zinc-900/10 border border-zinc-800 mb-4"
                  onClick={() => {
                    onSelectSaved?.();
                    onClose();
                  }}
                >
                  <Bookmark size={20} />
                  <span>Articoli Salvati</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(24, 24, 27, 1)" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center gap-3 p-4 text-left text-lg font-bold bg-zinc-900/90 backdrop-blur-md text-white rounded-2xl shadow-xl shadow-zinc-900/10 border border-zinc-800 mb-4"
                  onClick={() => {
                    onOpenNewspaper?.();
                    onClose();
                  }}
                >
                  <Newspaper size={20} className="text-white" />
                  <span>Edicola</span>
                </motion.button>
              </div>

              <div className="space-y-1">
                <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2">Categorie</p>
                {CATEGORIES.map((category) => (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-between p-4 text-left text-lg font-medium bg-zinc-50/40 backdrop-blur-md border border-zinc-100/50 rounded-xl transition-all hover:bg-white/60 hover:border-zinc-200/50 group mb-2"
                    onClick={onClose}
                  >
                    <span>{category}</span>
                    <ChevronRight size={18} className="text-zinc-300 group-hover:text-zinc-900 transition-colors" />
                  </motion.button>
                ))}
              </div>
            </nav>

            <div className="p-6 border-t border-zinc-100 bg-zinc-50/50">
              <div className="flex flex-col gap-4">
                <button className="w-full py-3 px-4 bg-zinc-900 text-white rounded-xl font-semibold shadow-lg shadow-zinc-200">
                  Abbonati ora
                </button>
                <p className="text-xs text-center text-zinc-500">
                  © 2026 Presente. Tutti i diritti riservati.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
