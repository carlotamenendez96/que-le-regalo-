import React, { useEffect } from 'react';
import type { GiftSuggestion } from '../types';
import GiftSuggestionCard from './GiftSuggestionCard';

interface ResultsScreenProps {
  suggestions: GiftSuggestion[];
  onReset: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ suggestions, onReset }) => {
  useEffect(() => {
    document.title = "Resultados de regalos | ¿Qué le regalo?";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Tus sugerencias de regalos personalizadas con IA."
      );
    }
  }, []);

  return (
    <div className="w-full animate-fade-in flex flex-col min-h-screen">
      <div className="text-center mb-10">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#a259ff] to-[#ff7eb9] mb-2">
          ¡Aquí tienes algunas ideas!
        </h2>
        <p className="text-[#b8c1ec] text-lg mb-10">
          Hemos seleccionado estos regalos especialmente para ti.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-staggered-children">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="h-full flex transition-transform duration-300 ease-in-out hover:scale-105"
            style={{ '--stagger-delay': `${index * 100}ms` } as React.CSSProperties}
          >
            <GiftSuggestionCard suggestion={suggestion} />
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <button
          onClick={onReset}
          className="px-8 py-3 bg-gradient-to-br from-violet-500 to-pink-500 text-white font-bold rounded-full text-lg hover:shadow-lg hover:shadow-violet-500/50 hover:brightness-110 focus:outline-none focus:ring-4 focus:ring-violet-300 dark:focus:ring-violet-800 transform hover:scale-105 transition-all duration-300 ease-in-out"
        >
          Buscar de Nuevo
        </button>
      </div>
      {/* Footer legal Amazon Afiliados */}
      <footer className="mt-8 mb-2 text-xs text-center text-slate-400 opacity-70">
        queregalo.es es participante del Programa de Asociados de Amazon Services LLC, un programa de publicidad de afiliados diseñado para proporcionar un medio para que los sitios ganen tarifas de publicidad mediante la publicidad y los enlaces a Amazon.es.
      </footer>
    </div>
  );
};

export default ResultsScreen;