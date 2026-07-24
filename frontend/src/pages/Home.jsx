import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import Card from '../components/Card';
import {Toast, Loader } from '../components/ui';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Home({ onSelectProductToEdit }) {
  const token = localStorage.getItem('token');
  const isLoggedIn = Boolean(token);

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const fetchRecentDescriptions = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/descriptions`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          if (isMounted) setProducts(data);
        } else if (response.status !== 401) {
          throw new Error("Unable to load enterprise catalog");
        }
      } catch (err) {
        console.error(err);
        setToastMessage("Failed to connect to ShaktiScribe backend services.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentDescriptions();

    return () => {
      isMounted = false;
    };
  }, [token]);

  const handleCardClick = (product) => {
    const normalizedItem = {
      _id: product._id,
      name: product.name || product.productName || '',
      ingredients: product.ingredients || '',
      weight: product.weight || '',
      features: product.features || '',
      tone: product.tone || 'Premium',
      generatedText: product.generatedText || product.description || ''
    };

    if (onSelectProductToEdit) {
      onSelectProductToEdit(normalizedItem);
    }
    navigate('/dashboard');
  };

  return (
    <div className="space-y-12 pb-12">
      <Hero />
      
      {toastMessage && (
        <Toast 
          message={toastMessage} 
          type="error" 
          onClose={() => setToastMessage('')} 
        />
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-8 dark:bg-slate-900 dark:border-slate-800">
          
          <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white text-center md:text-left">
              {isLoggedIn ? "Recent Enterprise Generations" : "ShaktiScribe AI Catalog Generator"}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center md:text-left">
              {isLoggedIn 
                ? "Your recently computed product descriptions and listing context records." 
                : "AI-powered product description engine designed for HimShakti's Uttarakhand organic product range."}
            </p>
          </div>

          {isLoading ? (
            <div className="py-12 flex justify-center items-center">
              <Loader />
            </div>
          ) : !isLoggedIn ? (
            /* --- GUEST USER SPOTLIGHT STATE --- */
            <div className="bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 md:p-12 text-center space-y-6">
              <div className="inline-flex p-4 bg-emerald-500/10 text-emerald-500 rounded-2xl text-3xl font-bold border border-emerald-500/20">
                🌱
              </div>
              <div className="max-w-xl mx-auto space-y-3">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Empowering Grassroots Agri-Enterprise Listings
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Sign in with your verified team account to generate, customize, and store Amazon-optimized product descriptions using custom marketing tones (Premium, Traditional, Health-Focused).
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4 pt-2">
                <button
                  onClick={() => navigate('/login')}
                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-all cursor-pointer shadow-md"
                >
                  Sign In to Access Dashboard →
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="px-6 py-3 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
                >
                  Create Account
                </button>
              </div>
            </div>
          ) : products.length === 0 ? (
            /* --- LOGGED IN USER EMPTY STATE --- */
            <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 rounded-2xl p-12 text-center space-y-4">
              <div className="inline-flex p-3 bg-emerald-500/10 text-emerald-500 rounded-xl text-2xl font-bold">
                📝
              </div>
              <div className="max-w-md mx-auto space-y-1">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">No Generated Listings Yet</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  You haven't generated any product descriptions yet. Head over to the dashboard workspace to create your first listing.
                </p>
              </div>
              <button
                onClick={() => navigate('/dashboard')}
                className="mt-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-all cursor-pointer shadow-md"
              >
                ➕ Generate First Description
              </button>
            </div>
          ) : (
            /* --- LOGGED IN USER WITH REAL DATA CARDS --- */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {products.slice(0, 2).map(product => (
                <Card 
                  key={product._id}
                  title={product.productName || product.name}
                  description={product.description || product.generatedText}
                  tag={product.tone || "Standard"}
                  actionText="Continue Editing →"
                  onClick={() => handleCardClick(product)}
                />
              ))}
            </div>
          )}

        </div>
      </main>
    </div>
  );
}