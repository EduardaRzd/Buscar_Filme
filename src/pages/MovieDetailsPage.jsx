import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/api";

export default function MovieDetailsPage({ favorites, toggleFavorite }) {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMovieDetails(id)
      .then(data => setMovie(data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (!movie) return <p>Filme não encontrado</p>;

  const isFavorite = favorites.some(f => f.id === movie.id);

  return (
    <div>
      <h1>{movie.title}</h1>
      {movie.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
          alt={movie.title}
        />
      )}
      <p>Ano: {movie.release_date?.slice(0, 4)}</p>
      <p>Sinopse: {movie.overview}</p>
      <p>Avaliação: {movie.vote_average}</p>
      <p>Diretor: {movie.credits?.crew?.find(c => c.job === "Director")?.name || "N/A"}</p>
      <p>Elenco: {movie.credits?.cast?.slice(0, 5).map(c => c.name).join(", ") || "N/A"}</p>
      <button onClick={() => toggleFavorite(movie)}>
        {isFavorite ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
      </button>
    </div>
  );
}
