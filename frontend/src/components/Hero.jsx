import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <header className="relative bg-slate-950 overflow-hidden py-20 md:py-32 border-b border-slate-900">
      {/* Decorative localized accent vector blur elements background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full filter blur-3xl pointer-events-none"></div>
      
      <div className="relative max-w-5xl mx-auto px-4 text-center space-y-6">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20">
          TBI-GEU Incubator Project Scope
        </span>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none">
          Transform Raw Metrics Into <span className="text-emerald-400">High-Converting Copy</span>
        </h1>
        <p className="text-base md:text-xl text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
          Automated marketing optimization hub tailored explicitly for regional food processing micro-enterprises to scale their catalog visibility across modern marketplaces.
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