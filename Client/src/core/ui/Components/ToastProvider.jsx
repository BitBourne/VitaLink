import React, { createContext, useContext, useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

const ToastContext = createContext();

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within ToastProvider');
    }
    return context;
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = (message, type = 'success') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => removeToast(id), 4000);
    };

    const removeToast = (id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    const success = (message) => addToast(message, 'success');
    const error = (message) => addToast(message, 'error');
    const info = (message) => addToast(message, 'info');

    return (
        <ToastContext.Provider value={{ success, error, info }}>
            {children}
            <div className="fixed bottom-4 right-4 z-50 space-y-2">
                {toasts.map(toast => (
                    <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
                ))}
            </div>
        </ToastContext.Provider>
    );
};

const Toast = ({ message, type, onClose }) => {
    const icons = {
        success: { Icon: CheckCircle, class: 'bg-green-50 border-green-200 text-green-800' },
        error: { Icon: XCircle, class: 'bg-red-50 border-red-200 text-red-800' },
        info: { Icon: AlertCircle, class: 'bg-blue-50 border-blue-200 text-blue-800' }
    };

    const { Icon, class: className } = icons[type] || icons.info;

    return (
        <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg animate-slide-in ${className} min-w-[300px] max-w-md`}>
            <Icon className="w-5 h-5 flex-shrink-0" />
            <p className="flex-1 text-sm font-medium">{message}</p>
            <button onClick={onClose} className="flex-shrink-0 hover:opacity-70">
                <X className="w-4 h-4" />
            </button>
        </div>
    );
};

export default ToastProvider;
