import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchNotes, createNote, updateNote, deleteNote } from "../services/api";
import NoteCard from "../components/NoteCard";
import NoteModal from "../components/NoteModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import Toast from "../components/Toast";
import { LogOut, Plus, Search, FileText, Loader2, AlertCircle } from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Modals state
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  
  // Selection state
  const [selectedNote, setSelectedNote] = useState(null);
  const [noteToDeleteId, setNoteToDeleteId] = useState(null);
  
  // Filtering & Search
  const [searchQuery, setSearchQuery] = useState("");
  
  // Notification State
  const [toast, setToast] = useState({ message: "", type: "success" });

  // Get logged in user details
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const loadNotes = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await fetchNotes();
      setNotes(data);
    } catch (err) {
      setError("Failed to fetch notes. Please refresh or try again later.");
      showToast("Error fetching notes", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleOpenCreateModal = () => {
    setSelectedNote(null);
    setIsNoteModalOpen(true);
  };

  const handleOpenEditModal = (note) => {
    setSelectedNote(note);
    setIsNoteModalOpen(true);
  };

  const handleOpenDeleteModal = (id) => {
    setNoteToDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleNoteSubmit = async ({ title, content }) => {
    try {
      setModalLoading(true);
      if (selectedNote) {
        // Edit Mode
        const updated = await updateNote(selectedNote.id, { title, content });
        setNotes(notes.map((n) => (n.id === selectedNote.id ? updated.note : n)));
        showToast("Note updated successfully");
      } else {
        // Create Mode
        const created = await createNote({ title, content });
        setNotes([created.note, ...notes]);
        showToast("Note created successfully");
      }
      setIsNoteModalOpen(false);
    } catch (err) {
      showToast("Failed to save note. Please try again.", "error");
    } finally {
      setModalLoading(false);
    }
  };

  const handleNoteDelete = async () => {
    try {
      setModalLoading(true);
      await deleteNote(noteToDeleteId);
      setNotes(notes.filter((n) => n.id !== noteToDeleteId));
      showToast("Note deleted successfully");
      setIsDeleteModalOpen(false);
    } catch (err) {
      showToast("Failed to delete note. Please try again.", "error");
    } finally {
      setModalLoading(false);
    }
  };

  // Filter notes based on search query
  const filteredNotes = notes.filter(
    (note) =>
      note.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans flex flex-col">
      {/* Navigation */}
      <nav className="bg-gray-900/60 border-b border-gray-800 backdrop-blur-md sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="text-blue-500" size={28} />
          <h1 className="text-2xl font-bold text-white tracking-tight cursor-pointer" onClick={() => navigate("/")}>
            NotesApp
          </h1>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-sm font-semibold text-white">{user.username}</span>
            <span className="text-xs text-gray-400 font-medium">{user.email}</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 active:bg-gray-650 px-4 py-2.5 rounded-xl border border-gray-700/60 hover:text-white transition duration-200 text-sm font-medium cursor-pointer"
            title="Log Out"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-10 flex flex-col">
        {/* Toolbar Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-white">Your Notes</h2>
            <p className="text-gray-400 text-sm mt-1">Keep track of your cloud configurations, tasks, and code snippets.</p>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-3">
            {/* Search input */}
            <div className="relative flex-1 md:w-80">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                <Search size={18} />
              </span>
              <input
                type="text"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 focus:border-blue-500 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none transition text-sm"
              />
            </div>

            {/* Create button */}
            <button
              onClick={handleOpenCreateModal}
              className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white px-5 py-2.5 rounded-xl shadow-lg shadow-blue-500/20 font-medium text-sm flex items-center gap-2 transition shrink-0 cursor-pointer"
            >
              <Plus size={18} />
              Create Note
            </button>
          </div>
        </div>

        {/* Notes Grid / Display */}
        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center py-20">
            <Loader2 className="text-blue-500 animate-spin mb-4" size={40} />
            <p className="text-gray-400 text-sm">Loading your secure notes...</p>
          </div>
        ) : error ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center max-w-md mx-auto py-20">
            <AlertCircle className="text-red-500 mb-4" size={40} />
            <p className="text-gray-300 font-semibold mb-2">{error}</p>
            <button
              onClick={loadNotes}
              className="mt-2 text-blue-500 hover:text-blue-400 text-sm font-medium underline"
            >
              Try Again
            </button>
          </div>
        ) : filteredNotes.length === 0 ? (
          // Empty State
          <div className="flex-1 flex flex-col items-center justify-center text-center border border-dashed border-gray-800 rounded-3xl p-12 py-20 bg-gray-900/10">
            <div className="bg-gray-900 p-4 rounded-full border border-gray-800 text-gray-500 mb-5">
              <FileText size={36} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              {searchQuery ? "No search results" : "No notes yet"}
            </h3>
            <p className="text-gray-400 text-sm max-w-sm mx-auto mb-6">
              {searchQuery
                ? `We couldn't find any note matching "${searchQuery}". Try editing your query.`
                : "Create your very first note! Keep track of all your AWS configurations, scripts, code snippets, and daily logs."}
            </p>
            {!searchQuery && (
              <button
                onClick={handleOpenCreateModal}
                className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white px-5 py-2.5 rounded-xl shadow-lg shadow-blue-500/20 font-medium text-sm flex items-center gap-2 transition cursor-pointer"
              >
                <Plus size={18} />
                Create Note
              </button>
            )}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={handleOpenEditModal}
                onDelete={handleOpenDeleteModal}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modals */}
      <NoteModal
        isOpen={isNoteModalOpen}
        onClose={() => setIsNoteModalOpen(false)}
        onSubmit={handleNoteSubmit}
        note={selectedNote}
        isLoading={modalLoading}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleNoteDelete}
        isLoading={modalLoading}
      />

      {/* Toasts */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "success" })}
      />
    </div>
  );
}

export default Dashboard;
