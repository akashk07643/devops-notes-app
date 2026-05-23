import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-800">
        <h1 className="text-3xl font-bold text-blue-500 cursor-pointer" onClick={() => navigate("/")}>
          NotesApp
        </h1>

        {token ? (
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-500 px-5 py-2 rounded-lg hover:bg-blue-600 active:bg-blue-700 transition cursor-pointer font-medium"
          >
            Dashboard
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-500 px-5 py-2 rounded-lg hover:bg-blue-600 active:bg-blue-700 transition cursor-pointer font-medium"
          >
            Login
          </button>
        )}
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
          Organize Your Notes <br />
          <span className="text-blue-500">Smartly</span>
        </h1>

        <p className="mt-6 text-gray-400 max-w-2xl text-lg">
          Save your ideas, tasks, AWS commands, DevOps notes, and daily work
          securely in one place.
        </p>

        <div className="mt-8 flex gap-4">
          <button
            onClick={() => navigate(token ? "/dashboard" : "/signup")}
            className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 px-6 py-3 rounded-xl font-semibold transition cursor-pointer shadow-lg shadow-blue-500/20"
          >
            Get Started
          </button>

          <button
            onClick={() => navigate("/login")}
            className="border border-gray-600 hover:border-blue-500 px-6 py-3 rounded-xl transition cursor-pointer"
          >
            Learn More
          </button>
        </div>
      </section>

      {/* Cards */}
      <section className="grid md:grid-cols-3 gap-8 px-10 pb-20 max-w-7xl mx-auto">
        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 hover:scale-105 transition duration-300">
          <h2 className="text-2xl font-bold text-blue-400">Secure Notes</h2>
          <p className="text-gray-400 mt-3">
            Store your notes securely and access them anytime. Uses industry standard hashing and tokens.
          </p>
        </div>

        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 hover:scale-105 transition duration-300">
          <h2 className="text-2xl font-bold text-blue-400">Cloud Sync</h2>
          <p className="text-gray-400 mt-3">
            Sync notes across devices instantly with connection-pooled MS SQL Server storage.
          </p>
        </div>

        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 hover:scale-105 transition duration-300">
          <h2 className="text-2xl font-bold text-blue-400">Fast Access</h2>
          <p className="text-gray-400 mt-3">
            Open, search, filter, and manage notes very quickly with our sleek single-page app interface.
          </p>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
