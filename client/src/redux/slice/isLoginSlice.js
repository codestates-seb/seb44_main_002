import { createSlice } from '@reduxjs/toolkit';

//TODO: redux 사용법
// import { useSelector, useDispatch } from 'react-redux'
// import { login, logout } from '../redux/slice/isLoginSlice';
// 현재 state값 불러오기
// const isLogin = useSelector((state) => state.isLogin.isLogin);
// dispatch 요청 보내기
// const dispatch = useDispatch()
// <button
// onClick={() => dispatch(login())}
// >

const initialState = {
  isLogin: true,
};

export const isLoginSlice = createSlice({
  name: 'isLogin',
  initialState,
  reducers: {
    login: (state) => {
      state.isLogin = true;
    },
    logout: (state) => {
      state.isLogin = false;
    },
  },
});

export const { login, logout } = isLoginSlice.actions;

export default isLoginSlice.reducer;
