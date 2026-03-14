// src/pages/Register.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/api/auth";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState({ show: false, type: "", message: "" });
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsPasswordMatch(
      password === passwordConfirmation && password.length > 0,
    );
  }, [password, passwordConfirmation]);

  // Tutup modal otomatis
  useEffect(() => {
    let timer;
    if (modal.show) {
      timer = setTimeout(() => {
        setModal({ show: false, type: "", message: "" });
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [modal.show]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      setModal({
        show: true,
        type: "error",
        message: "Password dan konfirmasi tidak cocok.",
      });
      return;
    }

    setIsLoading(true);

    try {
      const result = await registerUser(
        name,
        email,
        password,
        passwordConfirmation,
      );

      if (result.success) {
        setModal({
          show: true,
          type: "success",
          message: "Registrasi berhasil! Mengarahkan ke halaman login...",
        });
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setModal({
          show: true,
          type: "error",
          message: result.error || "Registrasi gagal. Coba lagi.",
        });
      }
    } catch (err) {
      setModal({
        show: true,
        type: "error",
        message: "Terjadi kesalahan. Silakan coba lagi.",
      });
      console.error("Register error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setModal({ show: false, type: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative">
      {/* Modal */}
      {modal.show && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className={`max-w-md w-full p-6 rounded-lg shadow-lg ${
              modal.type === "success" ? "bg-green-800" : "bg-red-800"
            } text-white`}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-2">
              {modal.type === "success" ? "Berhasil!" : "Gagal!"}
            </h3>
            <p>{modal.message}</p>
            <button
              onClick={closeModal}
              className="mt-4 text-sm underline hover:no-underline"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* Form Register */}
      <div className="bg-gray-900 p-8 rounded-lg w-[400px]">
        <h2 className="text-white text-2xl font-bold mb-6">Register</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-gray-400 text-sm block mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-800 text-white p-3 rounded border border-gray-700 focus:outline-none focus:border-red-600"
              placeholder="Enter your name"
              autoComplete="name"
              required
              disabled={isLoading}
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-400 text-sm block mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-800 text-white p-3 rounded border border-gray-700 focus:outline-none focus:border-red-600"
              placeholder="Enter your email"
              autoComplete="email"
              required
              disabled={isLoading}
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-400 text-sm block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-800 text-white p-3 rounded border border-gray-700 focus:outline-none focus:border-red-600"
              placeholder="Enter your password"
              autoComplete="new-password"
              required
              disabled={isLoading}
            />
          </div>

          <div className="mb-6">
            <label className="text-gray-400 text-sm block mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              className="w-full bg-gray-800 text-white p-3 rounded border border-gray-700 focus:outline-none focus:border-red-600"
              placeholder="Confirm your password"
              autoComplete="new-password"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={!isPasswordMatch || isLoading}
            className={`w-full py-3 rounded transition ${
              isPasswordMatch && !isLoading
                ? "bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-red-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
