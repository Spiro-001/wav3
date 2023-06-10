import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

export const post = createSlice({
  name: "post",
  initialState,
  reducers: {
    removeAllPost: () => {
      return initialState;
    },
    addPost: (state, action) => {
      return { posts: [...state.posts, ...action.payload] };
    },
    removePost: (state, action) => {
      const copyPostArray = [...current(state.posts)];
      copyPostArray[action.payload] = null;
      console.log(copyPostArray);
      return { posts: [...copyPostArray] };
    },
  },
});

export const { removeAllPost, addPost, removePost } = post.actions;
export const postReducer = post.reducer;
