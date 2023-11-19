const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

// express setup
const app = express();
const PORT = 3000;
app.use(bodyParser.json());

// mongo setup
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// for now, assuming dbname is 'mern-project' and collection name is 'artworks'
const dbName = 'mern-project';
const collectionName = 'artworks';
const collection = client.db(dbName).collection(collectionName);

// Dummy data for testing [have to replace this with MongoDb Database]
// let artworks = [
//   { id: 1, title: 'Madhubani ', artist: 'xyz' },
//   { id: 2, title: 'Mysore', artist: 'xyz' },
//   { id: 3, title: 'Kalam', artist: 'xyz' },
 
// ];

// CRUD operations

// Read all artworks
app.get('/artworks', (req, res) => {
  collection.find({}).toArray(function(err, result) {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
    else {
      console.log(result);
      res.json(result);
    }
  });
});

// Read a specific artwork
app.get('/artworks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  
  // find artwork by id, if not found return 404 error
  collection.findOne({id: id}, function(err, result) {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else if (!result) {
      res.status(404).send('Artwork not found');
    } else {
      console.log(result);
      res.json(result);
    }

  });
});

// Create a new artwork
// TODO: add mongodb parts 
// have to check schema first 
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

  // find artwork by id in mongodb, if not found return 404 error
  collection.findOne({id: id}, function(err, result) {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else if (!result) {
      res.status(404).send('Artwork not found');
    } else {

      // can add more fields here but need to check schema first
      const { title, artist } = req.body;
      const updatedArtwork = { id, title, artist };
      // update artwork in mongodb
      collection.updateOne({id: id}, {$set: updatedArtwork}, function(err, result) {
        
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
        } else {
          console.log(result);
          res.json(updatedArtwork);
        }
      });
    }
  });
});

// Delete an artwork
app.delete('/artworks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  
  collection.deleteOne({id: id}, function(err, result) {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else if (!result) {
      res.status(404).send('Artwork not found');
    } else {
      console.log(result);
      res.json(result);
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});