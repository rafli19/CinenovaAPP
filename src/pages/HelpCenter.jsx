import { Link } from "react-router-dom";
import Header from "../components/Navbar";
import Footer from "../components/Footer";

const HelpCenter = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-6">Help Center</h1>
        <p className="text-gray-300 mb-8">
          Butuh bantuan? Kami siap membantu Anda 24/7.
        </p>

        <div className="bg-gray-900 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">Kontak Dukungan</h2>
          <div className="space-y-3">
            <p>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:support@cinenova.com"
                className="text-blue-400 hover:underline"
              >
                support@cinenova.com
              </a>
            </p>
            <p>
              <strong>Telepon:</strong> +6281318997051
            </p>
            <p>
              <strong>Lokasi:</strong> Jakarta, Indonesia
            </p>
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Pertanyaan Umum</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Bagaimana cara mengatur kualitas video?</li>
            <li>Kenapa film tidak muncul di pencarian?</li>
            <li>Bagaimana cara memberi rating film?</li>
            <li>Apakah Cinenova tersedia di TV?</li>
          </ul>
          <p className="mt-4">
            Lihat lebih lengkap di{" "}
            <Link to="/faq" className="text-blue-400 hover:underline">
              FAQ
            </Link>
            .
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HelpCenter;
