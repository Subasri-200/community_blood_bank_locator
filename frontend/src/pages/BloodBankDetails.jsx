import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getBloodBankByIdApi } from '../services/api';
import MapView from '../components/MapView';
import AvailabilityBadge from '../components/AvailabilityBadge';
import { MapPin, Phone, Mail, Clock, Navigation, AlertCircle, ArrowLeft, Send } from 'lucide-react';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const BloodBankDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bloodBank, setBloodBank] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getBloodBankByIdApi(id);
        setBloodBank(data);
      } catch (err) {
        setError(err.message || 'Failed to load blood bank details');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0', color: '#6b7280' }}>
        <p style={{ fontSize: '1.1rem' }}>Loading blood bank details...</p>
      </div>
    );
  }

  if (error || !bloodBank) {
    return (
      <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
        <div className="alert alert-error" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertCircle size={20} />
          <span>{error || 'Blood bank record not found.'}</span>
        </div>
        <button className="btn btn-secondary" onClick={() => navigate('/search')}>
          <ArrowLeft size={16} /> Back to Blood Bank List
        </button>
      </div>
    );
  }

  const {
    name,
    address,
    city,
    state,
    pincode,
    phone,
    email,
    openingTime,
    closingTime,
    latitude,
    longitude,
    bloodAvailability,
  } = bloodBank;

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

  return (
    <div>
      <button className="btn btn-secondary btn-sm" onClick={() => navigate(-1)} style={{ marginBottom: '1.5rem' }}>
        <ArrowLeft size={16} /> Back
      </button>

      {/* Main Header Info Card */}
      <div className="card" style={{ marginBottom: '2rem', padding: '2rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1.5rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0' }}>{name}</h1>
            <p style={{ color: '#4b5563', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
              <MapPin size={20} color="#dc2626" />
              {address}, {city}, {state} - {pincode}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a href={`tel:${phone}`} className="btn btn-primary">
              <Phone size={18} /> Call Blood Bank
            </a>
            <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              <Navigation size={18} /> Get Directions
            </a>
            <Link to="/request" state={{ hospitalName: name, city }} className="btn btn-outline">
              <Send size={18} /> Request Blood
            </Link>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '1.5rem 0' }} />

        <div className="grid grid-3">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ backgroundColor: '#fee2e2', padding: '0.625rem', borderRadius: '8px' }}>
              <Phone size={20} color="#dc2626" />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#6b7280', fontWeight: 600 }}>PHONE NUMBER</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>{phone}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ backgroundColor: '#fee2e2', padding: '0.625rem', borderRadius: '8px' }}>
              <Mail size={20} color="#dc2626" />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#6b7280', fontWeight: 600 }}>EMAIL ADDRESS</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>{email}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ backgroundColor: '#fee2e2', padding: '0.625rem', borderRadius: '8px' }}>
              <Clock size={20} color="#dc2626" />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#6b7280', fontWeight: 600 }}>OPERATING HOURS</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>{openingTime} - {closingTime}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-2" style={{ alignItems: 'start' }}>
        {/* Blood Inventory Table */}
        <div className="card">
          <h3 style={{ marginBottom: '1rem', color: '#991b1b' }}>Current Blood Group Inventory</h3>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Blood Group</th>
                  <th>Available Units</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {BLOOD_GROUPS.map((bg) => {
                  const info = bloodAvailability && bloodAvailability[bg] ? bloodAvailability[bg] : { availableUnits: 0, availabilityStatus: 'Not Available' };
                  return (
                    <tr key={bg}>
                      <td>
                        <strong style={{ fontSize: '1rem', color: '#7f1d1d' }}>{bg}</strong>
                      </td>
                      <td>
                        <span style={{ fontWeight: 600 }}>{info.availableUnits} Units</span>
                      </td>
                      <td>
                        <AvailabilityBadge status={info.availabilityStatus} units={info.availableUnits} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Map Location Card */}
        <div className="card">
          <h3 style={{ marginBottom: '1rem', color: '#991b1b' }}>Location Map</h3>
          <MapView
            latitude={latitude}
            longitude={longitude}
            name={name}
            address={address}
            height="380px"
          />
        </div>
      </div>
    </div>
  );
};

export default BloodBankDetails;
