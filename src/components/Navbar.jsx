import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../services/api/auth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // 👈 Ambil path saat ini
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Yakin mau logout?");
    if (!confirmLogout) return;

    try {
      await logoutUser();
      logout();
      navigate("/login");
    } catch (error) {
      console.error("Error logout:", error);
      logout();
      navigate("/login");
    }
  };

  // Tentukan apakah di halaman Home
  const isHomePage = location.pathname === "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isHomePage
          ? "bg-black/40 backdrop-blur-sm" // Transparan di Home
          : "bg-black/95 backdrop-blur-sm shadow-lg" // Solid di halaman lain
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <span className="text-2xl font-bold tracking-wide bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition">
                Cinenova
              </span>
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="sm:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center gap-6">
            <Link
              to="/"
              className="text-white hover:text-gray-300 font-medium transition"
            >
              Home
            </Link>
            <Link
              to="/movies"
              className="text-white hover:text-gray-300 font-medium transition"
            >
              Movies
            </Link>
            {user && (
              <Link
                to="/users"
                className="text-white hover:text-gray-300 font-medium transition"
              >
                My Profile
              </Link>
            )}
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-300 text-sm">Hai, {user.name}!</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-md text-sm font-medium transition shadow-md hover:shadow-lg"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link to="/login">
                  <button className="text-white border border-red-600 hover:bg-red-600 px-4 py-1.5 rounded-md text-sm font-medium transition">
                    Sign In
                  </button>
                </Link>
                <Link to="/register">
                  <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-md text-sm font-medium transition shadow-md hover:shadow-lg">
                    Sign Up
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="sm:hidden mt-4 pb-4 space-y-4 border-t border-gray-700">
            <Link
              to="/"
              className="block text-white hover:text-gray-300 font-medium transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/movies"
              className="block text-white hover:text-gray-300 font-medium transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Movies
            </Link>
            {user && (
              <Link
                to="/users"
                className="block text-white hover:text-gray-300 font-medium transition"
                onClick={() => setIsMenuOpen(false)}
              >
                My Profile
              </Link>
            )}

            {user ? (
              <div className="pt-2 space-y-3">
                <span className="block text-gray-300 text-sm">
                  Hai, {user.name}!
                </span>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition shadow-md"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="pt-2 flex flex-col gap-3">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <button className="w-full text-white border border-red-600 hover:bg-red-600 px-4 py-2 rounded-md text-sm font-medium transition">
                    Sign In
                  </button>
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition shadow-md">
                    Sign Up
                  </button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
