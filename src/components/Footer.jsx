import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => (
    <footer className="footer">
        <div className="container">
            <div className="footer-grid">
                <div className="footer-brand">
                    <div className="footer-logo">
                        <span className="navbar-logo-icon">✦</span>
                        <span style={{ fontWeight: 800, fontSize: '1.1rem', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>StudentDiscounts</span>
                        <span className="navbar-logo-badge">India</span>
                    </div>
                    <p className="footer-tagline">
                        Verified discounts for India's students.<br />
                        Trusted by colleges, loved by students.
                    </p>
                    <div className="footer-trust-badges">
                        <span className="footer-trust-item">🔒 Privacy-first</span>
                        <span className="footer-trust-item">✅ Verified students only</span>
                    </div>
                </div>

                <div className="footer-col">
                    <h4 className="footer-col-title">Students</h4>
                    <ul className="footer-links">
                        <li><Link to="/signup">Get started</Link></li>
                        <li><Link to="/verify">Verify your status</Link></li>
                        <li><Link to="/brands">Browse brands</Link></li>
                        <li><Link to="/dashboard">Dashboard</Link></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4 className="footer-col-title">Brands</h4>
                    <ul className="footer-links">
                        <li><Link to="/partner">Partner with us</Link></li>
                        <li><Link to="/partner#how-it-works">How it works</Link></li>
                        <li><Link to="/partner#benefits">Benefits</Link></li>
                        <li><a href="mailto:brands@studentdiscounts.in">Contact us</a></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4 className="footer-col-title">Company</h4>
                    <ul className="footer-links">
                        <li><Link to="/about">About us</Link></li>
                        <li><Link to="/terms">Terms of service</Link></li>
                        <li><Link to="/privacy">Privacy policy</Link></li>
                        <li><a href="mailto:hello@studentdiscounts.in">hello@studentdiscounts.in</a></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p className="footer-copyright">© 2025 StudentDiscounts India. All rights reserved.</p>
                <p className="footer-note">Made with ❤️ for Indian students</p>
            </div>
        </div>
    </footer>
);

export default Footer;
