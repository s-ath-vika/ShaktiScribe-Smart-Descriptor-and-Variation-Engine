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

// 🛡️ SECURITY BASIC ROUTE GUARD COMPONENT
function ProtectedRoute({ children }) {
  const sessionToken = localStorage.getItem('token');
  if (!sessionToken) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function App() {
  const [theme, setTheme] = useState('light');
  const [editingLogItem, setEditingLogItem] = useState(null);

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem('token');
    return !!token;
  });

  const handleLoginSuccess = (token, userData) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <div className={`min-h-screen flex flex-col bg-slate-50 text-slate-900 overflow-x-hidden ${theme === 'dark' ? 'dark bg-slate-950 text-slate-100' : ''}`}>
        <Navbar theme={theme} setTheme={setTheme} authState={isAuthenticated} onLogout={handleLogout} />
        
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} authState={isAuthenticated} />} />
            
            
            {/* 🔒 PROTECTED FRONTEND PAGES MANAGED BY PROTECTED ROUTE GUARDS */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard editingItem={editingLogItem} clearEditingItem={() => setEditingLogItem(null)} />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/history" 
              element={
                <ProtectedRoute>
                  <History triggerEditItem={(item) => setEditingLogItem(item)} />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
        
        <Footer />
      </div>
    </BrowserRouter>
  );
}