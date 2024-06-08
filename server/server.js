const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

let points = 5000;

app.post('/roll-dice', (req, res) => {
  const { betAmount, betType } = req.body;

  const die1 = Math.floor(Math.random() * 6) + 1;
  const die2 = Math.floor(Math.random() * 6) + 1;
  const total = die1 + die2;

  let result = 'lose';
  let multiplier = 0;

  if (total < 7 && betType === '7down') {
    result = 'win';
    multiplier = 2;
  } else if (total > 7 && betType === '7up') {
    result = 'win';
    multiplier = 2;
  } else if (total === 7 && betType === '7') {
    result = 'win';
    multiplier = 5;
  }

  if (result === 'win') {
    points += betAmount * multiplier;
  } else {
    points -= betAmount;
  }

  res.json({
    die1,
    die2,
    total,
    result,
    points,
  });
});

app.get('/points', (req, res) => {
  res.json({ points });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});