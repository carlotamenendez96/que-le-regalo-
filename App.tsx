import React, { useState, useCallback } from 'react';
import type { UserAnswers, GiftSuggestion } from './types';
import { QUESTIONS, INITIAL_ANSWERS } from './constants';
import { getGiftSuggestions } from './services/geminiService';
import Header from './components/Header';
import WelcomeScreen from './components/WelcomeScreen';
import QuestionCard from './components/QuestionCard';
import ResultsScreen from './components/ResultsScreen';
import LoadingSpinner from './components/LoadingSpinner';
import ProgressBar from './components/ProgressBar';

const App: React.FC = () => {
  const [step, setStep] = useState<number>(-1);
  const [answers, setAnswers] = useState<UserAnswers>(INITIAL_ANSWERS);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [results, setResults] = useState<GiftSuggestion[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleStart = () => {
    setStep(0);
  };

  const handleAnswer = useCallback(async (answer: string | string[]) => {
    const currentQuestion = QUESTIONS[step];
    const newAnswers = { ...answers, [currentQuestion.id]: answer };
    setAnswers(newAnswers);

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      // Última pregunta - obtener sugerencias
      setIsLoading(true);
      setError(null);
      
      try {
        console.log('Enviando respuestas al backend:', newAnswers);
        const suggestions = await getGiftSuggestions(newAnswers);
        
        if (suggestions && suggestions.length > 0) {
          console.log('Sugerencias recibidas:', suggestions);
          setResults(suggestions);
        } else {
          throw new Error('No se recibieron sugerencias válidas');
        }
      } catch (err: any) {
        console.error('Error al obtener sugerencias:', err);
        
        // Mensajes de error más específicos
        if (err.message?.includes('API key')) {
          setError('Error de configuración del servidor. Por favor, contacta al administrador.');
        } else if (err.message?.includes('network')) {
          setError('Error de conexión. Verifica tu internet e inténtalo de nuevo.');
        } else {
          setError('Lo sentimos, ha ocurrido un error al buscar sugerencias. Por favor, inténtalo de nuevo.');
        }
      } finally {
        setIsLoading(false);
      }
    }
  }, [step, answers]);

  const handleReset = () => {
    setStep(-1);
    setAnswers(INITIAL_ANSWERS);
    setResults([]);
    setError(null);
    setIsLoading(false);
  };

  const handleRetry = async () => {
    setError(null);
    setIsLoading(true);
    
    try {
      const suggestions = await getGiftSuggestions(answers);
      if (suggestions && suggestions.length > 0) {
        setResults(suggestions);
      } else {
        throw new Error('No se recibieron sugerencias válidas');
      }
    } catch (err: any) {
      console.error('Error en reintento:', err);
      setError('Lo sentimos, sigue habiendo problemas. Por favor, inténtalo más tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }
    
    if (error) {
      return (
        <div className="text-center bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 p-6 sm:p-8 rounded-2xl animate-fade-in max-w-md mx-auto">
          <div className="mb-4">
            <svg className="w-12 h-12 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="font-bold text-lg text-red-700 dark:text-red-300 mb-2">¡Ups! Algo salió mal</p>
          <p className="text-red-600 dark:text-red-400 mb-6">{error}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button 
              onClick={handleRetry} 
              className="px-6 py-2 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 transition-colors"
            >
              Intentar de Nuevo
            </button>
            <button 
              onClick={handleReset} 
              className="px-6 py-2 bg-slate-500 text-white font-semibold rounded-full hover:bg-slate-600 transition-colors"
            >
              Empezar de Nuevo
            </button>
          </div>
        </div>
      );
    }
    
    if (results.length > 0) {
      return <ResultsScreen suggestions={results} onReset={handleReset} />;
    }
    
    if (step === -1) {
      return <WelcomeScreen onStart={handleStart} />;
    }
    
    if (step < QUESTIONS.length) {
      return (
        <div className="w-full">
          <ProgressBar currentStep={step} totalSteps={QUESTIONS.length} />
          <QuestionCard
            key={step}
            question={QUESTIONS[step]}
            onAnswer={handleAnswer}
            selectedAnswers={answers[QUESTIONS[step].id as keyof UserAnswers]}
          />
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="min-h-screen text-slate-800 dark:text-slate-200 flex flex-col items-center p-4 transition-colors duration-500">
      <div className="mt-12 mb-20 text-center">
        <Header onReset={handleReset} />
        <p className="text-base text-[#b8c1ec] font-medium tracking-wide mt-2">Tu asistente de regalos con IA</p>
      </div>
      <main className="min-h-[40vh] flex items-center justify-center w-full max-w-3xl">
        <div className="w-full p-2 sm:p-4 flex flex-col items-center justify-center">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;