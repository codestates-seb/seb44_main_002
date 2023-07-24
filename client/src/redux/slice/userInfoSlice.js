import { createSlice } from '@reduxjs/toolkit';
//TODO: redux 사용법
// import { useSelector, useDispatch } from 'react-redux'
// import { updateBookmark } from '../redux/slice/userInfoSlice';

// 현재 state값 불러오기
// const bookmarkList = useSelector((state) => state.userinfo.bookmarked);
// dispatch 요청 보내기
// const dispatch = useDispatch()
// id 는 클릭한 북마크칵테일의 아이디
//item 은 클릭한 칵테일의 정보
// item={
//   cocktailId: 1,
//   name: 'sample',
//   imageUrl: 'images/cocktail/cocktail1.jpg',
//   isBookmarked: true,
// }
// const id = item.cocktailId;
// dispatch(updateBookmark({ id, item }));

const initialState = {
  userId: null,
  accessToken: null,
  name: null,
  profileImageUrl: null,
  gender: null,
  age: null,
  email: null,
  subscriberCount: 0,
  bookmarkedCocktails: [
    {
      cocktailId: 1,
      name: 'sample',
      imageUrl: 'images/cocktail/cocktail1.jpg',
      bookmarked: true,
    },
    {
      cocktailId: 2,
      name: '체리주',
      imageUrl: 'images/cocktail/cocktail2.jpg',
      bookmarked: true,
    },
  ],
  boards: null,
};

const userInfoSlice = createSlice({
  name: 'userinfo',
  initialState,
  reducers: {
    updateBookmark: (state, action) => {
      const { id, item } = action.payload;

      const filteredData = state.bookmarkedCocktails.filter(
        (el) => el.cocktailId !== id
      );
      //새로운 북마크 추가
      const isitem = state.bookmarkedCocktails.find(
        (el) => el.cocktailId === id
      );
      //새로운 북마크 추가
      if (!isitem) {
        state.bookmarkedCocktails = [
          ...state.bookmarkedCocktails,
          { ...item, bookmarked: !item.bookmarked },
        ];
      } else {
        // 기존 북마크 삭제
        state.bookmarkedCocktails = filteredData;
      }
    },
    userinfoLogin: (state, action) => {
      return {
        ...state,
        userId: action.payload.userId,
        accessToken: action.payload.accessToken,
        IsAdmin: action.payload.IsAdmin,
      };
    },
    userinfoLoginOut: (state) => {
      return {
        ...state,
        userId: null,
        accessToken: null,
      };
    },
    userinfoGet: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { updateBookmark } = userInfoSlice.actions;
export const { userinfoLogin } = userInfoSlice.actions;
export const { userinfoLoginOut } = userInfoSlice.actions;
export const { userinfoGet } = userInfoSlice.actions;
export default userInfoSlice.reducer;
