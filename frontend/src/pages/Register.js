import React, { useState } from 'react';
import API from '../api';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', rollNo: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', formData);
      alert('Registration Successful! Now you can Login.');
      navigate('/login'); 
    } catch (err) {
      setError(err.response?.data?.message || 'Registration Failed');
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ color: '#92003A', marginBottom: '10px' }}>Join Amrita Marketplace</h2>
        <p style={{ color: '#666', marginBottom: '30px', fontSize: '0.9rem' }}>
          Create an account to start buying and selling on campus.
        </p>

        {error && <p style={errorStyle}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input 
            type="text" placeholder="Full Name" 
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            style={inputStyle} required 
          />
          <input 
            type="text" placeholder="Roll Number (e.g., BL.EN.U4AIDS...)" 
            onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
            style={inputStyle} required 
          />
          <input 
            type="email" placeholder="Amrita Email Address" 
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            style={inputStyle} required 
          />
          <input 
            type="password" placeholder="Create Password" 
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            style={inputStyle} required 
          />
          <button type="submit" style={buttonStyle}>Register Now</button>
        </form>

        <p style={{ marginTop: '25px', fontSize: '0.9rem', color: '#555' }}>
          Already have an account? <Link to="/login" style={{ color: '#92003A', fontWeight: 'bold', textDecoration: 'none' }}>Login here</Link>
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
  maxWidth: '450px', 
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
  boxSizing: 'border-box' // Fixes width padding issues
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

export default Register;