/**
 * @param {Object} props
 * @param {string} props.label
 * @param {string} props.placeholder
 * @param {string} [props.type='text']
 * @param {string|number} props.value
 * @param {Function} props.onChange
 * @param {string} [props.error]
 */
export default function Input({ 
  label, 
  placeholder, 
  type = 'text', 
  value, 
  onChange, 
  error 
}) {
  return (
    <div className="w-full flex flex-col space-y-1.5">
      {label && (
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm transition-colors focus:outline-none dark:bg-slate-900 dark:text-white ${
          error 
            ? 'border-red-500 focus:border-red-500' 
            : 'border-slate-200 focus:border-emerald-500 dark:border-slate-800'
        }`}
      />
      {error && <p className="text-xs font-medium text-red-500 mt-0.5">{error}</p>}
    </div>
  );
}