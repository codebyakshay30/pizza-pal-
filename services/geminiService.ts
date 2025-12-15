import { GoogleGenAI, Type } from "@google/genai";
import { Pizza } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getPizzaRecommendations = async (userPrompt: string): Promise<Pizza[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `User wants a pizza recommendation based on: "${userPrompt}".
      Suggest 3 creative pizzas.
      Return a JSON array where each object has: id (random string), name, description, 
      price (number, in Indian Rupees, typically between 299 and 899), 
      category (Veg, Non-Veg, or Premium), rating (4.0-5.0), ingredients (array of strings).
      For the image, YOU MUST randomly select one of these exact URLs:
      - https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80
      - https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80
      - https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80
      - https://images.unsplash.com/photo-1506354453686-faa599790f12?auto=format&fit=crop&w=800&q=80
      - https://images.unsplash.com/photo-1593560708920-63219413ca75?auto=format&fit=crop&w=800&q=80
      - https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80
      - https://images.unsplash.com/photo-1571407970349-bc487d77399f?auto=format&fit=crop&w=800&q=80
      - https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              name: { type: Type.STRING },
              description: { type: Type.STRING },
              price: { type: Type.NUMBER },
              image: { type: Type.STRING },
              category: { type: Type.STRING, enum: ['Veg', 'Non-Veg', 'Premium'] },
              rating: { type: Type.NUMBER },
              ingredients: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text) as Pizza[];
  } catch (error) {
    console.error("Gemini API Error:", error);
    return [];
  }
};