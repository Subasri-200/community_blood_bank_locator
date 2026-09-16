import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Phone, Mail, Calendar, ClipboardList, Search, HeartHandshake, ShieldCheck } from 'lucide-react';

const UserProfile = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>My Profile</h2>

      <div className="card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: '#fee2e2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            fontWeight: 800,
            color: '#dc2626',
            flexShrink: 0,
          }}>
            {user.name ? user.name[0].toUpperCase() : 'U'}
          </div>
          <div>
            <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.5rem' }}>{user.name}</h3>
            <span className={`badge ${user.role === 'admin' ? 'badge-accepted' : 'badge-normal'}`} style={{ fontSize: '0.8rem' }}>
              {user.role === 'admin' ? '🛡 Admin' : '👤 User'}
            </span>
          </div>
        </div>

        <div className="grid grid-2" style={{ gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ backgroundColor: '#f3f4f6', padding: '0.625rem', borderRadius: '8px' }}>
              <Mail size={20} color="#dc2626" />
            </div>
            <div>
              <div style={{ fontSize: '0.78rem', color: '#6b7280', fontWeight: 600, textTransform: 'uppercase' }}>Email Address</div>
              <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{user.email}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ backgroundColor: '#f3f4f6', padding: '0.625rem', borderRadius: '8px' }}>
              <Phone size={20} color="#dc2626" />
            </div>
            <div>
              <div style={{ fontSize: '0.78rem', color: '#6b7280', fontWeight: 600, textTransform: 'uppercase' }}>Phone Number</div>
              <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{user.phone}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ backgroundColor: '#f3f4f6', padding: '0.625rem', borderRadius: '8px' }}>
              <ShieldCheck size={20} color="#dc2626" />
            </div>
            <div>
              <div style={{ fontSize: '0.78rem', color: '#6b7280', fontWeight: 600, textTransform: 'uppercase' }}>Account Role</div>
              <div style={{ fontWeight: 600, fontSize: '0.95rem', textTransform: 'capitalize' }}>{user.role}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ backgroundColor: '#f3f4f6', padding: '0.625rem', borderRadius: '8px' }}>
              <User size={20} color="#dc2626" />
            </div>
            <div>
              <div style={{ fontSize: '0.78rem', color: '#6b7280', fontWeight: 600, textTransform: 'uppercase' }}>Account ID</div>
              <div style={{ fontWeight: 600, fontSize: '0.85rem', fontFamily: 'monospace', color: '#7f1d1d' }}>
                #{user._id ? user._id.slice(-10).toUpperCase() : 'N/A'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <h3 style={{ marginBottom: '1rem' }}>Quick Actions</h3>
      <div className="grid grid-3">
        <Link to="/search" className="card" style={{ textAlign: 'center', padding: '1.5rem', cursor: 'pointer', textDecoration: 'none' }}>
          <Search size={32} color="#dc2626" style={{ marginBottom: '0.5rem' }} />
          <div style={{ fontWeight: 700, color: '#374151', fontSize: '0.9rem' }}>Find Blood Bank</div>
        </Link>

        <Link to="/request" className="card" style={{ textAlign: 'center', padding: '1.5rem', cursor: 'pointer', textDecoration: 'none' }}>
          <HeartHandshake size={32} color="#dc2626" style={{ marginBottom: '0.5rem' }} />
          <div style={{ fontWeight: 700, color: '#374151', fontSize: '0.9rem' }}>Request Blood</div>
        </Link>

        <Link to="/my-requests" className="card" style={{ textAlign: 'center', padding: '1.5rem', cursor: 'pointer', textDecoration: 'none' }}>
          <ClipboardList size={32} color="#dc2626" style={{ marginBottom: '0.5rem' }} />
          <div style={{ fontWeight: 700, color: '#374151', fontSize: '0.9rem' }}>My Requests</div>
        </Link>
      </div>
    </div>
  );
};

export default UserProfile;
