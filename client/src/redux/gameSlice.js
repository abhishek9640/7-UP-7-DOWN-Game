import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  points: 0,
  choice: '',
  bet: 0,
  status: 'idle',
  error: null
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setPoints: (state, action) => {
      state.points = action.payload;
    },
    setChoice: (state, action) => {
      state.choice = action.payload;
    },
    setBet: (state, action) => {
      state.bet = action.payload;
    },
    rollDiceStart: (state) => {
      state.status = 'loading';
    },
    rollDiceSuccess: (state, action) => {
      state.status = 'succeeded';
      state.points = action.payload.points;
    },
    rollDiceFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    }
  }
});

export const {
  setPoints,
  setChoice,
  setBet,
  rollDiceStart,
  rollDiceSuccess,
  rollDiceFailure
} = gameSlice.actions;

export const rollDice = (gameData) => async (dispatch) => {
  dispatch(rollDiceStart());
  try {
    const response = await axios.post('http://localhost:5000/rollDice', gameData);
    dispatch(rollDiceSuccess(response.data));
  } catch (error) {
    dispatch(rollDiceFailure(error.message));
  }
};

export default gameSlice.reducer;
