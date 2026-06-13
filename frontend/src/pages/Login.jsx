export default function Login() {
  return (
    <main className="max-w-md mx-auto px-4 py-20 min-h-[60vh]">
      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">Enterprise Access</h1>
          <p className="text-sm text-slate-500 mt-1">Sign in to initialize description templates</p>
        </div>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Corporate Email</label>
            <input type="email" placeholder="staff@himshakti.org" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition-colors" disabled />
          </div>
          <button className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm rounded-xl transition-all cursor-not-allowed" disabled>
            Secure Portal Locked
          </button>
        </form>
      </div>
    </main>
  );
}