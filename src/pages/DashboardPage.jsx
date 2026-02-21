import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { StatusCard } from '../components/StatusBadge';
import { brands } from '../data/brands';
import BrandCard from '../components/BrandCard';
import './DashboardPage.css';

const activityLog = [
    { icon: '🔐', text: 'Logged in', time: 'Just now' },
    { icon: '🔍', text: 'Visited StudentGains', time: '2 mins ago' },
];

const DashboardPage = () => {
    const { user, verification, logout } = useAuth();
    const navigate = useNavigate();

    const recommendedBrands = brands
        .filter(b => b.isFeatured)
        .slice(0, 4);

    const unlockedBrands = verification.status === 'verified'
        ? brands.slice(0, 3)
        : [];

    return (
        <div className="dashboard-page page-content">
            <div className="dashboard-hero">
                <div className="container">
                    <div className="dashboard-welcome">
                        <div className="dashboard-avatar">{user?.name?.charAt(0) || user?.email?.charAt(0) || 'S'}</div>
                        <div>
                            <h1 className="dashboard-title">Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''}!</h1>
                            <p className="dashboard-sub">{user?.email}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container dashboard-content">
                <div className="dashboard-grid">
                    {/* Main column */}
                    <div className="dashboard-main">
                        {/* Verification Status */}
                        <section className="dashboard-section">
                            <h2 className="dashboard-section-title">Verification status</h2>
                            <StatusCard
                                status={verification.status}
                                expiryDate={verification.expiryDate}
                                onVerifyClick={() => navigate('/verify')}
                            />
                        </section>

                        {/* Recommended Brands */}
                        <section className="dashboard-section">
                            <div className="flex-between" style={{ marginBottom: 'var(--space-5)' }}>
                                <h2 className="dashboard-section-title" style={{ marginBottom: 0 }}>Recommended for you</h2>
                                <button className="btn btn-ghost btn-sm" onClick={() => navigate('/brands')}>View all →</button>
                            </div>
                            <div className="grid-2">
                                {recommendedBrands.map(brand => (
                                    <BrandCard key={brand.id} brand={brand} compact />
                                ))}
                            </div>
                        </section>

                        {/* Unlocked Brands */}
                        <section className="dashboard-section">
                            <h2 className="dashboard-section-title">My unlocked brands</h2>
                            {verification.status !== 'verified' ? (
                                <div className="locked-brands-empty">
                                    <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-4)' }}>🔒</div>
                                    <h3>Get verified to unlock discounts</h3>
                                    <p>Once verified, your unlocked brands will appear here.</p>
                                    <button className="btn btn-primary" style={{ marginTop: 'var(--space-4)' }} onClick={() => navigate('/verify')}>
                                        Verify now →
                                    </button>
                                </div>
                            ) : (
                                <div className="unlocked-brands-list">
                                    {unlockedBrands.map(brand => (
                                        <div key={brand.id} className="unlocked-brand-row" onClick={() => navigate(`/brands/${brand.id}`)}>
                                            <div className="brand-logo" style={{ background: brand.logoColor, width: 36, height: 36, borderRadius: 8, fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900, flexShrink: 0 }}>
                                                {brand.logo}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <p style={{ fontWeight: 600, fontSize: 'var(--font-size-sm)' }}>{brand.name}</p>
                                                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>{brand.discountTeaser}</p>
                                            </div>
                                            <span style={{ color: 'var(--color-primary)', fontSize: 'var(--font-size-sm)', fontWeight: 600 }}>View →</span>
                                        </div>
                                    ))}
                                    <button className="btn btn-ghost btn-sm" onClick={() => navigate('/brands')} style={{ marginTop: 'var(--space-3)' }}>
                                        Browse all brands →
                                    </button>
                                </div>
                            )}
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="dashboard-sidebar">
                        {/* Profile Summary */}
                        <div className="sidebar-card">
                            <h3 className="sidebar-card-title">Your profile</h3>
                            <div className="profile-fields">
                                {user?.name && <div className="profile-field"><span className="pf-label">Name</span><span className="pf-value">{user.name}</span></div>}
                                {user?.college && <div className="profile-field"><span className="pf-label">College</span><span className="pf-value">{user.college}</span></div>}
                                {user?.stream && <div className="profile-field"><span className="pf-label">Stream</span><span className="pf-value">{user.stream}</span></div>}
                                {user?.city && <div className="profile-field"><span className="pf-label">City</span><span className="pf-value">{user.city}</span></div>}
                                {user?.gradYear && <div className="profile-field"><span className="pf-label">Graduating</span><span className="pf-value">{user.gradYear}</span></div>}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginTop: 'var(--space-4)' }}>
                                <button className="btn btn-ghost btn-sm btn-full" onClick={() => navigate('/onboarding')}>Edit profile</button>
                                <button className="btn btn-ghost btn-sm btn-full" style={{ color: 'var(--color-error)', borderColor: 'var(--color-error)' }} onClick={logout}>Sign out</button>
                            </div>
                        </div>

                        {/* Activity Log */}
                        <div className="sidebar-card">
                            <h3 className="sidebar-card-title">Recent activity</h3>
                            <div className="activity-log">
                                {activityLog.map((item, i) => (
                                    <div key={i} className="activity-item">
                                        <span className="activity-icon">{item.icon}</span>
                                        <div>
                                            <p className="activity-text">{item.text}</p>
                                            <p className="activity-time">{item.time}</p>
                                        </div>
                                    </div>
                                ))}
                                {verification.status !== 'not_verified' && (
                                    <div className="activity-item">
                                        <span className="activity-icon">✅</span>
                                        <div>
                                            <p className="activity-text">Verification: {verification.status}</p>
                                            <p className="activity-time">Earlier</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
