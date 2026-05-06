"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  Archive, 
  Flame, 
  Clock, 
  Calendar,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { MOCK_NEWS } from "../../../types";

export default function AdminNotiziePage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Simulated news with "Life Cycle" status
  const newsWithStatus = MOCK_NEWS.map((n, i) => ({
    ...n,
    status: i === 0 ? "Hot" : i < 3 ? "Standard" : "Temporanea",
    expiresIn: i === 0 ? "Mai" : i < 3 ? "5 giorni" : "24 ore"
  }));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Gestione Notizie</h1>
          <p className="text-zinc-500 text-sm">Crea, modifica e gestisci il ciclo di vita dei tuoi articoli.</p>
        </div>
        <button 
          onClick={() => router.push("/admin/notizie/nuovo")}
          className="bg-amber-500 text-black px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/10"
        >
          <Plus size={18} />
          <span>Nuovo Articolo</span>
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Articoli Attivi", value: "24", icon: CheckCircle2, color: "text-emerald-500" },
          { label: "In Scadenza", value: "5", icon: Clock, color: "text-amber-500" },
          { label: "Archiviati (30gg)", value: "112", icon: Archive, color: "text-zinc-500" },
        ].map((stat) => (
          <div key={stat.label} className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl flex items-center gap-4">
            <div className={`p-3 bg-zinc-800 rounded-2xl ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{stat.label}</p>
              <p className="text-2xl font-black text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
          <input 
            type="text" 
            placeholder="Cerca per titolo, autore o categoria..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-amber-500/50 transition-all"
          />
        </div>
        <button className="px-6 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center gap-2 text-zinc-400 hover:text-white transition-all">
          <Filter size={18} />
          <span className="text-sm font-bold">Filtri</span>
        </button>
      </div>

      {/* News Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/50">
                <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Articolo</th>
                <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Categoria</th>
                <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Ciclo di Vita</th>
                <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Scadenza</th>
                <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Azioni</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {newsWithStatus.map((item) => (
                <tr key={item.id} className="hover:bg-zinc-800/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-10 bg-zinc-800 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-white text-sm truncate">{item.title}</p>
                        <p className="text-[10px] text-zinc-500">{item.author} &bull; {item.date}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-bold bg-zinc-800 text-zinc-400 px-2 py-1 rounded-full uppercase tracking-wider">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select 
                      defaultValue={item.status}
                      className={`bg-black text-[10px] font-bold px-3 py-1.5 rounded-lg border border-zinc-800 focus:border-amber-500/50 outline-none appearance-none cursor-pointer transition-all ${
                        item.status === "Hot" ? "text-amber-500" : item.status === "Standard" ? "text-blue-400" : "text-zinc-500"
                      }`}
                    >
                      <option value="Hot" className="bg-black text-white">🔥 HOT</option>
                      <option value="Standard" className="bg-black text-white">📅 STANDARD</option>
                      <option value="Temporanea" className="bg-black text-white">⏳ FLASH</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <select 
                      defaultValue={item.expiresIn}
                      className={`bg-black text-xs font-medium border border-zinc-800 rounded-lg px-2 py-1 outline-none cursor-pointer hover:border-zinc-600 transition-all ${
                        item.expiresIn === "24 ore" ? "text-red-400" : "text-zinc-300"
                      }`}
                    >
                      <option value="Mai" className="bg-black text-white">Sempre Attivo</option>
                      <option value="7 giorni" className="bg-black text-white">7 Giorni</option>
                      <option value="48 ore" className="bg-black text-white">48 Ore</option>
                      <option value="24 ore" className="bg-black text-white">24 Ore</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-all">
                        <Edit3 size={16} />
                      </button>
                      <button className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-amber-500 transition-all">
                        <Archive size={16} />
                      </button>
                      <button className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-red-400 transition-all">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
