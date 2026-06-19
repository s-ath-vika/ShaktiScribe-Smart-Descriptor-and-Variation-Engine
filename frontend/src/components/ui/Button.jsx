/**
 * @param {Object} props
 * @param {'primary'|'secondary'|'outline'} [props.variant='primary']
 * @param {'sm'|'md'|'lg'} [props.size='md']
 * @param {boolean} [props.disabled=false]
 * @param {Function} props.onClick
 * @param {React.ReactNode} props.children
 */
export default function Button({ 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  onClick, 
  children 
}) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all font-medium focus:outline-none tracking-wide active:scale-[0.98]';
  
  const variants = {
    primary: 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-sm disabled:bg-emerald-800 disabled:text-slate-500 disabled:scale-100',
    secondary: 'bg-slate-800 hover:bg-slate-700 text-white dark:bg-slate-700 dark:hover:bg-slate-600 disabled:bg-slate-900',
    outline: 'border border-slate-300 hover:bg-slate-100 text-slate-700 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 disabled:bg-transparent'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
    >
      {children}
    </button>
  );
}