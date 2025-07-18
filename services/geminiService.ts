import type { UserAnswers, GiftSuggestion } from '../types';

export async function getGiftSuggestions(answers: UserAnswers): Promise<GiftSuggestion[]> {
  try {
    // Determinar la URL base según el entorno
    const baseUrl = import.meta.env.DEV ? '' : 'https://que-le-regalo.vercel.app';
    const apiUrl = `${baseUrl}/api/gemini`;
    
    const prompt = buildPrompt(answers);
    console.log('Prompt enviado:', prompt);
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Error desconocido' }));
      throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Respuesta del backend:', data);
    
    // Verificar que tenemos una respuesta válida
    if (!data.response) {
      throw new Error('Respuesta inválida del servidor');
    }
    
    // Parsear las sugerencias
    const suggestions: GiftSuggestion[] = JSON.parse(data.response);
    
    if (!Array.isArray(suggestions) || suggestions.length === 0) {
      throw new Error('No se recibieron sugerencias válidas');
    }
    
    return suggestions;
  } catch (error) {
    console.error('Error al obtener sugerencias de Gemini:', error);
    
    // Si es un error de red, lanzar un error específico
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Error de conexión. Verifica tu internet e inténtalo de nuevo.');
    }
    
    throw error;
  }
}

// Función para construir el prompt a partir de las respuestas del usuario
function buildPrompt(answers: UserAnswers): string {
  return `Genera 6 sugerencias de regalos personalizados en formato JSON. Cada sugerencia debe tener: nombre, descripcion y categoria.

Perfil del destinatario:
- Ocasión: ${answers.occasion}
- Relación: ${answers.relationship}
- Edad: ${answers.age}
- Género: ${answers.gender}
- Presupuesto: ${answers.budget}
- Intereses: ${answers.interests.join(', ')}
- Personalidad: ${answers.personality}
- Estilo de vida: ${answers.lifestyle}
- Estilo de regalo: ${answers.giftStyle}

Instrucciones:
- Sé específico y creativo
- Ajusta al presupuesto indicado
- Explica por qué cada regalo es perfecto para esta persona
- Devuelve SOLO el JSON sin texto adicional

Formato esperado:
[
  {
    "nombre": "Nombre del regalo",
    "descripcion": "Descripción detallada",
    "categoria": "Categoría"
  }
]`;
}