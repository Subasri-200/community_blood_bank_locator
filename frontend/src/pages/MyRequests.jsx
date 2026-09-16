import React, { useState, useEffect } from 'react';
import { getMyRequestsApi, deleteBloodRequestApi } from '../services/api';
import { ClipboardList, AlertCircle, Trash2, Calendar, Building2, Droplets } from 'lucide-react';

const StatusBadge = ({ status }) => {
  const classMap = {
    Pending: 'badge-pending',
    Accepted: 'badge-accepted',
    Rejected: 'badge-rejected',
    Completed: 'badge-completed',
  };
  return <span className={`badge ${classMap[status] || 'badge-pending'}`}>{status}</span>;
};

const LevelBadge = ({ level }) => {
  const classMap = {
    Normal: 'badge-normal',
    Urgent: 'badge-urgent',
    Critical: 'badge-critical',
  };
  return <span className={`badge ${classMap[level] || 'badge-normal'}`}>{level}</span>;
};

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getMyRequestsApi();
      setRequests(data);
    } catch (err) {
      setError(err.message || 'Failed to load your requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blood request?')) return;
    try {
      await deleteBloodRequestApi(id);
      setRequests(requests.filter((r) => r._id !== id));
    } catch (err) {
      alert(err.message || 'Failed to delete request');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
        <div style={{ backgroundColor: '#fee2e2', padding: '0.75rem', borderRadius: '10px' }}>
          <ClipboardList size={28} color="#dc2626" />
        </div>
        <div>
          <h2 style={{ margin: 0 }}>My Blood Requests</h2>
          <p style={{ color: '#6b7280', margin: 0, fontSize: '0.9rem' }}>Track the status of your submitted requests</p>
        </div>
      </div>

      {error && (
        <div className="alert alert-error" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem 0', color: '#6b7280' }}>
          <p>Loading your requests...</p>
        </div>
      ) : requests.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
          <ClipboardList size={48} color="#9ca3af" style={{ marginBottom: '1rem' }} />
          <h3 style={{ color: '#374151', marginBottom: '0.5rem' }}>No requests submitted yet</h3>
          <p style={{ marginBottom: '1.5rem' }}>Submit a blood request if you need emergency support at a hospital.</p>
          <a href="/request" className="btn btn-primary">Submit Blood Request</a>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Patient</th>
                <th>Blood Group</th>
                <th>Hospital</th>
                <th>Units</th>
                <th>Emergency</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req._id}>
                  <td>
                    <code style={{ fontSize: '0.75rem', color: '#7f1d1d', backgroundColor: '#fee2e2', padding: '0.15rem 0.35rem', borderRadius: '4px' }}>
                      #{req._id.slice(-8).toUpperCase()}
                    </code>
                  </td>
                  <td style={{ fontWeight: 600 }}>{req.patientName}</td>
                  <td>
                    <span style={{ fontWeight: 800, color: '#991b1b', fontSize: '1rem' }}>{req.bloodGroup}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Building2 size={14} color="#6b7280" />
                      <span style={{ fontSize: '0.9rem' }}>{req.hospitalName}</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>{req.city}</div>
                  </td>
                  <td>{req.unitsRequired} units</td>
                  <td><LevelBadge level={req.emergencyLevel} /></td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.875rem' }}>
                      <Calendar size={14} color="#6b7280" />
                      {new Date(req.createdAt).toLocaleDateString('en-IN')}
                    </div>
                  </td>
                  <td><StatusBadge status={req.status} /></td>
                  <td>
                    {req.status === 'Pending' && (
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(req._id)}
                        title="Delete request"
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyRequests;
