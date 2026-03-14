import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../services/api/auth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = async () => {
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

  const confirmLogout = () => {
    setShowLogoutModal(false);
    handleLogout();
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  const isHomePage = location.pathname === "/";

  return (
    <>
      {/* Modal Konfirmasi Logout */}
      {showLogoutModal && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={cancelLogout}
        >
          <div
            className="bg-gray-900 text-white rounded-lg p-6 max-w-sm w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-4 text-center">
              Konfirmasi Logout
            </h3>
            <p className="text-gray-300 text-center mb-6">
              Apakah Anda yakin ingin logout?
            </p>
            <div className="flex gap-3">
              <button
                onClick={cancelLogout}
                className="flex-1 bg-gray-700 hover:bg-gray-600 py-2 rounded-md transition"
              >
                Batal
              </button>
              <button
                onClick={confirmLogout}
                className="flex-1 bg-red-600 hover:bg-red-700 py-2 rounded-md transition"
              >
                Ya, Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isHomePage
            ? "bg-black/40 backdrop-blur-sm"
            : "bg-black/95 backdrop-blur-sm shadow-lg"
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
                  <span className="text-gray-300 text-sm">
                    Hai, {user.name}!
                  </span>
                  <button
                    onClick={() => setShowLogoutModal(true)}
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
                      setShowLogoutModal(true);
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
    </>
  );
};

export default Navbar;
