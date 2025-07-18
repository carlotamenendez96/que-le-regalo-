import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface HeaderProps {
    onReset: () => void;
}

const Header: React.FC<HeaderProps> = ({ onReset }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: -40 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
      );
    }
  }, []);

  return (
    <header onClick={onReset} className="w-full max-w-3xl py-6 flex items-center justify-center cursor-pointer group">
       <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 sm:h-12 sm:w-12 text-violet-500 group-hover:text-pink-500 transition-colors duration-300 mr-3" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 7.55V17a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7.55l8.03-4.52a2 2 0 0 1 1.94 0L20 7.55zM12 4L4 9v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9l-8-5z"></path>
          <path d="M12 12.5a3 3 0 0 1-3-3H7a5 5 0 0 0 5 5a5 5 0 0 0 5-5h-2a3 3 0 0 1-3 3z"></path>
        </svg>
      <h1
        ref={titleRef}
        className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#a259ff] via-[#b8c1ec] to-[#f857a6] transition-all duration-300"
      >
        ¿Qué le regalo?
      </h1>
    </header>
  );
};

export default Header;