"use client";

import { motion } from "motion/react";
import { 
  Zap, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Search, 
  Globe, 
  ShieldCheck, 
  FileText, 
  Settings, 
  ChevronRight,
  Info,
  ExternalLink,
  Bot,
  Sparkles,
  ArrowRight
} from "lucide-react";

export default function SeoHubPage() {
  const stats = [
    { label: "Checklist SEO", value: "5", total: "10", color: "bg-amber-500" },
    { label: "Problemi", value: "2", color: "bg-red-500" },
    { label: "Suggerimenti", value: "8", color: "bg-blue-500" },
    { label: "Attività completate", value: "12", color: "bg-emerald-500" },
  ];

  const aiVisibility = [
    { platform: "ChatGPT", status: "Ottimo", score: 85, lastScan: "2 ore fa" },
    { platform: "Gemini", status: "Monitorato", score: 72, lastScan: "1 giorno fa" },
    { platform: "Perplexity", status: "Ottimo", score: 91, lastScan: "5 ore fa" },
    { platform: "Claude", status: "In attesa", score: 0, lastScan: "-" },
  ];

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-amber-500 font-bold text-xs uppercase tracking-widest mb-1">
            <Zap size={14} />
            <span>SEO & AI Intelligence</span>
          </div>
          <h1 className="text-3xl font-bold text-white">Centro di Comando SEO</h1>
          <p className="text-zinc-500 text-sm">Monitora e ottimizza la presenza del tuo sito sui motori di ricerca e le AI generative.</p>
        </div>
        
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-bold hover:bg-zinc-800 transition-all flex items-center gap-2">
            <FileText size={14} />
            <span>Esporta Report</span>
          </button>
          <button className="px-4 py-2 bg-amber-500 text-black rounded-xl text-xs font-bold hover:bg-amber-400 transition-all flex items-center gap-2">
            <Sparkles size={14} />
            <span>Analisi AI Istantanea</span>
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Progress & Stats */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* SEO Assistant Card */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
              <Zap size={120} />
            </div>
            
            <div className="flex flex-col md:flex-row gap-10 items-center relative z-10">
              {/* Circular Progress */}
              <div className="relative w-40 h-40 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-zinc-800"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeDasharray={440}
                    strokeDashoffset={440 - (440 * 65) / 100}
                    strokeLinecap="round"
                    fill="transparent"
                    className="text-amber-500 transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-black text-white">65%</span>
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Ottimizzato</span>
                </div>
              </div>

              <div className="flex-1 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Assistente SEO Personale</h3>
                  <p className="text-sm text-zinc-400">Risolvi i problemi e segui i consigli per migliorare le prestazioni del sito nei risultati di ricerca e con gli assistenti AI.</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {stats.map((s) => (
                    <div key={s.label} className="space-y-1">
                      <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">{s.label}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-white">{s.value}</span>
                        <div className={`w-1.5 h-1.5 rounded-full ${s.color}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* AI Visibility Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Bot size={20} className="text-amber-500" />
                <span>Visibilità AI Generativa</span>
              </h3>
              <span className="text-[10px] text-zinc-500 italic">Ultimi 30 giorni</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aiVisibility.map((ai) => (
                <div key={ai.platform} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-700 transition-all group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center text-white border border-zinc-700">
                        <Globe size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-white">{ai.platform}</h4>
                        <p className="text-[10px] text-zinc-500">Punteggio Visibilità</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${ai.score > 0 ? "bg-emerald-500/10 text-emerald-500" : "bg-zinc-800 text-zinc-500"}`}>
                        {ai.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-500">Indice di citazione</span>
                      <span className="text-white font-bold">{ai.score}%</span>
                    </div>
                    <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${ai.score}%` }}
                        className="h-full bg-amber-500"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center justify-between text-[10px]">
                    <span className="text-zinc-500">Ultima scansione: {ai.lastScan}</span>
                    <button className="text-amber-500 hover:underline flex items-center gap-1">
                      Dettagli <ChevronRight size={10} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Performance on Google (Simulated) */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <TrendingUp size={20} className="text-blue-500" />
                  <span>Prestazioni su Google</span>
                </h3>
                <p className="text-xs text-zinc-500">Dati integrati da Search Console</p>
              </div>
              <button className="text-xs font-bold text-blue-500 hover:underline">
                Collega Search Console
              </button>
            </div>
            
            <div className="h-48 flex items-end gap-2 px-2">
              {[40, 60, 35, 90, 65, 80, 45, 70, 85, 50, 95, 60].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col gap-2 items-center group">
                  <div 
                    className="w-full bg-blue-500/20 rounded-t-lg group-hover:bg-blue-500/40 transition-all cursor-pointer relative"
                    style={{ height: `${h}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {h}k
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-zinc-800">
              <div>
                <p className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Clic totali</p>
                <p className="text-2xl font-bold text-white">45.2k <span className="text-xs text-emerald-500">+12%</span></p>
              </div>
              <div>
                <p className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Impressioni</p>
                <p className="text-2xl font-bold text-white">1.2M <span className="text-xs text-emerald-500">+5%</span></p>
              </div>
              <div>
                <p className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Posizione Media</p>
                <p className="text-2xl font-bold text-white">4.2 <span className="text-xs text-red-500">-0.2</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Tools & Actions */}
        <div className="space-y-8">
          
          {/* NLWeb Toggle */}
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-500">
                <Bot size={20} />
                <span className="font-bold text-sm">NLWeb Access</span>
              </div>
              <div className="w-10 h-5 bg-amber-500 rounded-full relative cursor-pointer p-1">
                <div className="w-3 h-3 bg-white rounded-full absolute right-1" />
              </div>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Consenti agli assistenti AI di scansionare e riassumere i tuoi contenuti per apparire nei risultati generativi di ChatGPT e Gemini.
            </p>
          </div>

          {/* Quick Tools List */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-zinc-800">
              <h3 className="font-bold text-white">Strumenti SEO</h3>
            </div>
            <div className="divide-y divide-zinc-800">
              {[
                { name: "Checklist Configurazione", icon: CheckCircle2, desc: "Segui la guida personalizzata" },
                { name: "Impostazioni SEO", icon: Settings, desc: "Meta tag e preferenze" },
                { name: "Ispezione del Sito", icon: Search, desc: "Vedi come ti vede Google" },
                { name: "URL Redirect Manager", icon: ArrowRight, desc: "Gestisci i reindirizzamenti" },
                { name: "Verifica Sito", icon: ShieldCheck, desc: "Dichiara la proprietà" },
                { name: "Sitemap XML", icon: Globe, desc: "Indice automatico dei link" },
                { name: "Editor Robots.txt", icon: FileText, desc: "Regole di scansione" },
              ].map((tool) => (
                <button key={tool.name} className="w-full p-4 flex items-center justify-between hover:bg-zinc-800 transition-all text-left group">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-zinc-800 rounded-lg text-zinc-400 group-hover:text-amber-500 transition-colors">
                      <tool.icon size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-zinc-300">{tool.name}</p>
                      <p className="text-[10px] text-zinc-500">{tool.desc}</p>
                    </div>
                  </div>
                  <ChevronRight size={14} className="text-zinc-600" />
                </button>
              ))}
            </div>
          </div>

          {/* Help Card */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-3xl p-6 space-y-4">
            <h4 className="font-bold text-blue-400 text-sm">Hai bisogno di aiuto?</h4>
            <div className="space-y-3">
              <a href="#" className="flex items-center justify-between text-xs text-zinc-400 hover:text-white transition-colors p-3 bg-zinc-900/50 rounded-xl">
                <span>Come usare i link interni per la SEO</span>
                <ExternalLink size={12} />
              </a>
              <a href="#" className="flex items-center justify-between text-xs text-zinc-400 hover:text-white transition-colors p-3 bg-zinc-900/50 rounded-xl">
                <span>Ispezione sito di Editoriale</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
