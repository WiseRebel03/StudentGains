import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { brands } from '../data/brands';
import './AdminPage.css';

const mockPendingVerifications = [
    { id: 'V001', name: 'Rahul Gupta', email: 'rahul@example.com', college: 'IIT Delhi', doc: 'student_id.jpg', submitted: '2025-01-20', status: 'pending' },
    { id: 'V002', name: 'Ananya Singh', email: 'ananya@example.com', college: 'Delhi University', doc: 'fee_receipt.pdf', submitted: '2025-01-19', status: 'pending' },
    { id: 'V003', name: 'Karthik R.', email: 'karthik@example.com', college: 'VIT Vellore', doc: 'admission_letter.pdf', submitted: '2025-01-18', status: 'pending' },
];

const AdminPage = () => {
    const { user } = useAuth();
    const [adminPw, setAdminPw] = useState('');
    const [authed, setAuthed] = useState(false);
    const [pwError, setPwError] = useState('');
    const [activeTab, setActiveTab] = useState('brands');
    const [verifications, setVerifications] = useState(mockPendingVerifications);

    const handleAdminAuth = (e) => {
        e.preventDefault();
        if (adminPw === 'admin123') {
            setAuthed(true);
            setPwError('');
        } else {
            setPwError('Incorrect password. (Hint: admin123 for demo)');
        }
    };

    const handleAction = (id, action) => {
        setVerifications(prev => prev.map(v => v.id === id ? { ...v, status: action } : v));
    };

    if (!authed) {
        return (
            <div className="auth-page">
                <div className="auth-card">
                    <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-3)' }}>🔐</div>
                        <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800 }}>Admin access</h2>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginTop: 'var(--space-2)' }}>Protected admin panel</p>
                    </div>
                    <form onSubmit={handleAdminAuth}>
                        <div className="input-wrapper" style={{ marginBottom: 'var(--space-4)' }}>
                            <label className="input-label" htmlFor="admin-pw">Admin password</label>
                            <input
                                id="admin-pw"
                                className="input"
                                type="password"
                                placeholder="Enter password..."
                                value={adminPw}
                                onChange={e => setAdminPw(e.target.value)}
                                autoFocus
                            />
                            {pwError && <p className="input-error">{pwError}</p>}
                        </div>
                        <button className="btn btn-primary btn-full" type="submit">Access admin panel →</button>
                    </form>
                </div>
            </div>
        );
    }

    const pendingCount = verifications.filter(v => v.status === 'pending').length;

    return (
        <div className="admin-page page-content">
            <div className="admin-hero">
                <div className="container flex-between">
                    <div>
                        <h1 style={{ fontWeight: 800, fontSize: 'var(--font-size-2xl)', marginBottom: 4 }}>Admin Panel</h1>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'var(--font-size-sm)' }}>StudentGains · Internal use only</p>
                    </div>
                    <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
                        {pendingCount > 0 && (
                            <span className="admin-alert-badge">{pendingCount} pending review</span>
                        )}
                    </div>
                </div>
            </div>

            <div className="container admin-content">
                {/* Stats Row */}
                <div className="admin-stats">
                    <div className="admin-stat"><div className="stat-number">{brands.length}</div><div className="stat-label">Brands</div></div>
                    <div className="admin-stat"><div className="stat-number">{pendingCount}</div><div className="stat-label">Pending verifications</div></div>
                    <div className="admin-stat"><div className="stat-number">1</div><div className="stat-label">Verified students (demo)</div></div>
                    <div className="admin-stat"><div className="stat-number">{brands.filter(b => b.isFeatured).length}</div><div className="stat-label">Featured brands</div></div>
                </div>

                {/* Tabs */}
                <div className="admin-tabs">
                    <button className={`admin-tab ${activeTab === 'brands' ? 'active' : ''}`} onClick={() => setActiveTab('brands')}>Brands ({brands.length})</button>
                    <button className={`admin-tab ${activeTab === 'verifications' ? 'active' : ''}`} onClick={() => setActiveTab('verifications')}>
                        Pending verifications {pendingCount > 0 && <span className="tab-badge">{pendingCount}</span>}
                    </button>
                </div>

                {/* Brands Tab */}
                {activeTab === 'brands' && (
                    <div className="admin-table-wrap">
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 'var(--space-4)' }}>
                            <button className="btn btn-primary btn-sm">+ Add brand</button>
                        </div>
                        <table className="admin-table">
                            <thead>
                                <tr><th>Brand</th><th>Category</th><th>Discount</th><th>Featured</th><th>New</th><th>Actions</th></tr>
                            </thead>
                            <tbody>
                                {brands.map(b => (
                                    <tr key={b.id}>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                                                <div style={{ width: 28, height: 28, borderRadius: 6, background: b.logoColor, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.8rem', flexShrink: 0 }}>{b.logo}</div>
                                                <span style={{ fontWeight: 600 }}>{b.name}</span>
                                            </div>
                                        </td>
                                        <td><span className="badge badge-primary">{b.category}</span></td>
                                        <td style={{ fontSize: 'var(--font-size-sm)' }}>{b.discountTeaser}</td>
                                        <td>{b.isFeatured ? '✅' : '—'}</td>
                                        <td>{b.isNew ? '🆕' : '—'}</td>
                                        <td>
                                            <div style={{ display: 'flex', gap: 4 }}>
                                                <button className="btn btn-ghost btn-sm">Edit</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Verifications Tab */}
                {activeTab === 'verifications' && (
                    <div className="admin-table-wrap">
                        <table className="admin-table">
                            <thead>
                                <tr><th>ID</th><th>Student</th><th>College</th><th>Document</th><th>Submitted</th><th>Status</th><th>Actions</th></tr>
                            </thead>
                            <tbody>
                                {verifications.map(v => (
                                    <tr key={v.id}>
                                        <td style={{ fontFamily: 'monospace', fontSize: 'var(--font-size-xs)' }}>{v.id}</td>
                                        <td>
                                            <p style={{ fontWeight: 600, fontSize: 'var(--font-size-sm)' }}>{v.name}</p>
                                            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>{v.email}</p>
                                        </td>
                                        <td style={{ fontSize: 'var(--font-size-sm)' }}>{v.college}</td>
                                        <td><a href="#" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-primary)' }}>{v.doc}</a></td>
                                        <td style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>{v.submitted}</td>
                                        <td>
                                            <span className={`badge ${v.status === 'pending' ? 'badge-pending' : v.status === 'approved' ? 'badge-verified' : 'badge-not-verified'}`}>
                                                {v.status}
                                            </span>
                                        </td>
                                        <td>
                                            {v.status === 'pending' && (
                                                <div style={{ display: 'flex', gap: 4 }}>
                                                    <button className="btn btn-accent btn-sm" onClick={() => handleAction(v.id, 'approved')}>Approve</button>
                                                    <button className="btn btn-ghost btn-sm" style={{ color: 'var(--color-error)', borderColor: 'var(--color-error)' }} onClick={() => handleAction(v.id, 'rejected')}>Reject</button>
                                                </div>
                                            )}
                                            {v.status !== 'pending' && <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>Done</span>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPage;
