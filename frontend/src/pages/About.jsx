import 'react-router-dom';

export default function About() {
  const features = [
    { title: "Localized Engine", desc: "Customized for the regional operational workflows of HimShakti food processing units." },
    { title: "Dynamic Templating", desc: "Transforms ingredient inputs and parameters into market-ready ecommerce copies." },
    { title: "Historical Ledger", desc: "Complete database operations to tracking, update, and manage generated catalog logs." },
    { title: "Context Tone Grid", desc: "Switches copywriting outputs dynamically across Premium, Traditional, and Health tones." }
  ];

  const techStack = [
    { Category: "Frontend Architecture", Stack: "React.js, Tailwind CSS, React Router DOM" },
    { Category: "Backend Infrastructure", Stack: "Express.js, Node.js REST API Cluster" },
    { Category: "Database Tier", Stack: "MongoDB Atlas Cloud Storage using Mongoose ODM" },
    { Category: "State & Controls", Stack: "Asynchronous Fetch Architecture & Context Sync" }
  ];

  return (
    <main className="max-w-4xl mx-auto px-4 py-16 min-h-[60vh] space-y-8">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-6 dark:bg-slate-900 dark:border-slate-800 transition-colors">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight dark:text-white">
            Empowering Grassroots Micro Enterprises - ShaktiScribe
          </h1>
        </div>
        
        <p className="text-base md:text-lg text-slate-600 leading-relaxed dark:text-slate-300">
          ShaktiScribe is engineered specifically to eliminate digital marketing friction for localized MSMEs. By transforming production specifications into polished online storefront copy, we allow remote manufacturing operations to preserve standard brand consistency, accelerate product onboarding, and optimize catalog indexing efficiency across modern open marketplaces.
        </p>
        
        <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl text-amber-900 text-sm dark:bg-amber-950/30 dark:text-amber-200 dark:border-amber-600">
          <strong>Strategic Alignment:</strong> Tailored directly for the unique logistical and operational requirements of the HimShakti Food Processing Unit.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm dark:bg-slate-900 dark:border-slate-800 transition-colors space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            ✨ Core Operational Features
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {features.map((f, i) => (
              <div key={i} className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800/80">
                <h3 className="text-sm font-bold text-emerald-500 dark:text-emerald-400">{f.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm dark:bg-slate-900 dark:border-slate-800 transition-colors space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            💻 Production Tech Stack
          </h2>
          <div className="overflow-hidden border border-slate-100 dark:border-slate-800 rounded-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                  <th className="p-3">Layer</th>
                  <th className="p-3">Technologies</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs text-slate-600 dark:text-slate-300">
                {techStack.map((t, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-3 font-semibold text-slate-900 dark:text-slate-200">{t.Category}</td>
                    <td className="p-3 font-mono text-slate-500 dark:text-slate-400">{t.Stack}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-900 rounded-2xl p-6 text-center space-y-4">
        <h3 className="text-lg font-bold text-white">Want to scale this repository framework?</h3>
        <p className="text-xs text-slate-400 max-w-xl mx-auto">
          ShaktiScribe is fully open to architectural extensions, analytics dashboard additions, or local language translation pipelines.
        </p>
        <div className="pt-2">
          <a 
            href="https://github.com/s-ath-vika/ShaktiScribe-Smart-Descriptor-and-Variation-Engine" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs tracking-wide transition-all transform active:scale-95 shadow-md"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.024A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.293 2.747-1.024 2.747-1.024.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            Wanna Contribute on GitHub
          </a>
        </div>
      </div>
    </main>
  );
}