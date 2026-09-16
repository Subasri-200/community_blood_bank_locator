import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBloodBankApi } from '../services/api';
import { Building2, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const emptyAvailability = () => {
  const avail = {};
  BLOOD_GROUPS.forEach((bg) => {
    avail[bg] = { availableUnits: 0, availabilityStatus: 'Not Available' };
  });
  return avail;
};

const getStatus = (units) => {
  const n = Number(units) || 0;
  if (n >= 10) return 'Available';
  if (n >= 1) return 'Low';
  return 'Not Available';
};

const AddBloodBank = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    email: '',
    openingTime: '09:00 AM',
    closingTime: '08:00 PM',
    latitude: '',
    longitude: '',
  });
  const [bloodAvailability, setBloodAvailability] = useState(emptyAvailability());
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleUnitsChange = (bg, units) => {
    const num = Math.max(0, Number(units) || 0);
    setBloodAvailability((prev) => ({
      ...prev,
      [bg]: { availableUnits: num, availabilityStatus: getStatus(num) },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, address, city, state, pincode, phone, email, latitude, longitude } = formData;
    if (!name || !address || !city || !state || !pincode || !phone || !email || !latitude || !longitude) {
      setError('Please fill in all required fields including latitude and longitude.');
      return;
    }
    try {
      setSubmitting(true);
      setError('');
      await createBloodBankApi({ ...formData, bloodAvailability });
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Failed to create blood bank');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div style={{ maxWidth: '600px', margin: '3rem auto', textAlign: 'center' }}>
        <div className="card" style={{ padding: '2.5rem' }}>
          <CheckCircle2 size={56} color="#16a34a" style={{ marginBottom: '1rem' }} />
          <h2 style={{ color: '#15803d' }}>Blood bank added successfully!</h2>
          <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>The new blood bank is now listed in the platform.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button className="btn btn-primary" onClick={() => navigate('/admin/bloodbanks')}>Manage Blood Banks</button>
            <button className="btn btn-secondary" onClick={() => { setSuccess(false); setFormData({ name: '', address: '', city: '', state: '', pincode: '', phone: '', email: '', openingTime: '09:00 AM', closingTime: '08:00 PM', latitude: '', longitude: '' }); setBloodAvailability(emptyAvailability()); }}>
              Add Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <button className="btn btn-secondary btn-sm" onClick={() => navigate(-1)} style={{ marginBottom: '1.5rem' }}>
        <ArrowLeft size={16} /> Back
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <div style={{ backgroundColor: '#fee2e2', padding: '0.75rem', borderRadius: '10px' }}>
          <Building2 size={28} color="#dc2626" />
        </div>
        <div>
          <h2 style={{ margin: 0 }}>Add New Blood Bank</h2>
          <p style={{ color: '#6b7280', margin: 0, fontSize: '0.9rem' }}>Register a new blood bank facility on the platform</p>
        </div>
      </div>

      {error && (
        <div className="alert alert-error" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <AlertCircle size={18} /><span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="card" style={{ padding: '1.75rem', marginBottom: '1.5rem' }}>
          <h3 style={{ marginBottom: '1.25rem', fontSize: '1rem', color: '#374151', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Basic Information</h3>
          <div className="grid grid-2">
            <div className="form-group">
              <label className="form-label">Blood Bank Name *</label>
              <input type="text" name="name" className="form-control" placeholder="e.g. Red Cross Blood Centre" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input type="email" name="email" className="form-control" placeholder="official@bloodbank.org" value={formData.email} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Street Address *</label>
            <input type="text" name="address" className="form-control" placeholder="Street, Area, Landmark" value={formData.address} onChange={handleChange} required />
          </div>

          <div className="grid grid-2">
            <div className="form-group">
              <label className="form-label">City *</label>
              <input type="text" name="city" className="form-control" placeholder="e.g. Chennai" value={formData.city} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">State *</label>
              <input type="text" name="state" className="form-control" placeholder="e.g. Tamil Nadu" value={formData.state} onChange={handleChange} required />
            </div>
          </div>

          <div className="grid grid-2">
            <div className="form-group">
              <label className="form-label">Pincode *</label>
              <input type="text" name="pincode" className="form-control" placeholder="e.g. 600001" value={formData.pincode} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number *</label>
              <input type="text" name="phone" className="form-control" placeholder="+91 44 1234 5678" value={formData.phone} onChange={handleChange} required />
            </div>
          </div>

          <div className="grid grid-2">
            <div className="form-group">
              <label className="form-label">Opening Time</label>
              <input type="text" name="openingTime" className="form-control" placeholder="09:00 AM" value={formData.openingTime} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Closing Time</label>
              <input type="text" name="closingTime" className="form-control" placeholder="08:00 PM" value={formData.closingTime} onChange={handleChange} />
            </div>
          </div>

          <div className="grid grid-2">
            <div className="form-group">
              <label className="form-label">Latitude * <small style={{ color: '#9ca3af' }}>(use Google Maps to find)</small></label>
              <input type="number" step="any" name="latitude" className="form-control" placeholder="e.g. 13.0827" value={formData.latitude} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Longitude *</label>
              <input type="number" step="any" name="longitude" className="form-control" placeholder="e.g. 80.2707" value={formData.longitude} onChange={handleChange} required />
            </div>
          </div>
        </div>

        {/* Blood Availability */}
        <div className="card" style={{ padding: '1.75rem', marginBottom: '1.5rem' }}>
          <h3 style={{ marginBottom: '1.25rem', fontSize: '1rem', color: '#374151', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Blood Group Inventory</h3>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Blood Group</th>
                  <th>Available Units</th>
                  <th>Status (Auto-Calculated)</th>
                </tr>
              </thead>
              <tbody>
                {BLOOD_GROUPS.map((bg) => (
                  <tr key={bg}>
                    <td><strong style={{ color: '#7f1d1d', fontSize: '1.05rem' }}>{bg}</strong></td>
                    <td>
                      <input
                        type="number"
                        min="0"
                        className="form-control"
                        style={{ width: '120px' }}
                        value={bloodAvailability[bg]?.availableUnits || 0}
                        onChange={(e) => handleUnitsChange(bg, e.target.value)}
                      />
                    </td>
                    <td>
                      <span className={`badge badge-${bloodAvailability[bg]?.availabilityStatus === 'Available' ? 'available' : bloodAvailability[bg]?.availabilityStatus === 'Low' ? 'low' : 'not-available'}`}>
                        {bloodAvailability[bg]?.availabilityStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-lg" disabled={submitting}>
          {submitting ? 'Saving Blood Bank...' : 'Save Blood Bank'}
        </button>
      </form>
    </div>
  );
};

export default AddBloodBank;
