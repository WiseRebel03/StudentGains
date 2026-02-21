import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './BrandCard.css';

const BrandCard = ({ brand, onUnlockClick, compact = false }) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    // Clicking anywhere on the card always goes to the brand detail page
    const handleCardClick = () => {
        navigate(`/brands/${brand.id}`);
    };

    // The CTA button: always navigate to brand detail — guest or not
    const handleUnlock = (e) => {
        e.stopPropagation();
        navigate(`/brands/${brand.id}`);
    };

    return (
        <div className={`brand-card card ${compact ? 'brand-card-compact' : ''}`} onClick={handleCardClick} style={{ cursor: 'pointer' }}>
            <div className="brand-card-header">
                <div className="brand-logo" style={{ background: brand.logoColor }}>
                    {brand.logo}
                </div>
                <div className="brand-card-badges">
                    {brand.isFeatured && <span className="badge badge-primary">Featured</span>}
                    {brand.isNew && <span className="badge badge-new">New</span>}
                </div>
            </div>

            <div className="brand-card-body">
                <h3 className="brand-name">{brand.name}</h3>
                <span className="brand-category">{brand.category}</span>
                <div className="brand-discount">
                    <span className="brand-discount-icon">🎁</span>
                    <span className="brand-discount-text">{brand.discountTeaser}</span>
                </div>
            </div>

            <div className="brand-card-footer">
                {user ? (
                    <button className="btn btn-accent btn-sm btn-full" onClick={handleUnlock}>
                        View Offer →
                    </button>
                ) : (
                    <button className="btn btn-primary btn-sm btn-full" onClick={handleUnlock}>
                        🔓 Unlock
                    </button>
                )}
            </div>
        </div>
    );
};

export default BrandCard;
