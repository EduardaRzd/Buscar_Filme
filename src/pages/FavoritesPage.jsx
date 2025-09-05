import React from "react";
import MovieCard from "../components/MovieCard";

export default function FavoritesPage({ favorites, toggleFavorite }) {
  if (favorites.length === 0) return <p>Nenhum favorito ainda.</p>;

  return (
    <div>
      <h1>Filmes Favoritos</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {favorites.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
            toggleFavorite={toggleFavorite}
            favorites={favorites}
          />
        ))}
      </div>
    </div>
  );
}
