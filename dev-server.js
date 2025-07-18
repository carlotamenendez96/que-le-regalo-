import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Simular sugerencias de regalos para desarrollo
const mockSuggestions = [
  {
    nombre: "Reloj Inteligente Personalizado",
    descripcion: "Un reloj inteligente con bandas intercambiables que se adapta al estilo personal del destinatario. Perfecto para alguien que aprecia la tecnología y la personalización.",
    categoria: "Tecnología"
  },
  {
    nombre: "Experiencia de Spa en Casa",
    descripcion: "Un kit completo de spa con velas aromáticas, aceites esenciales y productos de cuidado personal. Ideal para crear momentos de relax y bienestar.",
    categoria: "Bienestar"
  },
  {
    nombre: "Libro Personalizado de Recetas",
    descripcion: "Un libro de cocina con recetas favoritas y espacio para agregar nuevas. Incluye fotos y notas personales que hacen de este regalo algo único y sentimental.",
    categoria: "Hogar"
  },
  {
    nombre: "Clase de Arte Online",
    descripcion: "Una suscripción a clases de arte virtuales con materiales incluidos. Perfecto para desarrollar la creatividad y aprender nuevas habilidades artísticas.",
    categoria: "Educación"
  },
  {
    nombre: "Set de Jardinería Interior",
    descripcion: "Un kit completo para crear un pequeño jardín interior con plantas fáciles de cuidar, macetas decorativas y guía de cuidados. Ideal para traer naturaleza al hogar.",
    categoria: "Hogar"
  },
  {
    nombre: "Experiencia Gastronómica",
    descripcion: "Una cena en un restaurante exclusivo o un curso de cocina especializado. Una experiencia memorable que combina aprendizaje y disfrute culinario.",
    categoria: "Experiencia"
  }
];

// Endpoint para sugerencias de regalos
app.post('/gemini', (req, res) => {
  try {
    console.log('Solicitud recibida:', req.body);
    
    // Simular delay de red
    setTimeout(() => {
      res.json({
        response: JSON.stringify(mockSuggestions),
        count: mockSuggestions.length
      });
    }, 1000);
    
  } catch (error) {
    console.error('Error en el servidor:', error);
    res.status(500).json({
      response: JSON.stringify([
        {
          nombre: "Regalo Especial",
          descripcion: "Un regalo cuidadosamente seleccionado que refleja el cariño hacia el destinatario.",
          categoria: "General"
        }
      ]),
      count: 1,
      error: "Error en el servidor de desarrollo"
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Servidor de desarrollo funcionando' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor de desarrollo corriendo en http://localhost:${PORT}`);
  console.log(`📝 Endpoint: POST http://localhost:${PORT}/gemini`);
  console.log(`💚 Health check: GET http://localhost:${PORT}/health`);
}); 