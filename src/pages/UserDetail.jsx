import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Navbar";
import Footer from "../components/Footer";
import { getUserById } from "../services/api/users";

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadUserDetail();
  }, [id]);

  const loadUserDetail = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await getUserById(id);

      if (result.success) {
        setUser(result.data.data);
      } else {
        setError(result.error || "Failed to load user");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat memuat data");
      console.error("Load user detail error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header />

      <div className="container mx-auto px-4 py-8 flex-grow">
        <Link
          to="/users"
          className="text-red-600 hover:underline mb-4 inline-block"
        >
          ← Back to Users
        </Link>

        {/* Error Message */}
        {error && (
          <div className="bg-red-600 text-white p-4 rounded mb-6">{error}</div>
        )}

        {loading ? (
          <div className="text-white text-center py-20">Loading...</div>
        ) : user ? (
          <div className="bg-gray-900 rounded-lg p-8 max-w-2xl mx-auto">
            <div className="flex flex-col items-center">
              {/* Avatar */}
              <div className="w-48 h-48 rounded-full overflow-hidden mb-6">
                <img
                  src={
                    user.avatar
                      ? `https://rafvoid.my.id${user.avatar}`
                      : "https://rafvoid.my.id/images/default-avatar.png"
                  }
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name */}
              <h1 className="text-white text-3xl font-bold mb-2">
                {user.name}
              </h1>

              {/* Email */}
              <p className="text-gray-400 text-lg mb-6">{user.email}</p>

              {/* Simple Info Card */}
              <div className="bg-gray-800 p-6 rounded w-full">
                <h2 className="text-white text-xl font-bold mb-4">
                  User Information
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">ID:</span>
                    <span className="text-white">{user.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Name:</span>
                    <span className="text-white">{user.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Email:</span>
                    <span className="text-white">{user.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-white text-center py-20">
            <p className="text-xl">User not found</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default UserDetail;
