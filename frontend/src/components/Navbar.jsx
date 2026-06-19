import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ theme, setTheme }) {
  const [isOpen, setIsOpen] = useState(false);

  
  const handleThemeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <nav className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          <Link to="/" className="text-xl font-black tracking-tight text-emerald-400">
            ShaktiScribe
          </Link>

          <div className="hidden md:flex space-x-8 text-sm font-medium">
            <Link to="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <Link to="/dashboard" className="hover:text-emerald-400 transition-colors">Dashboard</Link>
            <Link to="/history" className="hover:text-emerald-400 transition-colors">Saved Logs</Link>
            <Link to="/about" className="hover:text-emerald-400 transition-colors">About App</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            
            <button 
              onClick={handleThemeToggle} 
              className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all border border-slate-700 cursor-pointer"
            >
              {theme === 'dark' ? '☀️ Light Profile' : '🌙 Dark Profile'}
            </button>

            <Link to="/login" className="px-4 py-2 text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg transition-all">
              Staff Portal
            </Link>
          </div>

          <div className="flex md:hidden items-center space-x-2">
            <button 
              onClick={handleThemeToggle} 
              className="p-2 rounded-xl bg-slate-800 text-xs border border-slate-700 text-slate-200"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-xl hover:bg-slate-800 text-white">
              {isOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 bg-slate-950 space-y-3 border-t border-slate-800 flex flex-col text-sm">
          <Link to="/" onClick={() => setIsOpen(false)} className="py-2 hover:text-emerald-400">Home</Link>
          <Link to="/dashboard" onClick={() => setIsOpen(false)} className="py-2 hover:text-emerald-400">Dashboard</Link>
          <Link to="/history" onClick={() => setIsOpen(false)} className="py-2 hover:text-emerald-400">Saved Logs</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="py-2 hover:text-emerald-400">About App</Link>
          <Link to="/login" onClick={() => setIsOpen(false)} className="py-2 text-center bg-slate-900 text-white rounded-xl text-xs font-semibold mt-2">
            Staff Portal
          </Link>
        </div>
      )}
    </nav>
  );
}