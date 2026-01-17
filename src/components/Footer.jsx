import {
  YoutubeIcon,
  InstagramIcon,
  FacebookIcon,
  TwitterIcon,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white mt-8 p-4 sm:p-8 w-full border-t border-gray-800">
      <div className="container mx-auto max-w-6xl">
        {/* Grid utama */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="text-center sm:text-left">
            <div>
              <span className="text-xl font-bold uppercase tracking-widest">
                CineNova
              </span>
            </div>
            <div className="text-gray-400 text-sm mt-2 mb-4">
              Nonton sambil nyantai dulu
            </div>
            <div className="flex flex-row justify-center sm:justify-start gap-4">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-600 transition"
              >
                <YoutubeIcon size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-600 transition"
              >
                <InstagramIcon size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-600 transition"
              >
                <FacebookIcon size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-600 transition"
              >
                <TwitterIcon size={20} />
              </a>
            </div>
          </div>

          {/* Menu */}
          <div className="text-center sm:text-left">
            <div className="text-gray-400 text-sm mb-3 font-semibold">Menu</div>
            <div className="flex flex-col gap-2 items-center sm:items-start">
              <Link
                to="/"
                className="text-white text-sm hover:text-red-600 transition"
              >
                Home
              </Link>
              <Link
                to="/movies"
                className="text-white text-sm hover:text-red-600 transition"
              >
                Movies
              </Link>
            </div>
          </div>

          {/* Account */}
          <div className="text-center sm:text-left">
            <div className="text-gray-400 text-sm mb-3 font-semibold">
              Account
            </div>
            <div className="flex flex-col gap-2 items-center sm:items-start">
              <Link
                to="/login"
                className="text-white text-sm hover:text-red-600 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-white text-sm hover:text-red-600 transition"
              >
                Register
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="text-center sm:text-left">
            <div className="text-gray-400 text-sm mb-3 font-semibold">
              Contact
            </div>
            <div className="flex flex-col gap-3 items-center sm:items-start">
              <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-gray-300">
                <Mail size={16} className="text-gray-400" />
                <span>support@cinenova.com</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-gray-300">
                <Phone size={16} className="text-gray-400" />
                <span>+6281318997051</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-gray-300">
                <MapPin size={16} className="text-gray-400" />
                <span>Jakarta, Indonesia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
          © 2025 CineNova. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
