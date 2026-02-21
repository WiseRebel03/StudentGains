import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { brands, featuredBrands } from '../data/brands';
import BrandCard from '../components/BrandCard';
import { AuthPromptModal } from '../components/Modal';
import './LandingPage.css';

const faqs = [
    { q: 'Who is eligible for student discounts?', a: 'Any student currently enrolled in a recognised Indian college or university. This includes UG, PG, diploma, and professional courses.' },
    { q: 'How does student verification work?', a: 'We verify students using college email addresses (preferred) or document upload (student ID, fee receipt, or admission letter). Verification is quick and free.' },
    { q: 'How long does verification last?', a: 'Verification is valid for 6 months from the date it is approved. We\'ll remind you to re-verify before it expires.' },
    { q: 'Is my personal data shared with brands?', a: 'Never. We only share your verification status with brands — not your name, college, or any personal details.' },
    { q: 'How many brands are available?', a: 'We currently partner with 20+ leading Indian and global brands, with new brands added every month.' },
    { q: 'Can I use discounts multiple times?', a: 'Discount terms vary by brand. Some are one-time, others are recurring — each brand\'s offer page has the full terms.' },
    { q: 'What if my college email isn\'t working?', a: 'Use the document upload fallback. Upload your student ID card, fee receipt, or admission letter and our team will verify it within 1–2 business days.' },
    { q: 'Is StudentGains free?', a: 'Yes, completely free for students. We partner with brands to offer exclusive deals — you never pay anything to access discounts.' },
];

const steps = [
    { icon: '✉️', title: 'Sign up', desc: 'Create your free account with your personal email in under a minute.' },
    { icon: '📋', title: 'Add college details', desc: 'Tell us about your college, course, and expected graduation year.' },
    { icon: '✅', title: 'Get verified', desc: 'Verify via your college email or by uploading a student document.' },
    { icon: '🎁', title: 'Unlock discounts', desc: 'Access exclusive discounts from 20+ top brands, instantly.' },
];

const LandingPage = () => {
    const [openFaq, setOpenFaq] = useState(null);
    const [authModal, setAuthModal] = useState({ open: false, brand: null });

    const handleBrandUnlock = (brand) => {
        setAuthModal({ open: true, brand });
    };

    return (
        <div className="landing-page">
            {/* Hero */}
            <section className="hero">
                <div className="hero-bg-shapes">
                    <div className="hero-shape shape-1" />
                    <div className="hero-shape shape-2" />
                    <div className="hero-shape shape-3" />
                </div>
                <div className="container hero-content">
                    <div className="hero-badge animate-fade-in">
                        <span>🇮🇳</span> Trusted by students across India
                    </div>
                    <h1 className="hero-headline animate-fade-in-up">
                        Student discounts,<br />
                        <span className="gradient-text">verified for India.</span>
                    </h1>
                    <p className="hero-sub animate-fade-in-up">
                        Get verified once. Unlock partner discounts across 20+ brands.
                    </p>
                    <div className="hero-ctas animate-fade-in-up">
                        <Link to="/signup" className="btn btn-primary btn-lg">Get Verified — it's free</Link>
                        <Link to="/brands" className="btn btn-ghost btn-lg hero-secondary-cta">Browse Brands →</Link>
                    </div>
                    <div className="hero-trust">
                        <span>🔒 Privacy-first</span>
                        <span>·</span>
                        <span>✅ Verified students only</span>
                        <span>·</span>
                        <span>🔄 Re-verified every 6 months</span>
                    </div>
                </div>
            </section>

            {/* Brand Grid */}
            <section className="section brand-grid-section">
                <div className="container">
                    <div className="text-center" style={{ marginBottom: 'var(--space-10)' }}>
                        <div className="section-label">Partnered Brands</div>
                        <h2 className="section-title" style={{ fontSize: 'var(--font-size-4xl)' }}>Discounts worth unlocking</h2>
                        <p className="section-subtitle">Exclusive deals you won't find anywhere else. Verify once, redeem anytime.</p>
                    </div>
                    <div className="grid-4 brand-grid">
                        {featuredBrands.map(brand => (
                            <BrandCard key={brand.id} brand={brand} onUnlockClick={handleBrandUnlock} compact />
                        ))}
                    </div>
                    <div className="brand-grid-cta">
                        <Link to="/brands" className="btn btn-secondary">See all {brands.length} brands →</Link>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="section how-it-works">
                <div className="container">
                    <div className="text-center" style={{ marginBottom: 'var(--space-10)' }}>
                        <div className="section-label">How it works</div>
                        <h2 className="section-title" style={{ fontSize: 'var(--font-size-4xl)' }}>Four steps to savings</h2>
                    </div>
                    <div className="steps-grid">
                        {steps.map((step, idx) => (
                            <div key={idx} className="step-card">
                                <div className="step-number">{idx + 1}</div>
                                <div className="step-icon">{step.icon}</div>
                                <h3 className="step-title">{step.title}</h3>
                                <p className="step-desc">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className="text-center" style={{ marginTop: 'var(--space-10)' }}>
                        <Link to="/signup" className="btn btn-primary btn-lg">Start here →</Link>
                    </div>
                </div>
            </section>

            {/* Trust Section */}
            <section className="section trust-section">
                <div className="container">
                    <div className="trust-grid">
                        <div className="trust-card">
                            <span className="trust-icon">🏫</span>
                            <h3>College-verified</h3>
                            <p>We verify using college email addresses and official documents. No fake students.</p>
                        </div>
                        <div className="trust-card trust-card-dark">
                            <span className="trust-icon">🔒</span>
                            <h3>Your data, protected</h3>
                            <p>We share only your verification status with brands — nothing more. Ever.</p>
                        </div>
                        <div className="trust-card">
                            <span className="trust-icon">🔄</span>
                            <h3>Re-verified every 6 months</h3>
                            <p>Discounts stay exclusive to active students. Short re-verification keeps access real.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="section faq-section">
                <div className="container">
                    <div className="text-center" style={{ marginBottom: 'var(--space-10)' }}>
                        <div className="section-label">FAQ</div>
                        <h2 className="section-title" style={{ fontSize: 'var(--font-size-4xl)' }}>Common questions</h2>
                    </div>
                    <div className="faq-list">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className={`faq-item ${openFaq === idx ? 'faq-open' : ''}`}>
                                <button className="faq-question" onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
                                    <span>{faq.q}</span>
                                    <span className="faq-icon">{openFaq === idx ? '−' : '+'}</span>
                                </button>
                                {openFaq === idx && (
                                    <div className="faq-answer animate-fade-in-up">{faq.a}</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="section cta-banner-section">
                <div className="container">
                    <div className="cta-banner">
                        <div className="cta-banner-shapes">
                            <div className="cta-shape cta-shape-1" />
                            <div className="cta-shape cta-shape-2" />
                        </div>
                        <div className="cta-banner-content">
                            <h2>Ready to unlock your discounts?</h2>
                            <p>Join thousands of verified students saving on their everyday purchases.</p>
                            <Link to="/signup" className="btn btn-primary btn-lg">Get started — it's free</Link>
                        </div>
                    </div>
                </div>
            </section>

            <AuthPromptModal
                isOpen={authModal.open}
                onClose={() => setAuthModal({ open: false, brand: null })}
                brandName={authModal.brand?.name}
            />
        </div>
    );
};

export default LandingPage;
