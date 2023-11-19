const mongoose = require('mongoose');
const fs = require('fs').promises; // Using promises version of fs
const Painting = require('./models/madhubani');

async function insertImage() {
  try {
    // Connect to MongoDB (make sure your MongoDB server is running)
    await mongoose.connect('mongodb://localhost:27017/Paintings', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Read the image file as a Buffer
    const imageData = await fs.readFile('paintings/madhubani/madhu.jpg');

    // Create a new Painting document
    const newPainting = new Painting({
   
        paintingName: "Madhubani Painting 15",
        artist: "Artist 15",
        price: 650,
        rating: 4.7,
        totalVotes: 1,
            imageData: imageData,
          });

    // Save the document to the database
    const savedPainting = await newPainting.save();

    console.log('Painting saved successfully:', savedPainting);
  } catch (error) {
    console.error('Error during image upload:', error);
  } finally {
    // Close the MongoDB connection
    await mongoose.connection.close();
  }
}

insertImage();





  