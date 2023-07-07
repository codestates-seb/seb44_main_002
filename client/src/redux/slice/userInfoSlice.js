import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: null,
  profileImageUrl: null,
  gender: null,
  age: null,
  email: null,
  subscribedCount: 0,
  bookmarked: [
    {
      cocktailId: 1,
      name: 'sample',
      imageUrl: 'images/cocktail/cocktail1.jpg',
      isBookmarked: true,
    },
    {
      cocktailId: 2,
      name: '체리주',
      imageUrl: 'images/cocktail/cocktail2.jpg',
      isBookmarked: true,
    },
  ],
  boards: null,
};

const userInfoSlice = createSlice({
  name: 'userinfo',
  initialState,
  reducers: {
    updateBookmark: (state, action) => {
      const { id, isBookmarked, item } = action.payload;

      const filteredData = state.bookmarked.filter(
        (el) => el.cocktailId !== id
      );
      //새로운 북마크 추가
      const isitem = state.bookmarked.find((el) => el.cocktailId === id);
      //새로운 북마크 추가
      if (!isitem) {
        // setData([...data, item]);
        state.bookmarked = [...state.bookmarked, item];
      } else {
        // 기존 북마크 삭제
        //   setData(filteredData);
        state.bookmarked = filteredData;
      }
      //console.log(data);

      // state.bookmarked = state.bookmarked.map((bookmark) => {
      //   if (bookmark.cocktailId === id) {
      //     return;
      //   } else {
      //     return bookmark;
      //   }
      // });
    },
  },
});

export const { updateBookmark } = userInfoSlice.actions;
export default userInfoSlice.reducer;
