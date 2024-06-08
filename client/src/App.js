import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button, Typography, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const App = () => {
  const [points, setPoints] = useState(5000);
  const [betAmount, setBetAmount] = useState(100);
  const [betType, setBetType] = useState('7down');
  const [diceResult, setDiceResult] = useState(null);

  useEffect(() => {
    const fetchPoints = async () => {
      const response = await axios.get('/api/points');
      setPoints(response.data.points);
    };
    fetchPoints();
  }, []);

  const handleRollDice = async () => {
    const response = await axios.post('/api/roll-dice', {
      betAmount,
      betType,
    });
    setDiceResult(response.data);
    setPoints(response.data.points);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: 'center', mt: 5 }}>
        <Typography variant="h4" gutterBottom>7 Up 7 Down Game</Typography>
        <Typography variant="h6">Points: {points}</Typography>

        <FormControl fullWidth sx={{ my: 2 }}>
          <InputLabel>Bet Amount</InputLabel>
          <Select value={betAmount} onChange={(e) => setBetAmount(e.target.value)}>
            <MenuItem value={100}>100</MenuItem>
            <MenuItem value={200}>200</MenuItem>
            <MenuItem value={500}>500</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ my: 2 }}>
          <InputLabel>Bet Type</InputLabel>
          <Select value={betType} onChange={(e) => setBetType(e.target.value)}>
            <MenuItem value={'7down'}>7 Down</MenuItem>
            <MenuItem value={'7'}>7</MenuItem>
            <MenuItem value={'7up'}>7 Up</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" onClick={handleRollDice}>Roll Dice</Button>

        {diceResult && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Dice Result: {diceResult.die1} + {diceResult.die2} = {diceResult.total}</Typography>
            <Typography variant="h6">You {diceResult.result}!</Typography>
            <Typography variant="h6">New Points: {diceResult.points}</Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default App;
