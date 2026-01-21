import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/api/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState({ show: false, type: "", message: "" }); // 'success' | 'error'
  const { login } = useAuth();
  const navigate = useNavigate();

  // Tutup modal otomatis setelah 3 detik
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
    setIsLoading(true);

    try {
      const result = await loginUser(email, password);

      if (result.success) {
        login({
          id: result.data.user?.id,
          email,
          name: result.data.user?.name || email,
          token: result.data.token,
        });
        setModal({
          show: true,
          type: "success",
          message: "Login berhasil! Mengarahkan ke dashboard...",
        });
        setTimeout(() => navigate("/movies"), 1500);
      } else {
        setModal({
          show: true,
          type: "error",
          message: result.error || "Login gagal. Coba lagi!",
        });
      }
    } catch (err) {
      setModal({
        show: true,
        type: "error",
        message: "Terjadi kesalahan. Silakan coba lagi.",
      });
      console.error("Login error:", err);
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

      {/* Form Login */}
      <div className="bg-gray-900 p-8 rounded-lg w-[400px]">
        <h2 className="text-white text-2xl font-bold mb-6">Login</h2>

        <form onSubmit={handleSubmit}>
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

          <div className="mb-6">
            <label className="text-gray-400 text-sm block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-800 text-white p-3 rounded border border-gray-700 focus:outline-none focus:border-red-600"
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-red-600 text-white py-3 rounded hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-red-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
