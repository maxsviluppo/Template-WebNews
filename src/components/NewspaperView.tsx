import { useRef, useEffect, useState } from "react";
import { X, Printer, FileText, Edit3, Settings, Check } from "lucide-react";
import { MOCK_NEWS, NewsItem } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface NewspaperViewProps {
  isOpen: boolean;
  onClose: () => void;
}

function EditableSlot({ 
  children, 
  isEditMode, 
  onClick, 
  isSelected,
  isDuplicate
}: { 
  children: React.ReactNode; 
  isEditMode: boolean; 
  onClick?: () => void;
  isSelected?: boolean;
  isDuplicate?: boolean;
}) {
  if (!isEditMode) return <>{children}</>;
  
  return (
    <div 
      onClick={onClick}
      className={`relative cursor-pointer transition-all duration-200 group ${
        isDuplicate 
          ? "ring-4 ring-red-500 ring-offset-2 z-20 animate-pulse" 
          : isSelected 
            ? "ring-4 ring-amber-500 ring-offset-2 z-10" 
            : "hover:ring-2 hover:ring-amber-300 hover:ring-offset-1 active:ring-2 active:ring-amber-400"
      }`}
    >
      {children}
      <div className={`absolute inset-0 transition-opacity pointer-events-none ${
        isDuplicate ? "bg-red-500/10 opacity-100" : "bg-amber-500/5 opacity-0 group-hover:opacity-100 group-active:opacity-100"
      }`} />
      
      <div className={`absolute top-1 right-1 text-white p-1 rounded-full shadow-lg transition-opacity ${
        isDuplicate 
          ? "bg-red-500 opacity-100 z-30" 
          : "bg-amber-500 opacity-80 md:opacity-0 md:group-hover:opacity-100"
      }`}>
        {isDuplicate ? <X size={10} /> : <Edit3 size={10} />}
      </div>
      
      {isDuplicate && (
        <div className="absolute -bottom-5 left-0 right-0 text-center z-30">
          <span className="bg-red-500 text-white text-[8px] font-bold px-2 py-0.5 rounded-full shadow-sm uppercase tracking-tighter">
            Notizia Duplicata
          </span>
        </div>
      )}
    </div>
  );
}

