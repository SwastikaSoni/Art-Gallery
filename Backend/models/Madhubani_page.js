const mongoose = require('mongoose');

const madhubaniSchema = new mongoose.Schema({
    paintingName: {
        type: String,
        required: true,
      },
      artist: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      rating: {
        type: Number,
        default: 0, // Default value if not provided
      },
      totalVotes: {
        type: Number,
        default: 0, // Default value if not provided
      },
      imageData: {
        type: Buffer, // Binary data for image
        required: true,
      },
});

const Madhubani = mongoose.model('Madhubani', madhubaniSchema, 'madhubanis');

module.exports = Madhubani;
