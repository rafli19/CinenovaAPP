import { useState, useEffect } from "react";
import Header from "../components/Navbar";
import Footer from "../components/Footer";
import { getMovies } from "../services/api/movies";

const Home = () => {
  const [email, setEmail] = useState("");
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  const loadTrendingMovies = async () => {
    try {
      const result = await getMovies({
        page: 1,
        sort_by: "release_year",
        order: "desc",
      });
      if (result.success) {
        setTrendingMovies(result.data.data.slice(0, 5));
      }
    } catch (err) {
      console.error("Failed to fetch trending movies:", err);
    }
  };

  const handleGetStarted = () => {
    if (!email || !email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }
    alert(`Thanks! We'll send info to: ${email}`);
    setEmail("");
  };

  return (
    <div className="font-sans antialiased text-kakaes-brown bg-black overflow-x-hidden min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section
        className="relative w-full h-[80vh] sm:h-[90vh] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(https://assets.nflxext.com/ffe/siteui/vlv3/e94073b0-a056-402f-9015-16cb1e7e45c2/web/ID-en-20251110-TRIFECTA-perspective_29287120-1497-47a9-8b0a-49e7ded22f31_large.jpg)`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-lg">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Unlimited movies, TV shows, and more
            </h1>
            <p className="font-bold mb-4">
              Starts at IDR 54,000. Cancel anytime.
            </p>
            <p className="mb-6">
              Ready to watch? Enter your email to create or restart your
              membership.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-white bg-[#00000080] border border-gray-600 rounded-md px-4 py-2 w-full sm:w-[300px] outline-none"
                placeholder="Email Address"
              />
              <button
                onClick={handleGetStarted}
                className="bg-[#e50914] text-white px-4 py-2 rounded-md text-sm sm:text-base hover:bg-red-800 transition transform hover:scale-105 w-full sm:w-auto"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Now */}
      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-white font-bold text-xl sm:text-2xl mb-6">
            Trending Now
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {trendingMovies.map((movie, index) => (
              <div key={movie.id} className="relative group">
                <span className="absolute text-white text-2xl sm:text-4xl font-bold bottom-2 left-2 z-10">
                  {index + 1}
                </span>
                <img
                  src={`https://api.rafvoid.my.id${movie.poster}`}
                  alt={movie.title}
                  className="w-full h-40 sm:h-60 object-cover rounded-md transition-transform group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Reasons to Join */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-white font-bold text-xl sm:text-2xl mb-6">
            Other Reasons to Join
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: "Enjoy on your TV",
                desc: "Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.",
              },
              {
                title: "Download this series to watch it offline.",
                desc: "Save your favorites easily so you always have TV shows and movies to watch.",
              },
              {
                title: "Watch anywhere",
                desc: "Stream unlimited movies and TV series on your phone, tablet, laptop, and TV.",
              },
              {
                title: "Create a profile for your child",
                desc: "Send your kids on adventures with their favorite characters in a world created just for them — free with your membership.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-md p-4 sm:p-6 text-white flex flex-col"
              >
                <h3 className="text-lg sm:text-xl font-bold mb-2">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-justify flex-1">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