function NewsSelector({ 
  isOpen, 
  onClose, 
  onSelect,
  currentNewsId
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSelect: (item: NewsItem) => void;
  currentNewsId?: string;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-2 md:p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="relative w-full max-w-4xl h-[90vh] md:h-auto md:max-h-[85vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="p-4 md:p-6 border-b border-zinc-100 flex items-center justify-between bg-zinc-50">
              <div>
                <h3 className="text-lg md:text-xl font-bold text-zinc-900">Sostituisci Notizia</h3>
                <p className="text-[10px] md:text-sm text-zinc-500">Scegli una nuova notizia per questo slot</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-zinc-200 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 md:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {MOCK_NEWS.map((item) => {
                const isCurrent = item.id === currentNewsId;
                return (
                  <div 
                    key={item.id}
                    onClick={() => onSelect(item)}
                    className={`relative p-3 md:p-4 rounded-2xl border-2 transition-all cursor-pointer group ${
                      isCurrent ? "border-amber-500 bg-amber-50" : "border-zinc-100 hover:border-amber-200 hover:bg-zinc-50"
                    }`}
                  >
                    <div className="aspect-video rounded-lg overflow-hidden mb-2 md:mb-3">
                      <img src={item.imageUrl} alt="" className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all" />
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-amber-600 mb-1 block">
                      {item.category}
                    </span>
                    <h4 className="font-bold text-xs md:text-sm leading-tight text-zinc-900 mb-1 md:mb-2 line-clamp-2">
                      {item.title}
                    </h4>
                    <p className="text-[10px] text-zinc-500 line-clamp-2">{item.excerpt}</p>
                    
                    {isCurrent && (
                      <div className="absolute top-2 right-2 bg-amber-500 text-white p-1 rounded-full">
                        <Check size={12} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDate(): string {
  return new Date().toLocaleDateString("it-IT", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatDateShort(): string {
  return new Date().toLocaleDateString("it-IT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

// Edition number based on day of year
function getEditionNumber(): number {
  const start = new Date(new Date().getFullYear(), 0, 0);
  const diff = +new Date() - +start;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function Masthead() {
  return (
    <div className="nyt-masthead">
      <div className="nyt-masthead-top">
        <div className="nyt-masthead-left">
          <span className="nyt-label">Ed. {getEditionNumber()}</span>
        </div>
        <div className="nyt-masthead-center">
          <h1 className="nyt-title">EDITORIALE</h1>
          <div className="nyt-subtitle">LA VOCE DEL GIORNO</div>
        </div>
        <div className="nyt-masthead-right">
          <span className="nyt-label">{formatDateShort()}</span>
          <span className="nyt-label nyt-price">€ 2,00</span>
        </div>
      </div>
      <div className="nyt-masthead-date-bar">
        <span>{formatDate().toUpperCase()}</span>
        <span className="nyt-tagline">
          "All the News That's Fit to Print"
        </span>
        <span>ANNO XXXVII • N. {getEditionNumber()}</span>
      </div>
      <div className="nyt-rule-double" />
    </div>
  );
}

function CategoryTag({ cat }: { cat: string }) {
  return <span className="nyt-cat-tag">{cat}</span>;
}

function ByLine({ author, date }: { author: string; date: string }) {
  return (
    <p className="nyt-byline">
      Di <strong>{author.toUpperCase()}</strong> &nbsp;|&nbsp; {date}
    </p>
  );
}

// Fake article body text (lorem ipsum in Italian style)
const LOREM = [
  "Le recenti analisi condotte dagli esperti del settore hanno evidenziato una tendenza significativa che potrebbe ridefinire le dinamiche del campo nei prossimi mesi. I dati raccolti mostrano un incremento considerevole rispetto alle previsioni iniziali, suscitando grande interesse tra gli addetti ai lavori.",
  "Secondo le fonti interpellate dalla nostra redazione, la situazione è in rapida evoluzione e richiede un monitoraggio costante da parte delle autorità competenti. Le istituzioni coinvolte hanno già avviato una serie di consultazioni per valutare le misure più appropriate da adottare nel breve e medio termine.",
  "Numerosi esperti del settore sottolineano l'importanza di agire con tempestività senza tuttavia rinunciare alla necessaria prudenza. «È fondamentale non perdere di vista il quadro complessivo», ha dichiarato uno degli specialisti consultati, «poiché ogni decisione affrettata potrebbe avere ripercussioni difficilmente reversibili».",
];

function ArticleBody({ paragraphs = 1 }: { paragraphs?: number }) {
  return (
    <>
      {LOREM.slice(0, paragraphs).map((p, i) => (
        <p key={i} className="nyt-body">
          {p}
        </p>
      ))}
    </>
  );
}

// ─── Pages ───────────────────────────────────────────────────────────────────

function PageOne({ 
  news, 
  isEditMode, 
  onEditSlot,
  duplicates
}: { 
  news: NewsItem[]; 
  isEditMode: boolean; 
  onEditSlot: (index: number) => void;
  duplicates: Set<string>;
}) {
  const [featured, story2, story3, ...rest] = news;

  return (
    <div className="nyt-page nyt-page-one">
      <Masthead />

      {/* TOP INDEX BAR */}
      <div className="nyt-index-bar">
        <span className="nyt-index-label">INTERNO →</span>
        {rest.slice(0, 3).map((n, i) => (
          <span key={n.id} className="nyt-index-item">
            <em>{n.category}</em>: {n.title.slice(0, 40)}… Pag. 3
          </span>
        ))}
      </div>

      {/* MAIN GRID */}
      <div className="nyt-front-grid">
        {/* LEFT: Tall Story */}
        <div className="nyt-col-left nyt-border-right">
          <EditableSlot isEditMode={isEditMode} onClick={() => onEditSlot(1)} isDuplicate={duplicates.has(story2?.id)}>
            <CategoryTag cat={story2?.category || "News"} />
            <h2 className="nyt-headline-med">{story2?.title}</h2>
            <ByLine author={story2?.author || ""} date={story2?.date || ""} />
            <div className="nyt-rule-thin" />
            <ArticleBody paragraphs={2} />
          </EditableSlot>
        </div>

        {/* CENTER: Featured Main Story */}
        <div className="nyt-col-center">
          <div className="nyt-rule-thin" />
          <EditableSlot isEditMode={isEditMode} onClick={() => onEditSlot(0)} isDuplicate={duplicates.has(featured?.id)}>
            <CategoryTag cat={featured?.category || "News"} />
            <h1 className="nyt-headline-xl">{featured?.title}</h1>
            <div className="nyt-rule-thin" />
            <div className="nyt-featured-image-wrap">
              <img
                src={featured?.imageUrl}
                alt={featured?.title}
                className="nyt-featured-image"
                crossOrigin="anonymous"
              />
              <p className="nyt-caption">
                {featured?.excerpt?.slice(0, 90)}… — Foto redazionale
              </p>
            </div>
            <ByLine author={featured?.author || ""} date={featured?.date || ""} />
            <div className="nyt-rule-thin" />
            <ArticleBody paragraphs={2} />
          </EditableSlot>
        </div>

        {/* RIGHT: Col with 2 stories + index */}
        <div className="nyt-col-right nyt-border-left">
          <EditableSlot isEditMode={isEditMode} onClick={() => onEditSlot(2)} isDuplicate={duplicates.has(story3?.id)}>
            <CategoryTag cat={story3?.category || "News"} />
            <h2 className="nyt-headline-med">{story3?.title}</h2>
            <ByLine author={story3?.author || ""} date={story3?.date || ""} />
            <div className="nyt-rule-thin" />
            <ArticleBody paragraphs={1} />
          </EditableSlot>

          <div className="nyt-rule-double nyt-mt" />

          {/* Mini news index */}
          <p className="nyt-section-label">FLASH NOTIZIE</p>
          {rest.slice(0, 4).map((n, i) => (
            <EditableSlot key={n.id} isEditMode={isEditMode} onClick={() => onEditSlot(3 + i)} isDuplicate={duplicates.has(n.id)}>
              <div className="nyt-flash-item">
                <span className="nyt-flash-cat">{n.category}</span>
                <p className="nyt-flash-title">{n.title}</p>
              </div>
            </EditableSlot>
          ))}
        </div>
      </div>

      <div className="nyt-rule-double nyt-mt" />
      <div className="nyt-bottom-strip">
        <p className="nyt-strip-label">CONTINUA IN PAGINA 2 →</p>
      </div>

      <PageFooter page={1} />
    </div>
  );
}

function PageTwo({ 
  news, 
  isEditMode, 
  onEditSlot,
  duplicates
}: { 
  news: NewsItem[]; 
  isEditMode: boolean; 
  onEditSlot: (index: number) => void;
  duplicates: Set<string>;
}) {
  const stories = news.slice(3, 9);

  return (
    <div className="nyt-page">
      <div className="nyt-inner-header">
        <span className="nyt-inner-title">EDITORIALE</span>
        <span className="nyt-inner-date">{formatDateShort()} — PAGINA 2</span>
        <span className="nyt-inner-section">ECONOMIA &amp; TECNOLOGIA</span>
      </div>
      <div className="nyt-rule-double" />

      <div className="nyt-section-banner">
        ECONOMIA &amp; TECNOLOGIA
      </div>

      {/* 3-column layout */}
      <div className="nyt-three-col">
        {stories.slice(0, 3).map((n, i) => (
          <div key={n.id} className={`nyt-story-col ${i < 2 ? "nyt-border-right" : ""}`}>
            <EditableSlot isEditMode={isEditMode} onClick={() => onEditSlot(3 + i)} isDuplicate={duplicates.has(n.id)}>
              <div className="nyt-img-wrap">
                <img src={n.imageUrl} alt={n.title} className="nyt-story-image" crossOrigin="anonymous" />
              </div>
              <CategoryTag cat={n.category} />
              <h2 className="nyt-headline-med">{n.title}</h2>
              <ByLine author={n.author} date={n.date} />
              <div className="nyt-rule-thin" />
              <ArticleBody paragraphs={1} />
              <p className="nyt-excerpt-text">{n.excerpt}</p>
            </EditableSlot>
          </div>
        ))}
      </div>

      <div className="nyt-rule-double nyt-mt" />
      <div className="nyt-section-banner">BREVI</div>

      {/* Trafiletti row */}
      <div className="nyt-four-col">
        {stories.slice(3, 6).map((n, i) => (
          <div key={n.id} className="nyt-trafiletto">
            <EditableSlot isEditMode={isEditMode} onClick={() => onEditSlot(6 + i)} isDuplicate={duplicates.has(n.id)}>
              <CategoryTag cat={n.category} />
              <h3 className="nyt-headline-sm">{n.title}</h3>
              <ByLine author={n.author} date={n.date} />
              <p className="nyt-body">{n.excerpt}</p>
            </EditableSlot>
          </div>
        ))}
      </div>

      <PageFooter page={2} />
    </div>
  );
}

function PageThree({ 
  news, 
  isEditMode, 
  onEditSlot,
  duplicates
}: { 
  news: NewsItem[]; 
  isEditMode: boolean; 
  onEditSlot: (index: number) => void;
  duplicates: Set<string>;
}) {
  const stories = news.slice(9, 14);
  const [big, ...smalls] = stories;

  return (
    <div className="nyt-page">
      <div className="nyt-inner-header">
        <span className="nyt-inner-title">EDITORIALE</span>
        <span className="nyt-inner-date">{formatDateShort()} — PAGINA 3</span>
        <span className="nyt-inner-section">CULTURA &amp; SOCIETÀ</span>
      </div>
      <div className="nyt-rule-double" />
      <div className="nyt-section-banner">CULTURA &amp; SOCIETÀ</div>

      <div className="nyt-asymm-grid">
        {/* Big story left */}
        <div className="nyt-asymm-big nyt-border-right">
          <EditableSlot isEditMode={isEditMode} onClick={() => onEditSlot(9)} isDuplicate={duplicates.has(big?.id)}>
            <div className="nyt-img-wrap-big">
              <img src={big?.imageUrl} alt={big?.title} className="nyt-story-image" crossOrigin="anonymous" />
            </div>
            <CategoryTag cat={big?.category || "Cultura"} />
            <h2 className="nyt-headline-lg">{big?.title}</h2>
            <ByLine author={big?.author || ""} date={big?.date || ""} />
            <div className="nyt-rule-thin" />
            <ArticleBody paragraphs={2} />
            <p className="nyt-excerpt-text">{big?.excerpt}</p>
          </EditableSlot>
        </div>

        {/* Small stories right */}
        <div className="nyt-asymm-small">
          {smalls.map((n, i) => (
            <div key={n.id}>
              <EditableSlot isEditMode={isEditMode} onClick={() => onEditSlot(10 + i)} isDuplicate={duplicates.has(n.id)}>
                <CategoryTag cat={n.category} />
                <h3 className="nyt-headline-sm">{n.title}</h3>
                <ByLine author={n.author} date={n.date} />
                <p className="nyt-body">{n.excerpt}</p>
                {i < smalls.length - 1 && <div className="nyt-rule-thin nyt-mt" />}
              </EditableSlot>
            </div>
          ))}
        </div>
      </div>

      <PageFooter page={3} />
    </div>
  );
}

function PageFour({ 
  news, 
  isEditMode, 
  onEditSlot,
  duplicates
}: { 
  news: NewsItem[]; 
  isEditMode: boolean; 
  onEditSlot: (index: number) => void;
  duplicates: Set<string>;
}) {
  const stories = news.slice(14);
  // Fill up to 6 stories for this page if needed
  const allStories = [...stories].slice(0, 6);

  return (
    <div className="nyt-page">
      <div className="nyt-inner-header">
        <span className="nyt-inner-title">EDITORIALE</span>
        <span className="nyt-inner-date">{formatDateShort()} — PAGINA 4</span>
        <span className="nyt-inner-section">SPORT, VIAGGI &amp; LIFESTYLE</span>
      </div>
      <div className="nyt-rule-double" />
      <div className="nyt-section-banner">SPORT, VIAGGI &amp; LIFESTYLE</div>

      {/* 2x3 trafiletti grid */}
      <div className="nyt-trafiletti-grid">
        {allStories.map((n, i) => (
          <div key={`${n.id}-${i}`} className="nyt-trafiletto-card">
            <EditableSlot isEditMode={isEditMode} onClick={() => onEditSlot(14 + i)} isDuplicate={duplicates.has(n.id)}>
              <img src={n.imageUrl} alt={n.title} className="nyt-trafiletto-img" crossOrigin="anonymous" />
              <CategoryTag cat={n.category} />
              <h3 className="nyt-headline-sm">{n.title}</h3>
              <ByLine author={n.author} date={n.date} />
              <p className="nyt-body">{n.excerpt}</p>
            </EditableSlot>
          </div>
        ))}
      </div>

      {/* Colophon */}
      <div className="nyt-rule-double nyt-mt" />
      <div className="nyt-colophon">
        <div className="nyt-colophon-title">EDITORIALE</div>
        <div className="nyt-colophon-text">
          <strong>Direttore Responsabile:</strong> La Redazione &nbsp;|&nbsp;
          <strong>Sede legale:</strong> Milano, Italia &nbsp;|&nbsp;
          <strong>Reg. Tribunale:</strong> N. 123/2026 &nbsp;|&nbsp;
          <strong>Stampa:</strong> Tipografia Digitale Srl, Roma
        </div>
        <div className="nyt-colophon-text">
          Riproduzione anche parziale vietata senza autorizzazione scritta. &nbsp;
          © {new Date().getFullYear()} Editoriale S.r.l. Tutti i diritti riservati.
        </div>
      </div>

      <PageFooter page={4} />
    </div>
  );
}

function PageFooter({ page }: { page: number }) {
  return (
    <div className="nyt-page-footer">
      <div className="nyt-rule-thin" />
      <div className="nyt-footer-row">
        <span>EDITORIALE</span>
        <span>{formatDateShort().toUpperCase()}</span>
        <span>PAG. {page}</span>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function NewspaperView({ isOpen, onClose }: NewspaperViewProps) {
  const printRef = useRef<HTMLDivElement>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedSlotIndex, setSelectedSlotIndex] = useState<number | null>(null);
  
  // Initialize assigned news with sorted mock news
  const [assignedNews, setAssignedNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    if (isOpen) {
      setAssignedNews([...MOCK_NEWS].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ));
    }
  }, [isOpen]);

  // Find duplicates
  const getDuplicates = () => {
    const counts: Record<string, number> = {};
    const dupes = new Set<string>();
    
    // Only check news that are actually in slots (the first 20 items or so)
    assignedNews.slice(0, 20).forEach(item => {
      if (item?.id) {
        counts[item.id] = (counts[item.id] || 0) + 1;
        if (counts[item.id] > 1) dupes.add(item.id);
      }
    });
    
    return dupes;
  };

  const duplicates = getDuplicates();

  // Dynamically calculate scale for mobile so A4 pages fit precisely
  useEffect(() => {
    const applyScale = () => {
      if (typeof window === "undefined") return; 
      const vw = window.innerWidth;
      if (vw < 768) {
        // A4 at 96dpi = ~794px wide. We reserve 16px margin.
        const scale = Math.min((vw - 16) / 794, 1);
        const pages = document.querySelectorAll<HTMLElement>(".nyt-page");
        pages.forEach((page) => {
          page.style.transform = `scale(${scale})`;
          page.style.transformOrigin = "top left";
          page.style.marginLeft = "8px";
          // Collapse extra whitespace below the scaled page
          const scaledHeight = 1122 * scale; // 297mm ≈ 1122px at 96dpi
          page.style.marginBottom = `${scaledHeight - 1122}px`;
        });
      } else {
        // Reset on desktop
        const pages = document.querySelectorAll<HTMLElement>(".nyt-page");
        pages.forEach((page) => {
          page.style.transform = "";
          page.style.marginBottom = "";
          page.style.marginLeft = "";
        });
      }
    };

    if (isOpen) {
      // Run after render so pages are in the DOM
      setTimeout(applyScale, 50);
      window.addEventListener("resize", applyScale);
    }
    return () => window.removeEventListener("resize", applyScale);
  }, [isOpen, isEditMode]);

  const handlePrint = () => {
    setIsEditMode(false); // Close edit mode before printing
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const handleSwapNews = (newsItem: NewsItem) => {
    if (selectedSlotIndex === null) return;
    
    setAssignedNews(prev => {
      const next = [...prev];
      // Simply replace the item at the selected slot
      next[selectedSlotIndex] = newsItem;
      return next;
    });
    
    setSelectedSlotIndex(null);
  };

  if (assignedNews.length === 0) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="newspaper-overlay"
        >
          {/* ── Toolbar (hidden on print) ── */}
          <div className="newspaper-toolbar no-print">
            <div className="newspaper-toolbar-left">
              <button onClick={onClose} className="nyt-btn-close !p-2 !px-3">
                <X size={18} />
                <span className="hidden xs:inline">Chiudi</span>
              </button>
            </div>
            <div className="newspaper-toolbar-center">
              {/* Desktop View/Edit Buttons */}
              <div className="hidden md:flex items-center gap-1 bg-zinc-800 p-1 rounded-full border border-zinc-700 shadow-2xl">
                <button 
                  onClick={() => setIsEditMode(false)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    !isEditMode ? "bg-zinc-100 text-zinc-900 shadow-lg" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <FileText size={14} />
                  <span>ANTEPRIMA</span>
                </button>
                <button 
                  onClick={() => setIsEditMode(true)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    isEditMode ? "bg-amber-500 text-white shadow-lg" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <Settings size={14} />
                  <span>EDIT BOZZA</span>
                </button>
              </div>

              {/* Mobile Toggle Switch */}
              <div className="md:hidden flex items-center gap-3">
                <div className={`transition-colors duration-300 ${isEditMode ? "text-amber-500" : "text-zinc-500"}`}>
                  <Settings size={20} />
                </div>
                <button 
                  onClick={() => setIsEditMode(!isEditMode)}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none ${
                    isEditMode ? "bg-amber-500" : "bg-zinc-700"
                  }`}
                >
                  <motion.div 
                    animate={{ x: isEditMode ? 26 : 2 }}
                    className="absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow-md"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>
            </div>
            <div className="newspaper-toolbar-right">
              <button onClick={handlePrint} className="nyt-btn-print !p-2 !px-3">
                <Printer size={16} />
                <span className="hidden xs:inline text-[10px]">Stampa</span>
              </button>
            </div>
          </div>

          {/* ── Paper ── */}
          <div className="newspaper-scroll-area" ref={printRef} id="newspaper-print-area">
            <PageOne 
              news={assignedNews} 
              isEditMode={isEditMode} 
              onEditSlot={(index) => setSelectedSlotIndex(index)} 
              duplicates={duplicates}
            />
            <PageTwo 
              news={assignedNews} 
              isEditMode={isEditMode} 
              onEditSlot={(index) => setSelectedSlotIndex(index)} 
              duplicates={duplicates}
            />
            <PageThree 
              news={assignedNews} 
              isEditMode={isEditMode} 
              onEditSlot={(index) => setSelectedSlotIndex(index)} 
              duplicates={duplicates}
            />
            <PageFour 
              news={assignedNews} 
              isEditMode={isEditMode} 
              onEditSlot={(index) => setSelectedSlotIndex(index)} 
              duplicates={duplicates}
            />
          </div>

          <NewsSelector 
            isOpen={selectedSlotIndex !== null}
            onClose={() => setSelectedSlotIndex(null)}
            onSelect={handleSwapNews}
            currentNewsId={selectedSlotIndex !== null ? assignedNews[selectedSlotIndex]?.id : undefined}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
