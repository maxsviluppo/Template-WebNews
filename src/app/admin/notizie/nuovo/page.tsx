"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { 
  ArrowLeft, 
  Save, 
  Image as ImageIcon, 
  Video, 
  Link as LinkIcon, 
  Plus, 
  X, 
  Type, 
  Tag, 
  Layout, 
  Calendar, 
  User,
  Flame,
  Clock,
  Eye,
  Youtube,
  FileVideo,
  Check
} from "lucide-react";
import { CATEGORIES } from "../../../../types";

export default function NewArticlePage() {
  const router = useRouter();
  const [categories, setCategories] = useState(CATEGORIES);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  
  const [tags, setTags] = useState<string[]>(["Tecnologia", "AI"]);
  const [newTag, setNewTag] = useState("");

  const [activeTab, setActiveTab] = useState("content");

  const [isPublishing, setIsPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);

  const handleAddCategory = () => {
    if (newCategoryName && !categories.includes(newCategoryName)) {
      setCategories([...categories, newCategoryName]);
      setNewCategoryName("");
      setShowAddCategory(false);
    }
  };

  const addTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newTag) {
      if (!tags.includes(newTag)) setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    // Simulate a bit of network delay for "premium" feel
    await new Promise(r => setTimeout(r, 1500));
    
    // In a real app we'd collect all form values here
    setPublishSuccess(true);
    setIsPublishing(false);

    // After 2 seconds, go back to list
    setTimeout(() => router.push("/admin/notizie"), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="p-2 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-400 hover:text-white transition-all"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white">Nuovo Articolo</h1>
            <p className="text-zinc-500 text-xs">Riempi i campi per pubblicare una nuova notizia.</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-2xl text-white font-bold text-sm hover:bg-zinc-800 transition-all flex items-center gap-2">
            <Eye size={18} />
            <span>Anteprima</span>
          </button>
          <button 
            onClick={handlePublish}
            disabled={isPublishing || publishSuccess}
            className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all flex items-center gap-2 shadow-lg ${
              publishSuccess 
                ? "bg-emerald-500 text-white" 
                : "bg-amber-500 text-black hover:bg-amber-400 shadow-amber-500/10"
            }`}
          >
            {isPublishing ? (
              <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : publishSuccess ? (
              <Check size={18} />
            ) : (
              <Save size={18} />
            )}
            <span>{isPublishing ? "Pubblicazione..." : publishSuccess ? "Articolo Pubblicato!" : "Pubblica"}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-800">
        {[
          { id: "content", label: "Contenuto", icon: Type },
          { id: "media", label: "Media & Gallery", icon: ImageIcon },
          { id: "publish", label: "Pubblicazione", icon: Layout },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-4 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === tab.id 
                ? "border-amber-500 text-amber-500 bg-amber-500/5" 
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <tab.icon size={16} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Editor Area */}
        <div className="lg:col-span-2 space-y-6">
          
          {activeTab === "content" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Titolo dell'Articolo</label>
                  <input 
                    type="text" 
                    placeholder="Esempio: Scoperta una nuova galassia..."
                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-2xl py-4 px-6 text-xl font-bold text-white focus:outline-none focus:border-amber-500/50 transition-all placeholder:text-zinc-700"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Categoria</label>
                    <div className="flex gap-2">
                      <select className="flex-1 bg-zinc-800/50 border border-zinc-700 rounded-2xl py-4 px-6 text-sm text-white focus:outline-none focus:border-amber-500/50 appearance-none">
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                      <button 
                        onClick={() => setShowAddCategory(true)}
                        className="p-4 bg-zinc-800 border border-zinc-700 rounded-2xl text-zinc-400 hover:text-amber-500 transition-all"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Sottotitolo / Occhiello</label>
                    <input 
                      type="text" 
                      placeholder="Breve introduzione..."
                      className="w-full bg-zinc-800/50 border border-zinc-700 rounded-2xl py-4 px-6 text-sm text-white focus:outline-none focus:border-amber-500/50 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Tags</label>
                  <div className="bg-zinc-800/50 border border-zinc-700 rounded-2xl p-4 flex flex-wrap gap-2">
                    {tags.map(tag => (
                      <span key={tag} className="bg-zinc-700 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-2 group">
                        {tag}
                        <button onClick={() => setTags(tags.filter(t => t !== tag))} className="text-zinc-500 hover:text-red-400"><X size={12} /></button>
                      </span>
                    ))}
                    <input 
                      type="text" 
                      placeholder="Aggiungi tag..."
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyDown={addTag}
                      className="bg-transparent border-none focus:outline-none text-xs text-zinc-300 ml-2"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Corpo dell'Articolo</label>
                  <textarea 
                    rows={12}
                    placeholder="Inizia a scrivere la storia..."
                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-3xl py-6 px-6 text-zinc-300 focus:outline-none focus:border-amber-500/50 transition-all leading-relaxed"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "media" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-8">
                <div className="space-y-4">
                  <h3 className="font-bold text-white flex items-center gap-2">
                    <ImageIcon size={20} className="text-blue-400" />
                    <span>Galleria Immagini</span>
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="aspect-square bg-zinc-800 rounded-2xl border-2 border-dashed border-zinc-700 flex flex-col items-center justify-center gap-2 text-zinc-500 hover:text-white hover:border-amber-500 transition-all cursor-pointer">
                      <Plus size={24} />
                      <span className="text-[10px] font-bold uppercase">Aggiungi</span>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-zinc-800 space-y-4">
                  <h3 className="font-bold text-white flex items-center gap-2">
                    <Video size={20} className="text-red-400" />
                    <span>Video Contenuto</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-zinc-800/30 border border-zinc-800 rounded-3xl space-y-4">
                      <div className="flex items-center gap-2 text-red-500">
                        <Youtube size={18} />
                        <span className="text-xs font-bold uppercase">YouTube / URL Esterno</span>
                      </div>
                      <input 
                        type="text" 
                        placeholder="Incolla il link (es: youtube.com/watch?v=...)"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:border-red-500/50 transition-all"
                      />
                    </div>
                    <div className="p-6 bg-zinc-800/30 border border-zinc-800 rounded-3xl space-y-4">
                      <div className="flex items-center gap-2 text-blue-500">
                        <FileVideo size={18} />
                        <span className="text-xs font-bold uppercase">Carica File Video</span>
                      </div>
                      <button className="w-full py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-bold text-zinc-400 hover:text-white transition-all flex items-center justify-center gap-2">
                        <Plus size={14} /> Scegli File MP4
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "publish" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="font-bold text-white flex items-center gap-2 text-sm uppercase tracking-widest">
                      <User size={16} className="text-zinc-500" />
                      <span>Metadati Autore</span>
                    </h3>
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase">Nome Autore</label>
                        <input type="text" defaultValue="Admin User" className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl py-3 px-4 text-sm text-white" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase">Data Pubblicazione</label>
                        <div className="relative">
                          <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                          <input type="text" defaultValue="06 Maggio 2026" className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl py-3 pl-12 pr-4 text-sm text-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-bold text-white flex items-center gap-2 text-sm uppercase tracking-widest">
                      <Layout size={16} className="text-amber-500" />
                      <span>Posizionamento in Home</span>
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                      {[
                        { id: "hero", label: "Top Story (Hero Slider)", desc: "Apertura del sito con immagine gigante." },
                        { id: "featured", label: "In Evidenza (Main)", desc: "Colonna centrale della prima pagina." },
                        { id: "side", label: "Spalla / Standard", desc: "Colonne laterali o griglia notizie." },
                      ].map((pos) => (
                        <div key={pos.id} className="p-4 bg-zinc-800/30 border border-zinc-800 rounded-2xl flex items-center justify-between cursor-pointer hover:border-amber-500/50 transition-all group">
                          <div>
                            <p className="text-xs font-bold text-white">{pos.label}</p>
                            <p className="text-[10px] text-zinc-500">{pos.desc}</p>
                          </div>
                          <div className="w-5 h-5 rounded-full border-2 border-zinc-700 group-hover:border-amber-500" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-bold text-white flex items-center gap-2 text-sm uppercase tracking-widest">
                      <Clock size={16} className="text-zinc-500" />
                      <span>Pianificazione Ciclo di Vita</span>
                    </h3>
                    <div className="space-y-3">
                      {[
                        { id: "hot", label: "Sempre Attivo (Hot)", icon: Flame, color: "text-amber-500", desc: "Non scade mai, ideale per grandi inchieste." },
                        { id: "standard", label: "Standard (7 giorni)", icon: Clock, color: "text-blue-400", desc: "Viene archiviato automaticamente dopo una settimana." },
                        { id: "temp", label: "Flash News (48 ore)", icon: Clock, color: "text-zinc-500", desc: "Scompare dopo 2 giorni per risparmiare spazio." },
                      ].map((type) => (
                        <div key={type.id} className="p-4 bg-zinc-800/30 border border-zinc-800 rounded-2xl flex items-start gap-4 cursor-pointer hover:border-zinc-700 transition-all group">
                          <div className={`p-2 rounded-xl bg-zinc-900 group-hover:bg-zinc-800 ${type.color}`}>
                            <type.icon size={18} />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white">{type.label}</p>
                            <p className="text-[10px] text-zinc-500">{type.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
            <h3 className="font-bold text-white text-sm">Resoconto Articolo</h3>
            <div className="space-y-3 pt-2">
              <div className="flex justify-between text-[11px]">
                <span className="text-zinc-500">Stato</span>
                <span className="text-amber-500 font-bold uppercase">Bozza</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-zinc-500">Leggibilità</span>
                <span className="text-emerald-500 font-bold uppercase">Ottima</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-zinc-500">Caratteri</span>
                <span className="text-white font-bold">1,248</span>
              </div>
            </div>
            <button className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-bold transition-all mt-4">
              Analizza con AI
            </button>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-3xl p-6">
            <p className="text-[11px] text-blue-400 italic leading-relaxed">
              "Assicurati di inserire almeno 3 tag per una migliore indicizzazione SEO & AI."
            </p>
          </div>
        </div>
      </div>

      {/* Add Category Modal (Simplified) */}
      {showAddCategory && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-zinc-900 border border-zinc-800 w-full max-w-sm rounded-3xl p-8 shadow-2xl"
          >
            <h3 className="text-lg font-bold text-white mb-4">Nuova Categoria</h3>
            <input 
              type="text" 
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Nome categoria..."
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl py-3 px-4 text-sm text-white mb-6 focus:border-amber-500/50 outline-none"
            />
            <div className="flex gap-3">
              <button onClick={() => setShowAddCategory(false)} className="flex-1 py-3 text-zinc-500 font-bold text-xs">Annulla</button>
              <button onClick={handleAddCategory} className="flex-1 py-3 bg-amber-500 text-black rounded-xl font-bold text-xs">Aggiungi</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
