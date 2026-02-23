import React, { useState } from 'react';
import { useToast } from '../components/Toast';
import './BrandsDeckPage.css';

const stats = [
    { value: '50K+', label: 'Verified students' },
    { value: '500+', label: 'Partner colleges' },
    { value: '20+', label: 'Brand partners' },
    { value: '18–26', label: 'Age group' },
];

const whyUs = [
    {
        icon: '🎯',
        title: 'High-intent audience',
        desc: 'Every student on our platform is verified and actively looking for deals. No bots, no cold traffic — just real buyers.',
    },
    {
        icon: '🛡️',
        title: 'Fraud-proof by design',
        desc: 'We verify via college email or document. Only verified students see and redeem your offer. No code leaks.',
    },
    {
        icon: '📈',
        title: 'Lifetime customer value',
        desc: 'Students who discover a brand in college stay loyal for decades. You\'re not just getting a transaction — you\'re getting a customer.',
    },
    {
        icon: '⚡',
        title: 'Zero setup friction',
        desc: 'No complex integration required. Share your offer details and we\'ll have your brand live within 48 hours.',
    },
    {
        icon: '📊',
        title: 'Full visibility',
        desc: 'Track clicks, redemptions, and conversions through your brand dashboard. Know exactly what you\'re getting.',
    },
    {
        icon: '🔌',
        title: 'Optional API verification',
        desc: 'Want to verify students at your own checkout? One API call returns a verified/not-verified signal. That\'s it.',
    },
];

const tiers = [
    {
        name: 'Starter',
        price: 'Free',
        sub: 'No upfront cost',
        features: [
            'Listed on StudentGains platform',
            'Basic brand profile page',
            'Discount code or redirect offer',
            'Email support',
        ],
        cta: 'Get started',
        highlighted: false,
    },
    {
        name: 'Growth',
        price: '₹9,999/mo',
        sub: 'Most popular',
        features: [
            'Everything in Starter',
            'Featured placement in brand grid',
            'Monthly performance report',
            'API verification access',
            'Dedicated partner manager',
        ],
        cta: 'Apply now',
        highlighted: true,
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        sub: 'For large brands',
        features: [
            'Everything in Growth',
            'Co-branded campaigns',
            'Push notifications to students',
            'Custom verification flows',
            'Priority support & SLA',
        ],
        cta: 'Contact us',
        highlighted: false,
    },
];

