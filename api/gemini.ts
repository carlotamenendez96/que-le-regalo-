import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Configurar CORS para Vercel
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Manejar preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const API_KEY = process.env.gemini_api_key;

    if (!API_KEY) {
      console.error('GEMINI_API_KEY no está configurada');
      return res.status(500).json({ 
        message: 'Error de configuración del servidor',
        response: JSON.stringify([
          {
            nombre: "Regalo Especial",
            descripcion: "Un regalo cuidadosamente seleccionado que refleja el cariño hacia el destinatario.",
            categoria: "General"
          }
        ])
      });
    }

    const { prompt } = req.body as { prompt?: string };

    if (!prompt) {
      return res.status(400).json({ message: 'Prompt is required' });
    }

    console.log('Prompt recibido:', prompt.substring(0, 200) + '...');
    console.log('API Key configurada:', API_KEY ? 'Sí' : 'No');

    const genAI = new GoogleGenerativeAI(API_KEY);
    
    // Usar gemini-1.5-flash como modelo principal (mejor para cuotas gratuitas)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    console.log('Modelo configurado: gemini-1.5-flash');

    // Configuración mejorada para obtener JSON válido
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        maxOutputTokens: 1500,
        temperature: 0.8,
        topP: 0.9,
        topK: 40,
      },
    });

    const response = await result.response;
    let text = response.text().trim();

    console.log('Respuesta raw de Gemini:', text.substring(0, 300) + '...');

    // Limpiar el texto de markdown si está presente
    text = text.replace(/^```json\s*/i, '').replace(/```$/i, '').trim();
    text = text.replace(/^```\s*/i, '').replace(/```$/i, '').trim();

    // Intentar parsear el JSON
    let suggestions;
    try {
      suggestions = JSON.parse(text);
      console.log('JSON parseado exitosamente');
    } catch (parseError) {
      console.error('Error parsing JSON from Gemini:', parseError);
      console.log('Raw response que falló:', text);
      
      // Intentar extraer JSON del texto si está mezclado
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        try {
          suggestions = JSON.parse(jsonMatch[0]);
          console.log('JSON extraído del texto mezclado');
        } catch (secondError) {
          console.error('Segundo intento de parsing falló:', secondError);
          suggestions = null;
        }
      } else {
        suggestions = null;
      }
      
      // Si aún falla, usar sugerencias por defecto
      if (!suggestions) {
        suggestions = [
          {
            nombre: "Reloj Inteligente Personalizado",
            descripcion: "Un reloj inteligente con bandas intercambiables que se adapta al estilo personal del destinatario.",
            categoria: "Tecnología"
          },
          {
            nombre: "Experiencia de Spa en Casa",
            descripcion: "Un kit completo de spa con velas aromáticas y aceites esenciales para momentos de relax.",
            categoria: "Bienestar"
          },
          {
            nombre: "Libro Personalizado de Recetas",
            descripcion: "Un libro de cocina con recetas favoritas y espacio para agregar nuevas experiencias culinarias.",
            categoria: "Hogar"
          },
          {
            nombre: "Clase de Arte Online",
            descripcion: "Una suscripción a clases de arte virtuales con materiales incluidos para desarrollar la creatividad.",
            categoria: "Educación"
          },
          {
            nombre: "Set de Jardinería Interior",
            descripcion: "Un kit completo para crear un pequeño jardín interior con plantas fáciles de cuidar.",
            categoria: "Hogar"
          },
          {
            nombre: "Experiencia Gastronómica",
            descripcion: "Una cena en un restaurante exclusivo o un curso de cocina especializado.",
            categoria: "Experiencia"
          }
        ];
      }
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

    console.log(`Devolviendo ${validSuggestions.length} sugerencias válidas`);

    return res.status(200).json({ 
      response: JSON.stringify(validSuggestions),
      count: validSuggestions.length 
    });

  } catch (error: any) {
    console.error('Error al procesar la solicitud Gemini:', error);
    
    // Devolver sugerencias por defecto en caso de error
    const fallbackSuggestions = [
      {
        nombre: "Reloj Inteligente Personalizado",
        descripcion: "Un reloj inteligente con bandas intercambiables que se adapta al estilo personal del destinatario.",
        categoria: "Tecnología"
      },
      {
        nombre: "Experiencia de Spa en Casa",
        descripcion: "Un kit completo de spa con velas aromáticas y aceites esenciales para momentos de relax.",
        categoria: "Bienestar"
      },
      {
        nombre: "Libro Personalizado de Recetas",
        descripcion: "Un libro de cocina con recetas favoritas y espacio para agregar nuevas experiencias culinarias.",
        categoria: "Hogar"
      },
      {
        nombre: "Clase de Arte Online",
        descripcion: "Una suscripción a clases de arte virtuales con materiales incluidos para desarrollar la creatividad.",
        categoria: "Educación"
      },
      {
        nombre: "Set de Jardinería Interior",
        descripcion: "Un kit completo para crear un pequeño jardín interior con plantas fáciles de cuidar.",
        categoria: "Hogar"
      },
      {
        nombre: "Experiencia Gastronómica",
        descripcion: "Una cena en un restaurante exclusivo o un curso de cocina especializado.",
        categoria: "Experiencia"
      }
    ];

    return res.status(200).json({ 
      response: JSON.stringify(fallbackSuggestions),
      count: fallbackSuggestions.length,
      error: "Se usaron sugerencias por defecto debido a un error en el procesamiento."
    });
  }
}
