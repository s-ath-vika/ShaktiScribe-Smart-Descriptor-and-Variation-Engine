import { useState,  } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Toast } from '../components/ui';

export default function Login({ onAuthSuccess }) {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [errors, setErrors] = useState({});

  const [loginData, setLoginData] = useState({ identifier: '', password: '' });
  const [signUpData, setSignUpData] = useState({ username: '', fullName: '', email: '', password: '', confirmPassword: '' });

  const processAuthentication = async (e) => {
    e.preventDefault();
    setErrors({});
    setToastMessage('');

    if (!isSignUp) {
      if (!loginData.identifier || !loginData.password) {
        setErrors({ general: "Identity values must be completed." });
        return;
      }
      try {
        const res = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(loginData)
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Authentication checkpoint failed.');
        
        onAuthSuccess(data);
        setToastMessage(`Welcome back, ${data.username}! Routing to secure system cockpit...`);
        setTimeout(() => {
          navigate('/dashboard');
        }, 1200);
      } catch (err) {
        setToastMessage(err.message);
      }
    } else {
      if (!signUpData.username || !signUpData.fullName || !signUpData.email || !signUpData.password || !signUpData.confirmPassword) {
        setErrors({ general: "All fields are required to assemble parameters." });
        return;
      }
      if (signUpData.password !== signUpData.confirmPassword) {
        setErrors({ confirmPassword: "Verification string coordinates do not match operational match guidelines." });
        return;
      }
      try {
        const res = await fetch('http://localhost:5000/api/auth/signup', {
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
        if (!res.ok) throw new Error(data.error || 'Registration aborted.');

        onAuthSuccess(data);
        setToastMessage(`Account Registered Successfully. Welcome, ${data.username}!`);
        setTimeout(() => {
          navigate('/dashboard');
        }, 1200);
      } catch (err) {
        setToastMessage(err.message);
      }
    }
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-16 min-h-[85vh] flex items-center justify-center">
      <div className="w-full bg-slate-950 border border-slate-900 rounded-3xl p-6 md:p-12 shadow-2xl flex flex-col md:flex-row gap-12 items-stretch">
        
        <div className="w-full md:w-1/2 text-left flex flex-col justify-center space-y-4 pr-0 md:pr-6 border-b md:border-b-0 md:border-r border-slate-900 pb-8 md:pb-0">
          <h1 className="text-5xl font-black tracking-tight text-emerald-400">
            ShaktiScribe
          </h1>
          <p className="text-emerald-500/80 leading-relaxed text-sm md:text-base font-medium">
            Automated marketing optimization hub tailored explicitly for regional food processing micro-enterprises to scale their catalog visibility across modern marketplaces.
          </p>
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h2 className="text-xl font-bold text-white mb-6">
            {isSignUp ? 'Establish System Identity Log' : 'Secure Verification Gate'}
          </h2>
          
          <form onSubmit={processAuthentication} className="space-y-4">
            {isSignUp ? (
              <>
                <Input label="Username Handle" placeholder="e.g., himshakti_admin" value={signUpData.username} onChange={(e) => setSignUpData({...signUpData, username: e.target.value})} />
                <Input label="Full Identity Name" placeholder="e.g., Devendra Negi" value={signUpData.fullName} onChange={(e) => setSignUpData({...signUpData, fullName: e.target.value})} />
                <Input label="Corporate Email" type="email" placeholder="name@himshakti.org" value={signUpData.email} onChange={(e) => setSignUpData({...signUpData, email: e.target.value})} />
                
                <div className="relative">
                  <Input label="Password Structure" type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={signUpData.password} onChange={(e) => setSignUpData({...signUpData, password: e.target.value})} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-8 text-xs font-bold text-slate-400 hover:text-emerald-400">
                    {showPassword ? 'HIDE' : 'SHOW'}
                  </button>
                </div>

                <div className="relative">
                  <Input label="Confirm Security Key" type={showConfirmPassword ? 'text' : 'password'} placeholder="••••••••" value={signUpData.confirmPassword} onChange={(e) => setSignUpData({...signUpData, confirmPassword: e.target.value})} error={errors.confirmPassword} />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-8 text-xs font-bold text-slate-400 hover:text-emerald-400">
                    {showConfirmPassword ? 'HIDE' : 'SHOW'}
                  </button>
                </div>
              </>
            ) : (
              <>
                <Input label="Username or Registered Email" placeholder="Enter username or email" value={loginData.identifier} onChange={(e) => setLoginData({...loginData, identifier: e.target.value})} />
                <div className="relative">
                  <Input label="Security Key Password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={loginData.password} onChange={(e) => setLoginData({...loginData, password: e.target.value})} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-8 text-xs font-bold text-slate-400 hover:text-emerald-400">
                    {showPassword ? 'HIDE' : 'SHOW'}
                  </button>
                </div>
              </>
            )}

            {errors.general && <p className="text-xs text-red-500 font-semibold">{errors.general}</p>}

            <div className="pt-2">
              <Button variant="primary" size="lg" onClick={processAuthentication}>
                {isSignUp ? 'Complete Registration' : 'Initialize Session Entry'}
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <button type="button" onClick={() => { setIsSignUp(!isSignUp); setErrors({}); setToastMessage(''); }} className="text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors">
              {isSignUp ? 'Already registered? Return to Gate Entry' : 'Need structural credentials? Establish fresh tracking context'}
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