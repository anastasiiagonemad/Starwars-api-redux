import { configureStore } from '@reduxjs/toolkit';
import charactersReducer from './charactersSlice';

const store = configureStore({
  reducer: {
    characters: charactersReducer,
  },
});

export default store;
