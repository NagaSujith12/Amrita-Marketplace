import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api';

const ProductDetails = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await API.get(`/products/${id}`);
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div style={loadingStyle}>Searching campus records...</div>;
  if (!product) return <div style={loadingStyle}>Resource not found.</div>;

  return (
    <div style={pageWrapper}>
      <Link to="/" style={backBtn}>← Back to Marketplace</Link>
      
      <div style={cardStyle}>
        {/* --- HEADER SECTION --- */}
        <div style={headerRow}>
          <div style={{ flex: 1 }}>
            <span style={categoryBadge}>{product.category}</span>
            <h1 style={titleStyle}>{product.title}</h1>
            <div style={conditionTag}>Condition: <strong>{product.condition}</strong></div>
          </div>
          <div style={priceTag}>₹{product.price || 'Free'}</div>
        </div>
        
        {/* --- DESCRIPTION --- */}
        <div style={sectionStyle}>
          <h3 style={subHeaderStyle}>Description</h3>
          <p style={descriptionText}>{product.description}</p>
        </div>

        <hr style={divider} />

        {/* --- SELLER SECTION --- */}
        <div style={sellerCard}>
          <div style={sellerHeader}>Seller Contact Information</div>
          
          <div style={sellerProfile}>
            <div style={avatarStyle}>
              {product.studentName ? product.studentName.charAt(0).toUpperCase() : 'S'}
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={sellerName}>{product.studentName || 'Amrita Student'}</div>
              <div style={sellerYear}>{product.studentYear || 'Verified Student'}</div>
            </div>
          </div>
          
          <div style={buttonGroup}>
            {product.contactNumber && (
              <a 
                href={`https://wa.me/${product.contactNumber.replace(/\s/g, '')}?text=Hi, I'm interested in your ${product.title} on Marketplace.`} 
                target="_blank" 
                rel="noreferrer" 
                style={whatsappBtn}
              >
                💬 Chat on WhatsApp
              </a>
            )}

            {product.owner?.email && (
              <a 
                href={`mailto:${product.owner.email}?subject=Marketplace Inquiry: ${product.title}`} 
                style={emailBtn}
              >
                📧 Send Email
              </a>
            )}
          </div>
        </div>

        {/* --- SAFETY BANNER --- */}
        <div style={safetyBanner}>
          <strong>Safety Tip:</strong> Meet in a public campus location (like the Library or Canteen) to exchange items.
        </div>
      </div>
    </div>
  );
};

// --- UPDATED BRANDED STYLES (#92003A) ---

const pageWrapper = { maxWidth: '900px', margin: '40px auto', padding: '0 20px', minHeight: '80vh' };

const backBtn = { color: '#92003A', textDecoration: 'none', fontWeight: '700', fontSize: '0.9rem', display: 'inline-block', marginBottom: '20px' };

const cardStyle = { 
  padding: '40px', 
  borderRadius: '24px', 
  boxShadow: '0 15px 35px rgba(0,0,0,0.07)', 
  backgroundColor: '#fff',
  border: '1px solid #f0f0f0' 
};

const headerRow = { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px', flexWrap: 'wrap' };

const titleStyle = { color: '#333', fontSize: '2.2rem', margin: '10px 0', fontWeight: '800' };

const categoryBadge = { background: 'rgba(146, 0, 58, 0.1)', color: '#92003A', padding: '6px 14px', borderRadius: '30px', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' };

const priceTag = { fontSize: '1.8rem', fontWeight: '800', color: '#2E7D32', background: '#E8F5E9', padding: '12px 24px', borderRadius: '16px' };

const conditionTag = { color: '#666', fontSize: '0.95rem', marginTop: '5px' };

const sectionStyle = { margin: '35px 0' };

const subHeaderStyle = { color: '#92003A', fontSize: '1.1rem', fontWeight: '700', marginBottom: '15px' };

const descriptionText = { fontSize: '1.1rem', color: '#555', lineHeight: '1.6' };

const divider = { border: 'none', borderBottom: '1px solid #eee', margin: '40px 0' };

const sellerCard = { backgroundColor: '#fafafa', padding: '30px', borderRadius: '20px', border: '1px solid #f0f0f0' };

const sellerHeader = { textAlign: 'center', fontSize: '0.85rem', fontWeight: '800', color: '#92003A', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '25px' };

const sellerProfile = { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginBottom: '30px' };

const avatarStyle = { width: '60px', height: '60px', backgroundColor: '#92003A', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', boxShadow: '0 4px 10px rgba(146, 0, 58, 0.3)' };

const sellerName = { fontSize: '1.2rem', fontWeight: '700', color: '#333' };

const sellerYear = { fontSize: '0.9rem', color: '#888' };

const buttonGroup = { display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' };

const whatsappBtn = { padding: '14px 28px', background: '#25D366', color: '#fff', textDecoration: 'none', borderRadius: '12px', fontWeight: '700', fontSize: '0.95rem', transition: '0.3s' };

const emailBtn = { padding: '14px 28px', background: '#333', color: '#fff', textDecoration: 'none', borderRadius: '12px', fontWeight: '700', fontSize: '0.95rem' };

const safetyBanner = { marginTop: '30px', padding: '15px', backgroundColor: '#FFF9C4', borderRadius: '12px', color: '#F57F17', fontSize: '0.85rem', textAlign: 'center', border: '1px solid #FFF176' };

const loadingStyle = { textAlign: 'center', marginTop: '100px', fontSize: '1.2rem', color: '#92003A', fontWeight: '600' };

export default ProductDetails;