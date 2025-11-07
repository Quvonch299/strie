import React, { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");

  const GetPopular = async () => {
    try {
      const res = await axios.get(
        "https://api.themoviedb.org/3/discover/movie",
        {
          params: {
            sort_by: "popularity.desc",
            api_key: "3fd2be6f0c70a2a598f084ddfb75487c",
          },
        }
      );
      setMovies(res.data.results);
    } catch (e) {
      console.log("Xato:", e);
    }
  };

  const SearchMovies = async (e) => {
    e.preventDefault();
    if (query.trim() == "") {
      GetPopular();
      return
    }
    try {
      const res = await axios.get(
        "https://api.themoviedb.org/3/search/movie",
        {
          params: {
            query,
            api_key: "3fd2be6f0c70a2a598f084ddfb75487c",
          },
        }
      );
      setMovies(res.data.results);
    } catch (e) {
      console.log("Xato:", e);
    }
  };

  useEffect(() => {
    GetPopular();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-8">🎬 Mashhur Filmlar</h1>

      <form
        onSubmit={SearchMovies}
        className="flex justify-center mb-10 gap-3"
      >
        <input
          type="text"
          placeholder="Film nomini yozing..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-4 py-2 w-72 rounded-lg text-black focus:outline-none"
        />
        <button
          type="submit"
          className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Qidirish
        </button>
      </form>

      <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://via.placeholder.com/500x750?text=No+Image"
                }
                alt={movie.title}
                className="w-full h-80 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2 truncate">
                  {movie.title}
                </h2>
                <p className="text-sm text-gray-400">
                  ⭐ {movie.vote_average} | 🗓 {movie.release_date}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-400">
            Hech narsa topilmadi 😔
          </p>
        )}
      </div>
    </div>
  );
}
