import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [
    {
      firstname: null,
      token: null,
      articleInfo: [],
      articleInBasket: [],
      totalInBasket: 0,
      articleInFavorite: [],
      address: [],
    },
  ],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.value[0].firstname = action.payload.firstname;
      state.value[0].token = action.payload.token;
      state.value[0].address = action.payload.address;
      state.value[0].articleInFavorite = action.payload.articlesinFavorite;
    },
    disconnectUser: (state, action) => {
      state.value[0].token = null;
      state.value[0].firstname = null;
      state.value[0].canBookmark = false;
      state.value[0].address = [];
    },
    addArticleInfo: (state, action) => {
      state.value[0].articleInfo = [action.payload];
    },
    addArticleInBasket: (state, action) => {
      state.value[0].articleInBasket.push(action.payload);
    },
    addTotalInBasket: (state, action) => {
      state.value[0].totalInBasket = action.payload;
    },
    addAddress: (state, action) => {
      state.value[0].address.push(action.payload);
    },
    removeArticleInBasket: (state, action) => {
      // https://stackoverflow.com/questions/56365514/js-delete-first-element-from-array-by-value
      state.value[0].articleInBasket.splice(
        state.value[0].articleInBasket.findIndex(
          (a) => a.name === action.payload
        ),
        1
      );
    },
    clearBasket: (state, action) => {
      state.value[0].articleInBasket = [];
    },
    clearArticleInfo: (state, action) => {
      state.value[0].articleInfo = [];
    },
    manageArticleInFavorite: (state, action) => {
      if (
        state.value[0].articleInFavorite.some(
          (article) => article.name === action.payload.name
        )
      ) {
        state.value[0].articleInFavorite =
          state.value[0].articleInFavorite.filter(
            (article) => article.name != action.payload.name
          );
      } else {
        state.value[0].articleInFavorite.push(action.payload);
      }
    },
    modifyFirstname: (state, action) => {
      state.value[0].firstname = action.payload;
    },
  },
});

export const {
  clearBasket,
  addUser,
  disconnectUser,
  addArticleInfo,
  clearArticleInfo,
  addArticleInBasket,
  manageArticleInFavorite,
  removeArticleInBasket,
  addAddress,
  addTotalInBasket,
  modifyFirstname,
} = usersSlice.actions;
export default usersSlice.reducer;
