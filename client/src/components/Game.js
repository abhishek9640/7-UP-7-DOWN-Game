import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPoints, setChoice, setBet, rollDice } from '../redux/gameSlice';

const Game = () => {
  const dispatch = useDispatch();
  const { points, choice, bet, status, error } = useSelector((state) => state.game);

  const handleRollDice = () => {
    const gameData = { points, choice, bet };
    dispatch(rollDice(gameData));
  };

  return (
    <div>
      <h1>7 Up 7 Down Game</h1>
      <input
        type="number"
        value={points}
        onChange={(e) => dispatch(setPoints(Number(e.target.value)))}
        placeholder="Points"
      />
      <input
        type="text"
        value={choice}
        onChange={(e) => dispatch(setChoice(e.target.value))}
        placeholder="Choice"
      />
      <input
        type="number"
        value={bet}
        onChange={(e) => dispatch(setBet(Number(e.target.value)))}
        placeholder="Bet"
      />
      <button onClick={handleRollDice}>Roll Dice</button>
      {status === 'loading' && <p>Rolling dice...</p>}
      {status === 'succeeded' && <p>Points: {points}</p>}
      {status === 'failed' && <p>Error: {error}</p>}
    </div>
  );
};

export default Game;
