import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/api";
import Toast from "../components/Toast";
import { KeyRound, Mail, ArrowRight } from "lucide-react";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.emailOrUsername.trim()) {
      setError("Email or Username is required");
      return;
    }
    if (!formData.password) {
      setError("Password is required");
      return;
    }

    try {
      setLoading(true);
      const data = await loginUser(formData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setToastMsg("Login successful! Redirecting...");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      const errMsg = err.response?.data?.message || "Failed to log in. Please check your credentials.";
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
          <h2 className="text-2xl font-bold text-white">Welcome back</h2>
          <p className="text-gray-400 text-sm mt-2">Log in to manage your notes securely</p>
        </div>

        {error && (
          <div className="mb-6 p-4 text-sm bg-red-950/50 border border-red-900/50 text-red-400 rounded-2xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email / Username */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Email or Username
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-500">
                <Mail size={18} />
              </span>
              <input
                type="text"
                name="emailOrUsername"
                value={formData.emailOrUsername}
                onChange={handleChange}
                placeholder="Enter your email or username"
                className="w-full bg-gray-950 border border-gray-800 hover:border-gray-700 focus:border-blue-500 rounded-2xl pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none transition"
                disabled={loading}
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
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

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-semibold rounded-2xl py-3.5 px-4 shadow-lg shadow-blue-500/20 transition flex items-center justify-center gap-2 group cursor-pointer"
            disabled={loading}
          >
            {loading ? (
              <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                Log In
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline font-medium">
            Sign Up
          </Link>
        </div>
      </div>

      <Toast message={toastMsg} type="success" onClose={() => setToastMsg("")} />
    </div>
  );
}

export default Login;
