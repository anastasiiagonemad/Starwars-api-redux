import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  characters: [],
  status: 'idle',
  next: null,
  previous: null,
  count: 0,
  error: null,
};

export const fetchCharacters = createAsyncThunk(
  'characters/fetchCharacters',
  async (url = 'http://swapi.dev/api/people/') => {
    const response = await axios.get(url);
    return response.data;
  },
);

const characterSlice = createSlice({
  name: 'Characters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.characters = action.payload.results;
        state.next = action.payload.next;
        state.previous = action.payload.previous;
        state.count = action.payload.count;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default characterSlice.reducer;
