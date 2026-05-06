"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { 
  Settings, 
  Image as ImageIcon, 
  Upload, 
  Trash2, 
  Monitor, 
  Smartphone, 
  Check, 
  Sparkles,
  Megaphone,
  Palette,
  Globe
} from "lucide-react";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("brand");

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Impostazioni Globali</h1>
          <p className="text-zinc-500 text-sm">Gestisci l'identità del tuo brand e la configurazione pubblicitaria.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1 bg-zinc-900 border border-zinc-800 rounded-2xl w-fit">
        {[
          { id: "brand", label: "Media Kit & Brand", icon: Palette },
          { id: "ads", label: "Gestione Inserzioni", icon: Megaphone },
          { id: "general", label: "Sito & Dominio", icon: Globe },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === tab.id 
                ? "bg-amber-500 text-black shadow-lg" 
                : "text-zinc-500 hover:text-white"
            }`}
          >
            <tab.icon size={14} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Columns (Main Settings) */}
        <div className="lg:col-span-2 space-y-8">
          
          {activeTab === "brand" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              {/* Logo Management */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-8">
                <h3 className="font-bold text-white text-lg flex items-center gap-2">
                  <ImageIcon size={20} className="text-amber-500" />
                  <span>Loghi del Giornale</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Logo Principale (Dark Mode)</p>
                    <div className="aspect-[3/1] bg-black rounded-2xl border border-zinc-800 flex items-center justify-center relative group overflow-hidden">
                      <span className="text-2xl font-black text-white italic">EDITORIALE.</span>
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <button className="p-2 bg-white text-black rounded-lg hover:scale-110 transition-transform"><Upload size={16} /></button>
                        <button className="p-2 bg-red-500 text-white rounded-lg hover:scale-110 transition-transform"><Trash2 size={16} /></button>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Logo Principale (Light Mode)</p>
                    <div className="aspect-[3/1] bg-white rounded-2xl border border-zinc-800 flex items-center justify-center relative group overflow-hidden">
                      <span className="text-2xl font-black text-black italic">EDITORIALE.</span>
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <button className="p-2 bg-white text-black rounded-lg hover:scale-110 transition-transform"><Upload size={16} /></button>
                        <button className="p-2 bg-red-500 text-white rounded-lg hover:scale-110 transition-transform"><Trash2 size={16} /></button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 border-t border-zinc-800">
                  <div className="flex flex-col justify-center">
                    <h4 className="text-white font-bold text-sm">Favicon</h4>
                    <p className="text-[10px] text-zinc-500 mb-4">Icona del browser (32x32px).</p>
                    <button className="w-fit bg-zinc-800 hover:bg-zinc-700 text-white text-xs px-4 py-2 rounded-lg transition-all flex items-center gap-2">
                      <Upload size={14} /> Carica
                    </button>
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="text-white font-bold text-sm">Logo Footer</h4>
                    <p className="text-[10px] text-zinc-500 mb-4">Versione per sfondo scuro.</p>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center"><Check size={10} className="text-black" /></div>
                      <span className="text-[10px] text-zinc-400">Sincronizzato con Main</span>
                    </div>
                    <button className="w-fit bg-zinc-800 hover:bg-zinc-700 text-white text-xs px-4 py-2 rounded-lg transition-all">
                      Personalizza
                    </button>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="p-4 bg-black rounded-2xl border border-zinc-800 flex flex-col items-center gap-2">
                      <span className="text-lg font-black text-white italic tracking-tighter">EDITOR<span className="text-amber-500">I</span>ALE</span>
                      <span className="text-[8px] text-zinc-500 uppercase font-bold tracking-widest">Preview Footer</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cover Image for Sharing */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-6">
                <h3 className="font-bold text-white text-sm uppercase tracking-widest">Social Share Image (OG Image)</h3>
                <div className="aspect-video bg-zinc-800 rounded-3xl border-2 border-dashed border-zinc-700 flex flex-col items-center justify-center gap-4 text-zinc-500 hover:text-white hover:border-amber-500 transition-all cursor-pointer">
                  <Upload size={32} />
                  <p className="text-xs font-bold">Trascina o clicca per caricare l'immagine di default (1200x630px)</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "ads" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-6">
                <h3 className="font-bold text-white text-lg flex items-center gap-2">
                  <Megaphone size={20} className="text-blue-500" />
                  <span>Gestione Inserzionisti</span>
                </h3>
                
                <div className="space-y-4">
                  {[
                    { name: "Top Banner (Home)", size: "728x90px", active: true },
                    { name: "Sidebar Card", size: "300x250px", active: true },
                    { name: "Inter-Article Mobile", size: "320x100px", active: false },
                  ].map((ad) => (
                    <div key={ad.name} className="p-5 bg-zinc-800/30 border border-zinc-800 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center text-zinc-500">
                          <ImageIcon size={20} />
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-sm">{ad.name}</h4>
                          <p className="text-[10px] text-zinc-500">Dimensione consigliata: {ad.size}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-4 rounded-full relative p-0.5 transition-colors ${ad.active ? "bg-emerald-500" : "bg-zinc-700"}`}>
                          <div className={`w-3 h-3 bg-white rounded-full absolute transition-all ${ad.active ? "right-0.5" : "left-0.5"}`} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Column (Info/Help) */}
        <div className="space-y-8">
          <div className="bg-amber-500 text-black rounded-3xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles size={20} />
              <h4 className="font-black text-sm uppercase tracking-tighter">Media Kit Consigliato</h4>
            </div>
            <p className="text-xs font-medium leading-relaxed">
              Per una visualizzazione ottimale su tutti i dispositivi, assicurati che i loghi abbiano uno sfondo trasparente e che le varianti scure e chiare siano ben contrastate.
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
            <h4 className="font-bold text-white text-sm">Visualizzazione Anteprima</h4>
            <div className="flex gap-4">
              <div className="flex-1 p-3 bg-zinc-800 rounded-xl flex flex-col items-center gap-2 text-zinc-400">
                <Monitor size={20} />
                <span className="text-[10px] font-bold">DESKTOP</span>
              </div>
              <div className="flex-1 p-3 bg-zinc-800 rounded-xl flex flex-col items-center gap-2 text-zinc-400">
                <Smartphone size={20} />
                <span className="text-[10px] font-bold">MOBILE</span>
              </div>
            </div>
            <p className="text-[10px] text-zinc-500 text-center italic">Le modifiche sono applicate in tempo reale al salvataggio.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
