export default function Card({ title, description, tag }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
      <div className="space-y-3">
        <div className="flex justify-between items-start gap-4">
          <h3 className="font-bold text-xl text-slate-900 group-hover:text-emerald-600 transition-colors">
            {title}
          </h3>
          <span className="text-[10px] font-bold tracking-wider text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-md uppercase shrink-0">
            {tag}
          </span>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">
          {description}
        </p>
      </div>
      
      <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between text-xs font-semibold text-slate-400">
        <span>Ready for listings generation</span>
        <span className="text-slate-900 group-hover:text-emerald-500 font-bold flex items-center gap-1 transition-colors">
          Configure Context →
        </span>
      </div>
    </div>
  );
}