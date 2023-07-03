import { configureStore } from '@reduxjs/toolkit';

import counterReducer from './slice/counterSlice';
import isLoginReducer from './slice/isLoginSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    isLogin: isLoginReducer,
  },
});
