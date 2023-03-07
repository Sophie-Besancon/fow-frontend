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
      console.log(('add article :' , action.payload));
      state.value[0].articleInfo=[action.payload]
    },
    addArticleInBasket: (state, action) => {
      state.value[0].articleInBasket.push(action.payload)
    },    
    clearArticleInfo: (state, action) => {
      state.value[0].articleInfo = []
      console.log('article info :',state.value[0].articleInfo);
    },
    manageArticleInFavorite: (state, action) => {
      state.value[0].articleInFavorite = action.payload
    },
  },
});

export const { addUser, disconnectUser, addArticleInfo, clearArticleInfo, addArticleInBasket, manageArticleInFavorite } = usersSlice.actions;
export default usersSlice.reducer;
