import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, HeartHandshake, ShieldCheck, MapPin, Clock, ArrowRight, Droplet, AlertTriangle } from 'lucide-react';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const Home = () => {
  const [city, setCity] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (city) params.append('city', city);
    if (bloodGroup) params.append('bloodGroup', bloodGroup);
    navigate(`/search?${params.toString()}`);
  };

  return (
    <div>
      {/* Hero Banner Section */}
      <section style={{
        backgroundColor: '#fff',
        borderRadius: '16px',
        padding: '3rem 2rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        border: '1px solid #fee2e2',
        marginBottom: '3rem',
        textAlign: 'center',
        background: 'linear-gradient(180deg, #ffffff 0%, #fff5f5 100%)',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <span style={{
            display: 'inline-block',
            backgroundColor: '#fee2e2',
            color: '#b91c1c',
            fontSize: '0.85rem',
            fontWeight: 700,
            padding: '0.35rem 0.85rem',
            borderRadius: '9999px',
            marginBottom: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Emergency Healthcare Network
          </span>
          <h1 style={{ fontSize: '2.5rem', color: '#7f1d1d', marginBottom: '0.75rem', fontWeight: 800 }}>
            COMMUNITY BLOOD BANK LOCATOR
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#4b5563', marginBottom: '2rem', fontWeight: 500 }}>
            "Find the right blood bank when every second matters."
          </p>

          {/* Quick Search Form */}
          <form onSubmit={handleSearch} style={{
            backgroundColor: '#ffffff',
            padding: '1.25rem',
            borderRadius: '12px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            alignItems: 'end'
          }}>
            <div style={{ textAlign: 'left' }}>
              <label className="form-label">City / Location</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Chennai, Mumbai, Delhi"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>

            <div style={{ textAlign: 'left' }}>
              <label className="form-label">Blood Group</label>
              <select
                className="form-control"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
              >
                <option value="">All Blood Groups</option>
                {BLOOD_GROUPS.map((bg) => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>

            <div>
              <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                <Search size={20} /> Search Blood Banks
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Emergency Request Highlight */}
      <section style={{
        backgroundColor: '#ef4444',
        color: '#ffffff',
        borderRadius: '12px',
        padding: '1.75rem 2rem',
        marginBottom: '3rem',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '0.875rem', borderRadius: '50%' }}>
            <AlertTriangle size={32} color="#ffffff" />
          </div>
          <div>
            <h3 style={{ color: '#ffffff', margin: 0, fontSize: '1.35rem' }}>Need Emergency Blood Urgent?</h3>
            <p style={{ margin: '0.25rem 0 0 0', opacity: 0.9, fontSize: '0.95rem' }}>
              Submit a direct blood request to reach registered blood banks and donors immediately.
            </p>
          </div>
        </div>
        <Link to="/request" className="btn" style={{ backgroundColor: '#ffffff', color: '#dc2626', fontWeight: 700 }}>
          Submit Blood Request <ArrowRight size={18} />
        </Link>
      </section>

      {/* How It Works Section */}
      <section style={{ marginBottom: '3.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2>How It Works</h2>
          <p style={{ color: '#6b7280' }}>Streamlined steps to access life-saving blood supplies quickly</p>
        </div>

        <div className="grid grid-3">
          <div className="card" style={{ textAlign: 'center', padding: '2rem 1.5rem' }}>
            <div style={{ backgroundColor: '#fee2e2', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
              <MapPin size={28} color="#dc2626" />
            </div>
            <h3>1. Search Location</h3>
            <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
              Select your current city or area and filter by required blood group to find nearby facilities.
            </p>
          </div>

          <div className="card" style={{ textAlign: 'center', padding: '2rem 1.5rem' }}>
            <div style={{ backgroundColor: '#fee2e2', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
              <Droplet size={28} color="#dc2626" />
            </div>
            <h3>2. Check Availability</h3>
            <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
              View real-time stock units and inventory statuses (Available, Low Stock, Out of Stock) for all blood types.
            </p>
          </div>

          <div className="card" style={{ textAlign: 'center', padding: '2rem 1.5rem' }}>
            <div style={{ backgroundColor: '#fee2e2', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
              <HeartHandshake size={28} color="#dc2626" />
            </div>
            <h3>3. Connect & Request</h3>
            <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
              Directly call blood banks, get turn-by-turn map directions, or lodge an emergency hospital blood request.
            </p>
          </div>
        </div>
      </section>

      {/* Available Blood Groups */}
      <section style={{ marginBottom: '3.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2>Available Blood Groups</h2>
          <p style={{ color: '#6b7280' }}>We track inventory for all 8 major human blood types</p>
        </div>

        <div className="grid grid-4">
          {BLOOD_GROUPS.map((bg) => (
            <div key={bg} className="card" style={{ textAlign: 'center', borderTop: '4px solid #dc2626' }}>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#991b1b', marginBottom: '0.25rem' }}>
                {bg}
              </div>
              <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                {bg.includes('+') ? 'Rh Positive' : 'Rh Negative'}
              </span>
              <div style={{ marginTop: '0.75rem' }}>
                <Link to={`/search?bloodGroup=${encodeURIComponent(bg)}`} className="btn btn-outline btn-sm" style={{ width: '100%' }}>
                  Find {bg} Stock
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Use Our Platform */}
      <section style={{ marginBottom: '3rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2>Why Use Our Platform</h2>
          <p style={{ color: '#6b7280' }}>Empowering patients and emergency responders with verified data</p>
        </div>

        <div className="grid grid-2">
          <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ backgroundColor: '#fee2e2', padding: '0.75rem', borderRadius: '10px' }}>
              <Clock size={24} color="#dc2626" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', margin: '0 0 0.25rem 0' }}>Real-Time Inventory Updates</h3>
              <p style={{ color: '#6b7280', fontSize: '0.9rem', margin: 0 }}>
                Blood bank managers update available units live, eliminating wasted time driving to out-of-stock centers.
              </p>
            </div>
          </div>

          <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ backgroundColor: '#fee2e2', padding: '0.75rem', borderRadius: '10px' }}>
              <ShieldCheck size={24} color="#dc2626" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', margin: '0 0 0.25rem 0' }}>Verified Blood Banks</h3>
              <p style={{ color: '#6b7280', fontSize: '0.9rem', margin: 0 }}>
                All listed facilities undergo administrative verification to ensure reliable contact information and location accuracy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Button */}
      <section style={{ textAlign: 'center', padding: '2rem', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
        <h2 style={{ marginBottom: '0.5rem' }}>Ready to locate blood supplies?</h2>
        <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>Search blood banks near you or register as a user to track emergency requests.</p>
        <Link to="/search" className="btn btn-primary btn-lg">
          Find Blood Bank Now <ArrowRight size={20} />
        </Link>
      </section>
    </div>
  );
};

export default Home;
