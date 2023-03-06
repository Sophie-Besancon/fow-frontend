import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [
    {
        firstname:null,
        token:null,
        articleInfo: [],
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
    clearArticleInfo: (state, action) => {
      state.value[0].articleInfo = []
      console.log('CLEAR', state.value[0].articleInfo)
    },
  },
});

export const { addUser, disconnectUser, addArticleInfo, clearArticleInfo } = usersSlice.actions;
export default usersSlice.reducer;
