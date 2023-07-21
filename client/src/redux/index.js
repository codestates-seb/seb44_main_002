import { configureStore } from '@reduxjs/toolkit';

import counterReducer from './slice/counterSlice';
import isLoginReducer from './slice/isLoginSlice';
import userinfoReducer from './slice/userInfoSlice';
import isModalReducer from './slice/isModalSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    isLogin: isLoginReducer,
    userinfo: userinfoReducer,
    isModal: isModalReducer,
  },
});
