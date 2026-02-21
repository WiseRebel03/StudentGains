import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';
import { StatusCard } from '../components/StatusBadge';
import './VerifyPage.css';

const VerifyPage = () => {
    const { verification, updateVerification, user } = useAuth();
    const navigate = useNavigate();
    const showToast = useToast();

    const [method, setMethod] = useState(null); // 'email' | 'document'
    const [collegeEmail, setCollegeEmail] = useState('');
    const [emailSent, setEmailSent] = useState(false);
    const [emailLoading, setEmailLoading] = useState(false);
    const [docFile, setDocFile] = useState(null);
    const [docSubmitted, setDocSubmitted] = useState(false);
    const [emailError, setEmailError] = useState('');

    const isCollegeEmail = (email) => {
        const personalDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
        const domain = email.split('@')[1]?.toLowerCase();
        return domain && !personalDomains.includes(domain);
    };

    const handleSendVerification = async (e) => {
        e.preventDefault();
        setEmailError('');
        if (!collegeEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(collegeEmail)) {
            setEmailError('Please enter a valid college email.');
            return;
        }
        if (!isCollegeEmail(collegeEmail)) {
            setEmailError('Please use your college/university email, not a personal email (Gmail/Yahoo etc.).');
            return;
        }
        setEmailLoading(true);
        await new Promise(r => setTimeout(r, 1200));
        setEmailLoading(false);
        setEmailSent(true);
        // Simulate auto-verify after sending
        setTimeout(() => {
            updateVerification({
                status: 'verified',
                method: 'college_email',
                expiryDate: new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000).toISOString(),
            });
            showToast('✅ College email verified!', 'success');
        }, 3000);
    };

    const handleDocSubmit = async () => {
        if (!docFile) return;
        await new Promise(r => setTimeout(r, 1000));
        setDocSubmitted(true);
        updateVerification({ status: 'pending', method: 'document' });
        showToast('Document submitted for review!', 'info');
    };

    return (
        <div className="verify-page page-content">
            <div className="verify-hero">
                <div className="container">
                    <h1 className="verify-hero-title">Verify your student status</h1>
                    <p className="verify-hero-sub">One-time verification. Valid for 6 months.</p>
                </div>
            </div>

            <div className="container verify-content">
                {/* Status Card */}
                <div className="verify-status">
                    <StatusCard
                        status={verification.status}
                        expiryDate={verification.expiryDate}
                        onVerifyClick={() => setMethod('email')}
                    />
                </div>

                {verification.status === 'verified' ? (
                    <div className="text-center" style={{ padding: 'var(--space-12)' }}>
                        <div style={{ fontSize: '4rem', marginBottom: 'var(--space-4)' }}>🎉</div>
                        <h2 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--space-3)' }}>You're all set!</h2>
                        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
                            Your student status is verified. Start unlocking discounts now.
                        </p>
                        <button className="btn btn-primary btn-lg" onClick={() => navigate('/brands')}>
                            Browse discounts →
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Method Selector */}
                        {!method && (
                            <div className="verify-methods">
                                <h2 className="verify-methods-title">Choose a verification method</h2>
                                <div className="grid-2">
                                    <button className="method-card" onClick={() => setMethod('email')}>
                                        <div className="method-icon">📧</div>
                                        <h3>College email</h3>
                                        <p>Instant verification using your .edu or college-issued email address.</p>
                                        <span className="badge badge-accent">Recommended</span>
                                    </button>
                                    <button className="method-card" onClick={() => setMethod('document')}>
                                        <div className="method-icon">📄</div>
                                        <h3>Document upload</h3>
                                        <p>Upload your student ID, fee receipt, or admission letter for manual review.</p>
                                        <span className="badge badge-primary">1–2 business days</span>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Method A: College Email */}
                        {method === 'email' && (
                            <div className="verify-method-panel">
                                <button className="back-link" onClick={() => { setMethod(null); setEmailSent(false); setEmailError(''); }}>← Choose another method</button>
                                <div className="verify-method-content">
                                    <div className="method-icon-large">📧</div>
                                    <h2>Verify with college email</h2>

                                    {!emailSent ? (
                                        <>
                                            <p className="verify-desc">Enter your college-issued email address. We'll send a verification link.</p>
                                            <form onSubmit={handleSendVerification} className="verify-form">
                                                <div className="input-wrapper">
                                                    <label className="input-label" htmlFor="college-email">College email address</label>
                                                    <input
                                                        id="college-email"
                                                        className="input"
                                                        type="email"
                                                        placeholder="you@iit.ac.in or you@du.ac.in"
                                                        value={collegeEmail}
                                                        onChange={e => setCollegeEmail(e.target.value)}
                                                        autoFocus
                                                    />
                                                    {emailError && <p className="input-error">{emailError}</p>}
                                                    <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginTop: 4 }}>
                                                        Must be a college/university email, not Gmail/Yahoo etc.
                                                    </p>
                                                </div>
                                                <button className="btn btn-primary" type="submit" disabled={emailLoading}>
                                                    {emailLoading ? <span className="spinner" /> : 'Send verification link →'}
                                                </button>
                                            </form>
                                        </>
                                    ) : (
                                        <div className="verify-sent">
                                            <p className="verify-desc">
                                                A verification link has been sent to <strong>{collegeEmail}</strong>.<br />
                                                Click the link in your email to complete verification.
                                            </p>
                                            <div className="verify-pending-badge">
                                                <span className="spinner spinner-dark" style={{ width: 16, height: 16 }} />
                                                Waiting for email verification...
                                            </div>
                                            <button
                                                onClick={handleSendVerification}
                                                style={{ background: 'none', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', fontSize: 'var(--font-size-sm)', fontWeight: 600, marginTop: 'var(--space-4)' }}
                                            >
                                                Didn't receive it? Resend
                                            </button>
                                            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginTop: 'var(--space-3)' }}>💡 Demo: Verification will auto-complete in 3 seconds</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Method B: Document Upload */}
                        {method === 'document' && (
                            <div className="verify-method-panel">
                                <button className="back-link" onClick={() => { setMethod(null); setDocSubmitted(false); setDocFile(null); }}>← Choose another method</button>
                                <div className="verify-method-content">
                                    <div className="method-icon-large">📄</div>
                                    <h2>Upload a student document</h2>

                                    {!docSubmitted ? (
                                        <>
                                            <p className="verify-desc">Upload any one of: Student ID card, Fee receipt, or Admission letter.</p>
                                            <div className={`doc-upload-zone ${docFile ? 'doc-upload-zone-active' : ''}`}>
                                                <input
                                                    type="file"
                                                    id="doc-file"
                                                    accept="image/*,.pdf"
                                                    className="doc-file-input"
                                                    onChange={e => setDocFile(e.target.files[0])}
                                                />
                                                <label htmlFor="doc-file" className="doc-upload-label">
                                                    {docFile ? (
                                                        <>
                                                            <span style={{ fontSize: '2rem' }}>✅</span>
                                                            <p style={{ fontWeight: 600 }}>{docFile.name}</p>
                                                            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>Click to change file</p>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span style={{ fontSize: '2.5rem' }}>📎</span>
                                                            <p style={{ fontWeight: 600 }}>Click to upload or drag & drop</p>
                                                            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>JPG, PNG, or PDF · Max 5MB</p>
                                                        </>
                                                    )}
                                                </label>
                                            </div>
                                            <button className="btn btn-primary" onClick={handleDocSubmit} disabled={!docFile}>
                                                Submit for review →
                                            </button>
                                            <p className="verify-privacy">🔒 Documents are used only for verification and deleted after review.</p>
                                        </>
                                    ) : (
                                        <div className="verify-sent">
                                            <p className="verify-desc">
                                                Your document has been submitted for manual review.<br />
                                                This typically takes <strong>1–2 business days</strong>.
                                            </p>
                                            <div className="badge badge-pending" style={{ fontSize: 'var(--font-size-sm)', padding: '8px 16px' }}>⏳ Under review (manual)</div>
                                            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginTop: 'var(--space-4)' }}>
                                                We'll notify you at <strong>{user?.email}</strong> once reviewed.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Privacy note */}
                        <div className="verify-privacy-banner">
                            🔒 We only share your verification status with brands — not your name, email, or college details.
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default VerifyPage;
