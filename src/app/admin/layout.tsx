"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { 
  LayoutDashboard, 
  Newspaper, 
  FileText, 
  Search, 
  Settings, 
  BarChart3, 
  LogOut, 
  Menu, 
  X,
  Bell,
  User,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Zap
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Basic check for auth (client-side for demo)
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
    
    if (!loggedIn && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [pathname, router]);

  if (isLoggedIn === null) return <div className="min-h-screen bg-zinc-950" />;
  if (!isLoggedIn && pathname === "/admin/login") return <>{children}</>;
  if (!isLoggedIn) return null;

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    { name: "Redazione", icon: Newspaper, href: "/admin/notizie" },
    { name: "Struttura & Categorie", icon: Menu, href: "/admin/categorie" },
    { name: "Pagine & Legale", icon: FileText, href: "/admin/pagine" },
    { name: "SEO & AI Hub", icon: Zap, href: "/admin/seo", badge: "New" },
    { name: "Analytics", icon: BarChart3, href: "/admin/analytics" },
    { name: "Impostazioni", icon: Settings, href: "/admin/settings" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-sans flex overflow-hidden relative">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ 
          x: isSidebarOpen ? 0 : -280,
          width: 280
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="bg-zinc-900 border-r border-zinc-800 flex flex-col z-50 fixed lg:relative h-full"
      >
        <div className="p-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center text-black font-black">
              E
            </div>
            <span className="font-bold text-white tracking-tight text-xl">Editoriale<span className="text-amber-500">.</span></span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 text-zinc-500 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 flex flex-col gap-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={() => {
                  if (window.innerWidth < 1024) setIsSidebarOpen(false);
                }}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all group ${
                  isActive 
                    ? "bg-amber-500 text-black font-bold" 
                    : "hover:bg-zinc-800 text-zinc-400 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={20} />
                  <span className="text-sm">{item.name}</span>
                </div>
                {item.badge && !isActive && (
                  <span className="text-[9px] bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                    {item.badge}
                  </span>
                )}
                {isActive && <ChevronRight size={16} />}
              </a>
            );
          })}
        </nav>

        <div className="p-4 border-t border-zinc-800 space-y-2">
          <a 
            href="/"
            className="w-full flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-all"
          >
            <ExternalLink size={18} />
            <span className="text-sm font-medium">Torna al Sito</span>
          </a>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-zinc-500 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all"
          >
            <LogOut size={18} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className={`flex-1 flex flex-col relative overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'lg:ml-0' : 'lg:ml-[-280px]'}`}>
        {/* Header */}
        <header className="h-20 border-b border-zinc-800 flex items-center justify-between px-4 md:px-8 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400"
            >
              {isSidebarOpen ? <X size={20} className="hidden lg:block" /> : <Menu size={20} />}
              {!isSidebarOpen && <Menu size={20} className="lg:hidden" />}
              {isSidebarOpen && <Menu size={20} className="lg:hidden" />}
            </button>
            <div className="h-4 w-[1px] bg-zinc-800 mx-2 hidden md:block" />
            <h2 className="font-bold text-white text-sm md:text-base">
              {menuItems.find(i => i.href === pathname)?.name || "Pannello di Controllo"}
            </h2>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden lg:flex relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-amber-500 transition-colors">
                <Search size={16} />
              </div>
              <input 
                type="text" 
                placeholder="Cerca funzioni..."
                className="bg-zinc-900 border border-zinc-800 rounded-xl py-2 pl-10 pr-4 text-xs w-64 focus:outline-none focus:border-amber-500/50 transition-all"
              />
            </div>
            
            <button className="p-2 text-zinc-400 hover:text-white relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-amber-500 rounded-full border-2 border-zinc-950" />
            </button>
            
            <div className="flex items-center gap-3 md:pl-4 md:border-l md:border-zinc-800">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-white">Admin User</p>
                <p className="text-[10px] text-zinc-500">Super Admin</p>
              </div>
              <div className="w-8 h-8 md:w-10 md:h-10 bg-zinc-800 rounded-xl flex items-center justify-center text-zinc-400 border border-zinc-700">
                <User size={20} />
              </div>
            </div>
          </div>
        </header>

        {/* Viewport */}
        <div className="flex-1 overflow-y-auto bg-zinc-950">
          <div className="max-w-7xl mx-auto p-4 md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
