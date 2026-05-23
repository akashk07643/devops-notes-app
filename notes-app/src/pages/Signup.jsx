import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/api";
import Toast from "../components/Toast";
import { User, Mail, KeyRound, ArrowRight } from "lucide-react";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { username, email, password, confirmPassword } = formData;

    if (!username.trim() || !email.trim() || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (username.length < 3) {
      setError("Username must be at least 3 characters");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await registerUser({
        username,
        email,
        password,
      });
      setToastMsg("Registration successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      const errMsg = err.response?.data?.message || "Registration failed. Please try again.";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-extrabold text-blue-500 inline-block mb-3">
            NotesApp
          </Link>
          <h2 className="text-2xl font-bold text-white">Create an account</h2>
          <p className="text-gray-400 text-sm mt-2">Get started saving your ideas securely</p>
        </div>

        {error && (
          <div className="mb-6 p-4 text-sm bg-red-950/50 border border-red-900/50 text-red-400 rounded-2xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Username
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-500">
                <User size={18} />
              </span>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="johndoe"
                className="w-full bg-gray-950 border border-gray-800 hover:border-gray-700 focus:border-blue-500 rounded-2xl pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none transition"
                disabled={loading}
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-500">
                <Mail size={18} />
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full bg-gray-950 border border-gray-800 hover:border-gray-700 focus:border-blue-500 rounded-2xl pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none transition"
                disabled={loading}
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-500">
                <KeyRound size={18} />
              </span>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-gray-950 border border-gray-800 hover:border-gray-700 focus:border-blue-500 rounded-2xl pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none transition"
                disabled={loading}
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Confirm Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-500">
                <KeyRound size={18} />
              </span>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-gray-950 border border-gray-800 hover:border-gray-700 focus:border-blue-500 rounded-2xl pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none transition"
                disabled={loading}
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-semibold rounded-2xl py-3.5 px-4 shadow-lg shadow-blue-500/20 transition flex items-center justify-center gap-2 group mt-4 cursor-pointer"
            disabled={loading}
          >
            {loading ? (
              <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                Sign Up
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline font-medium">
            Log In
          </Link>
        </div>
      </div>

      <Toast message={toastMsg} type="success" onClose={() => setToastMsg("")} />
    </div>
  );
}

export default Signup;
