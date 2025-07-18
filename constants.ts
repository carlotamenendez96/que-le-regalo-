import type { Question } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 'occasion',
    text: '¿Cuál es la ocasión del regalo?',
    options: ['Cumpleaños', 'Navidad', 'Aniversario', 'Amigo invisible', 'Nacimiento / Baby Shower', 'Agradecimiento', 'Sin motivo concreto'],
  },
  {
    id: 'relationship',
    text: '¿Qué relación tienes con el destinatario?',
    options: ['Pareja', 'Hijo/a', 'Padre / Madre', 'Amigo/a', 'Hermano/a', 'Compañero/a de trabajo', 'Otro familiar'],
  },
  {
    id: 'age',
    text: '¿Cuál es el rango de edad del destinatario?',
    options: ['0-2 años', '3-6 años', '7-12 años', '13-17 años', '18-30 años', '31-40 años', '41-50 años', '51-65 años', '65+ años'],
  },
  {
    id: 'gender',
    text: '¿Cuál es su género?',
    options: ['Hombre', 'Mujer', 'Otro / No binario', 'Prefiero no especificar'],
  },
  {
    id: 'budget',
    text: '¿Cuál es tu presupuesto estimado?',
    options: ['Menos de 10€', '10-30€', '30-60€', '60-100€', '100€+'],
  },
  {
    id: 'interests',
    text: 'Selecciona sus intereses o aficiones',
    options: ['Tecnología', 'Lectura', 'Cocina / Gourmet', 'Deporte / Aventura', 'Moda / Belleza', 'Arte / Manualidades', 'Música', 'Viajes', 'Mascotas', 'Hogar / Decoración', 'Bienestar / Autocuidado'],
    isMultiSelect: true,
  },
  {
    id: 'personality',
    text: '¿Cómo describirías su personalidad?',
    options: [
      'Creativo / Artístico',
      'Tranquilo / Relajado',
      'Curioso / Intelectual',
      'Aventurero / Energético',
      'Sociable / Anfitrión',
      'Organizado / Práctico',
      'Empático / Sensible',
      'Divertido / Bromista',           // Nueva opción
      'Soñador / Idealista',            // Nueva opción
      'Realista / Pragmático'           // Nueva opción
    ],
  },
  {
    id: 'lifestyle',
    text: '¿Qué tipo de planes prefiere esta persona?',
    options: [
      'Tranquilos en casa',
      'Salidas culturales',
      'Eventos sociales',
      'Naturaleza y aire libre',
      'Viajes y escapadas',           // Nueva opción
      'Deporte y actividad física',   // Nueva opción
      'Voluntariado / Ayuda social',  // Nueva opción
      'Planes gastronómicos',         // Nueva opción
      'Aventura extrema',             // Nueva opción
      'Tecnología y gaming'           // Nueva opción
    ]
  },
  {
    id: 'giftStyle',
    text: '¿Qué estilo de regalo buscas?',
    options: ['Algo práctico y útil', 'Una experiencia inolvidable', 'Un detalle sentimental', 'Algo lujoso y especial'],
  },
];

export const INITIAL_ANSWERS = {
    occasion: '',
    relationship: '',
    age: '',
    gender: '',
    budget: '',
    interests: [],
    personality: '',
    lifestyle: '',
    giftStyle: '',
};