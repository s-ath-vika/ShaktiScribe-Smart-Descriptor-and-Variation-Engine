export default function Login() {
  return (
    <main className="min-h-[calc(100vh-11rem)] flex items-center justify-center px-4 bg-slate-50">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-5">
        
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Enterprise Access</h1>
          <p className="text-xs text-slate-500 mt-1">Sign in to initialize description templates</p>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Corporate Email
            </label>
            <input 
              type="email" 
              placeholder="staff@himshakti.org" 
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition-colors cursor-not-allowed" 
              disabled 
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <input 
              type="password" 
              placeholder="Enter Password" 
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition-colors cursor-not-allowed" 
              disabled 
            />
          </div>

          <p className="text-center text-[11px] text-slate-400">
            Need credentials? Contact your site administrator.
          </p>

          <button className="w-full py-3 bg-slate-900 text-white font-semibold text-sm rounded-xl transition-all cursor-not-allowed opacity-90" disabled>
            Secure Portal Locked
          </button>
        </form>

      </div>
    </main>
  );
}