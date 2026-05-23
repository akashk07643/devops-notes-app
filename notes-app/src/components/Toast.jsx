import React, { useEffect } from "react";
import { CheckCircle, AlertCircle, X } from "lucide-react";

const Toast = ({ message, type = "success", onClose, duration = 4000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  if (!message) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 bg-gray-900 border border-gray-800 text-white px-5 py-4 rounded-2xl shadow-2xl animate-in slide-in-from-bottom duration-300 max-w-sm">
      {type === "success" ? (
        <CheckCircle className="text-green-500 shrink-0" size={20} />
      ) : (
        <AlertCircle className="text-red-500 shrink-0" size={20} />
      )}
      
      <p className="text-sm font-medium text-gray-200 pr-4">{message}</p>

      <button
        onClick={onClose}
        className="p-1 hover:bg-gray-800 rounded-lg text-gray-500 hover:text-white transition shrink-0 ml-auto"
      >
        <X size={14} />
      </button>
    </div>
  );
};

export default Toast;
