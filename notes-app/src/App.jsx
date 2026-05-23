import React from "react";

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-blue-500">Akash NotesApp</h1>

        <div className="space-x-6 hidden md:flex">
          <a href="#" className="hover:text-blue-400 transition">
            Home
          </a>
          <a href="#" className="hover:text-blue-400 transition">
            Features
          </a>
          <a href="#" className="hover:text-blue-400 transition">
            About
          </a>
          <a href="#" className="hover:text-blue-400 transition">
            Contact
          </a>
        </div>

        <button className="bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-lg font-semibold transition">
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-20">
        
        {/* Left Content */}
        <div className="max-w-xl">
          <h2 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Organize Your <span className="text-blue-500">Notes</span> Easily
          </h2>

          <p className="mt-6 text-gray-400 text-lg">
            Save, manage, and access your notes anytime from anywhere.
            Simple, fast, and secure note-taking experience.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-semibold transition">
              Start Free
            </button>

            <button className="border border-gray-600 hover:border-blue-500 px-6 py-3 rounded-lg font-semibold transition">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Image/Card */}
        <div className="mt-16 md:mt-0">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl p-8 w-[350px]">
            <h3 className="text-2xl font-bold mb-4 text-blue-400">
              My Notes
            </h3>

            <div className="space-y-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold">Meeting Notes</h4>
                <p className="text-gray-400 text-sm mt-1">
                  Discuss project deployment and CI/CD pipeline.
                </p>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold">AWS Commands</h4>
                <p className="text-gray-400 text-sm mt-1">
                  EC2, S3, IAM and Docker setup commands.
                </p>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold">Daily Tasks</h4>
                <p className="text-gray-400 text-sm mt-1">
                  Complete Jenkins pipeline and deployment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-8 md:px-20 py-16 bg-gray-900">
        <h2 className="text-4xl font-bold text-center mb-12">
          Awesome Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          
          <div className="bg-gray-800 p-6 rounded-2xl hover:scale-105 transition">
            <h3 className="text-2xl font-semibold text-blue-400">
              Secure Storage
            </h3>
            <p className="text-gray-400 mt-3">
              Your notes are safely stored and protected.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-2xl hover:scale-105 transition">
            <h3 className="text-2xl font-semibold text-blue-400">
              Fast Access
            </h3>
            <p className="text-gray-400 mt-3">
              Access your notes instantly anytime anywhere.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-2xl hover:scale-105 transition">
            <h3 className="text-2xl font-semibold text-blue-400">
              Cloud Sync
            </h3>
            <p className="text-gray-400 mt-3">
              Sync your notes across multiple devices easily.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 border-t border-gray-800 text-gray-500">
        © 2026 NotesApp. All rights reserved.
      </footer>
    </div>
  );
}

export default App;