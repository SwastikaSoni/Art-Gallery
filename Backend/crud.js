const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Dummy data for testing [have to replace this with MongoDb Database]
let artworks = [
  { id: 1, title: 'Madhubani ', artist: 'xyz' },
  { id: 2, title: 'Mysore', artist: 'xyz' },
  { id: 3, title: 'Kalam', artist: 'xyz' },
 
];

// CRUD operations

// Read all artworks
app.get('/artworks', (req, res) => {
  res.json(artworks);
});

// Read a specific artwork
app.get('/artworks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const artwork = artworks.find((a) => a.id === id);

  if (artwork) {
    res.json(artwork);
  } else {
    res.status(404).json({ error: 'Artwork not found' });
  }
});

// Create a new artwork
app.post('/artworks', (req, res) => {
  const { title, artist } = req.body;
  const id = artworks.length + 1;
  const newArtwork = { id, title, artist };
  artworks.push(newArtwork);
  res.json(newArtwork);
});

// Update an artwork
app.put('/artworks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = artworks.findIndex((a) => a.id === id);

  if (index !== -1) {
    artworks[index] = { id, ...req.body };
    res.json(artworks[index]);
  } else {
    res.status(404).json({ error: 'Artwork not found' });
  }
});

// Delete an artwork
app.delete('/artworks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  artworks = artworks.filter((a) => a.id !== id);
  res.json({ message: 'Artwork deleted successfully' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});