import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Modal.css';

const Modal = ({ isOpen, onClose, title, children }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="overlay" onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
                {title && <h3 className="modal-title">{title}</h3>}
                {children}
            </div>
        </div>
    );
};

export const AuthPromptModal = ({ isOpen, onClose, brandName }) => {
    const navigate = useNavigate();

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="auth-modal-content">
                <div className="auth-modal-icon">🔒</div>
                <h3 className="auth-modal-title">Unlock {brandName ? `${brandName} discount` : 'this discount'}</h3>
                <p className="auth-modal-desc">
                    Create a free account, verify your student status, and get access to exclusive discounts from 20+ brands.
                </p>
                <div className="auth-modal-actions">
                    <button className="btn btn-primary btn-full" onClick={() => { onClose(); navigate('/signup'); }}>
                        Sign up free — it's quick
                    </button>
                    <button className="btn btn-ghost btn-full" onClick={() => { onClose(); navigate('/login'); }}>
                        Already a student? Login
                    </button>
                </div>
                <p className="auth-modal-footer">
                    🔒 We only share your verification status with brands, not your personal details.
                </p>
            </div>
        </Modal>
    );
};

export default Modal;
