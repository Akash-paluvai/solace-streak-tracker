const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const moodRoutes = require('./routes/mood');
const gratitudeRoutes = require('./routes/gratitude'); // ✅ add this

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/mood', moodRoutes);
app.use('/api/gratitude', gratitudeRoutes); // ✅ register gratitude API

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on port ${process.env.PORT || 3000}`);
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });  