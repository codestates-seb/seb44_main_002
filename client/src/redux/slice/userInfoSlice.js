import { createSlice } from '@reduxjs/toolkit';
// {
//     “name” : “kim”,
//     “profileImageUrl” : “sample image url”
//     “gender” : “example”,
//     “age” : 20,
//     “email” : “kim@example.com”,
//     “subscribedCount” : 0,
//     “bookmarked” : [
//         {
//             “cocktailId” : 1,
//             “name” : “sample cocktail”,
//             “imageUrl” : “sample image url”,
//             “isBookmarked” : “true”
//         },
//         {
//             “cocktailId” : 2,
//             “name” : “sample cocktail”,
//             “isBookmarked” : “true”
//         }
//     ],
//     “boards” : [
//         {
//             “boardId” : 1,
//             “title” : “title1”,
//             “content” : “content1”
//         },
//         {
//             “boardId” : 2,
//             “title” : “title2”,
//             “content” : “content2”
//         },
//     ],
//     “subscribe” : [
//         {
//             “userId” : 1,
//             “name” : “kim”,
//             “profileImageUrl” : “sample image url”
//         },
//         {
//             “userId” : 2,
//             “name” : “park”,
//             “profileImageUrl” : “sample image url”
//         },
//     ],
// }

//유저 아이디가 필요하다.
const initialState = {
  name: null,
  profileImageUrl: null,
  gender: null,
  age: null,
  email: null,
  subscribedCount: 0,
  bookmarked: null,
  boards: null,
};

const userInfoSlice = createSlice({
  name: 'changeInfo',
  initialState,
  reducers: {
    UPDATE: (state) => {
      return action.payload;
    },
  },
});

export const { UPDATE } = userInfoSlice.actions;
export default userInfoSlice.reducer;
