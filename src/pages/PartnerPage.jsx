import React, { useState } from 'react';
import { useToast } from '../components/Toast';
import './PartnerPage.css';

const benefits = [
    { icon: '🎯', title: 'Reach verified students', desc: 'Access a pre-verified, high-intent audience of 18–26 year-olds across 500+ colleges.' },
    { icon: '📊', title: 'Zero risk for brands', desc: 'Only verified students see and redeem your offers. No code sharing, no fraud.' },
    { icon: '🔌', title: 'Simple API integration', desc: 'One "Verify Student" API call. We return a simple verified/not-verified signal.' },
    { icon: '📈', title: 'Drive long-term loyalty', desc: 'Students who discover brands during college become loyal customers for decades.' },
];

const howItWorks = [
    { step: '1', title: 'You partner with us', desc: 'Share your brand details and preferred discount offer. We set up your brand page.' },
    { step: '2', title: 'Students see your offer', desc: 'Verified students browse your discount on our platform and get excited to try your brand.' },
    {
        step: '3', title: 'Student clicks "Redeem"', desc: "They're redirected to your site, or a code is revealed. Optional: call our Verify API."
    },
    { step: '4', title: 'API call (optional)', desc: 'Your checkout calls: GET /verify?studentId=XXX → {verified: true} → Apply student pricing.' },
];

const PartnerPage = () => {
    const showToast = useToast();
    const [form, setForm] = useState({ brandName: '', website: '', email: '', monthlyOrders: '' });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const set = (k) => (e) => setForm(prev => ({ ...prev, [k]: e.target.value }));

    const validate = () => {
        const errs = {};
        if (!form.brandName.trim()) errs.brandName = 'Brand name is required.';
        if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = 'Valid email required.';
        if (!form.website.trim()) errs.website = 'Website is required.';
        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }
        setErrors({});
        setLoading(true);
        await new Promise(r => setTimeout(r, 1200));
        setLoading(false);
        setSubmitted(true);
        showToast('Application received! We\'ll be in touch soon.', 'success');
    };

    return (
        <div className="partner-page page-content">
            {/* Hero */}
            <section className="partner-hero">
                <div className="partner-hero-bg-shapes">
                    <div className="partner-shape p-shape-1" />
                    <div className="partner-shape p-shape-2" />
                </div>
                <div className="container partner-hero-content">
                    <span className="section-label" style={{ color: 'rgba(255,255,255,0.7)' }}>For Brands</span>
                    <h1 className="partner-hero-title">Reach India's verified students.</h1>
                    <p className="partner-hero-sub">
                        Partner with StudentGains and connect your brand with millions of high-intent students across 500+ colleges.
                    </p>
                    <a href="#partner-form" className="btn btn-primary btn-lg">Apply to partner →</a>
                </div>
            </section>

            {/* Benefits */}
            <section className="section">
                <div className="container">
                    <div className="text-center" style={{ marginBottom: 'var(--space-10)' }}>
                        <div className="section-label">Why partner with us</div>
                        <h2 className="section-title" style={{ fontSize: 'var(--font-size-4xl)' }}>Built for brands, trusted by students</h2>
                    </div>
                    <div className="grid-2">
                        {benefits.map((b, i) => (
                            <div key={i} className="benefit-card">
                                <span className="benefit-icon">{b.icon}</span>
                                <div>
                                    <h3 className="benefit-title">{b.title}</h3>
                                    <p className="benefit-desc">{b.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How Integration Works */}
            <section className="section partner-how-section" id="how-it-works">
                <div className="container">
                    <div className="text-center" style={{ marginBottom: 'var(--space-10)' }}>
                        <div className="section-label">Integration</div>
                        <h2 className="section-title" style={{ fontSize: 'var(--font-size-4xl)' }}>Simple to integrate</h2>
                        <p className="section-subtitle">No complex setup. From partnership to live in 48 hours.</p>
                    </div>

                    <div className="partner-steps">
                        {howItWorks.map((step, i) => (
                            <div key={i} className="partner-step">
                                <div className="partner-step-num">{step.step}</div>
                                <div>
                                    <h3 className="partner-step-title">{step.title}</h3>
                                    <p className="partner-step-desc">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* API Code Snippet */}
                    <div className="api-snippet-card">
                        <h3 className="api-snippet-title">Verification API (conceptual)</h3>
                        <pre className="api-code">{`// 1. Student triggers "Redeem" on your checkout
// 2. Your backend calls our API
GET https://api.studentgains.in/v1/verify
  ?studentId=<student_id>
  Authorization: Bearer <your_api_key>

// 3. We return:
{
  "verified": true,
  "status": "verified",
  "validUntil": "2025-12-01"
}

// 4. Apply student pricing if verified === true ✅`}</pre>
                    </div>
                </div>
            </section>

            {/* Partner Form */}
            <section className="section partner-form-section" id="partner-form">
                <div className="container">
                    <div className="partner-form-wrap">
                        <div className="partner-form-header">
                            <div className="section-label">Partner application</div>
                            <h2 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 800, marginBottom: 'var(--space-3)', letterSpacing: '-0.02em' }}>
                                Start reaching students
                            </h2>
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-base)' }}>
                                Fill in your details and we'll get back within 48 hours.
                            </p>
                        </div>

                        {!submitted ? (
                            <form className="partner-form" onSubmit={handleSubmit}>
                                <div className="input-wrapper">
                                    <label className="input-label" htmlFor="brandName">Brand / Company name *</label>
                                    <input id="brandName" className="input" type="text" placeholder="Your brand name" value={form.brandName} onChange={set('brandName')} />
                                    {errors.brandName && <p className="input-error">{errors.brandName}</p>}
                                </div>

                                <div className="input-wrapper">
                                    <label className="input-label" htmlFor="pWebsite">Website URL *</label>
                                    <input id="pWebsite" className="input" type="url" placeholder="https://yourbrand.com" value={form.website} onChange={set('website')} />
                                    {errors.website && <p className="input-error">{errors.website}</p>}
                                </div>

                                <div className="input-wrapper">
                                    <label className="input-label" htmlFor="pEmail">Contact email *</label>
                                    <input id="pEmail" className="input" type="email" placeholder="partnerships@yourbrand.com" value={form.email} onChange={set('email')} />
                                    {errors.email && <p className="input-error">{errors.email}</p>}
                                </div>

                                <div className="input-wrapper">
                                    <label className="input-label" htmlFor="pOrders">Estimated monthly orders (approx.)</label>
                                    <select id="pOrders" className="input input-select" value={form.monthlyOrders} onChange={set('monthlyOrders')}>
                                        <option value="">I'm not sure</option>
                                        <option value="<1000">&lt; 1,000</option>
                                        <option value="1k-10k">1,000 – 10,000</option>
                                        <option value="10k-100k">10,000 – 1,00,000</option>
                                        <option value=">100k">&gt; 1,00,000</option>
                                    </select>
                                </div>

                                <button className="btn btn-primary btn-full btn-lg" type="submit" disabled={loading}>
                                    {loading ? <span className="spinner" /> : 'Submit application →'}
                                </button>
                            </form>
                        ) : (
                            <div className="partner-submitted">
                                <div className="submitted-icon">🎉</div>
                                <h3>Application received!</h3>
                                <p>Thanks for your interest, <strong>{form.brandName}</strong>. Our team will reach out to <strong>{form.email}</strong> within 48 hours.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PartnerPage;
