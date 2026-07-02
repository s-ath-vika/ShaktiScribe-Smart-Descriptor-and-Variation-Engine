import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  const fullText = "Automated marketing optimization hub tailored explicitly for regional food processing micro-enterprises to scale their catalog visibility across modern marketplaces.";
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let currentIndex = 0;
    
    const intervalId = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, 25);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <header className="relative bg-slate-950 overflow-hidden py-20 md:py-32 border-b border-slate-900">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full filter blur-[100px] pointer-events-none"></div>
      
      <div className="relative max-w-5xl mx-auto px-4 text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none">
          Transform Raw Metrics Into <span className="text-emerald-400">High-Converting Copy</span>
        </h1>
        <p className="text-base md:text-xl text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed min-h-[4rem]">
          {displayedText}
          <span className="inline-block w-1 h-5 ml-1 bg-emerald-400 animate-pulse">|</span>
        </p>
        <div className="pt-4">
          <Link to="/dashboard" className="inline-block px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold rounded-xl shadow-lg shadow-emerald-500/20 text-sm tracking-wide transition-all transform hover:-translate-y-0.5">
            Initialize Description Hub
          </Link>
        </div>
      </div>
    </header>
  );
}