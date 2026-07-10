import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Loader, Toast } from '../components/ui';

function HistoryCard({ log, onDelete, onEdit, onToast }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const textBody = log.generatedText || "No marketing text generated.";
  const summaryLine = textBody.length > 90 ? `${textBody.substring(0, 90)}...` : textBody;
  

  return (
    <div className="p-6 flex flex-col md:flex-row md:items-start justify-between gap-6 group hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
      <div className="space-y-3 max-w-3xl w-full">
        
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors text-base">
            {log.name}
          </h3>
          <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-600 dark:text-slate-300 uppercase">
            {log.tone}
          </span>
          <span className="text-[10px] text-slate-400">
            {log.createdAt ? new Date(log.createdAt).toLocaleDateString() : "Saved Log"}
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/10">
            👤 User: {log.createdByUsername || 'System Core'}
          </span>
        </div>

        <div className="text-xs text-slate-600 dark:text-slate-300 font-mono bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-900 leading-relaxed">
          <p className="inline">
            "{isExpanded ? textBody : summaryLine}"
          </p>
          {textBody.length > 90 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="ml-2 text-[11px] font-bold text-emerald-500 hover:text-emerald-400 font-sans cursor-pointer whitespace-nowrap"
            >
              {isExpanded ? "[Show Less]" : "[Show More]"}
            </button>
          )}
        </div>

        <div className="text-[11px] text-slate-400 space-x-4 flex flex-wrap">
          <span><strong>Ingredients:</strong> {log.ingredients}</span>
          {log.weight && <span>• <strong>Volume:</strong> {log.weight}</span>}
          {log.features && <span>• <strong>Features:</strong> {log.features}</span>}
        </div>
      </div>
      <div className="flex sm:flex-row md:flex-col gap-2 self-center md:self-start min-w-[120px]">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => {
            navigator.clipboard.writeText(textBody);
            onToast("Copied content directly to system clipboard.");
          }}
          className="w-full text-xs justify-center border-slate-200 dark:border-slate-700 py-2"
        >
          📄 Copy text
        </Button>
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={onEdit}
          className="w-full text-xs justify-center border-slate-200 dark:border-slate-700 py-2"
        >
          ✏️ Edit Copy
        </Button>
        <button 
          onClick={onDelete}
          className="w-full inline-flex items-center justify-center font-semibold rounded-xl transition-all font-medium focus:outline-none tracking-wide active:scale-[0.98] px-3 py-1.5 text-xs cursor-pointer border border-red-200/60 dark:border-red-900 text-red-500 hover:bg-red-800 hover:text-white dark:hover:bg-red-950/40 dark:hover:text-red-400"
        >
          🗑️ Wipe Card
        </button>
      </div>
    </div>
  );
}

export default function History({ triggerEditItem }) {
  const [savedLogs, setSavedLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState('');
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const fetchLogs = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_BASE_URL}/api/descriptions`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Database sync failed.');
      const data = await response.json();
      setSavedLogs(data);
    } catch (error) {
      console.error(error);
      setToastMessage("Could not retrieve historical catalogs from secured nodes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchLogs();
    }, 0);
  }, []);

  const handleDeleteLog = async (mongoId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/descriptions/${mongoId}`, { 
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.status === 204) {
        setSavedLogs(prev => prev.filter(log => log._id !== mongoId));
        setToastMessage("Asset record safely wiped from cloud storage ledger.");
      } else {
        throw new Error("Deletion sequence rejected.");
      }
    } catch {
      setToastMessage("Deletion sequence failed. Unauthorized token parameter.");
    }
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-12 min-h-[75vh]">
      <div className="space-y-6">
        
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm dark:bg-slate-900 dark:border-slate-800">
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Saved Brand Asset Catalogs
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Review, expand, copy, or redirect your saved micro-enterprise copywriting assets served live from Express memory nodes.
          </p>
        </div>

        {loading ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-20 text-center shadow-sm">
            <Loader type="spinner" />
            <p className="text-xs text-slate-400 mt-4">Streaming historical parameters ledger packages...</p>
          </div>
        ) : savedLogs.length === 0 ? (
          <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-16 text-center text-slate-400">
            No saved retail marketing metrics strings detected on active models cache.
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl divide-y divide-slate-100 dark:divide-slate-800 shadow-sm overflow-hidden">
            {savedLogs.map((log) => (
              <HistoryCard 
                key={log._id}
                log={log}
                onDelete={() => handleDeleteLog(log._id)}
                onToast={(msg) => setToastMessage(msg)}
                onEdit={() => {
                  triggerEditItem(log);
                  navigate('/dashboard');
                }}
              />
            ))}
          </div>
        )}
      </div>

      {toastMessage && (
        <Toast message={toastMessage} isVisible={!!toastMessage} onDismiss={() => setToastMessage('')} />
      )}
    </main>
  );
}