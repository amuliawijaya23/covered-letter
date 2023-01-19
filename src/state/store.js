import { configureStore } from '@reduxjs/toolkit';

// import reducers
import userReducer from './reducers/userReducer';
import letterReducer from './reducers/letterReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    letter: letterReducer
  },
});
