import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [
    {
        firstname:null,
        token:null,
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

  },
});

export const { addUser } = usersSlice.actions;
export default usersSlice.reducer;
