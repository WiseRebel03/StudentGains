import React, { useState } from 'react';
import { brands, CATEGORIES } from '../data/brands';
import BrandCard from '../components/BrandCard';
import { AuthPromptModal } from '../components/Modal';
import './BrandsPage.css';

const BrandsPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('featured');
    const [authModal, setAuthModal] = useState({ open: false, brand: null });

    const filtered = brands
        .filter(b => selectedCategory === 'All' || b.category === selectedCategory)
        .filter(b => {
            if (sortBy === 'new') return b.isNew;
            if (sortBy === 'featured') return true;
            return true;
        })
        .sort((a, b) => {
            if (sortBy === 'featured') return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
            if (sortBy === 'new') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
            return a.name.localeCompare(b.name);
        });

    return (
        <div className="brands-page page-content">
            <div className="brands-hero">
                <div className="container">
                    <h1 className="brands-hero-title">All Verified Discounts</h1>
                    <p className="brands-hero-sub">Exclusive offers for verified Indian students. Sign up to unlock.</p>
                </div>
            </div>

            <div className="container brands-content">
                {/* Filters */}
                <div className="brands-filters">
                    <div className="category-filters">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                className={`category-chip ${selectedCategory === cat ? 'category-chip-active' : ''}`}
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div className="sort-filters">
                        <span className="sort-label">Sort:</span>
                        {[
                            { value: 'featured', label: 'Featured' },
                            { value: 'new', label: 'New' },
                            { value: 'az', label: 'A–Z' },
                        ].map(opt => (
                            <button
                                key={opt.value}
                                className={`sort-chip ${sortBy === opt.value ? 'sort-chip-active' : ''}`}
                                onClick={() => setSortBy(opt.value)}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Count */}
                <p className="brands-count">
                    Showing <strong>{filtered.length}</strong> brand{filtered.length !== 1 ? 's' : ''}
                    {selectedCategory !== 'All' && ` in ${selectedCategory}`}
                </p>

                {/* Grid */}
                {filtered.length > 0 ? (
                    <div className="grid-4">
                        {filtered.map(brand => (
                            <BrandCard key={brand.id} brand={brand} onUnlockClick={(b) => setAuthModal({ open: true, brand: b })} />
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <div className="empty-state-icon">🔍</div>
                        <p className="empty-state-title">No brands in this category yet</p>
                        <p>More brands are added regularly. Check back soon!</p>
                    </div>
                )}
            </div>

            <AuthPromptModal
                isOpen={authModal.open}
                onClose={() => setAuthModal({ open: false, brand: null })}
                brandName={authModal.brand?.name}
            />
        </div>
    );
};

export default BrandsPage;
