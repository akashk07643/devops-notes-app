import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add Authorization interceptor
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth endpoints
export const loginUser = async (credentials) => {
  const response = await API.post("/auth/login", credentials);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await API.post("/auth/register", userData);
  return response.data;
};

// Notes endpoints
export const fetchNotes = async () => {
  const response = await API.get("/notes");
  return response.data;
};

export const createNote = async (noteData) => {
  const response = await API.post("/notes", noteData);
  return response.data;
};

export const updateNote = async (id, noteData) => {
  const response = await API.put(`/notes/${id}`, noteData);
  return response.data;
};

export const deleteNote = async (id) => {
  const response = await API.delete(`/notes/${id}`);
  return response.data;
};

export default API;
