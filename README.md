# ¿Qué le regalo? 🎁

**¿Qué le regalo?** es una aplicación web que utiliza IA para ayudarte a encontrar el regalo perfecto para cualquier ocasión. A través de una serie de preguntas interactivas, filtra opciones y te sugiere ideas personalizadas según el perfil y los intereses del destinatario.

## ✨ Características principales
- Asistente de regalos con IA (Google Gemini)
- Interfaz moderna, responsiva y premium
- Efectos visuales avanzados (Glassmorphism, gradientes, animaciones GSAP)
- Preguntas dinámicas y personalizables
- Sugerencias de regalos creativas y adaptadas al usuario
- Experiencia fluida tanto en móvil como en escritorio
- **Backend seguro** con función serverless en Vercel

## 🚀 Tecnologías utilizadas
- **Frontend**: React + TypeScript, Vite, Tailwind CSS, GSAP
- **Backend**: Vercel Functions (serverless)
- **IA**: Google Gemini 1.5 Flash
- **Desarrollo**: Proxy local para testing

## 📦 Instalación y ejecución

1. **Clona el repositorio:**
   ```bash
   git clone <URL-del-repo>
   cd ¿qué-le-regalo_
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Configuración para desarrollo local:**
   
   **Opción A: Desarrollo completo (recomendado)**
   ```bash
   npm run dev:full
   ```
   Este comando ejecuta tanto el servidor de desarrollo (puerto 3001) como el frontend (puerto 5173) simultáneamente.

   **Opción B: Solo frontend**
   ```bash
   npm run dev
   ```
   Solo ejecuta el frontend (para cuando tengas el backend desplegado en Vercel).

   **Opción C: Solo servidor de desarrollo**
   ```bash
   npm run dev:server
   ```
   Solo ejecuta el servidor mock para testing.

4. **Configuración para producción:**
   
   **Variables de entorno en Vercel:**
   - Ve a tu dashboard de Vercel
   - Settings → Environment Variables
   - Agrega: `GEMINI_API_KEY` = tu_clave_de_api
   - Obtén tu clave en [Google AI Studio](https://aistudio.google.com/app/apikey)

5. **Compila para producción:**
   ```bash
   npm run build
   npm run preview
   ```

## 🔧 ¿Por qué el proxy de desarrollo?

La aplicación utiliza un **backend seguro** con función serverless en Vercel para proteger la API key de Gemini. Para desarrollo local, implementamos:

- **Servidor mock** (`dev-server.js`): Simula la API de Gemini con sugerencias de ejemplo
- **Proxy de Vite**: Redirige llamadas `/api/gemini` a `localhost:3001` en desarrollo
- **Configuración automática**: El frontend detecta el entorno y usa la URL correcta

**Ventajas:**
- ✅ API key protegida en producción
- ✅ Desarrollo local sin configurar API keys
- ✅ Testing rápido con datos de ejemplo
- ✅ Transición transparente entre desarrollo y producción

## 🛠️ Personalización
- Puedes editar las preguntas y opciones en `constants.ts`.
- Los estilos y colores se pueden ajustar en los componentes y en las clases Tailwind.
- Las animaciones GSAP se encuentran en los componentes principales (Header, WelcomeScreen, GiftSuggestionCard).
- El servidor mock (`dev-server.js`) se puede personalizar para diferentes escenarios de testing.

## 📄 Estructura del proyecto
- `components/` — Componentes de UI (cards, header, loading, etc.)
- `services/` — Lógica de conexión con la IA (Gemini)
- `api/` — Funciones serverless para Vercel
- `constants.ts` — Preguntas y opciones del cuestionario
- `dev-server.js` — Servidor de desarrollo local
- `App.tsx` — Lógica principal de la app
- `index.html`, `index.tsx` — Entrada de la app

## 🌐 Despliegue
- **Vercel**: Despliegue automático con `git push`
- **Variables de entorno**: Configurar `GEMINI_API_KEY` en Vercel Dashboard
- **Función serverless**: `/api/gemini` maneja las llamadas a Gemini de forma segura

## 💡 Créditos y agradecimientos
- Inspirado en las mejores prácticas de UX/UI y diseño premium.
- Animaciones por [GSAP](https://gsap.com/).
- IA por [Google Gemini](https://aistudio.google.com/).
- Despliegue seguro con [Vercel](https://vercel.com/).

---

¡Esperamos que disfrutes usando **¿Qué le regalo?** y encuentres el regalo perfecto para cada ocasión!
