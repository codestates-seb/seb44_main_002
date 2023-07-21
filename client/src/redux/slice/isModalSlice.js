import { createSlice } from '@reduxjs/toolkit';

//TODO: redux 사용법
// import { useSelector, useDispatch } from 'react-redux'
// import { open, close } from '../redux/slice/isModalSlice';
// 현재 state값 불러오기
// const isModal = useSelector((state) => state.isModal.isModal);
// dispatch 요청 보내기
// const dispatch = useDispatch()
// <button
// onClick={() => dispatch(open())}
// >

const initialState = {
  isModal: false,
};

export const isModalSlice = createSlice({
  name: 'isModal',
  initialState,
  reducers: {
    open: (state) => {
      state.isModal = true;
    },
    close: (state) => {
      state.isModal = false;
    },
  },
});

export const { open, close } = isModalSlice.actions;

export default isModalSlice.reducer;
