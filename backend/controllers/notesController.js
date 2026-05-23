const { pool } = require("../config/db");

// Get all notes for the authenticated user
const getNotes = async (req, res) => {
  try {
    const userId = req.user.id;

    const [rows] = await pool.execute(
      "SELECT * FROM Notes WHERE userId = ? ORDER BY updatedAt DESC",
      [userId]
    );

    return res.status(200).json(rows);
  } catch (error) {
    console.error("Get Notes Error:", error.message);
    return res.status(500).json({ message: "Error fetching notes" });
  }
};

// Create a new note
const createNote = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, content } = req.body;

    if (!title || content === undefined) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    // Insert new note
    const [result] = await pool.execute(
      "INSERT INTO Notes (userId, title, content) VALUES (?, ?, ?)",
      [userId, title, content]
    );

    // Fetch the inserted note to return it
    const [rows] = await pool.execute("SELECT * FROM Notes WHERE id = ?", [result.insertId]);

    return res.status(201).json({
      message: "Note created successfully",
      note: rows[0],
    });
  } catch (error) {
    console.error("Create Note Error:", error.message);
    return res.status(500).json({ message: "Error creating note" });
  }
};

// Update an existing note
const updateNote = async (req, res) => {
  try {
    const userId = req.user.id;
    const noteId = req.params.id;
    const { title, content } = req.body;

    if (!title || content === undefined) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    // Check if the note exists and belongs to the user
    const [checkNote] = await pool.execute(
      "SELECT * FROM Notes WHERE id = ? AND userId = ?",
      [noteId, userId]
    );

    if (checkNote.length === 0) {
      return res.status(404).json({ message: "Note not found or unauthorized" });
    }

    // Update note (updatedAt will automatically update via MySQL ON UPDATE CURRENT_TIMESTAMP)
    await pool.execute(
      "UPDATE Notes SET title = ?, content = ? WHERE id = ? AND userId = ?",
      [title, content, noteId, userId]
    );

    // Fetch the updated note to return it
    const [rows] = await pool.execute("SELECT * FROM Notes WHERE id = ?", [noteId]);

    return res.status(200).json({
      message: "Note updated successfully",
      note: rows[0],
    });
  } catch (error) {
    console.error("Update Note Error:", error.message);
    return res.status(500).json({ message: "Error updating note" });
  }
};

// Delete a note
const deleteNote = async (req, res) => {
  try {
    const userId = req.user.id;
    const noteId = req.params.id;

    // Check if the note exists and belongs to the user
    const [checkNote] = await pool.execute(
      "SELECT * FROM Notes WHERE id = ? AND userId = ?",
      [noteId, userId]
    );

    if (checkNote.length === 0) {
      return res.status(404).json({ message: "Note not found or unauthorized" });
    }

    // Delete note
    await pool.execute("DELETE FROM Notes WHERE id = ? AND userId = ?", [noteId, userId]);

    return res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Delete Note Error:", error.message);
    return res.status(500).json({ message: "Error deleting note" });
  }
};

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
};
