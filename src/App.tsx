"use client";

import { useState, useEffect, MouseEvent, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Menu, Search, Bell, Home, Compass, Bookmark, User as UserIcon, ArrowLeft, Moon, Sun, LayoutGrid, Grid, ArrowUp, ChevronLeft, ChevronRight, Newspaper } from "lucide-react";
import { MOCK_NEWS, CATEGORIES, NewsItem, LayoutType, CardSize } from "./types";
import MobileMenu from "./components/MobileMenu";
import HeroSlider from "./components/HeroSlider";
import NewsCard from "./components/NewsCard";
import ShareModal from "./components/ShareModal";
import ArticleDetail from "./components/ArticleDetail";
import SearchOverlay from "./components/SearchOverlay";
import Footer from "./components/Footer";
import NewspaperView from "./components/NewspaperView";

type AppProps = {
  initialView?: "home" | "saved";
  initialArticleId?: string | null;
};

export default function App({ initialView = "home", initialArticleId = null }: AppProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNewspaperOpen, setIsNewspaperOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Tutti");
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [view, setView] = useState<"home" | "saved">(initialView);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  const handleSetView = (newView: "home" | "saved") => {
    if (view === newView) return;
    setView(newView);
    const targetPath = newView === "home" ? "/" : "/salvati";
    if (typeof window !== 'undefined' && window.location.pathname !== targetPath) {
      window.history.pushState({ ...window.history.state, as: targetPath, url: targetPath }, '', targetPath);
    }
  };

  const [sharingItem, setSharingItem] = useState<NewsItem | null>(null);
  
  // Find initial article if provided
  const initialArticle = initialArticleId ? MOCK_NEWS.find(n => n.id === initialArticleId) || null : null;
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(initialArticle);

  const handleSetSelectedArticle = (item: NewsItem | null) => {
    if (item) {
      if (selectedArticle?.id === item.id) return;
      setSelectedArticle(item);
      
      // Aggiorniamo l'URL silenziosamente per evitare il flicker del mount di Next.js
      const targetPath = `/articolo/${item.id}`;
      if (typeof window !== 'undefined' && window.location.pathname !== targetPath) {
        window.history.pushState({ ...window.history.state, as: targetPath, url: targetPath }, '', targetPath);
      }
    } else {
      setSelectedArticle(null);
      const targetPath = view === "home" ? "/" : "/salvati";
      if (typeof window !== 'undefined' && window.location.pathname !== targetPath) {
        window.history.pushState({ ...window.history.state, as: targetPath, url: targetPath }, '', targetPath);
      }
    }
  };

  // Sincronizza lo stato quando cambiano le props o l'URL
  useEffect(() => {
    const isArticlePath = window.location.pathname.startsWith('/articolo/');
    const pathId = window.location.pathname.split('/').pop();

    if (isArticlePath && pathId) {
      if (selectedArticle?.id !== pathId) {
        const article = MOCK_NEWS.find(n => n.id === pathId);
        if (article) setSelectedArticle(article);
      }
    } else if (!isArticlePath && selectedArticle) {
      setSelectedArticle(null);
    }
    
    // Sincronizzazione viste Home/Salvati basata su URL o prop iniziale
    if (window.location.pathname === '/salvati') setView('saved');
    else if (window.location.pathname === '/') setView('home');
    else if (initialView) setView(initialView);

  }, [initialArticleId, pathname, initialView, selectedArticle?.id]);

  useEffect(() => {
    const handlePopState = () => {
      const isArticlePath = window.location.pathname.startsWith('/articolo/');
      const pathId = window.location.pathname.split('/').pop();
      
      if (isArticlePath && pathId) {
        const article = MOCK_NEWS.find(n => n.id === pathId);
        if (article) setSelectedArticle(article);
      } else {
        setSelectedArticle(null);
      }

      if (window.location.pathname === '/salvati') setView('saved');
      else if (window.location.pathname === '/') setView('home');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);
  const [gridLayout, setGridLayout] = useState<LayoutType>('puzzle');
  useEffect(() => {
    const saved = localStorage.getItem("grid_layout");
    if (saved) setGridLayout(saved as LayoutType);
  }, []);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const [cardSize, setCardSize] = useState<CardSize>('medium');
  useEffect(() => {
    const saved = localStorage.getItem("card_size");
    if (saved) setCardSize(saved as CardSize);
  }, []);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setTheme(saved as 'light' | 'dark');
  }, []);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScroll);
      checkScroll();
      // Check again after a short delay to ensure content is rendered
      setTimeout(checkScroll, 100);
    }
    return () => scrollContainer?.removeEventListener("scroll", checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Load saved IDs from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("saved_articles");
    if (stored) {
      try {
        setSavedIds(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse saved articles", e);
      }
    }
  }, []);

  // Save IDs to localStorage
  useEffect(() => {
    localStorage.setItem("saved_articles", JSON.stringify(savedIds));
  }, [savedIds]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("grid_layout", gridLayout);
  }, [gridLayout]);

  useEffect(() => {
    localStorage.setItem("card_size", cardSize);
  }, [cardSize]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleSave = (id: string, e?: MouseEvent) => {
    if (e) e.stopPropagation();
    setSavedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleShare = (item: NewsItem, e?: MouseEvent) => {
    if (e) e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: item.excerpt,
        url: `${window.location.origin}/articolo/${item.id}`,
      }).catch(console.error);
    } else {
      setSharingItem(item);
    }
  };

  const filteredNews = activeCategory === "Tutti" 
    ? MOCK_NEWS 
    : MOCK_NEWS.filter(item => item.category === activeCategory);

  const latestNews = [...MOCK_NEWS].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  }).slice(0, 4);

  const savedNews = MOCK_NEWS.filter(item => savedIds.includes(item.id));

  return (
    <div className="min-h-screen bg-white pb-24 md:pb-0 transition-colors duration-300">
      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? "bg-white/80 backdrop-blur-xl border-b border-zinc-100 py-2 md:py-3 shadow-sm" : "bg-white py-3 md:py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-4">
              {view === "saved" ? (
                <button 
                  onClick={() => handleSetView("home")}
                  className="p-1 md:p-2 hover:bg-zinc-100 rounded-full transition-colors"
                >
                  <ArrowLeft size={24} />
                </button>
              ) : (
                <button 
                  onClick={() => setIsMenuOpen(true)}
                  className="p-1 md:p-2 hover:bg-zinc-100 rounded-full transition-colors"
                >
                  <Menu size={24} />
                </button>
              )}
              <div 
                className="cursor-pointer origin-left flex items-center ml-1" 
                onClick={() => handleSetView("home")}
              >
                <div 
                  className="logo-text transition-all duration-300"
                  style={{ fontSize: scrolled ? "20px" : "26px" }}
                >
                  EDITOR<span className="logo-text-i">I</span>ALE
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 md:gap-2">
              {/* Visible on all screens: Layout and Theme */}
              <button 
                onClick={() => setGridLayout(prev => prev === 'grid' ? 'puzzle' : 'grid')}
                className="p-1.5 md:p-2 hover:bg-zinc-100 rounded-full transition-colors text-zinc-600"
              >
                {gridLayout === 'grid' ? <LayoutGrid size={22} /> : <Grid size={22} />}
              </button>
              <button 
                onClick={toggleTheme}
                className="p-1.5 md:p-2 hover:bg-zinc-100 rounded-full transition-colors text-zinc-600"
              >
                {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
              </button>

              {/* Desktop Only Utilities */}
              <div className="hidden md:flex items-center gap-2">
                <button 
                  onClick={() => setIsNewspaperOpen(true)}
                  className="flex items-center justify-center p-2 hover:bg-zinc-100 rounded-full transition-colors text-zinc-600"
                  title="Edicola — Quotidiano PDF"
                >
                  <Newspaper size={22} />
                </button>
                <button 
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
                >
                  <Search size={22} />
                </button>
                <button className="p-2 hover:bg-zinc-100 rounded-full transition-colors relative">
                  <Bell size={22} />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                </button>
                <button className="ml-4 py-2 px-6 bg-zinc-900 text-white rounded-full text-sm font-semibold hover:bg-zinc-800 transition-colors">
                  Abbonati
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-24 md:pt-32 max-w-7xl mx-auto px-6">
        <div>
          {view === "home" ? (
            <div key="home">
              {/* Hero Section */}
              <section className="mb-12">
                <HeroSlider 
                  items={MOCK_NEWS.slice(0, 3)} 
                  onSelect={(item) => handleSetSelectedArticle(item)}
                />
              </section>

              {/* Categories Bar */}
              <section className="mb-8 sticky top-[64px] md:top-[88px] z-30 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md py-3 md:py-4 -mx-6 px-6 flex items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800">
                <div className="relative flex-1 flex items-center overflow-hidden">
                  {/* Left Arrow */}
                  {canScrollLeft && (
                    <button
                      onClick={() => scroll('left')}
                      className="hidden md:flex absolute left-0 z-10 p-2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-100 dark:border-zinc-800 rounded-full shadow-lg text-zinc-900 dark:text-zinc-100 hover:bg-white dark:hover:bg-zinc-800 transition-all"
                    >
                      <ChevronLeft size={20} />
                    </button>
                  )}

                  <div 
                    ref={scrollRef}
                    className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 scroll-smooth"
                  >
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-semibold transition-all flex-shrink-0 backdrop-blur-md border ${
                          activeCategory === cat
                            ? "bg-zinc-900/90 dark:bg-zinc-100/90 text-white dark:text-zinc-900 border-zinc-800 dark:border-zinc-200"
                            : "bg-white/40 dark:bg-zinc-900/40 text-zinc-500 dark:text-zinc-400 border-zinc-200/50 dark:border-zinc-800/50 hover:bg-white/60 dark:hover:bg-zinc-900/60 hover:border-zinc-300/50 dark:hover:border-zinc-700/50"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Right Arrow */}
                  {canScrollRight && (
                    <button
                      onClick={() => scroll('right')}
                      className="hidden md:flex absolute right-0 z-10 p-2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-100 dark:border-zinc-800 rounded-full shadow-lg text-zinc-900 dark:text-zinc-100 hover:bg-white dark:hover:bg-zinc-800 transition-all"
                    >
                      <ChevronRight size={20} />
                    </button>
                  )}
                </div>

                {gridLayout === 'grid' && (
                  <div className="hidden md:flex items-center gap-1 bg-zinc-50 dark:bg-zinc-900 p-1 rounded-full border border-zinc-100 dark:border-zinc-800 flex-shrink-0 ml-4">
                    {(['small', 'medium', 'large'] as CardSize[]).map((size) => (
                      <button
                        key={size}
                        onClick={() => setCardSize(size)}
                        className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                          cardSize === size
                            ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm"
                            : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                        }`}
                      >
                        {size === 'small' ? 'S' : size === 'medium' ? 'M' : 'L'}
                      </button>
                    ))}
                  </div>
                )}
              </section>

              {/* News Grid */}
              <section className={
                gridLayout === 'puzzle' 
                  ? "grid grid-cols-2 md:grid-cols-8 gap-3 md:gap-4 mb-16 auto-rows-[300px] md:auto-rows-[180px]"
                  : cardSize === 'small'
                    ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 mb-16"
                    : cardSize === 'large'
                      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 md:gap-8 mb-16"
                      : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-16"
              }>
                {filteredNews.map((item, idx) => {
                  let gridSpan = "";
                  let variant: "default" | "compact" | "featured" | "portrait" = "default";

                  if (gridLayout === 'puzzle') {
                    if (isMobile) {
                      gridSpan = "col-span-1 row-span-1";
                      variant = "default";
                    } else if (idx === 0) {
                      gridSpan = "col-span-2 md:col-span-4 row-span-2";
                      variant = "featured";
                    } else if (idx === 1) {
                      gridSpan = "col-span-1 md:col-span-2 row-span-2";
                      variant = "portrait";
                    } else if (idx >= 2 && idx <= 3) {
                      gridSpan = "col-span-1 md:col-span-2 row-span-1";
                      variant = "compact";
                    } else if (idx >= 4 && idx <= 7) {
                      gridSpan = "col-span-1 md:col-span-2 row-span-2";
                      variant = "portrait";
                    } else if (idx >= 8 && idx <= 13) {
                      gridSpan = "col-span-1 md:col-span-2 row-span-2";
                      variant = "default";
                    } else if (idx >= 14 && idx <= 17) {
                      gridSpan = "col-span-1 md:col-span-2 row-span-2";
                      variant = "default";
                    } else {
                      gridSpan = "col-span-1 md:col-span-1 row-span-1";
                      variant = "compact";
                    }
                  } else {
                    gridSpan = "col-span-1 row-span-1";
                    variant = cardSize === 'small' ? "compact" : "default";
                  }

                  const mobileGridSpan = gridLayout === 'puzzle' 
                    ? "col-span-1 row-span-1"
                    : cardSize === 'small' ? "col-span-1" : "col-span-1";

                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSetSelectedArticle(item)}
                      className={gridLayout === 'puzzle' ? `${mobileGridSpan} md:${gridSpan}` : gridSpan}
                    >
                      <NewsCard 
                        item={item} 
                        variant={variant}
                        isSaved={savedIds.includes(item.id)}
                        onToggleSave={(e) => toggleSave(item.id, e)}
                        onShare={(e) => handleShare(item, e)}
                      />
                    </div>
                  );
                })}
              </section>
            </div>
          ) : (
            <div key="saved" className="min-h-[60vh]">
              <div className="mb-12">
                <h2 className="text-4xl font-serif font-bold mb-2">Articoli Salvati</h2>
                <p className="text-zinc-500">I tuoi contenuti preferiti per una lettura successiva.</p>
              </div>

              {savedNews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                  {savedNews.map((item) => (
                    <div key={item.id} onClick={() => handleSetSelectedArticle(item)}>
                      <NewsCard 
                        item={item} 
                        isSaved={true}
                        onToggleSave={(e) => toggleSave(item.id, e)}
                        onShare={(e) => handleShare(item, e)}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mb-6">
                    <Bookmark size={32} className="text-zinc-300" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Nessun articolo salvato</h3>
                  <p className="text-zinc-500 max-w-xs">
                    Inizia a salvare gli articoli che ti interessano cliccando sull'icona del segnalibro.
                  </p>
                  <button 
                    onClick={() => handleSetView("home")}
                    className="mt-8 py-3 px-8 bg-zinc-900 text-white rounded-full font-semibold"
                  >
                    Torna alla Home
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Trending Section (Compact) - Only on Home */}
        {view === "home" && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-serif font-bold">Più letti oggi</h2>
              <button className="text-sm font-bold text-zinc-400 hover:text-zinc-900 transition-colors">
                Vedi tutti
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {latestNews.map((item) => (
                <div key={item.id} onClick={() => handleSetSelectedArticle(item)}>
                  <NewsCard 
                    item={item} 
                    variant="compact" 
                    isSaved={savedIds.includes(item.id)}
                    onToggleSave={(e) => toggleSave(item.id, e)}
                    onShare={(e) => handleShare(item, e)}
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/80 backdrop-blur-xl border-t border-zinc-100 px-6 py-3 flex items-center justify-between">
        <button 
          onClick={() => handleSetView("home")}
          className={`flex flex-col items-center gap-1 ${view === "home" ? "text-zinc-900" : "text-zinc-400"}`}
        >
          <Home size={24} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Home</span>
        </button>
        <button 
          onClick={() => setIsSearchOpen(true)}
          className="flex flex-col items-center gap-1 text-zinc-400"
        >
          <Search size={24} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Cerca</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-zinc-400 relative">
          <Bell size={24} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Notifiche</span>
          <span className="absolute top-0 right-2 w-2 h-2 bg-red-500 rounded-full border border-white" />
        </button>
        <button 
          onClick={() => handleSetView("saved")}
          className={`flex flex-col items-center gap-1 ${view === "saved" ? "text-zinc-900" : "text-zinc-400"}`}
        >
          <Bookmark size={24} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Salvati</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-zinc-400">
          <UserIcon size={24} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Profilo</span>
        </button>
      </nav>

      {/* Overlays */}
      <MobileMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        onSelectSaved={() => handleSetView("saved")}
        onOpenNewspaper={() => setIsNewspaperOpen(true)}
      />
      
      <ShareModal 
        item={sharingItem} 
        isOpen={!!sharingItem} 
        onClose={() => setSharingItem(null)} 
      />

      <SearchOverlay 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelect={(item) => handleSetSelectedArticle(item)}
      />

      <NewspaperView
        isOpen={isNewspaperOpen}
        onClose={() => setIsNewspaperOpen(false)}
      />

      <ArticleDetail 
        item={selectedArticle}
        isOpen={!!selectedArticle}
        onClose={() => handleSetSelectedArticle(null)}
        isSaved={selectedArticle ? savedIds.includes(selectedArticle.id) : false}
        onToggleSave={() => selectedArticle && toggleSave(selectedArticle.id)}
        onShare={() => selectedArticle && handleShare(selectedArticle)}
      />

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-24 md:bottom-8 right-6 z-50 p-4 bg-zinc-900 text-white rounded-full shadow-2xl hover:bg-zinc-800 transition-colors group"
            title="Torna in alto"
          >
            <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
