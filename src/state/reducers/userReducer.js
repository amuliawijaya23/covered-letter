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
      state.value = action.payload;
    },
    logout: (state, action) => {
      state.value = initialState;
    }
  }
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
