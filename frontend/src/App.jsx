import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

  return (
    <BrowserRouter>
      <div className={`min-h-screen flex flex-col bg-slate-50 text-slate-900 overflow-x-hidden ${theme === 'dark' ? 'dark bg-slate-950 text-slate-100' : ''}`}>
        <Navbar theme={theme} setTheme={setTheme} />
        
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/dashboard" 
              element={<Dashboard editingItem={editingLogItem} clearEditingItem={() => setEditingLogItem(null)} />} 
            />
            <Route 
              path="/history" 
              element={<History triggerEditItem={(item) => setEditingLogItem(item)} />} 
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            
          </Routes>
        </div>
        
        <Footer />
      </div>
    </BrowserRouter>
  );
}