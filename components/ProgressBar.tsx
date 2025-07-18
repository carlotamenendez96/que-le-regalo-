import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between mb-2">
        <span className="text-base font-medium text-violet-700 dark:text-violet-300">Progreso</span>
        <span className="text-sm font-medium text-violet-700 dark:text-violet-300">{currentStep + 1} de {totalSteps}</span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-3 dark:bg-slate-700">
        <div
          className="bg-gradient-to-r from-violet-500 to-pink-500 h-3 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;