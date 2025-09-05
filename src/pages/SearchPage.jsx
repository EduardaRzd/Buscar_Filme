import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { searchMovies } from "../services/api";
import "../Style.css";

export default function SearchPage({ favorites, toggleFavorite }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    setError("");
    searchMovies(query, page)
      .then(data => {
        setResults(data.results || []);
        setTotalPages(data.total_pages || 1);
      })
      .catch(() => setError("Erro ao buscar filmes"))
      .finally(() => setLoading(false));
  }, [query, page]);

  return (
    <div>
      <h1>Busca de Filmes</h1>
      <input
        type="text"
        placeholder="Digite o nome do filme"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      {loading && <p style={{ textAlign: "center" }}>Carregando...</p>}
      {error && <p style={{ textAlign: "center" }}>{error}</p>}
      <div className="movies-grid">
        {results.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
            toggleFavorite={toggleFavorite}
            favorites={favorites}
          />
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => setPage(p => Math.max(p - 1, 1))}>Anterior</button>
        <span> {page} / {totalPages} </span>
        <button onClick={() => setPage(p => Math.min(p + 1, totalPages))}>Próximo</button>
      </div>
    </div>
  );
}
