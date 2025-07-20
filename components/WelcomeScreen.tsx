import React, { useEffect } from 'react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  useEffect(() => {
    document.title = "¿Qué le regalo? | Elige el regalo perfecto con IA";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Descubre ideas de regalos personalizadas con inteligencia artificial para cualquier ocasión."
      );
    }
  }, []);

  return (
    <div className="w-[450px] max-w-full mx-auto bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 shadow-2xl shadow-[#a259ff]/20 rounded-3xl p-6 sm:p-8 flex flex-col items-center animate-fade-in">
      <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff7eb9] to-[#8aaaff] text-center mb-4">
        Encuentra el Regalo <span className="">Perfecto</span>
      </h2>
      <p className="text-[#E0E0E0] text-base text-center mb-6 font-normal leading-relaxed">
        Responde unas pocas preguntas y nuestra IA te dará ideas de regalos increíbles y personalizados.
      </p>
      <button
        onClick={onStart}
        className="py-3 px-6 bg-gradient-to-r from-[#ff7eb9] to-[#8aaaff] text-white font-semibold rounded-[10px] transition-transform transition-shadow duration-200 hover:scale-105 hover:shadow-[0_4px_15px_rgba(255,126,185,0.6)]"
        style={{ animationDuration: '3s' }}
      >
        ¡Empezar a Descubrir!
      </button>
    </div>
  );
};

export default WelcomeScreen;