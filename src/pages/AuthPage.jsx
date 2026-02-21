import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';
import OtpInput from '../components/OtpInput';

const AuthPage = ({ mode }) => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const showToast = useToast();

    const [step, setStep] = useState('email'); // 'email' | 'otp'
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const isSignup = mode === 'signup';

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setError('');
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }
        setLoading(true);
        // Simulate API call
        await new Promise(r => setTimeout(r, 1200));
        setLoading(false);
        setStep('otp');
        showToast('OTP sent to your email!', 'success');
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError('');
        if (otp.length !== 6) {
            setError('Please enter the complete 6-digit OTP.');
            return;
        }
        setLoading(true);
        // Simulate API call — accept any 6-digit OTP for demo
        await new Promise(r => setTimeout(r, 1200));
        setLoading(false);

        login({ email, name: '', onboardingComplete: !isSignup });
        showToast(`Welcome${isSignup ? '' : ' back'}!`, 'success');

        if (isSignup) {
            navigate('/onboarding');
        } else {
            navigate('/dashboard');
        }
    };

    const handleResend = async () => {
        setLoading(true);
        await new Promise(r => setTimeout(r, 800));
        setLoading(false);
        showToast('OTP resent!', 'info');
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
                    <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', textDecoration: 'none' }}>
                        <span style={{ color: 'var(--color-primary)', fontSize: '1.2rem' }}>✦</span>
                        <span style={{ fontWeight: 800, fontSize: '1.1rem', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>StudentGains</span>
                    </Link>
                </div>

                {step === 'email' ? (
                    <>
                        <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800, marginBottom: 'var(--space-2)', letterSpacing: '-0.02em' }}>
                            {isSignup ? 'Create your account' : 'Welcome back'}
                        </h1>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-8)' }}>
                            {isSignup
                                ? 'Sign up to unlock exclusive gains across 20+ brands.'
                                : 'Log in to access your student discounts and verification status.'}
                        </p>

                        <form onSubmit={handleSendOtp}>
                            <div className="input-wrapper" style={{ marginBottom: 'var(--space-5)' }}>
                                <label className="input-label" htmlFor="email">Email address</label>
                                <input
                                    id="email"
                                    className="input"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    autoComplete="email"
                                    autoFocus
                                />
                                {error && <p className="input-error">{error}</p>}
                            </div>

                            <button className="btn btn-primary btn-full btn-lg" type="submit" disabled={loading}>
                                {loading ? <span className="spinner" /> : `${isSignup ? 'Continue' : 'Get OTP'} →`}
                            </button>
                        </form>

                        <div style={{ textAlign: 'center', marginTop: 'var(--space-6)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
                            {isSignup ? (
                                <>Already have an account? <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Log in</Link></>
                            ) : (
                                <>New here? <Link to="/signup" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Create an account</Link></>
                            )}
                        </div>

                        <p style={{ textAlign: 'center', marginTop: 'var(--space-5)', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', background: 'var(--color-surface-alt)', padding: 'var(--space-3)', borderRadius: 'var(--radius-sm)' }}>
                            🔒 We never share your personal details with brands.
                        </p>
                    </>
                ) : (
                    <>
                        <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-3)' }}>📬</div>
                            <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800, marginBottom: 'var(--space-2)', letterSpacing: '-0.02em' }}>
                                Check your email
                            </h2>
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                                We sent a 6-digit OTP to<br />
                                <strong style={{ color: 'var(--color-text)' }}>{email}</strong>
                            </p>
                        </div>

                        <form onSubmit={handleVerifyOtp}>
                            <OtpInput value={otp} onChange={setOtp} length={6} />
                            {error && <p className="input-error" style={{ textAlign: 'center', marginBottom: 'var(--space-4)' }}>{error}</p>}

                            <button className="btn btn-primary btn-full btn-lg" type="submit" disabled={loading || otp.length !== 6}>
                                {loading ? <span className="spinner" /> : 'Verify OTP →'}
                            </button>
                        </form>

                        <div style={{ textAlign: 'center', marginTop: 'var(--space-5)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
                            Didn't receive it?{' '}
                            <button onClick={handleResend} disabled={loading} style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontWeight: 600, cursor: 'pointer', fontSize: 'inherit' }}>
                                Resend OTP
                            </button>
                        </div>

                        <div style={{ textAlign: 'center', marginTop: 'var(--space-3)' }}>
                            <button onClick={() => { setStep('email'); setOtp(''); setError(''); }} style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', cursor: 'pointer' }}>
                                ← Change email
                            </button>
                        </div>

                        <p style={{ textAlign: 'center', marginTop: 'var(--space-5)', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                            💡 <em>Demo: Enter any 6-digit number to proceed</em>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default AuthPage;
