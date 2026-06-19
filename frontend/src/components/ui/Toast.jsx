import { useEffect } from 'react';

/**
 * @param {Object} props
 * @param {string} props.message
 * @param {boolean} props.isVisible
 * @param {Function} props.onDismiss
 * @param {number} [props.duration=3000]
 */
export default function Toast({ message, isVisible, onDismiss, duration = 3000 }) {
  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => onDismiss(), duration);
    return () => clearTimeout(timer);
  }, [isVisible, duration, onDismiss]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-bounce">
      <div className="bg-slate-900 border border-slate-800 text-white dark:bg-white dark:text-slate-950 dark:border-slate-200 px-5 py-3 rounded-xl shadow-lg flex items-center space-x-3 text-xs font-semibold">
        <span className="text-emerald-400 dark:text-emerald-600">✓</span>
        <span>{message}</span>
      </div>
    </div>
  );
}