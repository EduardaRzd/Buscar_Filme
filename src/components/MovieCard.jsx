import React from "react";
import { Link } from "react-router-dom";
import "../style.css";

export default function MovieCard({ movie, toggleFavorite, favorites }) {
  const isFavorite = favorites.some(f => f.id === movie.id);

  return (
    <div className="movie-card">
      {movie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
          alt={movie.title}
        />
      ) : (
        <div style={{ width: "100%", height: "270px", background: "#eee" }}>Sem imagem</div>
      )}
      <h3>{movie.title}</h3>
      <p>{movie.release_date?.slice(0, 4)}</p>
      <Link to={`/movie/${movie.id}`}>
        <button>Ver Detalhes</button>
      </Link>
      <button onClick={() => toggleFavorite(movie)}>
        {isFavorite ? "Remover" : "Favoritar"}
      </button>
    </div>
  );
}
