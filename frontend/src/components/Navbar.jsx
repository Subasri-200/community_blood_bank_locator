import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HeartPulse, Menu, X, LogOut, User as UserIcon, ShieldAlert } from 'lucide-react';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <HeartPulse size={28} color="#dc2626" />
          <span>Blood Bank Locator</span>
        </Link>

        <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <ul className={`navbar-nav ${mobileOpen ? 'show' : ''}`}>
          {!isAdmin ? (
            <>
              <li>
                <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/search" className={`nav-link ${isActive('/search') ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>
                  Find Blood Bank
                </Link>
              </li>
              {user && (
                <>
                  <li>
                    <Link to="/request" className={`nav-link ${isActive('/request') ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>
                      Blood Request
                    </Link>
                  </li>
                  <li>
                    <Link to="/my-requests" className={`nav-link ${isActive('/my-requests') ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>
                      My Requests
                    </Link>
                  </li>
                </>
              )}
            </>
          ) : (
            <>
              <li>
                <Link to="/admin/dashboard" className={`nav-link ${isActive('/admin/dashboard') ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/admin/bloodbanks" className={`nav-link ${isActive('/admin/bloodbanks') ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>
                  Blood Banks
                </Link>
              </li>
              <li>
                <Link to="/admin/requests" className={`nav-link ${isActive('/admin/requests') ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>
                  Requests
                </Link>
              </li>
              <li>
                <Link to="/admin/users" className={`nav-link ${isActive('/admin/users') ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>
                  Users
                </Link>
              </li>
            </>
          )}

          {user ? (
            <>
              <li>
                <Link to="/profile" className={`nav-link ${isActive('/profile') ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>
                  <UserIcon size={16} style={{ display: 'inline', marginRight: '4px' }} />
                  {user.name.split(' ')[0]}
                </Link>
              </li>
              <li>
                <button className="btn btn-outline btn-sm" onClick={handleLogout}>
                  <LogOut size={16} /> Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="btn btn-secondary btn-sm" onClick={() => setMobileOpen(false)}>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="btn btn-primary btn-sm" onClick={() => setMobileOpen(false)}>
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
