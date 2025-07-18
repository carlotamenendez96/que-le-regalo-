import React, { useState, useEffect } from 'react';
import type { Question } from '../types';

const CheckIcon = () => (
    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: string | string[]) => void;
  selectedAnswers: string | string[];
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onAnswer, selectedAnswers }) => {
    const [multiSelectChoices, setMultiSelectChoices] = useState<string[]>(
        Array.isArray(selectedAnswers) ? selectedAnswers : []
    );

    useEffect(() => {
        setMultiSelectChoices(Array.isArray(selectedAnswers) ? selectedAnswers : []);
    }, [question, selectedAnswers]);

    const handleSingleSelect = (option: string) => {
        onAnswer(option);
    };

    const handleMultiSelectToggle = (option: string) => {
        const newSelections = multiSelectChoices.includes(option)
            ? multiSelectChoices.filter(item => item !== option)
            : [...multiSelectChoices, option];
        
        if (newSelections.length <= 3) {
            setMultiSelectChoices(newSelections);
        }
    };

    const handleSubmitMultiSelect = () => {
        if (multiSelectChoices.length > 0) {
            onAnswer(multiSelectChoices);
        }
    };

    const isOptionSelected = (option: string): boolean => {
        if (question.isMultiSelect) {
            return multiSelectChoices.includes(option);
        }
        return selectedAnswers === option;
    };

    return (
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 shadow-2xl shadow-violet-500/10 rounded-3xl p-6 sm:p-8 w-full animate-fade-in">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-8">{question.text}</h2>
            <div className={`grid gap-4 ${question.isMultiSelect ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2'}`}>
                {question.options.map((option, index) => (
                    <button
                        key={option}
                        onClick={() => question.isMultiSelect ? handleMultiSelectToggle(option) : handleSingleSelect(option)}
                        className={`relative p-4 rounded-xl text-lg font-semibold border-2 transition-all duration-200 ease-in-out transform focus:outline-none focus:ring-4 focus:ring-opacity-50 text-left flex items-center justify-between
                            ${isOptionSelected(option)
                                ? ' text-white bg-violet-600 border-violet-600  ring-violet-800'
                                : '   bg-slate-700 border-slate-600 text-slate-200 hover:border-violet-500'
                            }`}
                    >
                        <span>{option}</span>
                        {isOptionSelected(option) && <CheckIcon />}
                    </button>
                ))}
            </div>
            {question.isMultiSelect && (
                 <div className="text-center mt-8">
                    <button
                        onClick={handleSubmitMultiSelect}
                        disabled={multiSelectChoices.length === 0}
                        className="px-8 py-3 bg-gradient-to-br from-violet-500 to-pink-500 text-white font-bold rounded-full text-lg hover:shadow-md hover:shadow-violet-500/50 hover:brightness-110 disabled:from-slate-400 disabled:to-slate-400 disabled:cursor-not-allowed disabled:hover:shadow-none dark:disabled:from-slate-600 dark:disabled:to-slate-600 transition-all duration-300"
                    >
                        Siguiente
                    </button>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-3">
                        {multiSelectChoices.length === 0 ? "Selecciona hasta 3 intereses." : `Seleccionados: ${multiSelectChoices.length}/3`}
                    </p>
                </div>
            )}
        </div>
    );
};

export default QuestionCard;