import React from "react";
import { Edit3, Trash2, Calendar, Clock } from "lucide-react";

const NoteCard = ({ note, onEdit, onDelete }) => {
  // Format dates nicely
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isEdited = note.createdAt !== note.updatedAt;

  return (
    <div className="group bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 flex flex-col h-full justify-between">
      <div>
        {/* Card Header */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-200 break-words line-clamp-2">
            {note.title}
          </h3>
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200 shrink-0">
            <button
              onClick={() => onEdit(note)}
              className="p-2 text-gray-400 hover:text-blue-500 hover:bg-gray-800 rounded-lg transition-all"
              title="Edit Note"
            >
              <Edit3 size={16} />
            </button>
            <button
              onClick={() => onDelete(note.id)}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-gray-800 rounded-lg transition-all"
              title="Delete Note"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* Card Content */}
        <p className="text-gray-400 text-sm mb-6 whitespace-pre-wrap break-words line-clamp-6 leading-relaxed">
          {note.content}
        </p>
      </div>

      {/* Card Footer */}
      <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-800/60 mt-auto shrink-0">
        <div className="flex items-center gap-1">
          <Calendar size={12} />
          <span>{formatDate(note.updatedAt || note.createdAt)}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock size={12} />
          <span>{formatTime(note.updatedAt || note.createdAt)}</span>
          {isEdited && <span className="text-[10px] bg-gray-800 px-1.5 py-0.5 rounded text-gray-400 font-mono">edited</span>}
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
