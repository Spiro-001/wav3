import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./features/userSlice";
import { useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    userReducer,
  },
});

export const useAppSelector = useSelector;
