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
      setIsLoading(true);
      setError(null);
      try {
        const suggestions = await getGiftSuggestions(newAnswers);
        setResults(suggestions);
      } catch (err) {
        console.error(err);
        setError('Lo sentimos, ha ocurrido un error al buscar sugerencias. Por favor, inténtalo de nuevo.');
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

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }
    if (error) {
      return (
        <div className="text-center bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 p-6 sm:p-8 rounded-2xl animate-fade-in">
          <p className="font-bold text-lg text-red-700 dark:text-red-300">¡Ups! Algo salió mal</p>
          <p className="mt-2 text-red-600 dark:text-red-400">{error}</p>
          <button onClick={handleReset} className="mt-6 px-6 py-2 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 transition-colors">
            Empezar de Nuevo
          </button>
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
              key={step} // Add key to force re-render and re-animate
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