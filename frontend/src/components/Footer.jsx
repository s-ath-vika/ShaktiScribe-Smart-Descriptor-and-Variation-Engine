import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    { name: 'Home Landing', path: '/' },
    { name: 'Operation Dashboard', path: '/dashboard' },
    { name: 'Historical Logs', path: '/history' },
    { name: 'Enterprise About', path: '/about' },
    { name: 'System Gate', path: '/login' },
    { name: 'Contact Us', path: '/contact' }
  ];

  const techStackItems = [
    'React Architecture',
    'Tailwind CSS Engine',
    'MongoDB Atlas Cluster',
    'Gemini AI Core',
    'Vercel Deployment',
    'Render Cloud Instance'
  ];

  return (
    <footer className="w-full bg-slate-900 border-t border-slate-900 text-slate-400 text-xs">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-sm font-black tracking-wider text-white uppercase">
              ShaktiScribe
            </span>
          </div>
          <p className="text-slate-500 leading-relaxed max-w-sm">
            Automated marketing optimization hub tailored explicitly for regional food processing micro-enterprises to scale their catalog visibility across modern marketplaces.
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="text-[11px] font-bold text-slate-300 uppercase tracking-widest border-b border-slate-900 pb-1">
            System Workspace Navigation
          </h4>
          <ul className="space-y-2">
            {navigationLinks.map((link, idx) => (
              <li key={idx}>
                <Link 
                  to={link.path} 
                  className="hover:text-emerald-400 transition-colors inline-block py-0.5"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-[11px] font-bold text-slate-300 uppercase tracking-widest border-b border-slate-900 pb-1">
            Integrated Production Stack
          </h4>
          <div className="grid grid-cols-2 gap-2 text-slate-500 font-mono text-[11px]">
            {techStackItems.map((tech, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <span className="text-emerald-500/70">✔</span>
                <span>{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full border-t border-slate-900/60 py-4 bg-slate-950/40">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-600 text-[11px]">
          <div>
            &copy; {currentYear} HimShakti Food Processing Systems Unit. All rights reserved.
          </div>
          <div className="font-mono text-slate-700">
            Infrastructure v1.0.4 stable
          </div>
        </div>
      </div>
    </footer>
  );
}