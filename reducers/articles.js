import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: [],
};

export const articlesSlice = createSlice({
 name: 'articles',

  initialState,
 reducers: {
   addFriendToStore: (state, action) => {
     state.value.push(action.payload);
   },
 },
});

export const { addFriendToStore } = articlesSlice.actions;
export default articlesSlice.reducer;