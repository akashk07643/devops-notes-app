import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const NoteModal = ({ isOpen, onClose, onSubmit, note, isLoading }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (note) {
      setTitle(note.title || "");
      setContent(note.content || "");
    } else {
      setTitle("");
      setContent("");
    }
    setError("");
  }, [note, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    onSubmit({ title, content });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-lg shadow-2xl z-10 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white">
            {note ? "Edit Note" : "Create New Note"}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 text-sm bg-red-950/50 border border-red-900/50 text-red-400 rounded-xl">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="title" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError("");
              }}
              placeholder="Enter note title..."
              maxLength={100}
              className="w-full bg-gray-950 border border-gray-800 hover:border-gray-700 focus:border-blue-500 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="content" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Content / Description
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start typing your note here..."
              rows={8}
              className="w-full bg-gray-950 border border-gray-800 hover:border-gray-700 focus:border-blue-500 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition resize-none"
              disabled={isLoading}
            ></textarea>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-800 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-gray-800 hover:border-gray-700 text-gray-300 hover:text-white transition font-medium"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-medium rounded-xl shadow-lg shadow-blue-500/20 transition flex items-center justify-center min-w-[100px]"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : note ? (
                "Save Changes"
              ) : (
                "Create Note"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteModal;
