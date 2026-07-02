import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Toast } from './ui';

export default function Navbar({ theme, setTheme, user, onLogout }) {
  const navigate = useNavigate();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const executeLogoutSequence = () => {
    setIsConfirmOpen(false);
    onLogout();
    setToastMessage("Session destroyed successfully. Cleared operational parameters cache.");
    setTimeout(() => {
      navigate('/');
    }, 1200);
  };

  return (
    <>
      <nav className="w-full bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-900 px-6 py-4 flex items-center justify-between transition-colors sticky top-0 z-40">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-lg font-black tracking-wider text-slate-900 dark:text-white uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            ShaktiScribe
          </Link>
          <div className="hidden md:flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <Link to="/about" className="hover:text-emerald-500 transition-colors">About</Link>
            <Link to="/contact" className="hover:text-emerald-500 transition-colors">Contact</Link>
            {user && (
              <>
                <Link to="/dashboard" className="hover:text-emerald-500 transition-colors">Dashboard</Link>
                <Link to="/history" className="hover:text-emerald-500 transition-colors">History Ledger</Link>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 transition-colors text-sm cursor-pointer"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline font-mono text-[11px] bg-emerald-500/10 text-emerald-500 px-2.5 py-1 border border-emerald-500/10 rounded-lg font-bold">
                👤 {user.username}
              </span>
              <button
                onClick={() => setIsConfirmOpen(true)}
                className="inline-flex items-center justify-center font-semibold rounded-xl transition-all font-medium focus:outline-none tracking-wide active:scale-[0.98] px-4 py-2 text-xs cursor-pointer border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                🔒 Terminate Session
              </button>
            </div>
          ) : (
            <Link to="/login">
              <Button variant="primary" size="sm">
                Staff Portal Gate
              </Button>
            </Link>
          )}
        </div>
      </nav>

      {isConfirmOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-sm w-full rounded-2xl p-6 shadow-2xl text-left space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Confirm System Logout Sequence
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Are you sure you want to terminate your current session? This action will disconnect writing tokens until the next authorization handshake.
            </p>
            <div className="flex gap-2 justify-end pt-2">
              <button
                onClick={() => setIsConfirmOpen(false)}
                className="inline-flex items-center justify-center font-semibold rounded-xl transition-all font-medium focus:outline-none tracking-wide active:scale-[0.98] px-3 py-1.5 text-xs cursor-pointer border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={executeLogoutSequence}
                className="inline-flex items-center justify-center font-semibold rounded-xl transition-all font-medium focus:outline-none tracking-wide active:scale-[0.98] px-3 py-1.5 text-xs cursor-pointer bg-red-500 hover:bg-red-400 text-white"
              >
                Disconnect Session
              </button>
            </div>
          </div>
        </div>
      )}

      {toastMessage && (
        <Toast message={toastMessage} isVisible={!!toastMessage} onDismiss={() => setToastMessage('')} />
      )}
    </>
  );
}