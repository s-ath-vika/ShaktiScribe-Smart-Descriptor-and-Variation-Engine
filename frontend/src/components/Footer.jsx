export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-500 border-t border-slate-900 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-medium">
        <div>
          <p className="text-slate-400 font-bold text-sm tracking-tight mb-1 text-center md:text-left">
            ShaktiScribe
          </p>
          <p className="text-center md:text-left">
            © 2026 TBI Graphic Era University. All rights reserved.
          </p>
        </div>
        <div className="flex space-x-6">
          <span className="hover:text-emerald-400 cursor-help transition-colors">Agri-Allied Pipeline</span>
          <span className="hover:text-emerald-400 cursor-help transition-colors">Food Processing MSME Module</span>
        </div>
      </div>
    </footer>
  );
}