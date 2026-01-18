import Header from "../components/Navbar";
import Footer from "../components/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
        <p className="text-gray-300 mb-8">
          Harap baca Syarat dan Ketentuan ini sebelum menggunakan layanan
          Cinenova.
        </p>

        <div className="bg-gray-900 p-6 rounded-lg space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-2">1. Penerimaan Syarat</h2>
            <p className="text-gray-300">
              Dengan mengakses atau menggunakan situs web Cinenova, Anda setuju
              untuk terikat oleh Syarat dan Ketentuan ini.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              2. Penggunaan Layanan
            </h2>
            <p className="text-gray-300">
              Anda hanya boleh menggunakan layanan ini untuk tujuan pribadi dan
              non-komersial. Dilarang keras untuk mengunduh, mereproduksi, atau
              mendistribusikan konten tanpa izin.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              3. Hak Kekayaan Intelektual
            </h2>
            <p className="text-gray-300">
              Semua konten di Cinenova, termasuk film, logo, dan desain,
              dilindungi oleh hak cipta dan hukum kekayaan intelektual.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              4. Batasan Tanggung Jawab
            </h2>
            <p className="text-gray-300">
              Cinenova tidak bertanggung jawab atas kerugian langsung, tidak
              langsung, atau konsekuensial akibat penggunaan layanan ini.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">5. Perubahan Syarat</h2>
            <p className="text-gray-300">
              Kami berhak mengubah Syarat dan Ketentuan ini kapan saja.
              Perubahan akan berlaku segera setelah diposting di situs ini.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              6. Hukum yang Berlaku
            </h2>
            <p className="text-gray-300">
              Syarat dan Ketentuan ini diatur oleh hukum Republik Indonesia.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsOfService;
