import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBloodBankByIdApi, updateBloodBankApi } from '../services/api';
import { Edit, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const getStatus = (units) => {
  const n = Number(units) || 0;
  if (n >= 10) return 'Available';
  if (n >= 1) return 'Low';
  return 'Not Available';
};

const EditBloodBank = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [bloodAvailability, setBloodAvailability] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchBank = async () => {
      try {
        const data = await getBloodBankByIdApi(id);
        setFormData({
          name: data.name || '',
          address: data.address || '',
          city: data.city || '',
          state: data.state || '',
          pincode: data.pincode || '',
          phone: data.phone || '',
          email: data.email || '',
          openingTime: data.openingTime || '09:00 AM',
          closingTime: data.closingTime || '08:00 PM',
          latitude: data.latitude || '',
          longitude: data.longitude || '',
        });
        // Initialize blood availability from DB or defaults
        const avail = {};
        BLOOD_GROUPS.forEach((bg) => {
          avail[bg] = data.bloodAvailability?.[bg] || { availableUnits: 0, availabilityStatus: 'Not Available' };
        });
        setBloodAvailability(avail);
      } catch (err) {
        setError(err.message || 'Failed to load blood bank data');
      } finally {
        setLoading(false);
      }
    };
    fetchBank();
  }, [id]);

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
    try {
      setSubmitting(true);
      setError('');
      await updateBloodBankApi(id, { ...formData, bloodAvailability });
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Failed to update blood bank');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
        <p>Loading blood bank data...</p>
      </div>
    );
  }

  if (error && !formData) {
    return (
      <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
        <div className="alert alert-error">{error}</div>
        <button className="btn btn-secondary" onClick={() => navigate(-1)}><ArrowLeft size={16} /> Back</button>
      </div>
    );
  }

  if (success) {
    return (
      <div style={{ maxWidth: '600px', margin: '3rem auto', textAlign: 'center' }}>
        <div className="card" style={{ padding: '2.5rem' }}>
          <CheckCircle2 size={56} color="#16a34a" style={{ marginBottom: '1rem' }} />
          <h2 style={{ color: '#15803d' }}>Blood bank updated successfully!</h2>
          <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>All changes have been saved to the database.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button className="btn btn-primary" onClick={() => navigate('/admin/bloodbanks')}>Manage Blood Banks</button>
            <button className="btn btn-secondary" onClick={() => setSuccess(false)}>Continue Editing</button>
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
          <Edit size={28} color="#dc2626" />
        </div>
        <div>
          <h2 style={{ margin: 0 }}>Edit Blood Bank</h2>
          <p style={{ color: '#6b7280', margin: 0, fontSize: '0.9rem' }}>Update blood bank details and inventory</p>
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
              <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Street Address *</label>
            <input type="text" name="address" className="form-control" value={formData.address} onChange={handleChange} required />
          </div>

          <div className="grid grid-2">
            <div className="form-group">
              <label className="form-label">City *</label>
              <input type="text" name="city" className="form-control" value={formData.city} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">State *</label>
              <input type="text" name="state" className="form-control" value={formData.state} onChange={handleChange} required />
            </div>
          </div>

          <div className="grid grid-2">
            <div className="form-group">
              <label className="form-label">Pincode *</label>
              <input type="text" name="pincode" className="form-control" value={formData.pincode} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number *</label>
              <input type="text" name="phone" className="form-control" value={formData.phone} onChange={handleChange} required />
            </div>
          </div>

          <div className="grid grid-2">
            <div className="form-group">
              <label className="form-label">Opening Time</label>
              <input type="text" name="openingTime" className="form-control" value={formData.openingTime} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Closing Time</label>
              <input type="text" name="closingTime" className="form-control" value={formData.closingTime} onChange={handleChange} />
            </div>
          </div>

          <div className="grid grid-2">
            <div className="form-group">
              <label className="form-label">Latitude *</label>
              <input type="number" step="any" name="latitude" className="form-control" value={formData.latitude} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Longitude *</label>
              <input type="number" step="any" name="longitude" className="form-control" value={formData.longitude} onChange={handleChange} required />
            </div>
          </div>
        </div>

        {/* Blood Availability Table */}
        <div className="card" style={{ padding: '1.75rem', marginBottom: '1.5rem' }}>
          <h3 style={{ marginBottom: '1.25rem', fontSize: '1rem', color: '#374151', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Update Blood Group Inventory
          </h3>
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
                        value={bloodAvailability[bg]?.availableUnits ?? 0}
                        onChange={(e) => handleUnitsChange(bg, e.target.value)}
                      />
                    </td>
                    <td>
                      <span className={`badge badge-${
                        bloodAvailability[bg]?.availabilityStatus === 'Available' ? 'available'
                        : bloodAvailability[bg]?.availabilityStatus === 'Low' ? 'low'
                        : 'not-available'
                      }`}>
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
          {submitting ? 'Saving Changes...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default EditBloodBank;
