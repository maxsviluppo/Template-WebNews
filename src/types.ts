export type LayoutType = "grid" | "puzzle";
export type CardSize = "small" | "medium" | "large";

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  aiSummary?: string;
  category: string;
  author: string;
  date: string;
  imageUrl: string;
  readTime: string;
}

export const CATEGORIES = [
  "Tutti",
  "Politica",
  "Tecnologia",
  "Economia",
  "Cultura",
  "Sport",
  "Scienza",
  "Salute",
  "Viaggi",
  "Moda",
  "Ambiente",
  "Intrattenimento",
  "Motori",
  "Cucina"
];

export const MOCK_NEWS: NewsItem[] = [
  {
    id: "1",
    title: "Il futuro dell'Intelligenza Artificiale nelle città intelligenti",
    excerpt: "Come le nuove tecnologie stanno trasformando il modo in cui viviamo e interagiamo con l'ambiente urbano.",
    category: "Tecnologia",
    author: "Marco Rossi",
    date: "17 Mar 2026",
    imageUrl: "https://picsum.photos/seed/tech/800/600",
    readTime: "5 min"
  },
  {
    id: "2",
    title: "Nuove riforme economiche: cosa cambia per le piccole imprese",
    excerpt: "Analisi dettagliata delle ultime manovre governative e il loro impatto sul tessuto imprenditoriale locale.",
    category: "Economia",
    author: "Elena Bianchi",
    date: "16 Mar 2026",
    imageUrl: "https://picsum.photos/seed/economy/800/600",
    readTime: "8 min"
  },
  {
    id: "3",
    title: "La rinascita del cinema d'autore in Europa",
    excerpt: "Un viaggio tra i festival e le nuove produzioni che stanno riportando il grande schermo al centro della cultura.",
    category: "Cultura",
    author: "Luca Verdi",
    date: "15 Mar 2026",
    imageUrl: "https://picsum.photos/seed/culture/800/600",
    readTime: "6 min"
  },
  {
    id: "4",
    title: "Sostenibilità: le 10 abitudini per un futuro più verde",
    excerpt: "Piccoli gesti quotidiani che possono fare la differenza nella lotta contro il cambiamento climatico.",
    category: "Scienza",
    author: "Giulia Neri",
    date: "14 Mar 2026",
    imageUrl: "https://picsum.photos/seed/nature/800/600",
    readTime: "4 min"
  },
  {
    id: "5",
    title: "Esplorazione spaziale: la nuova corsa verso Marte",
    excerpt: "Le missioni internazionali che si preparano a portare l'uomo sul pianeta rosso entro il prossimo decennio.",
    category: "Scienza",
    author: "Alessandro Moretti",
    date: "13 Mar 2026",
    imageUrl: "https://picsum.photos/seed/space/800/600",
    readTime: "10 min"
  },
  {
    id: "6",
    title: "Design Sostenibile: l'architettura del domani",
    excerpt: "Materiali innovativi e tecniche costruttive che rispettano l'ambiente senza rinunciare all'estetica.",
    category: "Cultura",
    author: "Sofia Gialli",
    date: "12 Mar 2026",
    imageUrl: "https://picsum.photos/seed/arch/800/600",
    readTime: "7 min"
  },
  {
    id: "7",
    title: "Criptovalute: verso una nuova regolamentazione globale",
    excerpt: "Le banche centrali discutono il futuro delle valute digitali e il loro ruolo nell'economia mondiale.",
    category: "Economia",
    author: "Roberto Blu",
    date: "11 Mar 2026",
    imageUrl: "https://picsum.photos/seed/crypto/800/600",
    readTime: "9 min"
  },
  {
    id: "8",
    title: "Salute Mentale: l'importanza del benessere digitale",
    excerpt: "Consigli pratici per gestire lo stress da iperconnessione e ritrovare l'equilibrio nella vita quotidiana.",
    category: "Salute",
    author: "Chiara Viola",
    date: "10 Mar 2026",
    imageUrl: "https://picsum.photos/seed/health/800/600",
    readTime: "5 min"
  },
  {
    id: "9",
    title: "Robotica: i nuovi assistenti domestici",
    excerpt: "Come i robot stanno diventando parte integrante delle nostre case, aiutandoci nelle faccende quotidiane.",
    category: "Tecnologia",
    author: "Mario Marrone",
    date: "09 Mar 2026",
    imageUrl: "https://picsum.photos/seed/robot/800/600",
    readTime: "6 min"
  },
  {
    id: "10",
    title: "Gastronomia: il ritorno alle tradizioni locali",
    excerpt: "Perché sempre più chef stellati stanno riscoprendo gli ingredienti a chilometro zero e le ricette della nonna.",
    category: "Cultura",
    author: "Francesca Arancio",
    date: "08 Mar 2026",
    imageUrl: "https://picsum.photos/seed/food/800/600",
    readTime: "4 min"
  },
  {
    id: "11",
    title: "Le mete più ambite per l'estate 2026: tra natura e relax",
    excerpt: "Dalle spiagge incontaminate della Sardegna alle montagne del Nord, ecco dove viaggeranno gli italiani.",
    category: "Viaggi",
    author: "Marco Polo",
    date: "07 Mar 2026",
    imageUrl: "https://picsum.photos/seed/travel/800/600",
    readTime: "5 min"
  },
  {
    id: "12",
    title: "Olimpiadi 2026: i preparativi entrano nel vivo",
    excerpt: "Uno sguardo alle infrastrutture e agli atleti che si preparano per il più grande evento sportivo dell'anno.",
    category: "Sport",
    author: "Pietro Rossi",
    date: "06 Mar 2026",
    imageUrl: "https://picsum.photos/seed/sport/800/600",
    readTime: "7 min"
  },
  {
    id: "13",
    title: "Oceani: nuove scoperte sulla biodiversità marina",
    excerpt: "Una spedizione internazionale rivela specie mai viste prima nelle profondità dell'Oceano Pacifico.",
    category: "Ambiente",
    author: "Marta Blu",
    date: "05 Mar 2026",
    imageUrl: "https://picsum.photos/seed/ocean/800/600",
    readTime: "6 min"
  },
  {
    id: "14",
    title: "Streaming vs Cinema: la nuova era della produzione",
    excerpt: "Come le piattaforme digitali stanno cambiando il modo in cui i film vengono prodotti e distribuiti.",
    category: "Intrattenimento",
    author: "Stefano Neri",
    date: "04 Mar 2026",
    imageUrl: "https://picsum.photos/seed/movie/800/600",
    readTime: "5 min"
  },
  {
    id: "15",
    title: "Auto elettriche: l'autonomia raddoppia con le nuove batterie",
    excerpt: "Una startup europea annuncia una tecnologia rivoluzionaria che promette 1000km con una sola ricarica.",
    category: "Motori",
    author: "Enrico Verdi",
    date: "03 Mar 2026",
    imageUrl: "https://picsum.photos/seed/car/800/600",
    readTime: "8 min"
  },
  {
    id: "16",
    title: "La cucina molecolare incontra la tradizione contadina",
    excerpt: "Un nuovo trend gastronomico che unisce tecniche d'avanguardia e sapori antichi della terra.",
    category: "Cucina",
    author: "Anna Gialli",
    date: "02 Mar 2026",
    imageUrl: "https://picsum.photos/seed/cooking/800/600",
    readTime: "4 min"
  }
];
