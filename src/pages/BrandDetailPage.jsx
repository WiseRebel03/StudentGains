import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getBrandById, brands } from '../data/brands';
import { useAuth } from '../context/AuthContext';
import BrandCard from '../components/BrandCard';
import { AuthPromptModal } from '../components/Modal';
import { StatusBadge } from '../components/StatusBadge';
import { useState } from 'react';
import './BrandDetailPage.css';

const BrandDetailPage = () => {
    const { brandId } = useParams();
    const { user, verification } = useAuth();
    const navigate = useNavigate();
    const [authModal, setAuthModal] = useState(false);
    const [codeRevealed, setCodeRevealed] = useState(false);

    const brand = getBrandById(brandId);
    const relatedBrands = brands.filter(b => b.category === brand?.category && b.id !== brandId).slice(0, 3);

    if (!brand) {
        return (
            <div className="page-content">
                <div className="container" style={{ textAlign: 'center', padding: 'var(--space-24) 0' }}>
                    <div style={{ fontSize: '4rem', marginBottom: 'var(--space-4)' }}>🔍</div>
                    <h2 style={{ marginBottom: 'var(--space-4)' }}>Brand not found</h2>
                    <Link to="/brands" className="btn btn-primary">← Back to brands</Link>
                </div>
            </div>
        );
    }

    const isVerified = verification.status === 'verified';

    return (
        <div className="brand-detail-page page-content">
            {/* Hero */}
            <div className="brand-detail-hero">
                <div className="container">
                    <Link to="/brands" className="breadcrumb">← All brands</Link>
                    <div className="brand-detail-header">
                        <div className="brand-detail-logo" style={{ background: brand.logoColor }}>
                            {brand.logo}
                        </div>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap', marginBottom: 'var(--space-2)' }}>
                                <h1 className="brand-detail-name">{brand.name}</h1>
                                {brand.isFeatured && <span className="badge badge-primary">Featured</span>}
                                {brand.isNew && <span className="badge badge-new">New</span>}
                            </div>
                            <p className="brand-detail-category">{brand.category}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container brand-detail-content">
                <div className="brand-detail-grid">
                    {/* Main */}
                    <div className="brand-detail-main">
                        <div className="detail-card">
                            <h2 className="detail-section-title">About {brand.name}</h2>
                            <p className="detail-text">{brand.description}</p>
                        </div>

                        <div className="detail-card">
                            <h2 className="detail-section-title">Discount details</h2>
                            <div className="discount-highlight">
                                <span className="discount-highlight-icon">🎁</span>
                                <div>
                                    <p className="discount-highlight-main">{brand.discountTeaser}</p>
                                    <p className="discount-highlight-detail">{brand.discountDetails}</p>
                                </div>
                            </div>
                        </div>

                        <div className="detail-card">
                            <h2 className="detail-section-title">How to redeem</h2>
                            {user && isVerified ? (
                                <div className="redemption-steps">
                                    <p className="detail-text" style={{ marginBottom: 'var(--space-5)' }}>{brand.redemptionInstructions}</p>
                                    {!codeRevealed ? (
                                        <button className="btn btn-accent btn-lg" onClick={() => setCodeRevealed(true)}>
                                            🎁 Reveal discount code
                                        </button>
                                    ) : (
                                        <div className="code-reveal">
                                            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-2)' }}>Your exclusive code:</p>
                                            <div className="discount-code">
                                                STU{brand.id.padStart(3, '0')}INDIA
                                            </div>
                                            <a href={brand.partnerSite} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ marginTop: 'var(--space-4)' }}>
                                                Go to {brand.name} ↗
                                            </a>
                                        </div>
                                    )}
                                </div>
                            ) : !user ? (
                                <div className="redemption-locked">
                                    <div className="locked-icon">🔒</div>
                                    <h3>Sign up to redeem</h3>
                                    <p>Create a free account and verify your student status to unlock this offer.</p>
                                    <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', justifyContent: 'center' }}>
                                        <button className="btn btn-primary" onClick={() => navigate('/signup')}>Sign up free</button>
                                        <button className="btn btn-ghost" onClick={() => navigate('/login')}>Login</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="redemption-locked">
                                    <div className="locked-icon">⏳</div>
                                    <h3>Verification required</h3>
                                    <p>You need to verify your student status before you can unlock this discount.</p>
                                    <div style={{ marginBottom: 'var(--space-3)' }}>
                                        <StatusBadge status={verification.status} />
                                    </div>
                                    <button className="btn btn-primary" onClick={() => navigate('/verify')}>
                                        Verify now →
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="brand-detail-sidebar">
                        <div className="detail-card detail-info-card">
                            <h3 style={{ fontWeight: 700, marginBottom: 'var(--space-4)', fontSize: 'var(--font-size-base)' }}>Offer summary</h3>
                            <div className="info-rows">
                                <div className="info-row"><span className="info-label">Category</span><span className="info-value">{brand.category}</span></div>
                                <div className="info-row"><span className="info-label">Discount</span><span className="info-value" style={{ color: 'var(--color-accent)', fontWeight: 700 }}>{brand.discountTeaser}</span></div>
                                <div className="info-row"><span className="info-label">Who can use</span><span className="info-value">Verified students</span></div>
                                <div className="info-row"><span className="info-label">Valid</span><span className="info-value">While enrolled</span></div>
                            </div>
                            {!user ? (
                                <button className="btn btn-primary btn-full" style={{ marginTop: 'var(--space-5)' }} onClick={() => setAuthModal(true)}>
                                    Unlock offer →
                                </button>
                            ) : !isVerified ? (
                                <button className="btn btn-primary btn-full" style={{ marginTop: 'var(--space-5)' }} onClick={() => navigate('/verify')}>
                                    Get verified →
                                </button>
                            ) : (
                                <div style={{ marginTop: 'var(--space-5)', textAlign: 'center' }}>
                                    <span className="badge badge-verified" style={{ fontSize: 'var(--font-size-sm)', padding: '6px 14px' }}>✓ Offer unlocked</span>
                                </div>
                            )}
                        </div>

                        {/* Related */}
                        {relatedBrands.length > 0 && (
                            <div className="related-brands">
                                <h3 style={{ fontWeight: 700, marginBottom: 'var(--space-4)', fontSize: 'var(--font-size-base)' }}>More in {brand.category}</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                                    {relatedBrands.map(rb => (
                                        <div key={rb.id} className="related-brand-row" onClick={() => navigate(`/brands/${rb.id}`)}>
                                            <div className="brand-logo" style={{ background: rb.logoColor, width: 36, height: 36, borderRadius: 8, fontSize: '0.95rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900, flexShrink: 0 }}>
                                                {rb.logo}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <p style={{ fontWeight: 600, fontSize: 'var(--font-size-sm)' }}>{rb.name}</p>
                                                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-accent)', fontWeight: 600 }}>{rb.discountTeaser}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <AuthPromptModal isOpen={authModal} onClose={() => setAuthModal(false)} brandName={brand.name} />
        </div>
    );
};

export default BrandDetailPage;
