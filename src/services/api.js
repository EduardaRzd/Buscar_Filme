const API_KEY = "0d76c1080eac030fe2b995b58764d7d5";
const BASE_URL = "https://api.themoviedb.org/3";

export async function searchMovies(query, page = 1) {
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
  );
  const data = await res.json();
  return data;
}

export async function getMovieDetails(movieId) {
  const res = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits`
  );
  const data = await res.json();
  return data;
}
