// Backend/server.js
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const UserProfile = require('./models/UserProfile');
const path = require('path');
const Madhubani = require('./models/Madhubani_page'); // Adjust the path as needed
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

app.use(
  session({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: true,
  })
);

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));


const DB_URL = 'mongodb://localhost:27017/Paintings';
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.post('/signup', async (req, res) => {
  console.log("kuch bhi")
  try {
    const newUserProfile = new UserProfile(req.body);
    await newUserProfile.save();
    console.log(newUserProfile)
    // const{name,dob,address,password,email}=await req.body
    // console.log({name,dob,address,password,email})
    req.session.user = newUserProfile;
    res.status(201).json({ message: 'User registered successfully' });
    // res.status(201).json({name,dob,address,password,email})
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserProfile.findOne({ email, password });
    console.log(user)
    
    if (user) {
      req.session.user = user;
      res.status(200).json({ message: 'User signed in successfully',user });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during signin:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update the route to handle both GET and POST requests for /madhubanis
app.route('/madhubanis')
  .get(async (req, res) => {
    try {
      const madhubanis = await Madhubani.find();

      res.status(200).json(madhubanis);
    } catch (error) {
      console.error('Error fetching madhubanis:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });



  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });