import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [
    {
        firstname:null,
        token:null,
        articleInfo: [],
        articleInBasket: [],
        articleInFavorite: [],
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
    disconnectUser:(state,action)=>{
        state.value[0].token = null;
        state.value[0].firstname = null;
        state.value[0].canBookmark = false;
    }, 
    addArticleInfo: (state, action) => {
      state.value[0].articleInfo.push(action.payload)
    },
    addArticleInBasket: (state, action) => {
      state.value[0].articleInBasket.push(action.payload)
    },    
    clearArticleInfo: (state, action) => {
      state.value[0].articleInfo = []
    },
    manageArticleInFavorite: (state, action) => {
      state.value[0].articleInFavorite = action.payload
      console.log("RECU", state.value[0].articleInFavorite)
    },
  },
});

export const { addUser, disconnectUser, addArticleInfo, clearArticleInfo, addArticleInBasket, manageArticleInFavorite } = usersSlice.actions;
export default usersSlice.reducer;
