"use client";

import { motion } from "motion/react";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Clock, 
  Globe, 
  MousePointer2, 
  ArrowUpRight, 
  ArrowDownRight,
  Map,
  Smartphone,
  Monitor,
  Share2
} from "lucide-react";

export default function AdminAnalyticsPage() {
  const stats = [
    { label: "Sessioni", value: "2.4k", change: "+12.5%", positive: true },
    { label: "Utenti Unici", value: "1.8k", change: "+8.2%", positive: true },
    { label: "Frequenza Rimbalzo", value: "42%", change: "-2.4%", positive: true },
    { label: "Durata Sessione", value: "3:45m", change: "+0.5%", positive: true },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Analytics & Traffico</h1>
          <p className="text-zinc-500 text-sm">Monitora l'andamento del tuo giornale in tempo reale.</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-1 rounded-xl flex">
          <button className="px-4 py-2 bg-zinc-800 text-white text-xs font-bold rounded-lg">Real-time</button>
          <button className="px-4 py-2 text-zinc-500 text-xs font-bold rounded-lg">Storico</button>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl space-y-2">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{stat.label}</p>
            <div className="flex items-end justify-between">
              <h3 className="text-2xl font-black text-white">{stat.value}</h3>
              <div className={`flex items-center gap-1 text-[10px] font-bold ${stat.positive ? "text-emerald-500" : "text-red-500"}`}>
                {stat.change}
                {stat.positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Traffic Chart */}
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white flex items-center gap-2">
              <TrendingUp size={20} className="text-amber-500" />
              <span>Andamento Settimanale</span>
            </h3>
            <div className="flex gap-2">
              <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                <div className="w-2 h-2 bg-amber-500 rounded-full" />
                <span>Visualizzazioni</span>
              </div>
            </div>
          </div>
          
          <div className="h-64 flex items-end gap-3 px-2">
            {[30, 45, 60, 55, 80, 95, 70].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                <div className="w-full relative flex flex-col justify-end">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    className="w-full bg-amber-500/20 rounded-t-xl group-hover:bg-amber-500/40 transition-all cursor-pointer"
                  />
                </div>
                <span className="text-[10px] font-bold text-zinc-600 uppercase">{['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'][i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Device & Platform */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-8">
          <h3 className="font-bold text-white flex items-center gap-2">
            <Map size={20} className="text-blue-500" />
            <span>Dispositivi</span>
          </h3>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Smartphone size={14} />
                  <span>Mobile</span>
                </div>
                <span className="text-white font-bold">68%</span>
              </div>
              <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[68%]" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Monitor size={14} />
                  <span>Desktop</span>
                </div>
                <span className="text-white font-bold">28%</span>
              </div>
              <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 w-[28%]" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Globe size={14} />
                  <span>Tablet / Altro</span>
                </div>
                <span className="text-white font-bold">4%</span>
              </div>
              <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-zinc-700 w-[4%]" />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-zinc-800">
            <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Top Referrer</h4>
            <div className="space-y-3">
              {[
                { name: "Google", val: "45%" },
                { name: "Social (FB/IG)", val: "32%" },
                { name: "Diretto", val: "23%" },
              ].map((r) => (
                <div key={r.name} className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400">{r.name}</span>
                  <span className="text-white font-bold">{r.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
