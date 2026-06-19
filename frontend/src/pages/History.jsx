import { Button } from '../components/ui';

export default function History() {
  const savedLogs = [
    { id: 1, name: "Himalayan Finger Millet Snacks", tone: "Health-Focused", date: "June 16, 10:30 PM" },
    { id: 2, name: "Pure Rhododendron Juice", tone: "Premium", date: "June 15, 04:15 PM" }
  ];

  return (
    <main className="max-w-5xl mx-auto px-4 py-12 min-h-[75vh]">
      <div className="space-y-6">
        
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-6 dark:bg-slate-900 dark:border-slate-800">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Saved Brand Asset Catalogs
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Review, edit, or reload past copy variations customized for HimShakti storefronts.
          </p>
        </div>
      </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl divide-y divide-slate-100 dark:divide-slate-800 shadow-sm overflow-hidden">
          {savedLogs.map((log) => (
            <div key={log.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                    {log.name}
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-600 dark:text-slate-300 uppercase">
                    {log.tone}
                  </span>
                </div>
                <p className="text-xs text-slate-400">Processed on {log.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="secondary" size="sm">Load Workspace</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}