import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [
    {
        firstname:null,
        token:null,
        canBookmark:false,
        articleinFavorite: [],
    }
  ],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.value[0].firstname=action.payload.firstname;
      state.value[0].token=action.payload.token;
    },
    canBookMark: (state, action) => {
      if (state.value[0].token){
        state.value[0].canBookmark = true
      }
    },
    addArticle: (state, action) => {
      //console.log("addarticle", action.payload)
      if (state.value[0].canBookmark){
        state.value[0].articleinFavorite.push(action.payload)
      }
    },
    removeArticle: (state, action) => {
     // console.log("removeArticle", action.payload._id)
      state.value[0].articleinFavorite = state.value[0].articleinFavorite.filter(article => article._id !== action.payload._id);
      }
 
  },
});

export const { addUser, canBookMark, addArticle, removeArticle } = usersSlice.actions;
export default usersSlice.reducer;
