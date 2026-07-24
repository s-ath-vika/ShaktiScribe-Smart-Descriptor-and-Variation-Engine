export default function Card({ title, description, tag, actionText = "Configure Context →", onClick }) {
  return (
    <div 
      onClick={onClick}
      className="bg-white border border-slate-200 dark:bg-slate-900 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
    >
      <div className="space-y-3">
        <div className="flex justify-between items-start gap-4">
          <h3 className="font-bold text-xl text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
            {title}
          </h3>
          <span className="text-[10px] font-bold tracking-wider text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-1 rounded-md uppercase shrink-0">
            {tag}
          </span>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>
      
      <div className="pt-6 border-t border-slate-100 dark:border-slate-800 mt-6 flex items-center justify-between text-xs font-semibold text-slate-400">
        <span>Active catalog record</span>
        <span className="text-slate-900 dark:text-slate-200 group-hover:text-emerald-500 font-bold flex items-center gap-1 transition-colors">
          {actionText}
        </span>
      </div>
    </div>
  );
}