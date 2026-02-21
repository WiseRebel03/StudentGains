import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './components/Toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import LandingPage from './pages/LandingPage';
import BrandsPage from './pages/BrandsPage';
import AuthPage from './pages/AuthPage';
import OnboardingPage from './pages/OnboardingPage';
import VerifyPage from './pages/VerifyPage';
import DashboardPage from './pages/DashboardPage';
import BrandDetailPage from './pages/BrandDetailPage';
import PartnerPage from './pages/PartnerPage';
import AdminPage from './pages/AdminPage';

// Protected Route: only accessible when logged in
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

// Public Layout: has Navbar and Footer
const PublicLayout = ({ children }) => (
  <div className="page-wrapper">
    <Navbar />
    <div className="page-content">{children}</div>
    <Footer />
  </div>
);

// Auth Layout: no Navbar/Footer (full-screen)
const AuthLayout = ({ children }) => (
  <div className="page-wrapper">{children}</div>
);

const AppRoutes = () => (
  <Routes>
    {/* Public pages */}
    <Route path="/" element={<PublicLayout><LandingPage /></PublicLayout>} />
    <Route path="/brands" element={<PublicLayout><BrandsPage /></PublicLayout>} />
    <Route path="/brands/:brandId" element={<PublicLayout><BrandDetailPage /></PublicLayout>} />
    <Route path="/partner" element={<PublicLayout><PartnerPage /></PublicLayout>} />

    {/* Auth pages (no nav) */}
    <Route path="/signup" element={<AuthLayout><AuthPage mode="signup" /></AuthLayout>} />
    <Route path="/login" element={<AuthLayout><AuthPage mode="login" /></AuthLayout>} />

    {/* Protected pages */}
    <Route path="/onboarding" element={<ProtectedRoute><AuthLayout><OnboardingPage /></AuthLayout></ProtectedRoute>} />
    <Route path="/verify" element={<ProtectedRoute><PublicLayout><VerifyPage /></PublicLayout></ProtectedRoute>} />
    <Route path="/dashboard" element={<ProtectedRoute><PublicLayout><DashboardPage /></PublicLayout></ProtectedRoute>} />

    {/* Admin */}
    <Route path="/admin" element={<AuthLayout><AdminPage /></AuthLayout>} />

    {/* Fallback */}
    <Route path="*" element={<PublicLayout>
      <div className="container" style={{ textAlign: 'center', padding: '80px 0' }}>
        <div style={{ fontSize: '4rem', marginBottom: '24px' }}>🗺️</div>
        <h2 style={{ marginBottom: '16px' }}>Page not found</h2>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '24px' }}>The page you're looking for doesn't exist.</p>
        <a href="/" className="btn btn-primary">Go home</a>
      </div>
    </PublicLayout>} />
  </Routes>
);

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <ToastProvider>
        <AppRoutes />
      </ToastProvider>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
