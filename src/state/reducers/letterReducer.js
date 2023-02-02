import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  opening: '',
  body: [],
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
    updateBody: (state, action) => {
      state.value.body = action.payload;
    },
    updateClosing: (state, action) => {
      state.value.closing = action.payload;
    },
    resetForm: (state, action) => {
      state.value = initialState;
    }
  },
});

export const { updateOpening, updateBody, updateClosing, resetForm } = letterSlice.actions;

export default letterSlice.reducer;