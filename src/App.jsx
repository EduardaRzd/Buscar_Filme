import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import FavoritesPage from "./pages/FavoritesPage";

export default function App() {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites") || "[]")
  );

  function toggleFavorite(movie) {
    const exists = favorites.some(f => f.id === movie.id);
    const updated = exists
      ? favorites.filter(f => f.id !== movie.id)
      : [...favorites, movie];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  }

  return (
    <Router>
      <nav style={{ margin: "10px" }}>
        <Link to="/">Busca</Link> | <Link to="/favorites">Favoritos</Link>
      </nav>
      <Routes>
        <Route
          path="/"
          element={<SearchPage favorites={favorites} toggleFavorite={toggleFavorite} />}
        />
        <Route
          path="/movie/:id"
          element={<MovieDetailsPage favorites={favorites} toggleFavorite={toggleFavorite} />}
        />
        <Route
          path="/favorites"
          element={<FavoritesPage favorites={favorites} toggleFavorite={toggleFavorite} />}
        />
      </Routes>
    </Router>
  );
}
