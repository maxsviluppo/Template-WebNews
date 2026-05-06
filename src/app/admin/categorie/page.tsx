"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { 
  GripVertical, 
  Plus, 
  Trash2, 
  Layout, 
  Image as ImageIcon, 
  Star,
  Layers,
  Settings2,
  Save
} from "lucide-react";
import { CATEGORIES } from "../../../types";

export default function AdminCategoriePage() {
  const [categories, setCategories] = useState(CATEGORIES);
  const [newCat, setNewCat] = useState("");

  const handleAddCat = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCat && !categories.includes(newCat)) {
      setCategories([...categories, newCat]);
      setNewCat("");
    }
  };

  const removeCat = (cat: string) => {
    setCategories(categories.filter(c => c !== cat));
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Struttura & Categorie</h1>
          <p className="text-zinc-500 text-sm">Organizza il menu e configura i blocchi della tua Home Page.</p>
        </div>
        <button className="bg-emerald-500 text-black px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/10">
          <Save size={18} />
          <span>Salva Struttura</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Category Editor */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-6">
          <div className="flex items-center gap-2 text-emerald-500 font-bold text-xs uppercase tracking-widest">
            <Layers size={14} />
            <span>Editor Categorie Menu</span>
          </div>

          <form onSubmit={handleAddCat} className="flex gap-2">
            <input 
              type="text" 
              value={newCat}
              onChange={(e) => setNewCat(e.target.value)}
              placeholder="Nuova categoria (es: Tecnologia)..."
              className="flex-1 bg-zinc-800/50 border border-zinc-700 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-all"
            />
            <button type="submit" className="p-3 bg-zinc-800 text-white rounded-xl hover:bg-zinc-700 transition-all">
              <Plus size={20} />
            </button>
          </form>

          <div className="space-y-2">
            {categories.map((cat, index) => (
              <motion.div 
                key={cat}
                layout
                className="flex items-center justify-between p-3 bg-zinc-800/30 border border-zinc-800 rounded-xl group hover:border-zinc-700 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="text-zinc-600 cursor-grab active:cursor-grabbing">
                    <GripVertical size={16} />
                  </div>
                  <span className="text-sm font-bold text-zinc-300">{cat}</span>
                </div>
                <button 
                  onClick={() => removeCat(cat)}
                  className="p-2 text-zinc-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={16} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Home Layout Config */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-8">
          <div className="flex items-center gap-2 text-blue-500 font-bold text-xs uppercase tracking-widest">
            <Layout size={14} />
            <span>Layout Blocchi Home Page</span>
          </div>

          <div className="space-y-4">
            <div className="p-5 border-2 border-dashed border-zinc-800 rounded-3xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500">
                    <Star size={20} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm">Primo Piano (Slider)</h3>
                    <p className="text-[10px] text-zinc-500">Mostra i primi 3 articoli "Hot"</p>
                  </div>
                </div>
                <button className="text-[10px] font-bold text-zinc-500 hover:text-white transition-colors">CONFIGURA</button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 border-2 border-dashed border-zinc-800 rounded-3xl flex flex-col gap-3">
                <div className="w-8 h-8 bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-500">
                  <ImageIcon size={16} />
                </div>
                <h4 className="text-white font-bold text-xs">Spalla Sinistra</h4>
                <p className="text-[10px] text-zinc-500 leading-tight">Notizie cronaca e locali.</p>
              </div>
              <div className="p-5 border-2 border-dashed border-zinc-800 rounded-3xl flex flex-col gap-3">
                <div className="w-8 h-8 bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-500">
                  <ImageIcon size={16} />
                </div>
                <h4 className="text-white font-bold text-xs">Spalla Destra</h4>
                <p className="text-[10px] text-zinc-500 leading-tight">Rubriche e Flash News.</p>
              </div>
            </div>

            <div className="p-5 border-2 border-dashed border-zinc-800 rounded-3xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
                  <Settings2 size={20} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">Notizie dal Mondo</h3>
                  <p className="text-[10px] text-zinc-500">Layout a griglia automatica</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-4 bg-emerald-500 rounded-full relative p-0.5">
                  <div className="w-3 h-3 bg-white rounded-full absolute right-0.5" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-4 p-5 bg-blue-500/5 rounded-2xl border border-blue-500/10">
            <p className="text-[10px] text-blue-400 italic leading-relaxed text-center">
              "L'ordine delle categorie nel menu riflette l'ordine che imposti qui a sinistra."
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
