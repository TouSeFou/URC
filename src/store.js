import { configureStore, createSlice } from '@reduxjs/toolkit';

// Création d'un slice d'état pour un compteur
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    }
  }
});

// Le reducer de ce slice est exporté pour être utilisé dans le store
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// Création du store
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer
  }
});

export default store;

