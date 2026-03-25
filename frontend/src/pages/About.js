import React, { useState } from 'react';

const About = () => {
  const [feedback, setFeedback] = useState("");

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for your feedback! \nThis helps Yathin, Jayanth, and Sujith improve the experience.`);
    setFeedback("");
  };

  return (
    <div style={containerStyle}>
      {/* --- MODERN HERO HEADER --- */}
      <header style={headerStyle}>
        <h1 style={heroTitle}>About Our Marketplace</h1>
        <p style={heroSubtitle}>Sustainable. Peer-to-Peer. Campus-Focused.</p>
      </header>

      {/* --- MISSION SECTION --- */}
      <section style={sectionStyle}>
        <h2 style={subHeaderStyle}>Our Mission</h2>
        <div style={missionCard}>
          <p style={textStyle}>
            Every semester, thousands of textbooks, lab coats, and electronics go to waste. 
            Our platform is designed to keep these resources within the <strong>Amrita community</strong>, 
            making education more affordable and sustainable for everyone.
          </p>
        </div>
      </section>

      {/* --- FOUNDERS SECTION --- */}
      <section style={sectionStyle}>
        <h2 style={subHeaderStyle}>Meet the Founders</h2>
        <p style={{ marginBottom: '40px', color: '#666', fontSize: '1.1rem' }}>
          A team of 3rd Year <strong>AI & Data Science (AIDS)</strong> students committed to 
          solving campus resource challenges through technology.
        </p>
        
        <div style={foundersGrid}>
          <FounderCard 
            emoji="👨‍💻" 
            name="Yathin" 
            role="System Architect & Backend" 
            desc="Designed the MERN API and authentication security logic." 
          />
          <FounderCard 
            emoji="🎨" 
            name="Jayanth" 
            role="Lead Frontend Developer" 
            desc="Crafted the responsive UI and seamless user navigation." 
          />
          <FounderCard 
            emoji="📊" 
            name="Sujith" 
            role="Database & Data Strategy" 
            desc="Optimized MongoDB schemas and search/filter algorithms." 
          />
        </div>
      </section>

      {/* --- FEEDBACK SECTION --- */}
      <section style={feedbackSection}>
        <h2 style={{...subHeaderStyle, color: '#333'}}>We Value Your Feedback</h2>
        <p style={{ color: '#666', marginBottom: '25px' }}>Found a bug or have a feature request? Let us know!</p>
        <form onSubmit={handleFeedbackSubmit} style={feedbackForm}>
          <textarea 
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Type your suggestions here..."
            style={feedbackInput}
            required
          />
          <button type="submit" style={feedbackBtn}>Send Feedback</button>
        </form>
      </section>

      <footer style={footerStyle}>
        <p>© 2026 Campus Marketplace | Built with ❤️ for Amrita Students</p>
      </footer>
    </div>
  );
};

// --- SUB-COMPONENT FOR HOVER EFFECT ---
const FounderCard = ({ emoji, name, role, desc }) => {
  const [hover, setHover] = useState(false);

  const dynamicCardStyle = {
    ...founderCardBase,
    transform: hover ? 'translateY(-10px)' : 'translateY(0)',
    boxShadow: hover ? '0 12px 30px rgba(0,0,0,0.1)' : '0 4px 15px rgba(0,0,0,0.05)',
    borderColor: hover ? '#92003A' : '#eee'
  };

  return (
    <div 
      style={dynamicCardStyle} 
      onMouseEnter={() => setHover(true)} 
      onMouseLeave={() => setHover(false)}
    >
      <div style={avatarCircle}>{emoji}</div>
      <h3 style={nameStyle}>{name}</h3>
      <p style={roleStyle}>{role}</p>
      <p style={branchStyle}>3rd Year, AIDS</p>
      <p style={descStyle}>{desc}</p>
    </div>
  );
};

// --- UPDATED BRANDED STYLES (#92003A) ---

const containerStyle = { maxWidth: '1100px', margin: '0 auto', padding: '0 20px', textAlign: 'center' };

const headerStyle = { 
  background: 'linear-gradient(135deg, #92003A 0%, #5e0025 100%)', 
  color: 'white', 
  padding: '80px 20px', 
  borderRadius: '0 0 50px 50px', 
  marginBottom: '60px',
  boxShadow: '0 10px 30px rgba(146, 0, 58, 0.2)'
};

const heroTitle = { fontSize: '3rem', fontWeight: '800', marginBottom: '15px' };
const heroSubtitle = { fontSize: '1.3rem', opacity: 0.9, fontWeight: '300' };

const sectionStyle = { marginBottom: '80px' };

const subHeaderStyle = { 
  color: '#92003A', 
  fontSize: '2rem', 
  marginBottom: '30px', 
  fontWeight: '800',
  textTransform: 'uppercase', 
  letterSpacing: '1px' 
};

const missionCard = {
  maxWidth: '800px',
  margin: '0 auto',
  padding: '40px',
  backgroundColor: 'white',
  borderRadius: '30px',
  boxShadow: '0 5px 20px rgba(0,0,0,0.03)',
  border: '1px solid #f0f0f0'
};

const textStyle = { fontSize: '1.2rem', color: '#555', lineHeight: '1.8' };

const foundersGrid = { display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' };

const founderCardBase = { 
  padding: '35px 25px', 
  width: '260px', 
  background: '#fff', 
  borderRadius: '25px', 
  border: '2px solid #f9f9f9', 
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'default'
};

const avatarCircle = { 
  width: '70px', 
  height: '70px', 
  backgroundColor: '#f8f9fa', 
  borderRadius: '50%', 
  margin: '0 auto 20px', 
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'center', 
  fontSize: '2.2rem' 
};

const nameStyle = { margin: '0 0 8px', color: '#92003A', fontSize: '1.4rem', fontWeight: '700' };
const roleStyle = { color: '#333', fontWeight: '700', fontSize: '0.9rem', marginBottom: '5px' };
const branchStyle = { color: '#92003A', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '15px', opacity: 0.8 };
const descStyle = { fontSize: '0.9rem', color: '#777', lineHeight: '1.5' };

const feedbackSection = { 
  backgroundColor: '#fff', 
  padding: '60px 20px', 
  borderRadius: '40px', 
  border: '1px solid #eee',
  boxShadow: '0 10px 40px rgba(0,0,0,0.04)'
};

const feedbackForm = { display: 'flex', flexDirection: 'column', alignItems: 'center' };

const feedbackInput = { 
  width: '100%', 
  maxWidth: '600px', 
  height: '120px', 
  padding: '20px', 
  borderRadius: '15px', 
  border: '2px solid #eee', 
  marginBottom: '20px', 
  fontSize: '1rem', 
  fontFamily: 'inherit',
  outline: 'none',
  transition: 'border-color 0.3s'
};

const feedbackBtn = { 
  padding: '15px 40px', 
  background: '#92003A', 
  color: 'white', 
  border: 'none', 
  borderRadius: '12px', 
  cursor: 'pointer', 
  fontWeight: 'bold',
  fontSize: '1rem',
  boxShadow: '0 5px 15px rgba(146, 0, 58, 0.3)'
};

const footerStyle = { marginTop: '80px', padding: '40px', borderTop: '1px solid #eee', color: '#aaa', fontSize: '0.9rem' };

export default About;