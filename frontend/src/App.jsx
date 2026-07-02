import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import About from './pages/About';
import Login from './pages/Login';
import Contact from './pages/Contact';

export default function App() {
  const [theme, setTheme] = useState('light');
  const [editingLogItem, setEditingLogItem] = useState(null);
  
  const [currentUser, setCurrentUser] = useState(() => {
    const cachedSession = localStorage.getItem('shakti_session');
    return cachedSession ? JSON.parse(cachedSession) : null;
  });

  const handleLoginSession = (userData) => {
    localStorage.setItem('shakti_session', JSON.stringify(userData));
    setCurrentUser(userData);
  };

  const handleLogoutSession = () => {
    localStorage.removeItem('shakti_session');
    setCurrentUser(null);
  };

  return (
    <BrowserRouter>
      <div className={`min-h-screen flex flex-col bg-slate-50 text-slate-900 overflow-x-hidden ${theme === 'dark' ? 'dark bg-slate-950 text-slate-100' : ''}`}>
        <Navbar theme={theme} setTheme={setTheme} user={currentUser} onLogout={handleLogoutSession} />
        
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home user={currentUser} onLogout={handleLogoutSession} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route 
              path="/login" 
              element={currentUser ? <Navigate to="/dashboard" /> : <Login onAuthSuccess={handleLoginSession} />} 
            />
            <Route 
              path="/dashboard" 
              element={currentUser ? <Dashboard user={currentUser} editingItem={editingLogItem} clearEditingItem={() => setEditingLogItem(null)} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/history" 
              element={currentUser ? <History user={currentUser} triggerEditItem={(item) => setEditingLogItem(item)} /> : <Navigate to="/login" />} 
            />
          </Routes>
        </div>
        
        <Footer />
      </div>
    </BrowserRouter>
  );
}