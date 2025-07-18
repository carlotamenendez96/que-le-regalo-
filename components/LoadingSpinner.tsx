import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="text-center p-8 flex flex-col items-center justify-center animate-fade-in">
        <div className="relative flex justify-center items-center mb-6">
             <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-violet-500"></div>
             <div className="absolute text-violet-500 animate-pulse">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 7.55V17a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7.55l8.03-4.52a2 2 0 0 1 1.94 0L20 7.55zM12 4L4 9v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9l-8-5z"></path>
                    <path d="M12 12.5a3 3 0 0 1-3-3H7a5 5 0 0 0 5 5a5 5 0 0 0 5-5h-2a3 3 0 0 1-3 3z"></path>
                </svg>
             </div>
        </div>
        <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#a259ff] to-[#ff7eb9]">Buscando regalos...</h3>
        <p className="text-slate-500 dark:text-slate-400">Nuestra IA está preparando las mejores ideas para ti.</p>
    </div>
  );
};

export default LoadingSpinner;