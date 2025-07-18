# ¿Qué le regalo? 🎁

**¿Qué le regalo?** es una aplicación web que utiliza IA para ayudarte a encontrar el regalo perfecto para cualquier ocasión. A través de una serie de preguntas interactivas, filtra opciones y te sugiere ideas personalizadas según el perfil y los intereses del destinatario.

## ✨ Características principales
- Asistente de regalos con IA (Google Gemini)
- Interfaz moderna, responsiva y premium
- Efectos visuales avanzados (Glassmorphism, gradientes, animaciones GSAP)
- Preguntas dinámicas y personalizables
- Sugerencias de regalos creativas y adaptadas al usuario
- Experiencia fluida tanto en móvil como en escritorio

## 🚀 Tecnologías utilizadas
- **React** + **TypeScript**
- **Vite** (entorno de desarrollo ultrarrápido)
- **Tailwind CSS** (utilidades y estilos premium)
- **GSAP** (animaciones WOW)
- **Google Gemini** (IA para sugerencias)

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

3. **Configura la clave de API de Gemini:**
   - Crea un archivo `.env` en la raíz con:
     ```env
     VITE_GEMINI_API_KEY=tu_clave_de_api
     ```
   - Puedes obtener la clave en [Google AI Studio](https://aistudio.google.com/app/apikey) o Google Cloud.

4. **Inicia la app en modo desarrollo:**
   ```bash
   npm run dev
   ```
   La app estará disponible en [http://localhost:5173](http://localhost:5173)

5. **Compila para producción:**
   ```bash
   npm run build
   npm run preview
   ```

## 🛠️ Personalización
- Puedes editar las preguntas y opciones en `constants.ts`.
- Los estilos y colores se pueden ajustar en los componentes y en las clases Tailwind.
- Las animaciones GSAP se encuentran en los componentes principales (Header, WelcomeScreen, GiftSuggestionCard).

## 📄 Estructura del proyecto
- `components/` — Componentes de UI (cards, header, loading, etc.)
- `services/` — Lógica de conexión con la IA (Gemini)
- `constants.ts` — Preguntas y opciones del cuestionario
- `App.tsx` — Lógica principal de la app
- `index.html`, `index.tsx` — Entrada de la app

## 💡 Créditos y agradecimientos
- Inspirado en las mejores prácticas de UX/UI y diseño premium.
- Animaciones por [GSAP](https://gsap.com/).
- IA por [Google Gemini](https://aistudio.google.com/).

---

¡Esperamos que disfrutes usando **¿Qué le regalo?** y encuentres el regalo perfecto para cada ocasión!
