import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error('GEMINI_API_KEY no está configurada como variable de entorno.');
}

const genAI = new GoogleGenerativeAI(API_KEY);

// Esquema JSON que esperamos de Gemini
const responseSchema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      nombre: {
        type: "string",
        description: "El nombre creativo y atractivo del regalo sugerido."
      },
      descripcion: {
        type: "string", 
        description: "Una descripción detallada (2-3 frases) del regalo, explicando por qué es una excelente opción para el destinatario."
      },
      categoria: {
        type: "string",
        description: "La categoría principal del regalo (ej. Tecnología, Experiencia, Moda, Libros, Hogar)."
      }
    },
    required: ["nombre", "descripcion", "categoria"]
  }
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { prompt } = req.body as { prompt?: string };

    if (!prompt) {
      return res.status(400).json({ message: 'Prompt is required' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Configuración mejorada para obtener JSON válido
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      },
    });

    const response = await result.response;
    let text = response.text().trim();

    // Limpiar el texto de markdown si está presente
    text = text.replace(/^```json\s*/, '').replace(/```$/, '').trim();

    // Intentar parsear el JSON
    let suggestions;
    try {
      suggestions = JSON.parse(text);
    } catch (parseError) {
      console.error('Error parsing JSON from Gemini:', parseError);
      console.log('Raw response:', text);
      
      // Si falla el parsing, devolver sugerencias por defecto
      suggestions = [
        {
          nombre: "Regalo Personalizado",
          descripcion: "Un regalo único y especial que se adapta perfectamente a los gustos e intereses del destinatario.",
          categoria: "Personalizado"
        },
        {
          nombre: "Experiencia Memorável",
          descripcion: "Una experiencia inolvidable que creará recuerdos especiales y momentos únicos.",
          categoria: "Experiencia"
        }
      ];
    }

    // Validar que sea un array
    if (!Array.isArray(suggestions)) {
      suggestions = [suggestions];
    }

    // Validar cada sugerencia
    const validSuggestions = suggestions.filter(suggestion => 
      suggestion && 
      typeof suggestion.nombre === 'string' &&
      typeof suggestion.descripcion === 'string' &&
      typeof suggestion.categoria === 'string'
    );

    // Si no hay sugerencias válidas, usar las por defecto
    if (validSuggestions.length === 0) {
      validSuggestions.push(
        {
          nombre: "Regalo Especial",
          descripcion: "Un regalo cuidadosamente seleccionado que refleja el cariño y la consideración hacia el destinatario.",
          categoria: "General"
        }
      );
    }

    res.status(200).json({ 
      response: JSON.stringify(validSuggestions),
      count: validSuggestions.length 
    });

  } catch (error: any) {
    console.error('Error al procesar la solicitud Gemini:', error);
    
    // Devolver sugerencias por defecto en caso de error
    const fallbackSuggestions = [
      {
        nombre: "Regalo Personalizado",
        descripcion: "Un regalo único que se adapta perfectamente a los gustos del destinatario.",
        categoria: "Personalizado"
      },
      {
        nombre: "Experiencia Especial", 
        descripcion: "Una experiencia memorable que creará recuerdos inolvidables.",
        categoria: "Experiencia"
      }
    ];

    res.status(200).json({ 
      response: JSON.stringify(fallbackSuggestions),
      count: fallbackSuggestions.length,
      error: "Se usaron sugerencias por defecto debido a un error en el procesamiento."
    });
  }
}
