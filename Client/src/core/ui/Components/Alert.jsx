import React from "react";
import { X, AlertCircle, CheckCircle } from "lucide-react";

const Alert = ({ type = "error", message, className = "", onClose }) => {
  const getAlertStyles = () => {
    switch (type) {
      case "error":
        return "bg-red-50 border-red-200 text-red-700";
      case "success":
        return "bg-green-50 border-green-200 text-green-700";
      default:
        return "bg-blue-50 border-blue-200 text-blue-700";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "error":
        return <AlertCircle className="w-4 h-4" />;
      case "success":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className={`flex items-center gap-3 p-3 border rounded-lg ${getAlertStyles()} ${className}`}>
      {getIcon()}
      <span className="text-sm flex-1">{message}</span>
      {onClose && (
        <button onClick={onClose} className="hover:opacity-70">
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default Alert;