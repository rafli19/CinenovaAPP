import { Link } from "react-router-dom";
import Header from "../components/Navbar";
import Footer from "../components/Footer";

const FAQ = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-6">Frequently Asked Questions</h1>
        <p className="text-gray-300 mb-8">
          Temukan jawaban atas pertanyaan umum tentang Cinenova.
        </p>

        <div className="space-y-6">
          <div className="bg-gray-900 p-5 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Apa itu Cinenova?</h3>
            <p className="text-gray-300">
              Cinenova adalah platform streaming film gratis dengan koleksi
              terbaru dan klasik, tersedia dalam berbagai genre dan bahasa.
            </p>
          </div>

          <div className="bg-gray-900 p-5 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">
              Apakah Cinenova gratis?
            </h3>
            <p className="text-gray-300">
              Ya! Semua film di Cinenova bisa ditonton secara gratis tanpa
              langganan atau iklan mengganggu.
            </p>
          </div>

          <div className="bg-gray-900 p-5 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">
              Bagaimana cara menonton film?
            </h3>
            <p className="text-gray-300">
              Cukup klik judul film, lalu tekan tombol “Play”. Tidak perlu login
              — langsung tonton!
            </p>
          </div>

          <div className="bg-gray-900 p-5 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">
              Mengapa saya tidak bisa memutar film?
            </h3>
            <p className="text-gray-300">
              Pastikan browser Anda mendukung HTML5 video dan tidak memblokir
              autoplay. Jika masih bermasalah, coba refresh atau gunakan browser
              lain.
            </p>
          </div>

          <div className="bg-gray-900 p-5 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">
              Bagaimana cara melaporkan masalah?
            </h3>
            <p className="text-gray-300">
              Kunjungi{" "}
              <Link to="/help-center" className="text-blue-400 hover:underline">
                Help Center
              </Link>{" "}
              atau email ke{" "}
              <a
                href="mailto:support@cinenova.com"
                className="text-blue-400 hover:underline"
              >
                support@cinenova.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FAQ;
