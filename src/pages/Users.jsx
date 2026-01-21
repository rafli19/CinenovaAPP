import { useState, useEffect, useRef } from "react";
import Header from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { updateUserProfile, changeUserPassword } from "../services/api/profile";
import { User as UserIcon } from "lucide-react";

const Users = () => {
  const { user, setUser } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [currentPasswordForProfile, setCurrentPasswordForProfile] =
    useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [formToSubmit, setFormToSubmit] = useState(null);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!user) return;

    setName(user.name || "");
    setEmail(user.email || "");

    const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || "User")}&background=4A5568&color=fff&size=200`;

    if (user.avatar && user.avatar.trim()) {
      setAvatarPreview(`https://api.rafvoid.my.id/storage${user.avatar}`);
    } else {
      setAvatarPreview(defaultAvatar);
    }
  }, [user]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const isProfileChanged = () => {
    return name !== user.name || email !== user.email || avatar !== null;
  };

  const openConfirmModal = (formType) => {
    if (formType === "profile") {
      if (!isProfileChanged()) {
        setSuccessMessage("Tidak ada perubahan pada profil.");
        setIsSuccessModalOpen(true);
        return;
      }
      if (!currentPasswordForProfile.trim()) {
        setSuccessMessage(
          "Password saat ini diperlukan untuk mengubah profil.",
        );
        setIsSuccessModalOpen(true);
        return;
      }
    }

    if (formType === "password") {
      if (newPassword !== confirmPassword) {
        setSuccessMessage("Password baru dan konfirmasi tidak cocok.");
        setIsSuccessModalOpen(true);
        return;
      }
      if (newPassword.length < 8) {
        setSuccessMessage("Password baru minimal 8 karakter.");
        setIsSuccessModalOpen(true);
        return;
      }
      if (!currentPassword.trim()) {
        setSuccessMessage(
          "Password saat ini diperlukan untuk mengubah password.",
        );
        setIsSuccessModalOpen(true);
        return;
      }
    }

    setFormToSubmit(formType);
    setIsConfirmModalOpen(true);
  };

  const confirmSubmit = async () => {
    setIsConfirmModalOpen(false);

    if (formToSubmit === "profile") {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("current_password", currentPasswordForProfile);
      if (avatar) formData.append("avatar", avatar);

      try {
        const result = await updateUserProfile(formData);

        if (result.success) {
          const updatedUser = {
            ...user,
            name: result.data.name,
            email: result.data.email,
            avatar: result.data.avatar,
          };

          setUser(updatedUser);

          setSuccessMessage("Perubahan data profil berhasil!");
          setCurrentPasswordForProfile("");
          setAvatar(null);
        } else {
          setSuccessMessage(result.message || "Gagal memperbarui profil.");
        }
        setIsSuccessModalOpen(true);
      } catch (err) {
        setSuccessMessage(
          err.response?.data?.message ||
            "Terjadi kesalahan saat memperbarui profil.",
        );
        setIsSuccessModalOpen(true);
      }
    } else if (formToSubmit === "password") {
      try {
        const result = await changeUserPassword({
          current_password: currentPassword,
          new_password: newPassword,
          new_password_confirmation: confirmPassword,
        });

        if (result.success) {
          setSuccessMessage("Password berhasil diubah!");
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
        } else {
          setSuccessMessage(result.message || "Gagal mengubah password.");
        }
        setIsSuccessModalOpen(true);
      } catch (err) {
        setSuccessMessage(
          err.response?.data?.message ||
            "Terjadi kesalahan saat mengubah password.",
        );
        setIsSuccessModalOpen(true);
      }
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex flex-col">
        <Header />
        <div className="container mx-auto px-4 py-20 flex-grow">
          <div className="text-white text-center">
            <p className="text-xl">Silakan login terlebih dahulu.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header />

      <div className="container mx-auto px-4 py-8 flex-grow pt-20">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-black to-gray-900 rounded-lg"></div>
          <div className="relative z-10 p-6 sm:p-8">
            <h1 className="text-white text-4xl sm:text-5xl font-extrabold mb-2 flex items-center gap-3">
              <UserIcon size={36} />
              My Profile
            </h1>
            <p className="text-gray-300 text-sm sm:text-base">
              Kelola informasi akun Anda
            </p>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 mb-8 max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-4">
            Informasi Profil
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              openConfirmModal("profile");
            }}
          >
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-600 mb-3">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}&background=4A5568&color=fff&size=200`;
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                    <UserIcon size={48} className="text-gray-400" />
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm"
              >
                Ganti Foto
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                autoComplete="name"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                autoComplete="email username"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Password Saat Ini <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={currentPasswordForProfile}
                onChange={(e) => setCurrentPasswordForProfile(e.target.value)}
                placeholder="Masukkan password Anda untuk konfirmasi"
                className="w-full bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                autoComplete="current-password"
                required
              />
              <p className="text-gray-500 text-xs mt-1">
                Diperlukan untuk mengubah nama, email, atau foto profil.
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md font-medium transition"
            >
              Simpan Perubahan
            </button>
          </form>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-4">Ubah Password</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              openConfirmModal("password");
            }}
          >
            <input
              type="text"
              name="username"
              value={email}
              autoComplete="username"
              readOnly
              style={{ display: "none" }}
              aria-hidden="true"
            />

            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Password Saat Ini
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                autoComplete="current-password"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Password Baru
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 pr-12"
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-white text-sm"
                >
                  {showPassword ? "Sembunyikan" : "Tampilkan"}
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Konfirmasi Password Baru
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                autoComplete="new-password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-md font-medium transition"
            >
              Ubah Password
            </button>
          </form>
        </div>
      </div>

      {isConfirmModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-white text-lg font-bold mb-4">Konfirmasi</h3>
            <p className="text-gray-300 mb-6">
              Apakah Anda yakin ingin mengubah data ini? Tindakan ini tidak
              dapat dibatalkan.
            </p>
            <div className="flex gap-3">
              <button
                onClick={confirmSubmit}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-md"
              >
                Ya, Simpan
              </button>
              <button
                onClick={() => setIsConfirmModalOpen(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-md"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {isSuccessModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md text-center">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-white text-lg font-bold mb-2">Berhasil!</h3>
            <p className="text-gray-300 mb-6">{successMessage}</p>
            <button
              onClick={() => setIsSuccessModalOpen(false)}
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-md"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Users;
