import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBloodBanksApi, deleteBloodBankApi } from '../services/api';
import { Plus, Edit, Trash2, AlertCircle, Building2, MapPin, Phone, Eye } from 'lucide-react';

const ManageBloodBanks = () => {
  const [bloodBanks, setBloodBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchBanks = async () => {
    try {
      setLoading(true);
      const data = await getBloodBanksApi();
      setBloodBanks(data);
    } catch (err) {
      setError(err.message || 'Failed to load blood banks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanks();
  }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${name}"? This action cannot be undone.`)) return;
    try {
      await deleteBloodBankApi(id);
      setBloodBanks(bloodBanks.filter((b) => b._id !== id));
    } catch (err) {
      alert(err.message || 'Failed to delete blood bank');
    }
  };

  const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ margin: 0 }}>Manage Blood Banks</h2>
          <p style={{ color: '#6b7280', margin: '0.25rem 0 0 0', fontSize: '0.9rem' }}>
            {bloodBanks.length} blood bank{bloodBanks.length !== 1 ? 's' : ''} registered
          </p>
        </div>
        <Link to="/admin/bloodbanks/add" className="btn btn-primary">
          <Plus size={18} /> + Add Blood Bank
        </Link>
      </div>

      {error && (
        <div className="alert alert-error" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
          <p>Loading blood bank records...</p>
        </div>
      ) : bloodBanks.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
          <Building2 size={48} color="#9ca3af" style={{ marginBottom: '1rem' }} />
          <h3 style={{ color: '#374151', marginBottom: '0.5rem' }}>No blood banks added yet</h3>
          <p style={{ marginBottom: '1.5rem' }}>Start by adding the first blood bank to the platform.</p>
          <Link to="/admin/bloodbanks/add" className="btn btn-primary">+ Add First Blood Bank</Link>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Blood Bank</th>
                <th>Location</th>
                <th>Contact</th>
                <th>Blood Groups Available</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bloodBanks.map((bank) => {
                const availableGroups = BLOOD_GROUPS.filter(
                  (bg) => bank.bloodAvailability?.[bg]?.availableUnits > 0
                );
                return (
                  <tr key={bank._id}>
                    <td>
                      <div style={{ fontWeight: 700, color: '#1f2937' }}>{bank.name}</div>
                      <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                        {bank.openingTime} – {bank.closingTime}
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.875rem' }}>
                        <MapPin size={14} color="#dc2626" />
                        {bank.city}, {bank.state}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>{bank.pincode}</div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.875rem' }}>
                        <Phone size={14} color="#6b7280" />
                        {bank.phone}
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', maxWidth: '200px' }}>
                        {availableGroups.length > 0 ? (
                          availableGroups.map((bg) => (
                            <span key={bg} style={{ backgroundColor: '#fee2e2', color: '#991b1b', fontSize: '0.7rem', fontWeight: 700, padding: '0.15rem 0.4rem', borderRadius: '4px' }}>
                              {bg}
                            </span>
                          ))
                        ) : (
                          <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>None available</span>
                        )}
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <Link to={`/bloodbanks/${bank._id}`} className="btn btn-secondary btn-sm" title="View Details">
                          <Eye size={15} />
                        </Link>
                        <Link to={`/admin/bloodbanks/edit/${bank._id}`} className="btn btn-outline btn-sm" title="Edit">
                          <Edit size={15} />
                        </Link>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(bank._id, bank.name)}
                          title="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageBloodBanks;
