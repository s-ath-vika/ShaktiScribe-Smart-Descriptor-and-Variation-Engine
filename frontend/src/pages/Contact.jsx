import { useState } from 'react';
import { Input, Button } from '../components/ui';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState('success');

  const handleInputChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    const fieldErrors = {};
    if (!formData.name.trim()) fieldErrors.name = "Your identification string cannot be left blank.";
    if (!formData.email.trim()) fieldErrors.email = "An operational electronic mail configuration is required.";
    if (!formData.message.trim()) fieldErrors.message = "Message parameters must be specified.";

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setStatusMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Inquiry synchronization pipeline rejected the operation.');

      setStatusType('success');
      setStatusMessage('Communication pipeline acknowledged successfully! Your entry is logged.');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setStatusType('error');
      setStatusMessage('Transmission sequence dropped. Check parameters or target cluster state.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-16 min-h-[75vh] flex flex-col md:flex-row gap-12 items-stretch">
      <div className="w-full md:w-1/2 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm dark:bg-slate-900 dark:border-slate-800 transition-colors flex flex-col justify-between space-y-6 text-left">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight dark:text-white leading-none">
            Shakti<span className="text-emerald-400">Scribe</span>
          </h1>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            ShaktiScribe actively bridges the digital divide for localized MSMEs by scaling technical logistics into high-converting marketplace visibility parameters. 
          </p>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            If you have structural configuration queries, optimization remarks, or operational deployment thoughts, let us know through this ledger tracking interface.
          </p>
        </div>
        <div className="p-4 bg-amber-50/80 dark:bg-amber-950/20 border-l-4 border-amber-500 dark:border-amber-600 rounded-r-xl text-amber-900 dark:text-amber-200 text-xs mt-auto">
          <strong>Transmission Log Notice:</strong> Manual inspection protocols apply to incoming logs. A response might take a few operational days to finalize.
        </div>
      </div>

      <div className="w-full md:w-1/2 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm dark:bg-slate-900 dark:border-slate-800 transition-colors">
        <form onSubmit={handleMessageSubmit} className="space-y-4">
          <Input 
            label="Corporate / Personal Identity" 
            placeholder="Your name" 
            value={formData.name} 
            onChange={(e) => handleInputChange('name', e.target.value)}
            error={errors.name}
          />
          <Input 
            label="Electronic Mail Configuration" 
            placeholder="yourname@domain.com" 
            type="email"
            value={formData.email} 
            onChange={(e) => handleInputChange('email', e.target.value)}
            error={errors.email}
          />
          <div className="space-y-1 text-left">
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Message Payload Content
            </label>
            <textarea 
              placeholder="Detail your inquiry data parameters..."
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              className={`w-full min-h-[120px] px-4 py-3 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm rounded-xl border outline-none transition-all font-medium focus:ring-1 focus:ring-emerald-500 ${
                errors.message ? 'border-red-500 focus:border-red-500' : 'border-slate-200 dark:border-slate-800 focus:border-emerald-500'
              }`}
            />
            {errors.message && <p className="text-xs font-semibold text-red-500 mt-0.5">{errors.message}</p>}
          </div>

          <div className="pt-2">
            <Button 
              variant="primary" 
              size="lg" 
              disabled={isSubmitting}
              onClick={handleMessageSubmit}
            >
              {isSubmitting ? 'Transmitting Inquiries...' : 'Dispatch Message Ledger'}
            </Button>
          </div>

          {statusMessage && (
            <div className={`p-4 rounded-xl text-center font-semibold text-xs transition-all ${
              statusType === 'success' 
                ? 'bg-emerald-50 text-emerald-900 dark:bg-emerald-950/20 dark:text-emerald-300' 
                : 'bg-red-50 text-red-900 dark:bg-red-950/20 dark:text-red-300'
            }`}>
              {statusMessage}
            </div>
          )}
        </form>
      </div>
    </main>
  );
}