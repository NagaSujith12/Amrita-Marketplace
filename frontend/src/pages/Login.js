import React, { useState } from 'react';
import API from '../api';
import { useNavigate, Link } from 'react-router-dom';

// 1. Destructure onLoginSuccess from props
const Login = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/login', formData);
      
      // Store token and user info for session persistence
      localStorage.setItem('token', data.token);
      localStorage.setItem('userInfo', JSON.stringify(data.user));
      
      // 2. CRITICAL FIX: Tell App.js that login was successful 
      // This will instantly hide "Join Now" and show "Logout"
      if (onLoginSuccess) {
        onLoginSuccess();
      }
      
      alert(`Welcome back, ${data.user.name || 'Student'}!`);
      navigate('/profile'); 
    } catch (err) {
      setError(err.response?.data?.message || 'Login Failed. Please check your credentials.');
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ color: '#92003A', marginBottom: '10px' }}>Student Login</h2>
        <p style={{ color: '#666', marginBottom: '30px', fontSize: '0.9rem' }}>
          Access the Amrita Campus Marketplace
        </p>

        {error && <p style={errorStyle}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Amrita Email" 
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            style={inputStyle}
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            style={inputStyle}
            required 
          />
          <button type="submit" style={buttonStyle}>Login</button>
        </form>

        <p style={{ marginTop: '25px', fontSize: '0.9rem', color: '#555' }}>
          New to the portal? <Link to="/register" style={{ color: '#92003A', fontWeight: 'bold', textDecoration: 'none' }}>Create an account</Link>
        </p>
      </div>
    </div>
  );
};

// --- STYLES ---

const containerStyle = { 
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center', 
  minHeight: '85vh', 
  backgroundColor: '#f8f9fa',
  padding: '20px'
};

const cardStyle = { 
  maxWidth: '400px', 
  width: '100%',
  padding: '40px', 
  textAlign: 'center', 
  backgroundColor: '#fff', 
  borderRadius: '20px', 
  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
  border: '1px solid #eee'
};

const inputStyle = { 
  display: 'block', 
  width: '100%', 
  padding: '12px 15px', 
  marginBottom: '15px', 
  borderRadius: '8px', 
  border: '1px solid #ddd',
  fontSize: '1rem',
  outline: 'none',
  boxSizing: 'border-box'
};

const buttonStyle = { 
  width: '100%', 
  padding: '14px', 
  background: '#92003A', 
  color: '#fff', 
  border: 'none', 
  borderRadius: '8px', 
  cursor: 'pointer', 
  fontWeight: 'bold',
  fontSize: '1rem',
  boxShadow: '0 4px 12px rgba(146, 0, 58, 0.2)',
  transition: 'background 0.3s'
};

const errorStyle = { 
  color: '#d32f2f', 
  backgroundColor: '#ffebee', 
  padding: '10px', 
  borderRadius: '5px', 
  marginBottom: '20px',
  fontSize: '0.9rem'
};

export default Login;