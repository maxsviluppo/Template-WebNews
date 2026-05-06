"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { 
  FileText, 
  Info, 
  Phone, 
  Share2, 
  ChevronRight, 
  CheckCircle2, 
  Globe, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Mail,
  ShieldCheck,
  Edit3
} from "lucide-react";

export default function AdminPaginePage() {
  const pages = [
    { name: "Chi Siamo", status: "Pubblicato", lastEdit: "12 Mar 2026", icon: Info },
    { name: "Contatti", status: "Pubblicato", lastEdit: "10 Feb 2026", icon: Phone },
    { name: "Privacy Policy", status: "Pubblicato", lastEdit: "01 Gen 2026", icon: ShieldCheck, isLegal: true },
    { name: "Cookie Policy", status: "Pubblicato", lastEdit: "01 Gen 2026", icon: ShieldCheck, isLegal: true },
    { name: "Termini e Condizioni", status: "Pubblicato", lastEdit: "01 Gen 2026", icon: ShieldCheck, isLegal: true },
    { name: "GDPR", status: "Bozza", lastEdit: "15 Mar 2026", icon: ShieldCheck, isLegal: true },
    { name: "Note Legali", status: "Pubblicato", lastEdit: "01 Gen 2026", icon: FileText, isLegal: true },
  ];

  const socialLinks = [
    { platform: "Facebook", icon: Facebook, value: "facebook.com/editoriale" },
    { platform: "Twitter/X", icon: Twitter, value: "x.com/editoriale" },
    { platform: "Instagram", icon: Instagram, value: "instagram.com/editoriale" },
    { platform: "LinkedIn", icon: Linkedin, value: "linkedin.com/company/editoriale" },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Pagine & Legale</h1>
          <p className="text-zinc-500 text-sm">Gestisci i contenuti istituzionali e i documenti legali del tuo giornale.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Pages List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
              <h3 className="font-bold text-white flex items-center gap-2">
                <FileText size={20} className="text-amber-500" />
                <span>Pagine del Sito</span>
              </h3>
              <button className="text-[10px] font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3 py-1 rounded-full transition-all">NUOVA PAGINA</button>
            </div>
            <div className="divide-y divide-zinc-800">
              {pages.map((p) => (
                <div key={p.name} className="p-4 flex items-center justify-between hover:bg-zinc-800/30 transition-all group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-xl ${p.isLegal ? "bg-red-500/10 text-red-400" : "bg-blue-500/10 text-blue-400"}`}>
                      <p.icon size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-zinc-200 text-sm">{p.name}</h4>
                      <p className="text-[10px] text-zinc-500">Ultima modifica: {p.lastEdit}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${p.status === "Pubblicato" ? "bg-emerald-500/10 text-emerald-500" : "bg-zinc-800 text-zinc-500"}`}>
                      {p.status}
                    </span>
                    <ChevronRight size={16} className="text-zinc-700 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Social & Contact Config */}
        <div className="space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-6">
            <h3 className="font-bold text-white flex items-center gap-2">
              <Share2 size={18} className="text-purple-500" />
              <span>Social & Links</span>
            </h3>
            
            <div className="space-y-4">
              {socialLinks.map((s) => (
                <div key={s.platform} className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">{s.platform}</label>
                  <div className="relative group">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-white transition-colors">
                      <s.icon size={16} />
                    </div>
                    <input 
                      type="text" 
                      defaultValue={s.value}
                      className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl py-3 pl-10 pr-4 text-xs text-zinc-300 focus:outline-none focus:border-purple-500/50 transition-all"
                    />
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full bg-white text-black py-3 rounded-xl font-bold text-xs hover:bg-zinc-200 transition-all">
              Salva Social
            </button>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-6">
            <h3 className="font-bold text-white flex items-center gap-2">
              <Mail size={18} className="text-emerald-500" />
              <span>Dati Societari</span>
            </h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Email Redazione</label>
                <input type="text" defaultValue="redazione@editoriale.it" className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl py-2 px-4 text-xs text-zinc-300 focus:outline-none focus:border-emerald-500/50" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">P.IVA / Sede</label>
                <textarea className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl py-2 px-4 text-xs text-zinc-300 focus:outline-none focus:border-emerald-500/50 h-20 resize-none" defaultValue="P.IVA 01234567890 - Via Roma 1, Milano (IT)" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
