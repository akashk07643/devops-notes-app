import React from "react";
import { AlertTriangle } from "lucide-react";

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-md shadow-2xl z-10 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 text-center">
          {/* Warning Icon */}
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-950/50 border border-red-900/50 text-red-500 mb-4">
            <AlertTriangle size={24} />
          </div>

          <h3 className="text-lg font-bold text-white mb-2">Delete Note?</h3>
          <p className="text-gray-400 text-sm mb-6">
            Are you sure you want to delete this note? This action is permanent and cannot be undone.
          </p>

          {/* Actions */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-gray-800 hover:border-gray-700 text-gray-300 hover:text-white transition font-medium text-sm"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-5 py-2.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-medium rounded-xl shadow-lg shadow-red-600/20 transition flex items-center justify-center min-w-[100px] text-sm"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                "Delete Note"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
