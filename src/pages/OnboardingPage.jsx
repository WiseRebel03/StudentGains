import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';
import StepIndicator from '../components/StepIndicator';
import './OnboardingPage.css';

const STREAMS = ['Engineering', 'Medicine / MBBS', 'Law', 'Commerce / CA', 'Arts & Humanities', 'Science', 'Management / MBA', 'Design', 'Other'];
const CITIES = ['Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Other'];
const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

const OnboardingPage = () => {
    const { updateProfile, user } = useAuth();
    const navigate = useNavigate();
    const showToast = useToast();
    const [step, setStep] = useState(1);

    const [form, setForm] = useState({
        name: user?.name || '',
        college: '',
        stream: '',
        joinYear: '',
        gradYear: '',
        city: '',
    });
    const [errors, setErrors] = useState({});

    const set = (key) => (e) => setForm(prev => ({ ...prev, [key]: e.target.value }));

    const validateStep1 = () => {
        const errs = {};
        if (!form.name.trim()) errs.name = 'Full name is required.';
        if (!form.city) errs.city = 'Please select your city.';
        return errs;
    };

    const validateStep2 = () => {
        const errs = {};
        if (!form.college.trim()) errs.college = 'College name is required.';
        if (!form.stream) errs.stream = 'Please select your stream.';
        if (!form.joinYear) errs.joinYear = 'Please select your joining year.';
        if (!form.gradYear) errs.gradYear = 'Please select your expected graduation year.';
        if (form.joinYear && form.gradYear && parseInt(form.gradYear) <= parseInt(form.joinYear)) {
            errs.gradYear = 'Graduation year must be after joining year.';
        }
        return errs;
    };

    const handleNext = () => {
        const errs = validateStep1();
        if (Object.keys(errs).length > 0) { setErrors(errs); return; }
        setErrors({});
        setStep(2);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validateStep2();
        if (Object.keys(errs).length > 0) { setErrors(errs); return; }
        setErrors({});
        updateProfile({ ...form, onboardingComplete: true });
        showToast('Profile saved! Now get verified.', 'success');
        navigate('/verify');
    };

    return (
        <div className="auth-page">
            <div className="auth-card onboarding-card">
                <div style={{ marginBottom: 'var(--space-2)', textAlign: 'center' }}>
                    <StepIndicator
                        currentStep={step}
                        totalSteps={2}
                        labels={['Your details', 'College info']}
                    />
                </div>

                {step === 1 && (
                    <>
                        <h1 className="onboarding-title">Tell us about yourself</h1>
                        <p className="onboarding-sub">We'll use this to personalise your experience. Step 1 of 2.</p>

                        <div className="onboarding-form">
                            <div className="input-wrapper">
                                <label className="input-label" htmlFor="name">Full name *</label>
                                <input id="name" className="input" type="text" placeholder="Priya Sharma" value={form.name} onChange={set('name')} autoFocus />
                                {errors.name && <p className="input-error">{errors.name}</p>}
                            </div>

                            <div className="input-wrapper">
                                <label className="input-label" htmlFor="email-display">Login email</label>
                                <input id="email-display" className="input" type="email" value={user?.email || ''} disabled style={{ opacity: 0.6, cursor: 'not-allowed' }} />
                                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginTop: 2 }}>This is your login email — can't be changed here.</p>
                            </div>

                            <div className="input-wrapper">
                                <label className="input-label" htmlFor="city">City *</label>
                                <select id="city" className="input input-select" value={form.city} onChange={set('city')}>
                                    <option value="">Select your city</option>
                                    {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                                {errors.city && <p className="input-error">{errors.city}</p>}
                            </div>

                            <button className="btn btn-primary btn-full" type="button" onClick={handleNext}>
                                Next: College details →
                            </button>
                        </div>
                    </>
                )}

                {step === 2 && (
                    <>
                        <h1 className="onboarding-title">Your college details</h1>
                        <p className="onboarding-sub">This helps us verify your student status. Step 2 of 2.</p>

                        <form className="onboarding-form" onSubmit={handleSubmit}>
                            <div className="input-wrapper">
                                <label className="input-label" htmlFor="college">College / University name *</label>
                                <input id="college" className="input" type="text" placeholder="IIT Bombay / DU / VTU..." value={form.college} onChange={set('college')} autoFocus />
                                {errors.college && <p className="input-error">{errors.college}</p>}
                            </div>

                            <div className="input-wrapper">
                                <label className="input-label" htmlFor="stream">Stream / Program *</label>
                                <select id="stream" className="input input-select" value={form.stream} onChange={set('stream')}>
                                    <option value="">Select your stream</option>
                                    {STREAMS.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                                {errors.stream && <p className="input-error">{errors.stream}</p>}
                            </div>

                            <div className="form-row">
                                <div className="input-wrapper">
                                    <label className="input-label" htmlFor="joinYear">Year of joining *</label>
                                    <select id="joinYear" className="input input-select" value={form.joinYear} onChange={set('joinYear')}>
                                        <option value="">Select year</option>
                                        {YEARS.filter(y => y <= currentYear).map(y => <option key={y} value={y}>{y}</option>)}
                                    </select>
                                    {errors.joinYear && <p className="input-error">{errors.joinYear}</p>}
                                </div>

                                <div className="input-wrapper">
                                    <label className="input-label" htmlFor="gradYear">Expected graduation *</label>
                                    <select id="gradYear" className="input input-select" value={form.gradYear} onChange={set('gradYear')}>
                                        <option value="">Select year</option>
                                        {YEARS.filter(y => y >= currentYear).map(y => <option key={y} value={y}>{y}</option>)}
                                    </select>
                                    {errors.gradYear && <p className="input-error">{errors.gradYear}</p>}
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
                                <button type="button" className="btn btn-ghost" style={{ flex: 1 }} onClick={() => { setStep(1); setErrors({}); }}>
                                    ← Back
                                </button>
                                <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>
                                    Continue to Verification →
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default OnboardingPage;
