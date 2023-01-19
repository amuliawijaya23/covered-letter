import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  opening: '',
  values: [],
  closing: ''
};

export const letterSlice =  createSlice({
  name: 'letter',
  initialState: {
    value: initialState,
  },
  reducers: {
    updateOpening: (state, action) => {
      state.value.opening = action.payload;
    },
    updateValues: (state, action) => {
      state.value.values = action.payload;
    },
    updateClosing: (state, action) => {
      state.value.closing = action.payload;
    }
  },
});

export const { updateOpening, updateValues, updateClosing } = letterSlice.actions;

export default letterSlice.reducer;