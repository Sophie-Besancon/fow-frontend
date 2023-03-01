import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [
    {
        firstname:null,
        tokenUser:null,
    }
  ],
};

export const usersSlice = createSlice({
  name: "users",

  initialState,
  reducers: {
    addUser: (state, action) => {
      console.log('recu en payload :' ,action.payload);
      state.value[0].firstname=action.payload;


    },
  },
});

export const { addUser } = usersSlice.actions;
export default usersSlice.reducer;
