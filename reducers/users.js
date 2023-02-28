import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [
    {
        username:null,
        mailAddress:null,
        password:null,
        tokenUser:null,
    }
  ],
};

export const usersSlice = createSlice({
  name: "users",

  initialState,
  reducers: {
    addUser: (state, action) => {
      console.log(action.payload);
      state.value[0].username=action.payload.username;
      state.value[0].mailAddress=action.payload.mailAddress;
      state.value[0].password=action.payload.password;

    },
  },
});

export const { addUser } = usersSlice.actions;
export default usersSlice.reducer;
