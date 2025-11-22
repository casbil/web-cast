import { GoogleGenAI, Type } from "@google/genai";

// Initialize the Gemini API client
// Note: API_KEY is assumed to be in process.env per system instructions
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Simulates a "smart search" that finds videos based on a query.
 * In a real app, this might browse the web. Here, we generate plausible 
 * mock data to demonstrate the UI.
 */
export const searchVideosWithGemini = async (query: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a list of 5 fictional video titles, descriptions, and fake durations that would match a search for: "${query}". 
      Make them sound realistic.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              duration: { type: Type.STRING },
              source: { type: Type.STRING, description: "A fake website source name like 'TubeVid' or 'MovieBox'" }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini search failed:", error);
    return [];
  }
};

/**
 * Suggests content for the "IPTV" or "Most Visited" section
 */
export const getSuggestedContent = async () => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Generate 3 trending video categories with a short catchy description for a casting app.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              category: { type: Type.STRING },
              description: { type: Type.STRING },
            }
          }
        }
      }
    });
    
    const text = response.text;
    if (!text) return [];
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini suggestion failed:", error);
    return [];
  }
};