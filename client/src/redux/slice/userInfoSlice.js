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
      const { cocktailId, isBookmarked, item } = action.payload;

      state.bookmarked = state.bookmarked.map((bookmark) => {
        if (bookmark.cocktailId === cocktailId) {
          return;
        } else {
          return bookmark;
        }
      });
    },
  },
});

export const { updateBookmark } = userInfoSlice.actions;
export default userInfoSlice.reducer;
