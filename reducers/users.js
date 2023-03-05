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
     
     // if (state.value[0].canBookmark){
        state.value[0].articleinFavorite.push(action.payload[0]._id)
        console.log('articles reducers :', state.value[0].articleinFavorite);
     // }
    },
    removeArticle: (state, action) => {
      console.log('removeArticle REDUCER :', action.payload);
     // state.value[0].articleinFavorite = state.value[0].articleinFavorite.filter(article => article._id !== action.payload[0]._id);
     let index = state.value[0].articleinFavorite.indexOf(action.payload)
     state.value[0].articleinFavorite = state.value[0].articleinFavorite.splice(index, 1)
     console.log('ARTICLES APRES REMOVE DANS REDUCER :', state.value[0].articleinFavorite);

    }
 
  },
});

export const { addUser, canBookMark, addArticle, removeArticle } = usersSlice.actions;
export default usersSlice.reducer;
