"use client";

import { motion } from "motion/react";
import { 
  Users, 
  TrendingUp, 
  Newspaper, 
  Eye, 
  Clock, 
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  MessageSquare,
  Sparkles
} from "lucide-react";

export default function AdminDashboard() {
  const quickStats = [
    { label: "Utenti Totali", value: "12,842", change: "+14.2%", positive: true, icon: Users },
    { label: "Visualizzazioni", value: "84,392", change: "+21.5%", positive: true, icon: Eye },
    { label: "Notizie Pubblicate", value: "482", change: "+3.1%", positive: true, icon: Newspaper },
    { label: "Tempo di Lettura", value: "4:22m", change: "-1.4%", positive: false, icon: Clock },
  ];

  return (
    <div className="space-y-10">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Bentornato, Admin 👋</h1>
          <p className="text-zinc-500 text-sm">Ecco cosa è successo su Editoriale nelle ultime 24 ore.</p>
        </div>
        <div className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 p-2 rounded-2xl">
          <div className="px-4 py-2 bg-zinc-800 rounded-xl text-xs font-bold text-zinc-300">Oggi</div>
          <div className="px-4 py-2 text-xs font-bold text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer">Settimana</div>
          <div className="px-4 py-2 text-xs font-bold text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer">Mese</div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 hover:border-zinc-700 transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-zinc-800 rounded-2xl flex items-center justify-center text-zinc-400 group-hover:text-amber-500 transition-colors">
                <stat.icon size={24} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${stat.positive ? "text-emerald-500" : "text-red-500"}`}>
                {stat.change}
                {stat.positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              </div>
            </div>
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-3xl font-black text-white">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Articles */}
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
            <h3 className="font-bold text-white">Ultimi Articoli Pubblicati</h3>
            <button className="text-xs font-bold text-amber-500 hover:underline">Vedi Tutti</button>
          </div>
          <div className="divide-y divide-zinc-800">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="p-4 hover:bg-zinc-800/50 transition-all flex items-center gap-4">
                <div className="w-16 h-12 bg-zinc-800 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={`https://picsum.photos/seed/${item}/100/100`} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-zinc-200 text-sm truncate">L'intelligenza artificiale nel giornalismo: opportunità e rischi del 2026</h4>
                  <p className="text-[10px] text-zinc-500">Pubblicato {item * 2} ore fa &bull; Tecnologia &bull; Marco Rossi</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs font-bold text-white">1.2k</p>
                    <p className="text-[10px] text-zinc-500 font-medium">Views</p>
                  </div>
                  <button className="p-2 text-zinc-600 hover:text-white transition-colors">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI & Engagement Side Column */}
        <div className="space-y-8">
          
          {/* AI Status Card */}
          <div className="bg-gradient-to-br from-amber-500/20 to-amber-500/5 border border-amber-500/20 rounded-3xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 text-amber-500/10 group-hover:scale-110 transition-transform duration-700">
              <Sparkles size={80} />
            </div>
            <div className="relative z-10">
              <h3 className="text-amber-500 font-bold text-sm mb-4 flex items-center gap-2">
                <Sparkles size={16} />
                <span>Stato Visibilità AI</span>
              </h3>
              <p className="text-2xl font-black text-white mb-2">Ottimo (85%)</p>
              <p className="text-xs text-zinc-400 mb-6">Il tuo sito è ottimamente indicizzato per ChatGPT e Gemini.</p>
              <button className="w-full bg-amber-500 text-black py-3 rounded-xl font-bold text-xs hover:bg-amber-400 transition-all">
                Configura SEO Hub
              </button>
            </div>
          </div>

          {/* User Feedback/Questions */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
            <h3 className="font-bold text-white flex items-center gap-2">
              <MessageSquare size={18} className="text-blue-500" />
              <span>Domande Utenti via AI</span>
            </h3>
            <div className="space-y-3">
              {[
                "Cosa dice Editoriale sull'AI?",
                "Quali sono le ultime notizie tech?",
                "Chi è il direttore di Editoriale?"
              ].map((q, i) => (
                <div key={i} className="p-3 bg-zinc-800/50 rounded-xl border border-zinc-700/50">
                  <p className="text-[11px] text-zinc-400 italic">"{q}"</p>
                </div>
              ))}
            </div>
            <button className="w-full text-center text-[10px] font-bold text-zinc-500 hover:text-zinc-300 transition-colors pt-2">
              Mostra tutte le 12 domande
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
