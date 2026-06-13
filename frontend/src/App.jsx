import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Login from './pages/Login';

export default function App() {
  return (
    <BrowserRouter>
      {/* Structural layout flex wrapper to hold footer locked at the bottom edge */}
      <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 selection:bg-emerald-400 selection:text-slate-950">
        <Navbar />
        
        {/* Dynamic page container view area injecting specific components safely */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}