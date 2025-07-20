import React from 'react';
import type { GiftSuggestion } from '../types';
import { affiliateCategoryUrls, openAffiliateLink } from '../affiliateLinks';

interface GiftSuggestionCardProps {
  suggestion: GiftSuggestion;
}

const categoryIcons: { [key: string]: React.ReactElement } = {
    'Tecnología': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17 1H7c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zM7 19V5h10v14H7z" /></svg>,
    'Experiencia': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.22-1.05-.59-1.42zM13 20.99l-9-9V4h7l9 9-7 6.99z" /><circle cx="6.5" cy="6.5" r="1.5" /></svg>,
    'Moda': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M21.99 8c0-.55-.45-1-1-1h-2.17l-1.9-3.8c-.31-.61-1.04-1-1.74-1H8.82c-.7.01-1.43.39-1.74 1L5.18 7H3c-.55 0-1 .45-1 1s.45 1 1 1h.1l1.79 8.97c.13.63.69 1.03 1.32 1.03H17.8c.63 0 1.19-.4 1.32-1.03L20.9 9H21c.55 0 1-.45 1-1zm-10.99-4H13l1.1 2.2H9.9L11 4zM18.81 17H5.19l-1.43-7.14h15.49L18.81 17z" /></svg>,
    'Libros': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" /></svg>,
    'Hogar': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L4 9v12h5v-7h6v7h5V9l-8-6zm-1-2.12L21.3 8.35c.38.29.6.76.6 1.25V21c0 .55-.45 1-1 1h-6v-7h-4v7H4c-.55 0-1-.45-1-1V9.6c0-.49.22-.96.6-1.25L11 0.88c.6-.47 1.4-.47 2 0z" /></svg>,
    'Cocina': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17.58 6.25c-.7-.7-1.63-1.09-2.65-1.19V3.5c0-.28-.22-.5-.5-.5h-3c-.28 0-.5.22-.5.5v1.56c-1.02.1-1.95.49-2.65 1.19C6.4 8.07 5.63 10.98 7.61 13c1.33 1.33 3.11 2 4.9 2s3.56-.67 4.89-2c1.98-2.02 1.22-4.93-.58-6.75zM12 13c-1.11 0-2.1-.56-2.7-1.44-.64-.92-.6-2.16.12-3.03.68-.82 1.7-1.32 2.78-1.32s2.1.5 2.78 1.32c.72.87.76 2.11.12 3.03-.6 1-1.59 1.44-2.7 1.44z" /><path d="M12 17c-3.31 0-6 2.69-6 6h12c0-3.31-2.69-6-6-6zm0 1c2.21 0 4 1.79 4 4h-8c0-2.21 1.79-4 4-4z" /></svg>,
    'Deporte': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.15 7.65c.23.41.35.88.35 1.35 0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3c.47 0 .94.12 1.35.35l1.52-1.52c-1-1.22-2.49-2.02-4.12-2.15V3h-2v1.33C9.04 4.56 7.4 5.92 6.55 7.65l1.52 1.52c.41-.23.88-.35 1.35-.35 1.66 0 3 1.34 3 3s-1.34 3-3 3c-.47 0-.94-.12-1.35-.35L6.55 16.35c.85 1.73 2.49 3.09 4.38 3.32V21h2v-1.33c1.77-.23 3.26-1.12 4.12-2.47l-1.52-1.52c-.41.23-.88.35-1.35.35-1.66 0-3-1.34-3-3s1.34-3 3-3c.47 0 .94.12 1.35.35l1.52-1.52z" /></svg>,
    'Arte': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17.71 2.29a.996.996 0 00-1.41 0L3 15.58V21h5.42L21.71 7.71a.996.996 0 000-1.41l-2.59-2.59c-.39-.38-1.02-.38-1.41 0zM16 4.41L18.59 7 15 10.59 12.41 8 16 4.41zM5 19v-2.59l7-7L14.59 12l-7 7H5z" /></svg>,
    'Manualidades': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" /></svg>,
    'Música': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" /></svg>,
    'Viajes': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z" /><circle cx="12" cy="9" r="2.5" /></svg>,
    'Mascotas': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-1.05-.18-2.05-.5-3H12V3zm0 2v4h4.47c-.55-2.4-2.51-4.47-4.47-4.47zm0 6V9h6.97C18.99 9.32 19 9.66 19 10c0 3.86-3.14 7-7 7s-7-3.14-7-7c0-1.48.47-2.85 1.26-4h5.74v4z" /></svg>,
    'Bienestar': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>,
    'Default': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 7.55V17a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7.55l8.03-4.52a2 2 0 0 1 1.94 0L20 7.55zM12 4L4 9v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9l-8-5z" /><path d="M12 12.5a3 3 0 0 1-3-3H7a5 5 0 0 0 5 5a5 5 0 0 0 5-5h-2a3 3 0 0 1-3 3z" /></svg>,
};


const getIconForCategory = (category: string) => {
    // Find the key that the category string includes, case-insensitively.
    const normalizedCategory = category.toLowerCase();
    const foundKey = Object.keys(categoryIcons).find(key => normalizedCategory.includes(key.toLowerCase()));
    const iconKey = foundKey || 'Default';
    const iconSvg = categoryIcons[iconKey];
    
    // Add size classes to the SVG
    return React.cloneElement(iconSvg as React.ReactElement<any>, { className: "h-7 w-7" });
}


const GiftSuggestionCard: React.FC<GiftSuggestionCardProps> = ({ suggestion }) => {
    const icon = getIconForCategory(suggestion.categoria);
    const hasAmazonLink = !!(affiliateCategoryUrls.amazon as any)[suggestion.categoria];
    return (
        <div className="flex flex-col justify-between h-full w-full max-w-2xl mx-auto bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 shadow-2xl shadow-violet-500/10 rounded-3xl p-6 sm:p-8 items-center transition-transform transition-shadow duration-300 ease-in-out lg:hover:scale-105 lg:hover:shadow-3xl lg:hover:shadow-[#a259ff]/40">
            <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-gradient-to-br from-[#ff7eb9] to-[#8aaaff] text-white transition-colors duration-300">
                    {icon}
                </div>
                <p className="ml-3 font-semibold text-sm text-[#ff7eb9] uppercase tracking-wider">{suggestion.categoria}</p>
            </div>
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff7eb9] to-[#8aaaff] mb-2 text-center">{suggestion.nombre}</h3>
            <p className="text-[#E0E0E0] text-base text-center font-normal leading-relaxed">{suggestion.descripcion}</p>
            {hasAmazonLink && (
                <button
                  className="mt-4 w-full py-1.5 px-3 rounded border border-[#e6c200] font-medium text-sm text-[#232f3e] bg-gradient-to-b from-[#fffbe6] to-[#ffe066] shadow-sm hover:from-[#fffde4] hover:to-[#ffe599] transition-colors whitespace-nowrap overflow-hidden text-ellipsis"
                  style={{ minHeight: '36px' }}
                  onClick={() => openAffiliateLink(suggestion.nombre, suggestion.categoria, 'amazon')}
                >
                  Ver en Amazon
                </button>
            )}
        </div>
    );
};

export default GiftSuggestionCard;
