import React, { useState, useEffect } from 'react';
import { getUsersApi, deleteUserApi } from '../services/api';
import { Users, AlertCircle, Trash2, RefreshCw, Calendar, Phone, Mail, ShieldCheck } from 'lucide-react';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getUsersApi();
      setUsers(data);
    } catch (err) {
      setError(err.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to remove user "${name}" from the platform?`)) return;
    try {
      await deleteUserApi(id);
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      alert(err.message || 'Failed to delete user');
    }
  };

  const adminCount = users.filter((u) => u.role === 'admin').length;
  const userCount = users.filter((u) => u.role === 'user').length;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ margin: 0 }}>Manage Users</h2>
          <p style={{ color: '#6b7280', margin: '0.25rem 0 0 0', fontSize: '0.9rem' }}>
            {users.length} total accounts · {adminCount} admin · {userCount} standard users
          </p>
        </div>
        <button className="btn btn-secondary" onClick={fetchUsers}>
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      {error && (
        <div className="alert alert-error" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <AlertCircle size={18} /><span>{error}</span>
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
          <p>Loading user accounts...</p>
        </div>
      ) : users.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
          <Users size={48} color="#9ca3af" style={{ marginBottom: '1rem' }} />
          <h3 style={{ color: '#374151' }}>No registered users yet</h3>
          <p>User accounts will appear here once they register.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: user.role === 'admin' ? '#dbeafe' : '#fee2e2',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '0.9rem',
                        color: user.role === 'admin' ? '#1e40af' : '#dc2626',
                        flexShrink: 0,
                      }}>
                        {user.name?.[0]?.toUpperCase() || 'U'}
                      </div>
                      <span style={{ fontWeight: 700 }}>{user.name}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.9rem' }}>
                      <Mail size={14} color="#6b7280" />
                      {user.email}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.9rem' }}>
                      <Phone size={14} color="#6b7280" />
                      {user.phone}
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${user.role === 'admin' ? 'badge-accepted' : 'badge-normal'}`}>
                      {user.role === 'admin' ? '🛡 Admin' : '👤 User'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.875rem' }}>
                      <Calendar size={14} color="#6b7280" />
                      {new Date(user.createdAt).toLocaleDateString('en-IN')}
                    </div>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(user._id, user.name)}
                      title="Delete User"
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

export default ManageUsers;
