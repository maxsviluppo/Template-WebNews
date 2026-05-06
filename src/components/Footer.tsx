import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  ArrowRight, 
  Globe, 
  ShieldCheck, 
  FileText, 
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { CATEGORIES } from "../types";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const footerLinks = {
    azienda: [
      { name: "Chi Siamo", href: "#" },
      { name: "Redazione", href: "#" },
      { name: "Lavora con noi", href: "#" },
      { name: "Pubblicità", href: "#" },
      { name: "Contatti", href: "#" },
    ],
    supporto: [
      { name: "Centro Assistenza", href: "#" },
      { name: "FAQ", href: "#" },
      { name: "Accessibilità", href: "#" },
      { name: "Segnala un errore", href: "#" },
    ],
    legale: [
      { name: "Privacy Policy", href: "#" },
      { name: "Cookie Policy", href: "#" },
      { name: "Termini e Condizioni", href: "#" },
      { name: "GDPR", href: "#" },
      { name: "Note Legali", href: "#" },
    ]
  };

  return (
    <footer className="bg-zinc-950 text-zinc-400 pt-20 pb-10 px-6 overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-zinc-800/20 rounded-full blur-[120px] -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-zinc-800/10 rounded-full blur-[100px] translate-y-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20">
          
          {/* Brand & Newsletter */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-1">
                <span className="text-2xl font-black tracking-tighter text-white">
                  EDITOR<span className="text-amber-500">I</span>ALE
                </span>
                <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
              </div>
              <p className="text-sm leading-relaxed max-w-sm">
                L'informazione intelligente, veloce e personalizzata. 
                Resta aggiornato con le ultime notizie dal mondo, analizzate dai nostri esperti.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-white font-bold text-sm uppercase tracking-widest">Newsletter</h3>
              <form onSubmit={handleSubscribe} className="relative group">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="La tua email"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-zinc-600 transition-all placeholder:text-zinc-600"
                  required
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-2 bottom-2 bg-white text-black px-6 rounded-xl font-bold text-sm hover:bg-zinc-200 transition-all flex items-center gap-2"
                >
                  {subscribed ? "Iscritto!" : <><span className="hidden sm:inline">Iscriviti</span> <ArrowRight size={16} /></>}
                </button>
              </form>
              <p className="text-[10px] text-zinc-600">
                Iscrivendoti accetti la nostra <a href="#" className="underline">Privacy Policy</a> e il trattamento dei dati.
              </p>
            </div>

            <div className="flex items-center gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -4, scale: 1.1 }}
                  className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all border border-zinc-800"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Sitemap Links */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h3 className="text-white font-bold text-sm uppercase tracking-widest">Azienda</h3>
            <ul className="flex flex-col gap-3">
              {footerLinks.azienda.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm hover:text-white transition-colors flex items-center gap-2 group">
                    <ChevronRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-6">
            <h3 className="text-white font-bold text-sm uppercase tracking-widest">Supporto</h3>
            <ul className="flex flex-col gap-3">
              {footerLinks.supporto.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm hover:text-white transition-colors flex items-center gap-2 group">
                    <ChevronRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Grid */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <h3 className="text-white font-bold text-sm uppercase tracking-widest">Categorie</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {CATEGORIES.slice(0, 12).map((cat) => (
                <a 
                  key={cat} 
                  href="#" 
                  className="text-sm hover:text-white transition-colors flex items-center gap-2 group py-1"
                >
                  <span className="w-1.5 h-1.5 bg-zinc-800 rounded-full group-hover:bg-white transition-colors" />
                  {cat}
                </a>
              ))}
            </div>
            <a href="#" className="text-xs font-bold text-zinc-500 hover:text-white transition-colors flex items-center gap-2 mt-2">
              Mostra tutte le categorie <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-wrap justify-center md:justify-start gap-6">
            {footerLinks.legale.map((link) => (
              <a key={link.name} href={link.href} className="text-[11px] font-medium hover:text-white transition-colors">
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-[11px]">
              <Globe size={14} />
              <span>Italiano (IT)</span>
            </div>
            <div className="flex items-center gap-2 text-[11px]">
              <ShieldCheck size={14} className="text-emerald-500" />
              <span>Sito Protetto</span>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-zinc-700 max-w-3xl">
            © 2026 Presente Media Group S.p.A. Tutti i diritti riservati. P.IVA 01234567890. 
            Testata giornalistica registrata presso il Tribunale di Milano n. 123/2026. 
            Direttore Responsabile: Marco Rossi. I contenuti di questo sito non possono essere riprodotti 
            senza autorizzazione scritta.
          </p>
          <a 
            href="/admin/login" 
            className="text-amber-500 hover:text-amber-400 transition-all opacity-80 hover:opacity-100 hover:scale-110"
            title="Admin Login v1.0.3"
          >
            <ShieldCheck size={22} />
          </a>
          {/* Version Marker: 20260506_v3 */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
