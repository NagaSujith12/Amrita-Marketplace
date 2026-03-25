import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

// Page Imports
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddProduct from './pages/AddProduct';
import ProductDetails from './pages/ProductDetails';
import About from './pages/About'; 
import UserProfile from './pages/UserProfile';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to sync auth state across components
  const checkAuth = () => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    setIsLoggedIn(false);
    // Use Navigate or window.location to reset
    window.location.href = '/login'; 
  };

  const ProtectedRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      <nav style={navStyle}>
        <div style={logoSectionStyle}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <div style={logoWrapper}>
              <img 
                src="https://up.yimg.com/ib/th/id/OIP._qLsDhN366EjizWtaGmEbAHaB7?pid=Api&rs=1&c=1&qlt=95&w=296&h=76" 
                alt="Amrita Logo" 
                style={logoImageStyle} 
              />
            </div>
            <div style={divider}></div>
            <span style={portalSubtitle}>Marketplace</span>
          </Link>
        </div>

        <div style={linkGroupStyle}>
          <Link to="/" style={linkStyle}>Browse</Link>
          <Link to="/about" style={linkStyle}>About</Link>
          
          {isLoggedIn ? (
            <>
              <Link to="/add-product" style={linkStyle}>Sell Item</Link>
              <Link to="/profile" style={linkStyle}>My Dashboard</Link>
              <button onClick={handleLogout} style={logoutBtnStyle}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={linkStyle}>Login</Link>
              <Link to="/register" style={registerBtnStyle}>Join Now</Link>
            </>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        
        {/* Pass checkAuth to Login so it can trigger a Navbar refresh */}
        <Route path="/login" element={<Login onLoginSuccess={checkAuth} />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/product/:id" element={<ProductDetails />} />
        
        <Route 
          path="/add-product" 
          element={<ProtectedRoute><AddProduct /></ProtectedRoute>} 
        />
        <Route 
          path="/profile" 
          element={<ProtectedRoute><UserProfile /></ProtectedRoute>} 
        />
      </Routes>
    </Router>
  );
}

// --- STYLES (Keep your existing styles below) ---
const navStyle = { padding: '10px 4%', background: '#92003A', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 1000, boxShadow: '0 4px 15px rgba(0,0,0,0.2)' };
const logoSectionStyle = { display: 'flex', alignItems: 'center' };
const logoWrapper = { backgroundColor: 'white', padding: '6px 12px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const logoImageStyle = { height: '35px', width: 'auto', display: 'block' };
const divider = { width: '1px', height: '25px', backgroundColor: 'rgba(255, 255, 255, 0.3)', margin: '0 15px' };
const portalSubtitle = { color: 'white', fontWeight: '600', fontSize: '1.1rem', letterSpacing: '1px', textTransform: 'uppercase' };
const linkGroupStyle = { display: 'flex', gap: '20px', alignItems: 'center' };
const linkStyle = { color: 'rgba(255, 255, 255, 0.9)', textDecoration: 'none', fontWeight: '500', fontSize: '0.95rem', transition: '0.3s ease' };
const registerBtnStyle = { ...linkStyle, background: 'white', color: '#92003A', padding: '8px 20px', borderRadius: '4px', fontWeight: '700', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' };
const logoutBtnStyle = { background: 'transparent', border: '1px solid white', color: 'white', padding: '6px 15px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '500' };

export default App;