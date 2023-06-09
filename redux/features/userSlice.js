import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    dateOfBirth: null,
    email: null,
    id: null,
    name: null,
    provider: null,
    username: null,
  },
};

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: () => {
      return initialState;
    },
    logIn: (state, action) => {
      return {
        user: action.payload,
      };
    },
  },
});

export const { logIn, logOut } = user.actions;
export const userReducer = user.reducer;
