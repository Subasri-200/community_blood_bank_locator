import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getBloodBanksApi } from '../services/api';
import BloodBankCard from '../components/BloodBankCard';
import { Search, Filter, RefreshCw, AlertCircle, Building2 } from 'lucide-react';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const BloodBankSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCity = searchParams.get('city') || '';
  const initialBloodGroup = searchParams.get('bloodGroup') || '';

  const [city, setCity] = useState(initialCity);
  const [bloodGroup, setBloodGroup] = useState(initialBloodGroup);
  const [availability, setAvailability] = useState('');
  const [bloodBanks, setBloodBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchBloodBanks = async () => {
    try {
      setLoading(true);
      setError('');
      const params = {};
      if (city.trim()) params.city = city.trim();
      if (bloodGroup) params.bloodGroup = bloodGroup;
      if (availability) params.availability = availability;

      const data = await getBloodBanksApi(params);
      setBloodBanks(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch blood banks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBloodBanks();
  }, [searchParams]);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const params = {};
    if (city.trim()) params.city = city.trim();
    if (bloodGroup) params.bloodGroup = bloodGroup;
    setSearchParams(params);
    fetchBloodBanks();
  };

  const handleReset = () => {
    setCity('');
    setBloodGroup('');
    setAvailability('');
    setSearchParams({});
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2>Find Blood Banks</h2>
        <p style={{ color: '#6b7280' }}>
          Search active blood banks by city and blood group to check stock availability in real time.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="card" style={{ marginBottom: '2rem', padding: '1.25rem' }}>
        <form onSubmit={handleFilterSubmit} className="grid grid-4" style={{ alignItems: 'end' }}>
          <div>
            <label className="form-label">City / Location</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Chennai, Mumbai, Delhi"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div>
            <label className="form-label">Blood Group</label>
            <select
              className="form-control"
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
            >
              <option value="">All Blood Groups</option>
              {BLOOD_GROUPS.map((bg) => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="form-label">Availability Filter</label>
            <select
              className="form-control"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="Available">Available (10+ Units)</option>
              <option value="Low">Low Stock (1-9 Units)</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
              <Search size={18} /> Search
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleReset} title="Reset filters">
              <RefreshCw size={18} />
            </button>
          </div>
        </form>
      </div>

      {/* Results Section */}
      {error && (
        <div className="alert alert-error" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem 0', color: '#6b7280' }}>
          <p style={{ fontSize: '1.1rem' }}>Loading blood bank records...</p>
        </div>
      ) : bloodBanks.length > 0 ? (
        <div>
          <div style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#4b5563', fontWeight: 600 }}>
            Found {bloodBanks.length} blood bank{bloodBanks.length === 1 ? '' : 's'} matching your query
          </div>
          <div className="grid grid-3">
            {bloodBanks.map((bank) => (
              <BloodBankCard key={bank._id} bloodBank={bank} />
            ))}
          </div>
        </div>
      ) : (
        <div className="card" style={{ textAlign: 'center', padding: '3rem 1.5rem', color: '#6b7280' }}>
          <Building2 size={48} color="#9ca3af" style={{ marginBottom: '1rem' }} />
          <h3 style={{ color: '#374151', marginBottom: '0.5rem' }}>No blood banks found</h3>
          <p style={{ fontSize: '0.95rem', maxWidth: '400px', margin: '0 auto 1.5rem auto' }}>
            We couldn't find any blood banks matching your current search parameters. Try expanding your search city or selecting a different blood group.
          </p>
          <button className="btn btn-secondary" onClick={handleReset}>
            Clear Search Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default BloodBankSearch;
