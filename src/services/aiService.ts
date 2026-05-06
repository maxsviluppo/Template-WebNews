import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey && apiKey !== "MY_GEMINI_API_KEY" && apiKey !== "") {
  try {
    ai = new GoogleGenAI({ apiKey });
  } catch (e) {
    console.error("Failed to initialize GoogleGenAI:", e);
  }
}

// Simple cache to avoid redundant API calls
const CACHE_PREFIX = "ai_summary_";

export async function generateSummary(id: string, title: string, excerpt: string): Promise<string | null> {
  // 1. Check Cache
  const cached = typeof window !== "undefined" ? localStorage.getItem(`${CACHE_PREFIX}${id}`) : null;
  if (cached) return cached;

  if (!ai) {
    console.warn("AI service not initialized. Missing or invalid API key.");
    return null;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Sei un giornalista esperto. Genera un riassunto ancora più breve e incisivo per la seguente notizia. Deve essere di massimo 15 parole.
      
      Titolo: ${title}
      Estratto: ${excerpt}
      
      Riassunto IA:`,
      config: {
        systemInstruction: "Sei un assistente editoriale che genera micro-riassunti per un'app di notizie. Sii professionale e sintetico. Rispondi solo con il riassunto.",
        temperature: 0.7,
      },
    });

    const summary = response.text.trim();
    
    // 2. Save to Cache
    if (summary && typeof window !== "undefined") {
      localStorage.setItem(`${CACHE_PREFIX}${id}`, summary);
    }
    
    return summary;
  } catch (error: any) {
    // Handle Rate Limiting (429)
    if (error?.status === 429 || error?.message?.includes("429") || error?.message?.includes("RESOURCE_EXHAUSTED")) {
      console.warn(`Rate limit reached for article ${id}. Summary will be skipped for now.`);
      return null;
    }

    console.error("Errore nella generazione del riassunto AI:", error);
    return null;
  }
}
