import type { UserAnswers, GiftSuggestion } from '../types';

export async function getGiftSuggestions(answers: UserAnswers): Promise<GiftSuggestion[]> {
  try {
    // Determinar la URL base según el entorno
    const baseUrl = import.meta.env.DEV ? '' : 'https://que-le-regalo.vercel.app';
    const apiUrl = `${baseUrl}/api/gemini`;
    
    console.log('Llamando a:', apiUrl);
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: buildPrompt(answers) }),
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
}