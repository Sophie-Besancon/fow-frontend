import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [
    {
        firstname:null,
        token:null,
        canBookmark:null,
        articleinFavorite:[null],
    }
  ],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
        console.log('action payload :', action.payload);
      state.value[0].firstname=action.payload.firstname;
      state.value[0].token=action.payload.token;

    },
    canBookMark: (state, action) => {
      if (state.value.token){
        state.value[0].canBookmark = true
      }
    },
    addArticle: (state, action) => {
      if (state.value.canBookmark){
        state.value[0].articleinFavorite[0].push(action.payload)
      }
    },
    removeArticle: (state, action) => {
      state.value[0].articleinFavorite[0] = state.value[0].articleinFavorite[0].filter(article => article !== action.payload)
    }
 
  },
});

export const { addUser, canBookMark, addArticle, removeArticle } = usersSlice.actions;
export default usersSlice.reducer;
