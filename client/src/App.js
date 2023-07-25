import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState({});
  const [selectedMovie, setSelectedMovie] = useState(null);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/movies`);
      setMovies(response?.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const fetchMovieDetails = async (movieId) => {
    try {
      if (movieDetails[movieId]) {
        setSelectedMovie(movieDetails[movieId]);
      } else {
        const response = await axios.get(`${API_BASE_URL}/movies/${movieId}`);
        const movieData = response.data;
        setMovieDetails((prevMovieDetails) => ({
          ...prevMovieDetails,
          [movieId]: movieData,
        }));
        setSelectedMovie(movieData);
      }
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  useEffect(() => {
    fetchMovies();
  },[]);

  const handleMovieClick = (movieId) => {
    if (selectedMovie === null || selectedMovie.id !== movieId) {
      fetchMovieDetails(movieId);
    }
  };
  return (
    <div style={{ marginLeft: '1rem' }}>
      <h1>List of Movies</h1>
      <ul>
        {movies?.length && movies.map((movie) => (
          <li key={movie.id} style={{ cursor : 'pointer', margin: '.5rem' }} onClick={() => handleMovieClick(movie.id)}>
            {movie.title}
          </li>
        ))}
      </ul>
      {selectedMovie && (
        <div>
          <h2>Movie Details</h2>
          <p>Title: {selectedMovie.title}</p>
          <p>Description: {selectedMovie.description}</p>
        </div>
      )}
    </div>
  );
};

export default App;
