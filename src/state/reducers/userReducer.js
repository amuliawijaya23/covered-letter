import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  feats: null,
  letters: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.data = action.payload;
    },
    setFeats: (state, action) => {
      state.feats = action.payload;
    },
    setLetters: (state, action) => {
      state.letters = action.payload;
    },
    logout: (state, action) => {
      state = initialState;
    }
  }
});

export const { login, setFeats, setLetters, logout } = userSlice.actions;

export default userSlice.reducer;
