import { useState, useEffect } from 'react';
import { Button, Input, Modal, Toast, Loader } from '../components/ui';

export default function Dashboard({ editingItem, clearEditingItem }) {
  const [formData, setFormData] = useState({ name: '', ingredients: '', weight: '', features: '' });
  const [errors, setErrors] = useState({});
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasOutput, setHasOutput] = useState(false);
  const [activeTone, setActiveTone] = useState('Premium');
  const [editedText, setEditedText] = useState('');
  
  const [currentDbId, setCurrentDbId] = useState(null);
  const [modalActionType, setModalActionType] = useState('CREATE'); 
  const [isConfirmModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  useEffect(() => {
  if (editingItem) {
    setTimeout(() => {
      setFormData({ 
        name: editingItem.name || '', 
        ingredients: editingItem.ingredients || '', 
        weight: editingItem.weight || '', 
        features: editingItem.features || '' 
      });
      setActiveTone(editingItem.tone || 'Premium');
      setEditedText(editingItem.generatedText || ''); 
      setCurrentDbId(editingItem._id || null); 
      setHasOutput(true);
      setToastMessage("Loaded historical catalog asset template for operational adjustments.");
      clearEditingItem();
    }, 0);
  }
}, [editingItem, clearEditingItem]);
  const handleGenerationTrigger = () => {
    const fieldErrors = {};
    if (!formData.name) fieldErrors.name = "Product identity string cannot be left blank.";
    if (!formData.ingredients) fieldErrors.ingredients = "Manufacturing ingredient specifications are required.";
    
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
    
    setErrors({});
    setIsProcessing(true);
    setHasOutput(false);
    
    setTimeout(() => {
      const templateText = `Experience the rich agricultural legacy of Uttarakhand with HimShakti's artisan-crafted ${formData.name}. Purely prepared using premium, clean mountain-grown ingredients like ${formData.ingredients.split(',')[0]} and tailored strictly for a target ${activeTone.toLowerCase()} consumer environment. Packed clean in customized dimensions (${formData.weight || 'Standard SKU'}), it delivers the ultimate nutrient-dense fuel stack your active lifestyle demands. ${formData.features ? `Explicitly verified as a local collection variant that is completely ${formData.features.toLowerCase()}.` : ''}`;
      
      setEditedText(templateText);
      setIsProcessing(false);
      setHasOutput(true);
    }, 3000);
  };

  const triggerSaveModal = (type) => {
    setModalActionType(type);
    setIsModalOpen(true);
  };

  const handleExecuteDatabaseTransaction = async () => {
    try {
      const isUpdate = modalActionType === 'UPDATE';
      const endpointUrl = isUpdate 
        ? `${API_BASE_URL}/api/descriptions/${currentDbId}`
        : `${API_BASE_URL}/api/descriptions`;
      
      const token = localStorage.getItem('token');

      const response = await fetch(endpointUrl, {
        method: isUpdate ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: formData.name,
          ingredients: formData.ingredients,
          weight: formData.weight,
          features: formData.features,
          tone: activeTone,
          generatedText: editedText
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'API database cluster rejected request.');
      }

      setIsModalOpen(false);
      setToastMessage(isUpdate 
        ? "Historical ledger record overwritten and synchronized successfully!" 
        : "Asset logs committed successfully to the backend database!"
      );
    } catch (error) {
      console.error(error);
      setToastMessage(error.message || "Failed to write parameters over protected networks.");
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-[60vh] space-y-8">
      
      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-6 dark:bg-slate-900 dark:border-slate-800">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase dark:bg-emerald-950/50 dark:text-emerald-400">
            Workspace
          </span>
          <h1 className="text-3xl font-black text-slate-900 mt-3 mb-4 dark:text-white">
            ShaktiScribe Management Console
          </h1>
          <p className="text-slate-600 leading-relaxed dark:text-slate-400 ">
            This secure dashboard workspace acts as the operational center where ground staff can input raw product metrics, manage active prompt templates, and view saved e-commerce assets.
          </p>
        </div>
      </div>

      {isProcessing && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-16 text-center shadow-sm animate-pulse w-full">
          <Loader type="spinner" />
          <p className="text-xs text-slate-400 font-medium mt-4 tracking-wide">Connecting to Gemini API, parsing raw attributes, and generating copy variations...</p>
        </div>
      )}

      {!isProcessing && (
        !hasOutput ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm space-y-6 w-full">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">Raw Parameter Input Matrix</h2>
            </div>
            
            <div className="space-y-5">
              <Input 
                label="Product Name" 
                placeholder="e.g., Himalayan Finger Millet Snacks" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                error={errors.name}
              />

              <Input 
                label="Ingredients" 
                placeholder="e.g., Organic Ragi, Himalayan Rock Salt, Rice Bran Oil" 
                value={formData.ingredients}
                onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                error={errors.ingredients}
              />

              <Input 
                label="Weight / Parameters" 
                placeholder="e.g., 150g or 250ml" 
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              />

              <Input 
                label="Primary Feature List" 
                placeholder="e.g., Rich in Calcium, Gluten-Free" 
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
              />

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Contextual Tone Selector Grid
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['Premium', 'Traditional', 'Health-Focused'].map((tone) => (
                    <Button
                      key={tone}
                      variant={activeTone === tone ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => setActiveTone(tone)}
                    >
                      {tone}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <Button variant="primary" onClick={() => { setCurrentDbId(null); handleGenerationTrigger(); }} className="w-full py-4 text-base font-bold tracking-wide shadow-md">
                  Generate Platform Listing
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm space-y-6 w-full transition-all">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
              <div>
                <span className="text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-md">
                  {activeTone} Content Node Active
                </span>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-1.5">Generated Product Description Asset</h2>
              </div>
              
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => triggerSaveModal('CREATE')}
                >
                  Save New Log
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  disabled={!currentDbId}
                  onClick={() => triggerSaveModal('UPDATE')}
                  className={!currentDbId ? "opacity-40 cursor-not-allowed" : ""}
                >
                  ⚙️ Update Log
                </Button>

                <Button variant="outline" size="sm" onClick={() => {
                  navigator.clipboard.writeText(editedText);
                  setToastMessage("Copywriting text snapped to system clipboard!");
                }}>Copy to Clipboard</Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className="md:col-span-2 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-900 rounded-xl p-5 space-y-3.5 text-xs text-slate-600 dark:text-slate-400">
                <h3 className="font-bold uppercase tracking-wider text-[11px] text-slate-400">Input Specifications Summary</h3>
                {currentDbId && <p className="text-[10px] text-emerald-500 font-mono"><strong>Loaded Document ID:</strong> {currentDbId}</p>}
                <p><strong>Product Profile:</strong> <span className="text-slate-900 dark:text-white font-medium">{formData.name}</span></p>
                <p><strong>Configured Metrics:</strong> {formData.weight || 'Standard SKU Package'}</p>
                <p className="border-t border-slate-200 dark:border-slate-800 pt-3">
                  <strong>Ingredients Content List:</strong><br />
                  <span className="italic mt-1 block">{formData.ingredients}</span>
                </p>
                {formData.features && (
                  <p className="border-t border-slate-200 dark:border-slate-800 pt-3">
                    <strong>Primary Target Features:</strong><br />
                    <span className="inline-block mt-1 bg-slate-200/60 dark:bg-slate-800 px-2 py-0.5 rounded text-[11px] text-slate-700 dark:text-slate-300 font-medium">{formData.features}</span>
                  </p>
                )}
              </div>

              <div className="md:col-span-3 border border-slate-200 dark:border-slate-800 rounded-xl p-6 bg-white dark:bg-slate-900/50 flex flex-col justify-between min-h-[220px]">
                <div className="prose prose-slate dark:prose-invert">
                  <div className="flex items-center justify-between">
                      <span className="text-[10px] text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded animate-pulse select-none">
                        ✍️ Custom Edits Enabled
                      </span>
                  </div>
                  <textarea 
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    className="w-full h-48 p-4 text-sm font-medium text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors resize-none font-mono leading-relaxed"
                  />
                </div>
                
                <div className="text-right border-t border-slate-100 dark:border-slate-800 pt-4 mt-4">
                  <button onClick={handleGenerationTrigger} className="text-xs font-bold text-emerald-500 hover:text-emerald-400 transition-colors cursor-pointer">
                    Re-compile Original Text Block
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-left">
              <button 
                onClick={() => setHasOutput(false)} 
                className="text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
              >
                ← Return to Specifications Form
              </button>
            </div>

          </div>
        )
      )}

      <Modal 
        isOpen={isConfirmModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={modalActionType === 'UPDATE' ? "Confirm Document Asset Overwrite" : "Confirm Brand Asset Storage"}
      >
        <div className="space-y-4">
          <p>
            {modalActionType === 'UPDATE' 
              ? "Are you sure you want to completely overwrite this record's properties inside MongoDB Atlas? This will perform a live database PUT operation."
              : "Are you sure you want to capture this fresh generated e-commerce snippet and append a new record document inside your database?"
            }
          </p>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>Dismiss</Button>
            <Button variant="primary" size="sm" onClick={handleExecuteDatabaseTransaction}>Confirm Action</Button>
          </div>
        </div>
      </Modal>

      {toastMessage && <Toast message={toastMessage} isVisible={!!toastMessage} onDismiss={() => setToastMessage('')} />}
    </main>
  );
}