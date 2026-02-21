import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
        setMobileOpen(false);
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="navbar">
            <div className="container navbar-inner">
                <Link to="/" className="navbar-logo" onClick={() => setMobileOpen(false)}>
                    <span className="navbar-logo-icon">✦</span>
                    <span className="navbar-logo-text">StudentGains</span>
                    <span className="navbar-logo-badge">India</span>
                </Link>

                <div className={`navbar-links ${mobileOpen ? 'navbar-links-open' : ''}`}>
                    <Link to="/brands" className={`navbar-link ${isActive('/brands') ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>
                        Browse Brands
                    </Link>
                    {user && (
                        <>
                            <Link to="/dashboard" className={`navbar-link ${isActive('/dashboard') ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>
                                Dashboard
                            </Link>
                            <Link to="/verify" className={`navbar-link ${isActive('/verify') ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>
                                Verify
                            </Link>
                        </>
                    )}
                    <Link to="/partner" className={`navbar-link ${isActive('/partner') ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>
                        For Brands
                    </Link>
                </div>

                <div className="navbar-actions">
                    {user ? (
                        <div className="navbar-user">
                            <span className="navbar-avatar">{user.name?.charAt(0) || user.email?.charAt(0) || 'S'}</span>
                            <button className="btn btn-ghost btn-sm" onClick={handleLogout}>Sign Out</button>
                        </div>
                    ) : (
                        <div className="navbar-auth">
                            <Link to="/login" className="btn btn-ghost btn-sm" onClick={() => setMobileOpen(false)}>Login</Link>
                            <Link to="/signup" className="btn btn-primary btn-sm" onClick={() => setMobileOpen(false)}>Sign up free</Link>
                        </div>
                    )}
                </div>

                <button className="navbar-hamburger" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
                    <span className={`hamburger-line ${mobileOpen ? 'open' : ''}`}></span>
                    <span className={`hamburger-line ${mobileOpen ? 'open' : ''}`}></span>
                    <span className={`hamburger-line ${mobileOpen ? 'open' : ''}`}></span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
