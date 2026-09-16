import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createBloodRequestApi } from '../services/api';
import { Send, CheckCircle2, AlertCircle, HeartHandshake } from 'lucide-react';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const EMERGENCY_LEVELS = ['Normal', 'Urgent', 'Critical'];

const BloodRequest = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const prefilled = location.state || {};

  const [formData, setFormData] = useState({
    patientName: '',
    bloodGroup: 'O+',
    unitsRequired: 1,
    hospitalName: prefilled.hospitalName || '',
    hospitalAddress: '',
    city: prefilled.city || '',
    contactNumber: '',
    emergencyLevel: 'Normal',
    additionalMessage: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successInfo, setSuccessInfo] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { patientName, bloodGroup, unitsRequired, hospitalName, hospitalAddress, city, contactNumber, emergencyLevel } = formData;

    if (!patientName || !bloodGroup || !unitsRequired || !hospitalName || !hospitalAddress || !city || !contactNumber || !emergencyLevel) {
      setError('Please fill in all mandatory fields marked with *');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      const response = await createBloodRequestApi(formData);
      setSuccessInfo(response);
    } catch (err) {
      setError(err.message || 'Failed to submit blood request');
    } finally {
      setSubmitting(false);
    }
  };

  if (successInfo) {
    return (
      <div style={{ maxWidth: '600px', margin: '3rem auto', textAlign: 'center' }}>
        <div className="card" style={{ padding: '2.5rem' }}>
          <div style={{ backgroundColor: '#dcfce7', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
            <CheckCircle2 size={36} color="#16a34a" />
          </div>
          <h2 style={{ color: '#15803d', marginBottom: '0.5rem' }}>Blood request submitted successfully.</h2>
          <p style={{ color: '#4b5563', marginBottom: '1.5rem' }}>
            Your emergency request has been registered in the system network.
          </p>

          <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: 600 }}>GENERATED REQUEST ID</span>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#7f1d1d', fontFamily: 'monospace' }}>
              {successInfo.requestId}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button className="btn btn-primary" onClick={() => navigate('/my-requests')}>
              View My Requests
            </button>
            <button className="btn btn-secondary" onClick={() => { setSuccessInfo(null); setFormData({ patientName: '', bloodGroup: 'O+', unitsRequired: 1, hospitalName: '', hospitalAddress: '', city: '', contactNumber: '', emergencyLevel: 'Normal', additionalMessage: '' }); }}>
              Submit Another Request
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '700px', margin: '1rem auto' }}>
      <div className="card" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ backgroundColor: '#fee2e2', padding: '0.75rem', borderRadius: '10px' }}>
            <HeartHandshake size={28} color="#dc2626" />
          </div>
          <div>
            <h2 style={{ margin: 0 }}>Emergency Blood Request</h2>
            <p style={{ color: '#6b7280', margin: 0, fontSize: '0.9rem' }}>Fill in patient details to submit a broadcast request</p>
          </div>
        </div>

        {error && (
          <div className="alert alert-error" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-2">
            <div className="form-group">
              <label className="form-label">Patient Name *</label>
              <input
                type="text"
                name="patientName"
                className="form-control"
                placeholder="Full name of patient"
                value={formData.patientName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Required Blood Group *</label>
              <select
                name="bloodGroup"
                className="form-control"
                value={formData.bloodGroup}
                onChange={handleChange}
                required
              >
                {BLOOD_GROUPS.map((bg) => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-2">
            <div className="form-group">
              <label className="form-label">Units Required (Bottles/Pints) *</label>
              <input
                type="number"
                name="unitsRequired"
                min="1"
                max="20"
                className="form-control"
                value={formData.unitsRequired}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Emergency Urgency Level *</label>
              <select
                name="emergencyLevel"
                className="form-control"
                value={formData.emergencyLevel}
                onChange={handleChange}
                required
              >
                {EMERGENCY_LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl}>{lvl}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-2">
            <div className="form-group">
              <label className="form-label">Hospital Name *</label>
              <input
                type="text"
                name="hospitalName"
                className="form-control"
                placeholder="e.g. Apollo Hospital"
                value={formData.hospitalName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">City *</label>
              <input
                type="text"
                name="city"
                className="form-control"
                placeholder="e.g. Chennai"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Hospital Address *</label>
            <input
              type="text"
              name="hospitalAddress"
              className="form-control"
              placeholder="Complete hospital address / ward number"
              value={formData.hospitalAddress}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Attendant Contact Phone Number *</label>
            <input
              type="tel"
              name="contactNumber"
              className="form-control"
              placeholder="e.g. 9876543210"
              value={formData.contactNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Additional Instructions / Medical Message</label>
            <textarea
              name="additionalMessage"
              className="form-control"
              placeholder="Specify surgery date, doctor notes, or specific donor constraints if any..."
              value={formData.additionalMessage}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '1rem' }} disabled={submitting}>
            <Send size={20} /> {submitting ? 'Submitting Request...' : 'Submit Blood Request'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BloodRequest;
