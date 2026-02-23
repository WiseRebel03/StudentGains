import React, { useState, useEffect, useRef } from 'react';
import {
    TrendingUp, AlertTriangle, MapPin, RefreshCw,
    DollarSign, CheckCircle, Users, Repeat,
    Phone, Settings, Rocket, ChevronDown,
    Check, Diamond, Star, ArrowRight, Menu, X,
    BarChart2, Shield, Globe, Mail, Building2
} from 'lucide-react';
import './BrandsDeckPage.css';

/* ── DATA ─────────────────────────────────────────────── */

const painPoints = [
    { icon: TrendingUp, title: 'High CAC, Low ROI', text: 'Instagram ads to students cost ₹800–1,500 per acquisition. Most don\'t convert.' },
    { icon: AlertTriangle, title: 'Discount Fraud', text: '30–40% of "student discounts" go to non-students. You\'re bleeding margin.' },
    { icon: MapPin, title: 'Can\'t Reach Tier 2/3 Cities', text: 'Facebook/Instagram ads only reach metro students. You\'re missing 60% of the market.' },
    { icon: RefreshCw, title: 'One-Time Buyers', text: 'You acquire students but they never come back. No retention, no repeat purchases.' },
];

const solutions = [
    { icon: DollarSign, title: 'Pay Only for Results', text: '₹30–50 cost per verified student customer. 10% commission on sales only. No upfront fees. No setup costs. No risk.', link: 'See Pricing →' },
    { icon: CheckCircle, title: '100% Verified Students', text: 'Every student verified via college ID, .ac.in email, or enrollment proof. Zero fraud. Zero discount abuse. Guaranteed.', link: 'How Verification Works →' },
    { icon: Users, title: '50,000 Students Across 100+ Colleges', text: 'IITs, NITs, DU + tier 2/3 colleges in every state. Reach students in Jaipur, Indore, Nagpur — not just Delhi/Mumbai.', link: 'See College List →' },
    { icon: Repeat, title: 'Built-In Retention', text: 'WhatsApp marketing, loyalty programs, abandoned cart recovery. We bring students back 3–5 times per year.', link: 'Learn About Retention →' },
];

const includedFeatures = [
    'Verified student sales (pay only on completed purchases)',
    'Brand listing on platform (logo, products, discount details)',
    'Basic analytics dashboard (sales, conversion, top products)',
    'Student demographics (colleges, age, course data)',
    'Standard email support (48hr response time)',
];

const premiumAddons = [
    { label: 'Advanced insights package', price: '₹25k/month' },
    { label: 'WhatsApp marketing campaigns', price: '₹15k per broadcast' },
    { label: 'Retargeting & cart recovery', price: '12% commission' },
    { label: 'Loyalty program management', price: '₹30k setup + ₹10k/month' },
    { label: 'Campus ambassador program', price: '₹3–5L per quarter' },
    { label: 'Product testing & feedback', price: '₹50k–1L per project' },
    { label: 'Category exclusivity', price: '₹5–10L per year' },
];

const steps = [
    { icon: Phone, num: '01', title: 'Book a Demo (15 min call)', text: 'Tell us about your brand, target students, goals. We\'ll show you the platform, answer questions.', badge: 'Today' },
    { icon: Settings, num: '02', title: 'Set Up Your Offer (1 week)', text: 'Decide student discount (20–30% typical). We create your brand page, upload products.', badge: '5–7 days' },
    { icon: Rocket, num: '03', title: 'Go Live & Start Getting Sales', text: 'Students discover your brand, verify, purchase. You pay 10% commission on each sale.', badge: 'Week 2 onwards' },
];

const pricingTiers = [
    {
        name: 'Starter', badge: 'Free', price: '₹0 upfront', commission: '10% per sale',
        features: ['Basic analytics', 'Email support', 'Brand listing'],
        bestFor: 'Brands testing the platform', cta: 'Get Started', highlight: false,
    },
    {
        name: 'Growth', badge: 'Popular', price: '₹50k/month', commission: '+ 8% per sale',
        features: ['Advanced insights reports', '2 WhatsApp campaigns/month', 'Retargeting & cart recovery', 'Priority support'],
        bestFor: '200+ sales/month', cta: 'Book Demo', highlight: true,
    },
    {
        name: 'Premium', badge: 'Enterprise', price: '₹3L/quarter', commission: '+ 5% per sale',
        features: ['All Growth features', '50 campus ambassadors', 'Product testing', 'Dedicated account manager'],
        bestFor: 'Going all-in on students', cta: 'Contact Sales', highlight: false,
    },
];

