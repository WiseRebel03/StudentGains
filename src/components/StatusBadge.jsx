import React from 'react';
import './StatusBadge.css';

const STATUS_CONFIG = {
    not_verified: {
        label: 'Not Verified',
        icon: '○',
        className: 'status-not-verified',
        description: 'You have not verified your student status yet.',
    },
    pending: {
        label: 'Pending Review',
        icon: '⏳',
        className: 'status-pending',
        description: 'Your documents are being reviewed. This usually takes 1–2 business days.',
    },
    verified: {
        label: 'Verified Student',
        icon: '✓',
        className: 'status-verified',
        description: 'Your student status is verified.',
    },
};

export const StatusBadge = ({ status, size = 'default' }) => {
    const config = STATUS_CONFIG[status] || STATUS_CONFIG.not_verified;
    return (
        <span className={`status-badge ${config.className} ${size === 'sm' ? 'status-badge-sm' : ''}`}>
            <span className="status-icon">{config.icon}</span>
            {config.label}
        </span>
    );
};

export const StatusCard = ({ status, expiryDate, onVerifyClick }) => {
    const config = STATUS_CONFIG[status] || STATUS_CONFIG.not_verified;

    return (
        <div className={`status-card ${config.className}-card`}>
            <div className="status-card-left">
                <div className={`status-card-icon-wrap ${config.className}`}>
                    {config.icon}
                </div>
                <div>
                    <h4 className="status-card-title">{config.label}</h4>
                    <p className="status-card-desc">{config.description}</p>
                    {status === 'verified' && expiryDate && (
                        <p className="status-expiry">Valid until: <strong>{new Date(expiryDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</strong></p>
                    )}
                </div>
            </div>
            {status !== 'verified' && (
                <button className="btn btn-primary btn-sm" onClick={onVerifyClick}>
                    {status === 'pending' ? 'Check Status' : 'Get Verified →'}
                </button>
            )}
        </div>
    );
};

export default StatusBadge;
