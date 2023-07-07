import { createSlice } from '@reduxjs/toolkit';

//TODO: redux 사용법
// import { useSelector, useDispatch } from 'react-redux'
// import { decrement, increment } from './counterSlice'
// 현재 state값 불러오기
// const count = useSelector((state) => state.counter.value)
// dispatch 요청 보내기
// const dispatch = useDispatch()
// <button
// aria-label="Increment value"
// onClick={() => dispatch(increment())}
// >

const initialState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
