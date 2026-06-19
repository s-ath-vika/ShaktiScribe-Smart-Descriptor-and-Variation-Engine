/**
 * @param {Object} props
 * @param {'spinner'|'skeleton'} [props.type='spinner']
 */
export default function Loader({ type = 'spinner' }) {
  if (type === 'skeleton') {
    return (
      <div className="w-full space-y-3 animate-pulse p-4 border border-slate-100 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900">
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
        <div className="space-y-2">
          <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-full" />
          <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-5/6" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-8 h-8 border-4 border-slate-200 border-t-emerald-500 rounded-full animate-spin" />
    </div>
  );
}