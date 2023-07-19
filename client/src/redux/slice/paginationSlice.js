import { createSlice } from '@reduxjs/toolkit';

const PaginationReducer = createSlice({
  name: 'PaginationReducer',
  initialState: {
    totalQuestionCnt: 0,
  },
  reducers: {
    totalQuestionCntSet(state, action) {
      return { ...state, totalQuestionCnt: action.payload };
    },
  },
});

export const { totalQuestionCntSet } = PaginationReducer.actions;

export default PaginationReducer.reducer;
