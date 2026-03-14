import Header from "../components/Navbar";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-gray-300 mb-8">
          Kebijakan Privasi Cinenova menjelaskan bagaimana kami mengumpulkan,
          menggunakan, dan melindungi informasi Anda.
        </p>

        <div className="bg-gray-900 p-6 rounded-lg space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-2">
              1. Informasi yang Kami Kumpulkan
            </h2>
            <p className="text-gray-300">
              Kami tidak mengumpulkan data pribadi apa pun kecuali Anda secara
              sukarela memberikannya (misalnya saat mengirim formulir kontak).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              2. Penggunaan Informasi
            </h2>
            <p className="text-gray-300">
              Informasi yang dikumpulkan hanya digunakan untuk meningkatkan
              pengalaman pengguna dan memperbaiki layanan.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              3. Cookie dan Teknologi Pelacakan
            </h2>
            <p className="text-gray-300">
              Kami menggunakan cookie untuk menyimpan preferensi pengguna dan
              analisis statistik. Anda dapat menonaktifkan cookie di pengaturan
              browser.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">4. Keamanan Data</h2>
            <p className="text-gray-300">
              Kami menerapkan langkah-langkah keamanan teknis dan organisasi
              untuk melindungi informasi Anda dari akses tidak sah.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">5. Anak-Anak</h2>
            <p className="text-gray-300">
              Layanan ini tidak ditujukan untuk anak di bawah usia 13 tahun.
              Kami tidak secara sengaja mengumpulkan data dari anak-anak.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              6. Perubahan Kebijakan
            </h2>
            <p className="text-gray-300">
              Kami berhak mengubah Kebijakan Privasi ini kapan saja. Perubahan
              akan diberitahukan melalui update di situs ini.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">7. Kontak Kami</h2>
            <p className="text-gray-300">
              Jika Anda memiliki pertanyaan tentang kebijakan privasi ini,
              silakan hubungi kami di{" "}
              <a
                href="mailto:support@cinenova.com"
                className="text-blue-400 hover:underline"
              >
                support@cinenova.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
