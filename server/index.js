const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

const movieList = [
  { id: 1, title: 'Movie 1', description: 'Description of Movie 1' },
  { id: 2, title: 'Movie 2', description: 'Description of Movie 2' },
  { id: 3, title: 'Movie 3', description: 'Description of Movie 3' },
  { id: 4, title: 'Movie 4', description: 'Description of Movie 4' },
  { id: 5, title: 'Movie 5', description: 'Description of Movie 5' },
];

app.use(cors());

app.get('/api/movies', (req, res) => {
  res.json(movieList);
});

app.get('/api/movies/:id', (req, res) => {
  const movieId = parseInt(req.params.id);
  const movie = movieList.find((movie) => movie.id === movieId);
  res.json(movie);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
