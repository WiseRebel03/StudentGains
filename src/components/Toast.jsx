import React, { useState, useCallback } from 'react';

const toastContext = React.createContext(null);

let toastId = 0;

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const showToast = useCallback((message, type = 'info', duration = 3500) => {
        const id = ++toastId;
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, duration);
    }, []);

    return (
        <toastContext.Provider value={showToast}>
            {children}
            <div className="toast-container">
                {toasts.map(toast => (
                    <div key={toast.id} className={`toast toast-${toast.type}`}>
                        {toast.message}
                    </div>
                ))}
            </div>
        </toastContext.Provider>
    );
};

export const useToast = () => {
    const ctx = React.useContext(toastContext);
    if (!ctx) throw new Error('useToast must be used inside ToastProvider');
    return ctx;
};

export default ToastProvider;
