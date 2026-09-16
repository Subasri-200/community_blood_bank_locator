import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getBloodBanksApi, getAllRequestsApi, getUsersApi } from '../services/api';
import { Building2, Users, ClipboardList, AlertTriangle, TrendingUp, Plus } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.5rem' }}>
    <div style={{ backgroundColor: `${color}15`, padding: '1rem', borderRadius: '12px', flexShrink: 0 }}>
      <Icon size={32} color={color} />
    </div>
    <div>
      <div style={{ fontSize: '2rem', fontWeight: 800, color: '#1f2937', lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>{label}</div>
    </div>
  </div>
);

const AdminDashboard = () => {
  const { user } = useAuth();
  const [bloodBanks, setBloodBanks] = useState([]);
  const [requests, setRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [banksData, reqData, usersData] = await Promise.all([
          getBloodBanksApi(),
          getAllRequestsApi(),
          getUsersApi(),
        ]);
        setBloodBanks(banksData || []);
        setRequests(reqData || []);
        setUsers(usersData || []);
      } catch (err) {
        console.error('Dashboard data load error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const pendingCount = requests.filter((r) => r.status === 'Pending').length;
  const criticalCount = requests.filter((r) => r.emergencyLevel === 'Critical').length;

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem', color: '#6b7280' }}>
        <p style={{ fontSize: '1.1rem' }}>Loading dashboard data...</p>
      </div>
    );
  }

  const recentRequests = requests.slice(0, 5);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ margin: 0 }}>Admin Dashboard</h2>
          <p style={{ color: '#6b7280', margin: '0.25rem 0 0 0', fontSize: '0.9rem' }}>
            Welcome back, {user?.name?.split(' ')[0]}
          </p>
        </div>
        <Link to="/admin/bloodbanks/add" className="btn btn-primary">
          <Plus size={18} /> Add Blood Bank
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-4" style={{ marginBottom: '2rem' }}>
        <StatCard icon={Building2} label="Total Blood Banks" value={bloodBanks.length} color="#dc2626" />
        <StatCard icon={Users} label="Registered Users" value={users.length} color="#2563eb" />
        <StatCard icon={ClipboardList} label="Total Requests" value={requests.length} color="#16a34a" />
        <StatCard icon={AlertTriangle} label="Pending Requests" value={pendingCount} color="#d97706" />
      </div>

      {criticalCount > 0 && (
        <div className="alert alert-error" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertTriangle size={20} />
            <strong>{criticalCount} Critical blood request{criticalCount > 1 ? 's' : ''} require immediate attention!</strong>
          </div>
          <Link to="/admin/requests" className="btn btn-danger btn-sm">View Critical Requests</Link>
        </div>
      )}

      <div className="grid grid-2" style={{ alignItems: 'start' }}>
        {/* Recent Blood Requests */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ margin: 0 }}>Recent Blood Requests</h3>
            <Link to="/admin/requests" style={{ fontSize: '0.85rem', color: '#dc2626', fontWeight: 600 }}>View All</Link>
          </div>
          {recentRequests.length === 0 ? (
            <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>No blood requests submitted yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {recentRequests.map((req) => (
                <div key={req._id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.75rem',
                  backgroundColor: '#f9fafb',
                  borderRadius: '8px',
                  border: '1px solid #f3f4f6',
                  gap: '0.5rem',
                  flexWrap: 'wrap',
                }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{req.patientName}</div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                      {req.bloodGroup} · {req.unitsRequired} units · {req.city}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <span className={`badge badge-${req.emergencyLevel?.toLowerCase()}`}>{req.emergencyLevel}</span>
                    <span className={`badge badge-${req.status?.toLowerCase()}`}>{req.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Blood Banks List Preview */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ margin: 0 }}>Blood Banks</h3>
            <Link to="/admin/bloodbanks" style={{ fontSize: '0.85rem', color: '#dc2626', fontWeight: 600 }}>Manage All</Link>
          </div>
          {bloodBanks.length === 0 ? (
            <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>No blood banks added yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {bloodBanks.slice(0, 6).map((bank) => (
                <div key={bank._id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.625rem 0.75rem',
                  backgroundColor: '#f9fafb',
                  borderRadius: '8px',
                  border: '1px solid #f3f4f6',
                }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>{bank.name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>{bank.city}, {bank.state}</div>
                  </div>
                  <Link to={`/admin/bloodbanks/edit/${bank._id}`} className="btn btn-secondary btn-sm">
                    Edit
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