const caseStudies = [
    {
        brand: 'Mokobara', category: 'Luggage',
        challenge: 'Student market untapped. Instagram CAC too high.',
        stats: [{ v: '847', l: 'students acquired in 3 months' }, { v: '₹38L', l: 'in sales generated' }, { v: '₹45', l: 'cost per customer vs ₹1,200 on Instagram' }],
        quote: 'This is the first time campus marketing actually worked.',
        by: 'Marketing Head, Mokobara',
    },
    {
        brand: 'Bombay Shaving Co.', category: 'Grooming',
        challenge: 'How to build loyalty with Gen Z men?',
        stats: [{ v: '1,200+', l: 'customers in 4 months' }, { v: '42%', l: 'repeat purchase rate' }, { v: '₹12L', l: 'revenue generated' }],
        quote: 'Students don\'t just buy once — they become loyalists.',
        by: 'Founder, BSC',
    },
    {
        brand: 'Snitch', category: 'Fashion',
        challenge: 'Compete with Myntra/Ajio for student attention.',
        stats: [{ v: '2,100', l: 'students across 60 colleges' }, { v: '340+', l: 'Instagram posts from students' }, { v: '25%', l: 'came from referrals' }],
        quote: 'Students became our best marketers.',
        by: 'CMO, Snitch',
    },
];

const bigStats = [
    { value: '50,000+', label: 'Verified Students' },
    { value: '100+', label: 'Colleges Covered' },
    { value: '₹2.4Cr', label: 'Sales Generated' },
    { value: '15+', label: 'Brand Partners' },
];

const faqs = [
    { q: 'How do you verify students?', a: 'College ID upload + OCR verification, .ac.in email verification, or enrollment proof. 100% verified, zero fraud.' },
    { q: 'What if students don\'t buy?', a: 'You pay zero. Commission only on completed sales. No risk to you.' },
    { q: 'Can I offer different discounts to different colleges?', a: 'Yes. Target IIT students with 20% off, tier-2 colleges with 30% off. Fully flexible.' },
    { q: 'How do I track sales?', a: 'Real-time dashboard. See every sale, student demographics, conversion rates. Weekly email reports.' },
    { q: 'What categories work best?', a: 'Grooming, fashion, luggage, F&B, fitness. Anything students want but find expensive at full price.' },
    { q: 'Do students come back for repeat purchases?', a: 'Yes. 35% average repeat rate. Our loyalty programs + WhatsApp marketing bring them back.' },
    { q: 'How long to see results?', a: 'First sales within 7–10 days of going live. Steady volume by month 2.' },
    { q: 'Can I cancel anytime?', a: 'Yes. No lock-in contracts. Month-to-month. Cancel with 30 days notice.' },
];

const categories = ['Fashion', 'Grooming', 'F&B', 'Luggage', 'Tech', 'Fitness', 'Other'];

/* ── HOOKS ─────────────────────────────────────────────── */

function useFadeIn() {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return [ref, visible];
}

/* ── SUB-COMPONENTS ─────────────────────────────────────── */

