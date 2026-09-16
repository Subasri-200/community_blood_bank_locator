import React from 'react';
import { Heart, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#111827', color: '#9ca3af', padding: '3rem 1rem 1.5rem 1rem', marginTop: '3rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }} className="grid grid-3">
        <div>
          <h3 style={{ color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Heart fill="#dc2626" color="#dc2626" size={24} /> Community Blood Bank Locator
          </h3>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
            Connecting donors, hospitals, and patients in real-time. Finding the right blood bank when every second matters.
          </p>
        </div>

        <div>
          <h4 style={{ color: '#ffffff', marginBottom: '1rem' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li><a href="/" style={{ color: '#d1d5db' }}>Home</a></li>
            <li><a href="/search" style={{ color: '#d1d5db' }}>Find Blood Bank</a></li>
            <li><a href="/request" style={{ color: '#d1d5db' }}>Emergency Blood Request</a></li>
            <li><a href="/login" style={{ color: '#d1d5db' }}>Account Login</a></li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: '#ffffff', marginBottom: '1rem' }}>Emergency Contact</h4>
          <div style={{ fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Phone size={18} color="#dc2626" />
              <span>National Helpline: 104 / 108</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Mail size={18} color="#dc2626" />
              <span>support@communitybloodbank.org</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin size={18} color="#dc2626" />
              <span>National Blood Transfusion Service Council</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '2rem auto 0 auto', paddingTop: '1.5rem', borderTop: '1px solid #1f2937', textAlign: 'center', fontSize: '0.85rem' }}>
        © {new Date().getFullYear()} Community Blood Bank Locator. All rights reserved. Built for emergency response & blood inventory management.
      </div>
    </footer>
  );
};

export default Footer;
