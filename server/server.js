const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/7up7downGame', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});

const gameSchema = new mongoose.Schema({
  points: Number,
  choice: String,
  bet: Number
});

const Game = mongoose.model('Game', gameSchema);

app.get('/', (req, res) => {
  res.send('7 Up 7 Down Game API');
});

app.post('/rollDice', async (req, res) => {
  try {
    const { points, choice, bet } = req.body;
    const newGame = new Game({ points, choice, bet });
    await newGame.save();
    res.json(newGame);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
