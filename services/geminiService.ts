import type { UserAnswers, GiftSuggestion } from '../types';

export async function getGiftSuggestions(answers: UserAnswers): Promise<GiftSuggestion[]> {
  try {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: buildPrompt(answers) }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error en la solicitud a Gemini');
    }

    const data = await response.json();
    // Suponemos que el backend devuelve un array de sugerencias en data.response (JSON string)
    const suggestions: GiftSuggestion[] = JSON.parse(data.response);
    return suggestions;
  } catch (error) {
    console.error('Error al obtener sugerencias de Gemini:', error);
    return [];
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