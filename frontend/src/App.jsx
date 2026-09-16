import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BloodBankSearch from './pages/BloodBankSearch';
import BloodBankDetails from './pages/BloodBankDetails';

// User Pages
import BloodRequest from './pages/BloodRequest';
import MyRequests from './pages/MyRequests';
import UserProfile from './pages/UserProfile';

// Admin Pages
import AdminDashboard from './pages/AdminDashboard';
import ManageBloodBanks from './pages/ManageBloodBanks';
import AddBloodBank from './pages/AddBloodBank';
import EditBloodBank from './pages/EditBloodBank';
import ManageBloodRequests from './pages/ManageBloodRequests';
import ManageUsers from './pages/ManageUsers';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f9fafb' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🩸</div>
          <p style={{ fontSize: '1.1rem', color: '#6b7280' }}>Loading Community Blood Bank Locator...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Navbar />

      <main className="main-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={user ? <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/search'} replace /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/search'} replace /> : <Register />} />
          <Route path="/search" element={<BloodBankSearch />} />
          <Route path="/bloodbanks/:id" element={<BloodBankDetails />} />

          {/* Protected User Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/request" element={<BloodRequest />} />
            <Route path="/my-requests" element={<MyRequests />} />
            <Route path="/profile" element={<UserProfile />} />
          </Route>

          {/* Protected Admin Routes */}
          <Route element={<ProtectedRoute adminOnly={true} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/bloodbanks" element={<ManageBloodBanks />} />
            <Route path="/admin/bloodbanks/add" element={<AddBloodBank />} />
            <Route path="/admin/bloodbanks/edit/:id" element={<EditBloodBank />} />
            <Route path="/admin/requests" element={<ManageBloodRequests />} />
            <Route path="/admin/users" element={<ManageUsers />} />
          </Route>

          {/* Catch All */}
          <Route path="*" element={
            <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
              <h1 style={{ fontSize: '4rem', color: '#dc2626', marginBottom: '0.5rem' }}>404</h1>
              <h2 style={{ color: '#374151' }}>Page Not Found</h2>
              <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>The page you're looking for doesn't exist.</p>
              <a href="/" className="btn btn-primary">Go to Home</a>
            </div>
          } />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
