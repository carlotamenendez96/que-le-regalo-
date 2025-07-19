import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from 'dotenv';

// Cargar variables de entorno desde .env
config();

async function testGeminiAPI() {
  const API_KEY = process.env.GEMINI_API_KEY;
  
  if (!API_KEY) {
    console.error('❌ GEMINI_API_KEY no está configurada');
    return;
  }
  
  console.log('🔑 API Key configurada:', API_KEY.substring(0, 10) + '...');
  
  const genAI = new GoogleGenerativeAI(API_KEY);
  
  // Lista de modelos a probar
  const modelsToTest = [
    'gemini-1.5-pro',
    'gemini-1.5-flash',
    'gemini-pro',
    'gemini-1.0-pro'
  ];
  
  for (const modelName of modelsToTest) {
    try {
      console.log(`\n🧪 Probando modelo: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });
      
      const result = await model.generateContent('Hola, ¿cómo estás?');
      const response = await result.response;
      const text = response.text();
      
      console.log(`✅ Modelo ${modelName} funciona correctamente`);
      console.log(`📝 Respuesta: ${text.substring(0, 100)}...`);
      
      // Si el primer modelo funciona, usarlo
      break;
      
    } catch (error) {
      console.log(`❌ Error con modelo ${modelName}:`, error.message);
    }
  }
}

testGeminiAPI().catch(console.error); 