function FadeIn({ children, delay = 0, className = '' }) {
    const [ref, visible] = useFadeIn();
    return (
        <div ref={ref} className={`fade-in-obs ${visible ? 'fade-in-obs--visible' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
            {children}
        </div>
    );
}

function SectionLabel({ children, light }) {
    return <div className={`bd-label ${light ? 'bd-label--light' : ''}`}>{children}</div>;
}

function SectionTitle({ children, light, center = true }) {
    return <h2 className={`bd-section-title ${light ? 'bd-section-title--light' : ''} ${center ? 'text-center' : ''}`}>{children}</h2>;
}

function FAQItem({ q, a }) {
    const [open, setOpen] = useState(false);
    return (
        <div className={`bd-faq-item ${open ? 'bd-faq-item--open' : ''}`}>
            <button className="bd-faq-q" onClick={() => setOpen(o => !o)}>
                <span>{q}</span>
                <ChevronDown size={18} className={`bd-faq-chevron ${open ? 'rotate' : ''}`} />
            </button>
            {open && <div className="bd-faq-a">{a}</div>}
        </div>
    );
}

/* ── MAIN PAGE ─────────────────────────────────────────── */

const BrandsDeckPage = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [form, setForm] = useState({ brand: '', name: '', email: '', phone: '', category: '', challenge: '' });
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formLoading, setFormLoading] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }));

    const validate = () => {
        const e = {};
        if (!form.brand.trim()) e.brand = 'Required';
        if (!form.name.trim()) e.name = 'Required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required';
        if (!form.phone.trim()) e.phone = 'Required';
        return e;
    };

    const handleSubmit = async ev => {
        ev.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setFormErrors(errs); return; }
        setFormErrors({});
        setFormLoading(true);
        await new Promise(r => setTimeout(r, 1200));
        setFormLoading(false);
        setFormSubmitted(true);
    };

    return (
        <div className="bd-page">

            {/* ── HEADER ── */}
            <header className={`bd-header ${scrolled ? 'bd-header--scrolled' : ''}`}>
                <div className="bd-header-inner bd-container">
                    <div className="bd-logo">
                        <span className="bd-logo-mark">✦</span>
                        <span className="bd-logo-name">StudentGains</span>
                        <span className="bd-logo-tag">for Brands</span>
                    </div>
                    <nav className="bd-nav">
                        <a href="#how-it-works" className="bd-nav-link">How It Works</a>
                        <a href="#pricing" className="bd-nav-link">Pricing</a>
                        <a href="#faq" className="bd-nav-link">FAQ</a>
                        <a href="#contact" className="bd-cta-btn">Book Demo</a>
                    </nav>
                    <button className="bd-hamburger" onClick={() => setMobileMenuOpen(o => !o)} aria-label="Menu">
                        {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
                {mobileMenuOpen && (
                    <div className="bd-mobile-menu">
                        <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
                        <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
                        <a href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
                        <a href="#contact" className="bd-cta-btn" onClick={() => setMobileMenuOpen(false)}>Book Demo</a>
                    </div>
                )}
            </header>

            {/* ── HERO ── */}
            <section className="bd-hero">
                <div className="bd-hero-bg" />
                <div className="bd-container bd-hero-inner">
                    <div className="bd-hero-content">
                        <FadeIn>
                            <div className="bd-trust-pill">
                                <Shield size={13} /> Trusted by <strong>15+ premium D2C brands</strong>
                            </div>
                        </FadeIn>
                        <FadeIn delay={80}>
                            <h1 className="bd-hero-title">
                                Turn College Students Into<br />
                                <span className="bd-orange">Lifetime Customers</span>
                            </h1>
                        </FadeIn>
                        <FadeIn delay={160}>
                            <p className="bd-hero-sub">
                                Partner with India's largest verified student network. Pay <strong>10% commission only on sales we drive.</strong> No risk. No setup fees.
                            </p>
                        </FadeIn>
                        <FadeIn delay={240}>
                            <div className="bd-hero-ctas">
                                <a href="#contact" className="bd-btn bd-btn--orange">
                                    Start With 100 Students <ArrowRight size={16} />
                                </a>
                                <a href="#how-it-works" className="bd-btn bd-btn--outline">
                                    See How It Works
                                </a>
                            </div>
                        </FadeIn>
                    </div>
                    <FadeIn delay={200} className="bd-hero-visual">
                        <div className="bd-dashboard-mockup">
                            <div className="bd-mockup-bar">
                                <span /><span /><span />
                            </div>
                            <div className="bd-mockup-body">
                                <div className="bd-mockup-stat-row">
                                    {[['₹38L', 'Revenue'], ['847', 'Students'], ['42%', 'Repeat Rate']].map(([v, l]) => (
                                        <div key={l} className="bd-mockup-stat">
                                            <div className="bd-mockup-stat-val">{v}</div>
                                            <div className="bd-mockup-stat-label">{l}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="bd-mockup-chart">
                                    {[40, 65, 50, 80, 70, 95, 85].map((h, i) => (
                                        <div key={i} className="bd-chart-bar" style={{ height: `${h}%` }} />
                                    ))}
                                </div>
                                <div className="bd-mockup-label">Live Sales Dashboard</div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ── PAIN POINTS ── */}
            <section className="bd-section bd-section--gray">
                <div className="bd-container">
                    <FadeIn>
                        <SectionLabel>The Problem</SectionLabel>
                        <SectionTitle>Student Marketing Is Broken. Here's Why:</SectionTitle>
                    </FadeIn>
                    <div className="bd-grid-2">
                        {painPoints.map(({ icon: Icon, title, text }, i) => (
                            <FadeIn key={i} delay={i * 80}>
                                <div className="bd-pain-card">
                                    <div className="bd-pain-icon"><Icon size={20} /></div>
                                    <div>
                                        <h3 className="bd-card-title">{title}</h3>
                                        <p className="bd-card-text">{text}</p>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SOLUTION ── */}
            <section className="bd-section">
                <div className="bd-container">
                    <FadeIn>
                        <SectionLabel>The Solution</SectionLabel>
                        <SectionTitle>We Solve All Four Problems</SectionTitle>
                    </FadeIn>
                    <div className="bd-grid-2">
                        {solutions.map(({ icon: Icon, title, text, link }, i) => (
                            <FadeIn key={i} delay={i * 80}>
                                <div className="bd-solution-card">
                                    <div className="bd-solution-icon"><Icon size={20} /></div>
                                    <h3 className="bd-card-title">{title}</h3>
                                    <p className="bd-card-text">{text}</p>
                                    <a href="#contact" className="bd-card-link">{link}</a>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FEATURES ── */}
            <section className="bd-section bd-section--navy">
                <div className="bd-container">
                    <FadeIn>
                        <SectionLabel light>What You Get</SectionLabel>
                        <SectionTitle light>What's Included in Every Partnership</SectionTitle>
                    </FadeIn>
                    <div className="bd-features-grid">
                        <FadeIn delay={80}>
                            <div className="bd-features-col">
                                <div className="bd-features-col-header">
                                    <CheckCircle size={18} className="bd-orange-icon" />
                                    <span>Included (10% Commission)</span>
                                </div>
                                <ul className="bd-feature-list">
                                    {includedFeatures.map((f, i) => (
                                        <li key={i}><Check size={15} className="bd-check-icon" /> {f}</li>
                                    ))}
                                </ul>
                            </div>
                        </FadeIn>
                        <FadeIn delay={160}>
                            <div className="bd-features-col bd-features-col--premium">
                                <div className="bd-features-col-header">
                                    <Star size={18} className="bd-orange-icon" />
                                    <span>Premium Add-Ons</span>
                                </div>
                                <ul className="bd-addon-list">
                                    {premiumAddons.map(({ label, price }, i) => (
                                        <li key={i}>
                                            <span className="bd-diamond">💎</span>
                                            <span className="bd-addon-label">{label}</span>
                                            <span className="bd-addon-price">{price}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* ── HOW IT WORKS ── */}
            <section className="bd-section" id="how-it-works">
                <div className="bd-container">
                    <FadeIn>
                        <SectionLabel>Process</SectionLabel>
                        <SectionTitle>Get Started in 3 Simple Steps</SectionTitle>
                    </FadeIn>
                    <div className="bd-steps">
                        {steps.map(({ icon: Icon, num, title, text, badge }, i) => (
                            <FadeIn key={i} delay={i * 100}>
                                <div className="bd-step">
                                    <div className="bd-step-num">{num}</div>
                                    <div className="bd-step-icon-wrap"><Icon size={22} /></div>
                                    <span className="bd-step-badge">{badge}</span>
                                    <h3 className="bd-step-title">{title}</h3>
                                    <p className="bd-step-text">{text}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PRICING ── */}
            <section className="bd-section bd-section--gray" id="pricing">
                <div className="bd-container">
                    <FadeIn>
                        <SectionLabel>Pricing</SectionLabel>
                        <SectionTitle>Simple, Performance-Based Pricing</SectionTitle>
                    </FadeIn>
                    <div className="bd-tiers">
                        {pricingTiers.map(({ name, badge, price, commission, features, bestFor, cta, highlight }, i) => (
                            <FadeIn key={i} delay={i * 80}>
                                <div className={`bd-tier ${highlight ? 'bd-tier--highlight' : ''}`}>
                                    {highlight && <div className="bd-tier-popular">Most Popular</div>}
                                    <div className="bd-tier-badge">{badge}</div>
                                    <div className="bd-tier-name">{name}</div>
                                    <div className="bd-tier-price">{price}</div>
                                    <div className="bd-tier-commission">{commission}</div>
                                    <ul className="bd-tier-features">
                                        {features.map((f, j) => (
                                            <li key={j}><Check size={14} className="bd-check-icon" /> {f}</li>
                                        ))}
                                    </ul>
                                    <div className="bd-tier-best-for">Best for: {bestFor}</div>
                                    <a href="#contact" className={`bd-tier-cta ${highlight ? 'bd-btn--orange' : 'bd-btn--outline-navy'}`}>
                                        {cta} <ArrowRight size={14} />
                                    </a>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                    <FadeIn><p className="bd-pricing-note">All plans: No setup fees. Cancel anytime. Custom enterprise plans available.</p></FadeIn>
                </div>
            </section>

            {/* ── CASE STUDIES ── */}
            <section className="bd-section">
                <div className="bd-container">
                    <FadeIn>
                        <SectionLabel>Results</SectionLabel>
                        <SectionTitle>Brands Growing With Us</SectionTitle>
                    </FadeIn>
                    <div className="bd-grid-3">
                        {caseStudies.map(({ brand, category, challenge, stats, quote, by }, i) => (
                            <FadeIn key={i} delay={i * 80}>
                                <div className="bd-case-card">
                                    <div className="bd-case-logo">
                                        <Building2 size={22} />
                                    </div>
                                    <div className="bd-case-brand">{brand}</div>
                                    <div className="bd-case-category">{category}</div>
                                    <div className="bd-case-challenge">"{challenge}"</div>
                                    <div className="bd-case-stats">
                                        {stats.map(({ v, l }, j) => (
                                            <div key={j} className="bd-case-stat">
                                                <span className="bd-case-stat-val">{v}</span>
                                                <span className="bd-case-stat-label">{l}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <blockquote className="bd-case-quote">"{quote}"</blockquote>
                                    <div className="bd-case-by">— {by}</div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── STATS ── */}
            <section className="bd-section bd-section--orange">
                <div className="bd-container">
                    <div className="bd-big-stats">
                        {bigStats.map(({ value, label }, i) => (
                            <FadeIn key={i} delay={i * 80}>
                                <div className="bd-big-stat">
                                    <div className="bd-big-stat-val">{value}</div>
                                    <div className="bd-big-stat-label">{label}</div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section className="bd-section bd-section--gray" id="faq">
                <div className="bd-container bd-container--narrow">
                    <FadeIn>
                        <SectionLabel>FAQ</SectionLabel>
                        <SectionTitle>Frequently Asked Questions</SectionTitle>
                    </FadeIn>
                    <div className="bd-faq-list">
                        {faqs.map((item, i) => (
                            <FadeIn key={i} delay={i * 40}>
                                <FAQItem {...item} />
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FINAL CTA ── */}
            <section className="bd-section bd-cta-section">
                <div className="bd-container bd-container--narrow text-center">
                    <FadeIn>
                        <SectionLabel>Get Started</SectionLabel>
                        <h2 className="bd-cta-title">Ready to Acquire 1,000 Gen Z Customers?</h2>
                        <p className="bd-cta-sub">Book a 15-minute demo. No commitment. See if we're a fit.</p>
                        <div className="bd-cta-buttons">
                            <a href="#contact" className="bd-btn bd-btn--orange bd-btn--lg">
                                Book a Demo <ArrowRight size={18} />
                            </a>
                            <a href="#contact" className="bd-btn bd-btn--outline bd-btn--lg">
                                Download Partnership Guide
                            </a>
                        </div>
                        <div className="bd-risk-reversal">
                            <Shield size={14} /> No setup fees. No upfront costs. Pay only when we deliver sales.
                        </div>
                        <div className="bd-urgency">
                            ⚡ Category exclusivity available for first partner in each category
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ── CONTACT FORM ── */}
            <section className="bd-section bd-section--gray" id="contact">
                <div className="bd-container bd-container--narrow">
                    <FadeIn>
                        <SectionLabel>Contact</SectionLabel>
                        <SectionTitle>Request Partnership Details</SectionTitle>
                        <p className="bd-section-sub">We'll reach out within 24 hours to schedule a demo.</p>
                    </FadeIn>
                    <FadeIn delay={100}>
                        {!formSubmitted ? (
                            <form className="bd-form" onSubmit={handleSubmit}>
                                <div className="bd-form-row">
                                    <div className="bd-field">
                                        <label>Brand Name *</label>
                                        <input type="text" placeholder="Your brand" value={form.brand} onChange={set('brand')} className={formErrors.brand ? 'bd-input-err' : ''} />
                                        {formErrors.brand && <span className="bd-err">{formErrors.brand}</span>}
                                    </div>
                                    <div className="bd-field">
                                        <label>Your Name *</label>
                                        <input type="text" placeholder="Full name" value={form.name} onChange={set('name')} className={formErrors.name ? 'bd-input-err' : ''} />
                                        {formErrors.name && <span className="bd-err">{formErrors.name}</span>}
                                    </div>
                                </div>
                                <div className="bd-form-row">
                                    <div className="bd-field">
                                        <label>Work Email *</label>
                                        <input type="email" placeholder="you@brand.com" value={form.email} onChange={set('email')} className={formErrors.email ? 'bd-input-err' : ''} />
                                        {formErrors.email && <span className="bd-err">{formErrors.email}</span>}
                                    </div>
                                    <div className="bd-field">
                                        <label>Phone *</label>
                                        <input type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={set('phone')} className={formErrors.phone ? 'bd-input-err' : ''} />
                                        {formErrors.phone && <span className="bd-err">{formErrors.phone}</span>}
                                    </div>
                                </div>
                                <div className="bd-field">
                                    <label>Brand Category</label>
                                    <select value={form.category} onChange={set('category')}>
                                        <option value="">Select category...</option>
                                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div className="bd-field">
                                    <label>Biggest Challenge</label>
                                    <textarea rows={4} placeholder="What's your biggest challenge acquiring Gen Z customers?" value={form.challenge} onChange={set('challenge')} />
                                </div>
                                <button type="submit" className="bd-btn bd-btn--orange bd-btn--full bd-btn--lg" disabled={formLoading}>
                                    {formLoading ? <span className="bd-spinner" /> : <>Request Partnership Details <ArrowRight size={16} /></>}
                                </button>
                            </form>
                        ) : (
                            <div className="bd-form-success">
                                <div className="bd-success-icon">🎉</div>
                                <h3>We'll be in touch within 24 hours!</h3>
                                <p>Thanks, <strong>{form.brand}</strong>. Expect a reply at <strong>{form.email}</strong> to schedule a demo.</p>
                            </div>
                        )}
                    </FadeIn>
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer className="bd-footer">
                <div className="bd-container">
                    <div className="bd-footer-top">
                        <div className="bd-logo">
                            <span className="bd-logo-mark">✦</span>
                            <span className="bd-logo-name">StudentGains</span>
                        </div>
                        <nav className="bd-footer-links">
                            <a href="#how-it-works">How It Works</a>
                            <a href="#pricing">Pricing</a>
                            <a href="#faq">FAQ</a>
                            <a href="#contact">Contact</a>
                        </nav>
                        <div className="bd-footer-social">
                            <a href="mailto:brands@studentgains.in" aria-label="Email"><Mail size={18} /></a>
                            <a href="#" aria-label="Website"><Globe size={18} /></a>
                            <a href="#" aria-label="LinkedIn"><BarChart2 size={18} /></a>
                        </div>
                    </div>
                    <div className="bd-footer-bottom">
                        <span>© 2025 StudentGains. All rights reserved.</span>
                        <span className="bd-footer-legal">
                            <a href="#">Privacy Policy</a> · <a href="#">Terms of Service</a>
                        </span>
                    </div>
                </div>
            </footer>

        </div>
    );
};

export default BrandsDeckPage;
