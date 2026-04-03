import React, { useEffect, useState } from 'react';
import API from '../api';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const [myProducts, setMyProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // In a real MERN app, you'd get the studentName from Auth context or localStorage
  // For now, let's fetch all and filter or assume a 'mock' user ID
  useEffect(() => {
    const fetchMyItems = async () => {
      try {
        const { data } = await API.get('/products');
        // Filter logic: In production, the backend should handle this via /products/me
        setMyProducts(data.slice(0, 3)); 
      } catch (err) {
        console.error("Error fetching your items:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyItems();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to remove this listing?")) {
      try {
        await API.delete(`/products/${id}`);
        setMyProducts(myProducts.filter(item => item._id !== id));
      } catch (err) {
        alert("Action failed. Check backend connection.");
      }
    }
  };

  return (
    <div style={pageWrapper}>
      <div style={profileHeader}>
        <div style={avatarLarge}>Y</div>
        <h1 style={{ margin: '10px 0 5px' }}>Welcome back, Yathin!</h1>
        <p style={{ color: '#666' }}>3rd Year | AI & Data Science</p>
      </div>

      <div style={statsRow}>
        <div style={statCard}><strong>{myProducts.length}</strong> <span>Active Ads</span></div>
        <div style={statCard}><strong>12</strong> <span>Views</span></div>
        <div style={statCard}><strong>₹1,200</strong> <span>Potential Earn</span></div>
      </div>

      <h2 style={sectionTitle}>Your Active Listings</h2>

      {loading ? (
        <p>Loading your dashboard...</p>
      ) : (
        <div style={listContainer}>
          {myProducts.map(item => (
            <div key={item._id} style={itemRow}>
              <div style={itemInfo}>
                <h4 style={{ margin: 0 }}>{item.title}</h4>
                <span style={catLabel}>{item.category} • ₹{item.price}</span>
              </div>
              <div style={actionGroup}>
                <Link to={`/product/${item._id}`} style={viewLink}>View</Link>
                <button onClick={() => handleDelete(item._id)} style={deleteBtn}>Delete</button>
              </div>
            </div>
          ))}
          {myProducts.length === 0 && <p style={emptyText}>You haven't listed anything yet.</p>}
        </div>
      )}

      <Link to="/add-product" style={fabButton}>
  <span>+</span> List New Item
      </Link>
    </div>
  );
};

// --- STYLES (#92003A THEME) ---

const pageWrapper = { maxWidth: '800px', margin: '40px auto', padding: '0 20px', paddingBottom: '100px' };

const profileHeader = { textAlign: 'center', marginBottom: '40px' };

const avatarLarge = { 
  width: '100px', height: '100px', backgroundColor: '#92003A', color: 'white', 
  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', 
  fontSize: '3rem', fontWeight: 'bold', margin: '0 auto', boxShadow: '0 10px 20px rgba(146, 0, 58, 0.2)' 
};

const statsRow = { display: 'flex', gap: '20px', marginBottom: '50px' };

const statCard = { 
  flex: 1, padding: '20px', backgroundColor: 'white', borderRadius: '15px', 
  textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #eee',
  display: 'flex', flexDirection: 'column'
};

const sectionTitle = { fontSize: '1.2rem', color: '#92003A', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' };

const listContainer = { display: 'flex', flexDirection: 'column', gap: '15px' };

const itemRow = { 
  display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
  padding: '20px', backgroundColor: 'white', borderRadius: '15px', border: '1px solid #eee' 
};

const itemInfo = { display: 'flex', flexDirection: 'column', gap: '5px' };

const catLabel = { fontSize: '0.85rem', color: '#888' };

const actionGroup = { display: 'flex', gap: '15px' };

const viewLink = { textDecoration: 'none', color: '#92003A', fontWeight: 'bold', fontSize: '0.9rem' };

const deleteBtn = { 
  background: 'none', border: 'none', color: '#ff4d4d', 
  cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem' 
};

const fabButton = { 
  position: 'fixed', 
  bottom: '30px', 
  right: '30px', 
  backgroundColor: '#92003A', 
  color: 'white', 
  padding: '16px 24px', 
  borderRadius: '50px', 
  textDecoration: 'none', 
  fontWeight: 'bold',
  boxShadow: '0 10px 20px rgba(146, 0, 58, 0.3)',
  zIndex: '9999', // This ensures it stays above everything else
  display: 'flex',
  alignItems: 'center',
  gap: '10px'
};

const emptyText = { textAlign: 'center', color: '#999', marginTop: '40px' };

export default UserProfile;