import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { userReducer } from "./features/userSlice";
import { postReducer } from "./features/postSlice";

export const store = configureStore({
  reducer: {
    userReducer,
    postReducer,
  },
});

export const useAppSelector = useSelector;
