import { GoogleGenAI, Type } from "@google/genai";
import type { UserAnswers, GiftSuggestion } from '../types';


const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
    throw new Error("VITE_GEMINI_API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey });

const responseSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        nombre: {
          type: Type.STRING,
          description: 'El nombre creativo y atractivo del regalo sugerido.',
        },
        descripcion: {
          type: Type.STRING,
          description: 'Una descripción detallada (2-3 frases) del regalo, explicando por qué es una excelente opción para el destinatario basándose en los criterios proporcionados.',
        },
        categoria: {
          type: Type.STRING,
          description: 'La categoría principal del regalo (ej. Tecnología, Experiencia, Moda, Libros, Hogar).',
        },
      },
      required: ["nombre", "descripcion", "categoria"],
    },
};

const buildPrompt = (answers: UserAnswers): string => {
  return `
    Eres un experto en encontrar el regalo perfecto para la aplicación "¿Qué le regalo?". 
    Tu objetivo es proporcionar 6 ideas de regalos únicas, creativas y altamente personalizadas basadas en los siguientes criterios que ha proporcionado un usuario.
    No repitas los criterios en tu respuesta, simplemente úsalos para inspirar tus sugerencias.

    **Perfil del Destinatario:**
    *   **Ocasión:** ${answers.occasion}
    *   **Relación:** ${answers.relationship}
    *   **Rango de Edad:** ${answers.age}
    *   **Género:** ${answers.gender}
    *   **Presupuesto:** ${answers.budget}
    *   **Intereses Clave:** ${answers.interests.join(', ')}
    *   **Personalidad:** ${answers.personality}
    *   **Estilo de vida preferido:** ${answers.lifestyle}
    *   **Estilo de regalo deseado:** ${answers.giftStyle}

    **Instrucciones Adicionales:**
    *   Proporciona una descripción detallada para cada regalo, explicando por qué encaja con el perfil del destinatario.
    *   Sé específico. En lugar de "un libro", sugiere un tipo de libro o un autor que encaje con sus intereses. En lugar de "ropa", sugiere una prenda específica.
    *   Asegúrate de que las sugerencias se ajusten al presupuesto indicado.
    *   El resultado debe ser exclusivamente un objeto JSON que se ajuste al esquema proporcionado. No incluyas texto introductorio, de cierre, ni markdown (como \`\`\`json).
  `;
};


export const getGiftSuggestions = async (answers: UserAnswers): Promise<GiftSuggestion[]> => {
  const prompt = buildPrompt(answers);

  try {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: responseSchema,
          temperature: 0.8,
        },
    });

    const text = response?.text?.trim();
    // Sometimes the model might wrap the JSON in markdown, let's strip it.
    const cleanedText = text?.replace(/^```json\s*|```$/g, '');
    const suggestions: GiftSuggestion[] = JSON.parse(cleanedText || '[]');
    
    if (!Array.isArray(suggestions)) {
      throw new Error("API response is not an array");
    }

    return suggestions;
  } catch (error) {
    console.error("Error fetching gift suggestions:", error);
    throw new Error("Failed to get suggestions from Gemini API.");
  }
};