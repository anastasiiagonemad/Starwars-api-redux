import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_date: string;
  gender: string;
}

interface ApiResponse {
  results: Character[];
  next: string | null;
  previous: string | null;
  count: number;
}

interface CharactersState {
  characters: Character[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  next: string | null;
  previous: string | null;
  count: number;
  error: string | null;
}

const initialState: CharactersState = {
  characters: [],
  status: 'idle',
  next: null,
  previous: null,
  count: 0,
  error: null,
};

export const fetchCharacters = createAsyncThunk<ApiResponse, string>(
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
      .addCase(
        fetchCharacters.fulfilled,
        (state, action: PayloadAction<ApiResponse>) => {
          state.status = 'succeeded';
          state.characters = action.payload.results;
          state.next = action.payload.next;
          state.previous = action.payload.previous;
          state.count = action.payload.count;
        },
      )
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch characters';
      });
  },
});

export default characterSlice.reducer;
