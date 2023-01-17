import { configureStore } from '@reduxjs/toolkit';

// import reducers
import userReducer from './reducers/userReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
