import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Toast } from '../components/ui';

function RenderEyeIcon({ isVisible }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-slate-400 hover:text-emerald-400 transition-colors">
      {isVisible ? (
        // Open Eye -> Visible State: Displays standard view path to allow masking actions
        <>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </>
      ) : (
        // 🙈 Slashed Eye -> Hidden Obfuscated State: Displays crossed vector layout prompting reveal actions
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.477 0 0012 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.477 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 11-4.243-4.243m4.242 4.242L9.88 9.88" />
      )}
    </svg>
  );
}

export default function Login({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [errors, setErrors] = useState({});

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signUpData, setSignUpData] = useState({ username: '', fullName: '', email: '', password: '', confirmPassword: '' });
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const incomingToken = queryParams.get('token');
    
    if (incomingToken) {
      const userData = {
        id: queryParams.get('id'),
        username: queryParams.get('username'),
        fullName: queryParams.get('name'),
        email: queryParams.get('email')
      };
      
      setTimeout(() => {
        onLoginSuccess(incomingToken, userData);
        setToastMessage(`OAuth Session Initialized! Welcome, ${userData.fullName}`);
        
        window.history.replaceState({}, document.title, window.location.pathname);
        
        setTimeout(() => navigate('/dashboard'), 1200);
      }, 0);
    }
  }, [navigate, onLoginSuccess]);

  const activeValidationErrors = {};
  if (isSignUp) {
    if (signUpData.password && signUpData.password.length < 8) {
      activeValidationErrors.password = "Password must be at least 8 characters long.";
    }
    if (signUpData.confirmPassword && signUpData.password !== signUpData.confirmPassword) {
      activeValidationErrors.confirmPassword = "Passwords do not match yet.";
    }
  }

  const processAuthentication = async (e) => {
    if (e) e.preventDefault();
    setErrors({});
    setToastMessage('');

    if (!isSignUp) {
      if (!loginData.email || !loginData.password) {
        setErrors({ general: "Identity values must be completed." });
        return;
      }
      try {
        const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(loginData)
        });
        const data = await res.json();
        
        if (!res.ok) throw new Error(data.error || 'Invalid combination. Please check your inputs.');
        
        onLoginSuccess(data.token, data.user);
        setToastMessage(`Welcome back, ${data.user.fullName || 'Operator'}!`);
        setTimeout(() => navigate('/dashboard'), 1200);
      } catch (err) {
        setToastMessage(err.message);
      }
    } else {
      if (signUpData.password.length < 8) {
        setErrors({ general: "Registration stopped. Password must be at least 8 characters long." });
        return;
      }
      if (signUpData.password !== signUpData.confirmPassword) {
        setErrors({ general: "Registration stopped. Passwords do not match." });
        return;
      }
      if (!signUpData.username || !signUpData.fullName || !signUpData.email || !signUpData.password) {
        setErrors({ general: "All fields are required." });
        return;
      }

      try {
        const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: signUpData.username,
            fullName: signUpData.fullName,
            email: signUpData.email,
            password: signUpData.password
          })
        });
        const data = await res.json();
        
        if (!res.ok) throw new Error(data.error || 'Registration rejected by backend validation server.');

        setToastMessage("Account registered successfully! Redirecting you back to Login gate...");
        
        setTimeout(() => {
          setIsSignUp(false);
          setLoginData({ email: signUpData.email, password: '' });
          setSignUpData({ username: '', fullName: '', email: '', password: '', confirmPassword: '' });
          setErrors({});
        }, 1500);
      } catch (err) {
        setToastMessage(err.message);
      }
    }
  };

  const handleOAuthTrigger = (provider) => {
    setToastMessage(`Redirecting securely to external third-party ${provider} verification network gateways...`);
    window.location.href = `${API_BASE_URL}/api/auth/${provider.toLowerCase()}`;
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-16 min-h-[60vh] space-y-8">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm dark:bg-slate-900 dark:border-slate-800 transition-colors flex flex-col md:flex-row gap-12 items-stretch">
        
        <div className="w-full md:w-1/2 text-left flex flex-col justify-center space-y-4 pr-0 md:pr-6 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800 pb-8 md:pb-0">
          <h1 className="text-3xl font-black tracking-tight text-emerald-600 dark:text-emerald-400">⚡ ShaktiScribe</h1>
          <p className="text-base text-slate-600 leading-relaxed dark:text-slate-300 font-medium">
            Automated marketing optimization hub tailored explicitly for regional food processing micro-enterprises to scale their catalog visibility across modern marketplaces.
          </p>
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center text-left">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
            {isSignUp ? 'Establish System Identity Log' : 'Secure Verification Gate'}
          </h2>
          
          <form onSubmit={processAuthentication} className="space-y-4">
            {isSignUp ? (
              <>
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Username Handle</label>
                  <input type="text" placeholder="e.g., himshakti_admin" value={signUpData.username} onChange={(e) => setSignUpData({...signUpData, username: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors" />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Full Identity Name</label>
                  <input type="text" placeholder="e.g., Satvika Intern" value={signUpData.fullName} onChange={(e) => setSignUpData({...signUpData, fullName: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors" />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Corporate Email</label>
                  <input type="email" placeholder="name@himshakti.org" value={signUpData.email} onChange={(e) => setSignUpData({...signUpData, email: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors" />
                </div>
                
                <div className="space-y-1 relative">
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Password Structure</label>
                  <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={signUpData.password} onChange={(e) => setSignUpData({...signUpData, password: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-8 bg-transparent border-none cursor-pointer flex items-center p-0 outline-none">
                    <RenderEyeIcon isVisible={showPassword} />
                  </button>
                  {activeValidationErrors.password && <p className="text-[11px] text-red-500 font-medium mt-1">{activeValidationErrors.password}</p>}
                </div>

                <div className="space-y-1 relative">
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Confirm Security Key</label>
                  <input type={showConfirmPassword ? 'text' : 'password'} placeholder="••••••••" value={signUpData.confirmPassword} onChange={(e) => setSignUpData({...signUpData, confirmPassword: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors" />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-8 bg-transparent border-none cursor-pointer flex items-center p-0 outline-none">
                    <RenderEyeIcon isVisible={showConfirmPassword} />
                  </button>
                  {activeValidationErrors.confirmPassword && <p className="text-[11px] text-red-500 font-medium mt-1">{activeValidationErrors.confirmPassword}</p>}
                </div>
              </>
            ) : (
              <>
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Registered Corporate Email</label>
                  <input type="email" placeholder="Enter registration email" value={loginData.email} onChange={(e) => setLoginData({...loginData, email: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors" />
                </div>

                <div className="space-y-1 relative">
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Security Key Password</label>
                  <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={loginData.password} onChange={(e) => setLoginData({...loginData, password: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-8 bg-transparent border-none cursor-pointer flex items-center p-0 outline-none">
                    <RenderEyeIcon isVisible={showPassword} />
                  </button>
                </div>
              </>
            )}

            {errors.general && <p className="text-xs text-red-500 font-semibold mt-2">{errors.general}</p>}

            <div className="pt-2 space-y-3">
              <Button variant="primary" size="lg" type="submit" className="w-full  py-3 text-sm font-bold tracking-wide">
                {isSignUp ? 'Complete Registration' : 'Initialize Session Entry'}
              </Button>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
                <span className="flex-shrink mx-4 text-[10px] text-slate-500 uppercase font-bold tracking-widest">
                  Or continue with
                </span>
                <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
              </div>

             
              <button 
                type="button" 
                onClick={() => handleOAuthTrigger('Google')} 
                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-bold transition-all cursor-pointer shadow-sm"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <button type="button" onClick={() => { setIsSignUp(!isSignUp); setErrors({}); setToastMessage(''); }} className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 transition-colors cursor-pointer">
              {isSignUp ? 'Already registered? Return to Gate Entry' : 'Need credentials? Establish fresh tracking context'}
            </button>
          </div>
        </div>
      </div>
      
      {toastMessage && (
        <Toast message={toastMessage} isVisible={!!toastMessage} onDismiss={() => setToastMessage('')} />
      )}
    </main>
  );
}