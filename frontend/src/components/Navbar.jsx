import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Brand Title */}
          <Link to="/" className="text-xl font-black tracking-tight text-emerald-400">
            ShaktiScribe
          </Link>

          {/* Desktop Links Navigation */}
          <div className="hidden md:flex space-x-8 text-sm font-medium">
            <Link to="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <Link to="/dashboard" className="hover:text-emerald-400 transition-colors">Dashboard</Link>
            <Link to="/about" className="hover:text-emerald-400 transition-colors">About App</Link>
          </div>

          {/* User Console Actions Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="px-4 py-2 text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg transition-all">
              Staff Portal
            </Link>
          </div>

          {/* Mobile Hamburguer Toggle Button Menu */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-lg hover:bg-slate-800 focus:outline-none">
              <span className="text-2xl">{isOpen ? '✕' : '☰'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Slide down Mobile Navigation Drawer Panel */}
      {isOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 bg-slate-950 space-y-3 border-t border-slate-800 flex flex-col text-sm">
          <Link to="/" onClick={() => setIsOpen(false)} className="py-2 hover:text-emerald-400">Home</Link>
          <Link to="/dashboard" onClick={() => setIsOpen(false)} className="py-2 hover:text-emerald-400">Dashboard</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="py-2 hover:text-emerald-400">About App</Link>
          <Link to="/login" onClick={() => setIsOpen(false)} className="w-full text-center py-2.5 bg-emerald-500 text-slate-950 font-bold rounded-xl">
            Staff Portal
          </Link>
        </div>
      )}
    </nav>
  );
}