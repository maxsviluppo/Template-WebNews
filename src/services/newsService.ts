import { NewsItem, MOCK_NEWS } from "../types";

const STORAGE_KEY = "editoriale_news_v1";

export const NewsService = {
  // Carica le notizie (da localStorage o Mock se vuoto)
  getNews: (): NewsItem[] => {
    if (typeof window === "undefined") return MOCK_NEWS;
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : MOCK_NEWS;
  },

  // Salva e applica la logica a CASCATA
  publishNews: (newItem: NewsItem) => {
    let allNews = NewsService.getNews();
    
    // 1. Aggiungi la nuova notizia in cima
    allNews = [newItem, ...allNews];

    // 2. Applica Logica a Cascata (Waterfall)
    
    // Conta e sposta gli Hero in eccesso
    const heroNews = allNews.filter(n => n.position === "hero");
    if (heroNews.length > 3) {
      const oldestHero = heroNews[heroNews.length - 1];
      const index = allNews.findIndex(n => n.id === oldestHero.id);
      if (index !== -1) allNews[index].position = "featured";
      console.log(`Cascade: Moved ${oldestHero.title} from Hero to Featured`);
    }

    // Conta e sposta i Featured in eccesso
    const featuredNews = allNews.filter(n => n.position === "featured");
    if (featuredNews.length > 6) {
      const oldestFeatured = featuredNews[featuredNews.length - 1];
      const index = allNews.findIndex(n => n.id === oldestFeatured.id);
      if (index !== -1) allNews[index].position = "side";
      console.log(`Cascade: Moved ${oldestFeatured.title} from Featured to Side`);
    }

    // 3. Gestione Scadenze (Archiviazione)
    const now = new Date();
    allNews = allNews.map(n => {
      // Logica simulata di scadenza
      if (n.status === "Temporanea") {
        // Se ha più di 48 ore (simulato) -> Archivia
        // Per ora lasciamo il flag, in produzione qui cambieremmo lo status
      }
      return n;
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(allNews));
    return allNews;
  }
};
