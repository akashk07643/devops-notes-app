const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth");
const { getNotes, createNote, updateNote, deleteNote } = require("../controllers/notesController");

// All notes routes require authentication
router.use(authenticateToken);

// @route   GET /api/notes
// @desc    Get all notes for authenticated user
// @access  Private
router.get("/", getNotes);

// @route   POST /api/notes
// @desc    Create a new note
// @access  Private
router.post("/", createNote);

// @route   PUT /api/notes/:id
// @desc    Update an existing note
// @access  Private
router.put("/:id", updateNote);

// @route   DELETE /api/notes/:id
// @desc    Delete a note
// @access  Private
router.delete("/:id", deleteNote);

module.exports = router;
