import React, { useState, useEffect } from 'react';
import { getAllRequestsApi, updateRequestStatusApi, deleteBloodRequestApi } from '../services/api';
import { ClipboardList, AlertCircle, Trash2, RefreshCw, Calendar, Building2 } from 'lucide-react';

const STATUSES = ['Pending', 'Accepted', 'Rejected', 'Completed'];

const LevelBadge = ({ level }) => {
  const classMap = { Normal: 'badge-normal', Urgent: 'badge-urgent', Critical: 'badge-critical' };
  return <span className={`badge ${classMap[level] || 'badge-normal'}`}>{level}</span>;
};

const ManageBloodRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getAllRequestsApi();
      setRequests(data);
    } catch (err) {
      setError(err.message || 'Failed to load blood requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      setUpdatingId(id);
      const updated = await updateRequestStatusApi(id, { status: newStatus });
      setRequests(requests.map((r) => (r._id === id ? { ...r, status: newStatus } : r)));
    } catch (err) {
      alert(err.message || 'Failed to update request status');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this blood request permanently?')) return;
    try {
      await deleteBloodRequestApi(id);
      setRequests(requests.filter((r) => r._id !== id));
    } catch (err) {
      alert(err.message || 'Failed to delete request');
    }
  };

  const pendingCount = requests.filter((r) => r.status === 'Pending').length;
  const criticalCount = requests.filter((r) => r.emergencyLevel === 'Critical').length;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ margin: 0 }}>Manage Blood Requests</h2>
          <p style={{ color: '#6b7280', margin: '0.25rem 0 0 0', fontSize: '0.9rem' }}>
            {requests.length} total · {pendingCount} pending · {criticalCount} critical
          </p>
        </div>
        <button className="btn btn-secondary" onClick={fetchRequests}>
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      {criticalCount > 0 && (
        <div className="alert alert-error" style={{ marginBottom: '1.5rem', fontWeight: 600 }}>
          ⚠ {criticalCount} Critical request{criticalCount > 1 ? 's' : ''} require immediate action!
        </div>
      )}

      {error && (
        <div className="alert alert-error" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <AlertCircle size={18} /><span>{error}</span>
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
          <p>Loading blood requests...</p>
        </div>
      ) : requests.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
          <ClipboardList size={48} color="#9ca3af" style={{ marginBottom: '1rem' }} />
          <h3 style={{ color: '#374151' }}>No blood requests found</h3>
          <p>Submitted requests will appear here for your review.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Blood Group</th>
                <th>Hospital</th>
                <th>Units</th>
                <th>Emergency</th>
                <th>Submitted By</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req._id}>
                  <td>
                    <div style={{ fontWeight: 700 }}>{req.patientName}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                      #{req._id.slice(-8).toUpperCase()}
                    </div>
                  </td>
                  <td>
                    <strong style={{ fontSize: '1.1rem', color: '#991b1b' }}>{req.bloodGroup}</strong>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{req.hospitalName}</div>
                    <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>{req.city}</div>
                  </td>
                  <td>{req.unitsRequired} units</td>
                  <td><LevelBadge level={req.emergencyLevel} /></td>
                  <td style={{ fontSize: '0.875rem' }}>
                    {req.userId ? (
                      <div>
                        <div>{req.userId.name || 'Unknown'}</div>
                        <div style={{ fontSize: '0.78rem', color: '#9ca3af' }}>{req.userId.email || ''}</div>
                      </div>
                    ) : 'Unknown'}
                  </td>
                  <td style={{ fontSize: '0.875rem' }}>
                    {new Date(req.createdAt).toLocaleDateString('en-IN')}
                  </td>
                  <td>
                    <select
                      className="form-control"
                      style={{ width: '130px', fontSize: '0.85rem', padding: '0.375rem 0.5rem' }}
                      value={req.status}
                      disabled={updatingId === req._id}
                      onChange={(e) => handleStatusUpdate(req._id, e.target.value)}
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(req._id)}
                      title="Delete Request"
                    >
                      <Trash2 size={15} />
                    </button>
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

export default ManageBloodRequests;
