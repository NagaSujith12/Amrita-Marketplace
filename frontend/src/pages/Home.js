import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  // Filter Categories
  const categories = ["All", "Books", "Electronics", "Lab Gear", "Clothes", "Stationery", "Misc"];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // If category is "All", we send an empty string to the API
        const queryCat = category === "All" ? "" : category;
        const { data } = await API.get(`/products?keyword=${keyword}&category=${queryCat}`);
        setProducts(data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setTimeout(() => setLoading(false), 400); // Small delay for smooth transition
      }
    };
    fetchProducts();
  }, [keyword, category]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      
      {/* --- HERO SECTION --- */}
      <div style={heroSection}>
        <h1 style={heroTitle}>Campus Resources</h1>
        <div style={searchWrapper}>
          <span style={{ fontSize: '1.2rem' }}></span>
          <input 
            type="text" 
            placeholder="Search for items..." 
            onChange={(e) => setKeyword(e.target.value)}
            style={searchInputStyle}
          />
        </div>
      </div>

      {/* --- DYNAMIC FILTER PILLS --- */}
      <div style={pillContainer}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            style={{
              ...pillStyle,
              backgroundColor: (category === cat || (cat === "All" && category === "")) ? '#92003A' : 'white',
              color: (category === cat || (cat === "All" && category === "")) ? 'white' : '#666',
              border: (category === cat || (cat === "All" && category === "")) ? '1px solid #92003A' : '1px solid #ddd',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* --- PRODUCT GRID --- */}
      <div style={contentWrapper}>
        <div style={gridStyle}>
          {loading ? (
            // Show 4 Skeleton Cards while loading
            [1, 2, 3, 4].map((n) => <div key={n} style={skeletonCard}></div>)
          ) : products.length > 0 ? (
            products.map((product) => (
              <Link to={`/product/${product._id}`} key={product._id} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={cardStyle}>
                  <div style={priceBadge}>₹{product.price || 'Free'}</div>
                  <h3 style={cardTitle}>{product.title}</h3>
                  <p style={descStyle}>{product.description.substring(0, 60)}...</p>
                  <div style={cardFooter}>
                    <span style={catTag}>{product.category}</span>
                    <span style={yearTag}>{product.studentYear}</span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px' }}>
              <p>No resources found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- NEW STYLES FOR STEP 2 ---

const heroSection = {
  background: '#92003A',
  padding: '40px 20px 60px 20px',
  textAlign: 'center',
  borderRadius: '0 0 30px 30px'
};

const heroTitle = { color: 'white', marginBottom: '20px', fontSize: '1.8rem' };

const searchWrapper = {
  backgroundColor: 'white',
  maxWidth: '500px',
  margin: '0 auto',
  padding: '10px 20px',
  borderRadius: '30px',
  display: 'flex',
  alignItems: 'center',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
};

const searchInputStyle = { width: '100%', border: 'none', outline: 'none', marginLeft: '10px' };

const pillContainer = {
  display: 'flex',
  justifyContent: 'center',
  gap: '10px',
  padding: '20px 5%',
  overflowX: 'auto', // For mobile scrolling
  whiteSpace: 'nowrap'
};

const pillStyle = {
  padding: '8px 18px',
  borderRadius: '20px',
  cursor: 'pointer',
  fontSize: '0.9rem',
  fontWeight: '600',
  transition: '0.3s ease',
  boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
};

const contentWrapper = { padding: '20px 5%' };

const gridStyle = { 
  display: 'grid', 
  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', 
  gap: '20px' 
};

const cardStyle = {
  background: 'white',
  padding: '20px',
  borderRadius: '15px',
  boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
  border: '1px solid #eee',
  height: '100%',
  position: 'relative'
};

const priceBadge = {
  position: 'absolute',
  top: '15px',
  right: '15px',
  background: '#E8F5E9',
  color: '#2E7D32',
  padding: '4px 10px',
  borderRadius: '8px',
  fontSize: '0.85rem',
  fontWeight: 'bold'
};

const cardTitle = { fontSize: '1.2rem', marginBottom: '10px', color: '#333' };
const descStyle = { fontSize: '0.9rem', color: '#666', lineHeight: '1.4' };

const cardFooter = { 
  display: 'flex', 
  gap: '10px', 
  marginTop: '15px', 
  paddingTop: '15px', 
  borderTop: '1px solid #f9f9f9' 
};

const catTag = { fontSize: '0.75rem', background: '#f0f0f0', padding: '3px 8px', borderRadius: '4px' };
const yearTag = { fontSize: '0.75rem', color: '#92003A', fontWeight: 'bold' };

const skeletonCard = {
  height: '180px',
  background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
  backgroundSize: '200% 100%',
  animation: 'shimmer 1.5s infinite',
  borderRadius: '15px'
};

export default Home;