const BrandsDeckPage = () => {
    const showToast = useToast();
    const [form, setForm] = useState({ brand: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const set = (k) => (e) => setForm(prev => ({ ...prev, [k]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.brand.trim() || !form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            showToast('Please fill in all required fields.', 'error');
            return;
        }
        setLoading(true);
        await new Promise(r => setTimeout(r, 1200));
        setLoading(false);
        setSubmitted(true);
        showToast('Message sent! We\'ll be in touch within 24 hours.', 'success');
    };

    return (
        <div className="deck-page">

            {/* Header */}
            <header className="deck-header">
                <div className="deck-header-inner">
                    <div className="deck-logo">
                        <span className="deck-logo-icon">✦</span>
                        <span className="deck-logo-text">StudentGains</span>
                        <span className="deck-logo-badge">for Brands</span>
                    </div>
                    <a href="#deck-contact" className="btn btn-primary">Get in touch →</a>
                </div>
            </header>

            {/* Hero */}
            <section className="deck-hero">
                <div className="deck-hero-bg">
                    <div className="deck-hero-orb orb-1" />
                    <div className="deck-hero-orb orb-2" />
                </div>
                <div className="deck-container">
                    <div className="deck-eyebrow">Confidential · For Brand Partners Only</div>
                    <h1 className="deck-hero-title">
                        Reach India's next generation<br />
                        <span className="deck-gradient-text">of buyers.</span>
                    </h1>
                    <p className="deck-hero-sub">
                        StudentGains connects your brand with 50,000+ verified Indian students —
                        high-intent, fraud-proof, and ready to convert.
                    </p>
                    <div className="deck-hero-ctas">
                        <a href="#deck-contact" className="btn btn-primary btn-lg">Partner with us →</a>
                        <a href="#deck-why" className="btn btn-ghost btn-lg">See how it works</a>
                    </div>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="deck-stats-bar">
                <div className="deck-container">
                    <div className="deck-stats-grid">
                        {stats.map((s, i) => (
                            <div key={i} className="deck-stat">
                                <div className="deck-stat-value">{s.value}</div>
                                <div className="deck-stat-label">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why StudentGains */}
            <section className="deck-section" id="deck-why">
                <div className="deck-container">
                    <div className="deck-section-header">
                        <div className="deck-eyebrow">Why partner with us</div>
                        <h2 className="deck-section-title">Built for brands that think long-term.</h2>
                        <p className="deck-section-sub">
                            Students are the most underserved consumer segment in India — and the most valuable over a lifetime.
                        </p>
                    </div>
                    <div className="deck-why-grid">
                        {whyUs.map((w, i) => (
                            <div key={i} className="deck-why-card">
                                <div className="deck-why-icon">{w.icon}</div>
                                <h3 className="deck-why-title">{w.title}</h3>
                                <p className="deck-why-desc">{w.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="deck-section deck-section-dark">
                <div className="deck-container">
                    <div className="deck-section-header">
                        <div className="deck-eyebrow" style={{ color: 'var(--color-primary-light)' }}>Integration</div>
                        <h2 className="deck-section-title" style={{ color: '#fff' }}>Live in 48 hours.</h2>
                        <p className="deck-section-sub" style={{ color: 'rgba(255,255,255,0.6)' }}>
                            No engineering sprint needed. We handle the heavy lifting.
                        </p>
                    </div>
                    <div className="deck-how-steps">
                        {[
                            { n: '01', title: 'Share your offer', desc: 'Tell us your discount (e.g. 20% off, free trial) and we set up your brand page.' },
                            { n: '02', title: 'Go live', desc: 'Verified students browse your listing on StudentGains and click to redeem.' },
                            { n: '03', title: 'Student redeems', desc: 'They\'re redirected to your site with a unique code, or you can use our verify API.' },
                            { n: '04', title: 'Track & grow', desc: 'View real-time analytics — clicks, redemptions, and conversions — in your dashboard.' },
                        ].map((step, i) => (
                            <div key={i} className="deck-how-step">
                                <div className="deck-how-num">{step.n}</div>
                                <div>
                                    <h3 className="deck-how-title">{step.title}</h3>
                                    <p className="deck-how-desc">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section className="deck-section">
                <div className="deck-container">
                    <div className="deck-section-header">
                        <div className="deck-eyebrow">Pricing</div>
                        <h2 className="deck-section-title">Simple, transparent pricing.</h2>
                        <p className="deck-section-sub">Start free. Scale as you grow.</p>
                    </div>
                    <div className="deck-tiers">
                        {tiers.map((tier, i) => (
                            <div key={i} className={`deck-tier ${tier.highlighted ? 'deck-tier-highlight' : ''}`}>
                                {tier.highlighted && <div className="deck-tier-badge">Most popular</div>}
                                <div className="deck-tier-name">{tier.name}</div>
                                <div className="deck-tier-price">{tier.price}</div>
                                <div className="deck-tier-sub">{tier.sub}</div>
                                <ul className="deck-tier-features">
                                    {tier.features.map((f, j) => (
                                        <li key={j}><span className="deck-tick">✓</span> {f}</li>
                                    ))}
                                </ul>
                                <a href="#deck-contact" className={`btn btn-full ${tier.highlighted ? 'btn-primary' : 'btn-secondary'}`}>
                                    {tier.cta} →
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section className="deck-section deck-contact-section" id="deck-contact">
                <div className="deck-container">
                    <div className="deck-contact-wrap">
                        <div className="deck-contact-left">
                            <div className="deck-eyebrow">Get started</div>
                            <h2 className="deck-section-title">Let's talk.</h2>
                            <p className="deck-section-sub" style={{ marginBottom: 'var(--space-8)' }}>
                                Drop us a message — we respond within 24 hours.
                            </p>
                            <div className="deck-contact-details">
                                <div className="deck-contact-item">📧 <a href="mailto:brands@studentgains.in">brands@studentgains.in</a></div>
                                <div className="deck-contact-item">🌐 <a href="https://studentgainssss.vercel.app" target="_blank" rel="noreferrer">studentgainssss.vercel.app</a></div>
                            </div>
                        </div>
                        <div className="deck-contact-right">
                            {!submitted ? (
                                <form className="deck-form" onSubmit={handleSubmit}>
                                    <div className="input-wrapper">
                                        <label className="input-label" htmlFor="d-brand">Brand / Company name *</label>
                                        <input id="d-brand" className="input" type="text" placeholder="Your brand" value={form.brand} onChange={set('brand')} />
                                    </div>
                                    <div className="input-wrapper">
                                        <label className="input-label" htmlFor="d-email">Work email *</label>
                                        <input id="d-email" className="input" type="email" placeholder="you@yourbrand.com" value={form.email} onChange={set('email')} />
                                    </div>
                                    <div className="input-wrapper">
                                        <label className="input-label" htmlFor="d-msg">Message (optional)</label>
                                        <textarea id="d-msg" className="input deck-textarea" placeholder="Tell us about your brand and what you're looking for..." value={form.message} onChange={set('message')} rows={4} />
                                    </div>
                                    <button className="btn btn-primary btn-full btn-lg" type="submit" disabled={loading}>
                                        {loading ? <span className="spinner" /> : 'Send message →'}
                                    </button>
                                </form>
                            ) : (
                                <div className="deck-submitted">
                                    <div style={{ fontSize: '3rem', marginBottom: 'var(--space-4)' }}>🎉</div>
                                    <h3>We'll be in touch!</h3>
                                    <p>Thanks, <strong>{form.brand}</strong>. Expect a reply at <strong>{form.email}</strong> within 24 hours.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="deck-footer">
                <div className="deck-container">
                    <div className="deck-footer-inner">
                        <span className="deck-logo-text" style={{ fontSize: '0.9rem', opacity: 0.6 }}>© 2025 StudentGains</span>
                        <span style={{ opacity: 0.4, fontSize: '0.85rem' }}>This page is confidential and intended for brand partners only.</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default BrandsDeckPage;
