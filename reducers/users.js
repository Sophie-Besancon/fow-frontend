import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [
    {
        firstname:null,
        token:null,
        articleInfo: [],
        articleInBasket: [],
        articleInFavorite: [],
        address: [],
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
      state.value[0].address=action.payload.address;
    },
    disconnectUser:(state,action)=>{
        state.value[0].token = null;
        state.value[0].firstname = null;
        state.value[0].canBookmark = false;
        state.value[0].address= [];
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
    },
  },
});

export const { addUser, disconnectUser, addArticleInfo, clearArticleInfo, addArticleInBasket, manageArticleInFavorite } = usersSlice.actions;
export default usersSlice.reducer;
