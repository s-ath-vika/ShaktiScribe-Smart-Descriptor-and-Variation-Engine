import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui';

export default function Navbar({ theme, setTheme, authState, onLogout }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-slate-200 dark:bg-slate-900 dark:border-slate-800 sticky top-0 z-50 backdrop-blur-md bg-white/90 dark:bg-slate-900/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between h-16">

          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="text-xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2"
            >
              <span className="text-emerald-500 font-extrabold text-2xl">⚡</span>
              ShaktiScribe
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className="text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
              >
                Home
              </Link>

              <Link
                to="/about"
                className="text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
              >
                About App
              </Link>

              <Link
                to="/contact"
                className="text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
              >
                Contact
              </Link>

              <Link
                to="/dashboard"
                className="text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
              >
                Dashboard
              </Link>

              <Link
                to="/history"
                className="text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
              >
                Saved Logs
              </Link>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">

            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white text-sm cursor-pointer"
              title="Toggle Layout Theme State"
            >
              {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
            </button>

            {/* Desktop Auth Button */}
            <div className="hidden md:block">
              {authState ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    onLogout();
                    navigate('/login');
                  }}
                  className="text-xs font-bold uppercase tracking-wider border-slate-200 text-red-500 hover:bg-red-50 dark:border-slate-700 dark:hover:bg-red-950/20"
                >
                  🚪 Logout Staff
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate('/login')}
                  className="text-xs font-bold uppercase tracking-wider shadow-sm"
                >
                  🔑 Staff Portal
                </Button>
              )}
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-slate-700 dark:text-white text-xl"
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>

          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 dark:border-slate-800">

            <div className="flex flex-col gap-4">

              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300"
              >
                Home
              </Link>

              <Link
                to="/about"
                onClick={() => setIsMenuOpen(false)}
                className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300"
              >
                About App
              </Link>

              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300"
              >
                Contact
              </Link>

              <Link
                to="/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300"
              >
                Dashboard
              </Link>

              <Link
                to="/history"
                onClick={() => setIsMenuOpen(false)}
                className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300"
              >
                Saved Logs
              </Link>

              <div className="pt-2">
                {authState ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIsMenuOpen(false);
                      onLogout();
                      navigate('/login');
                    }}
                    className="w-full text-xs font-bold uppercase tracking-wider border-slate-200 text-red-500 hover:bg-red-50 dark:border-slate-700 dark:hover:bg-red-950/20"
                  >
                    🚪 Logout Staff
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate('/login');
                    }}
                    className="w-full text-xs font-bold uppercase tracking-wider"
                  >
                    🔑 Staff Portal
                  </Button>
                )}
              </div>

            </div>
          </div>
        )}

      </div>
    </nav>
  );
}