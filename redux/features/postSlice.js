import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  posts: null,
};

export const post = createSlice({
  name: "post",
  initialState,
  reducers: {
    removeAllPost: () => {
      return initialState;
    },
    addPost: (state, action) => {
      return { posts: [...action.payload] };
    },
    addNewPost: (state, action) => {
      return { posts: [action.payload, ...current(state.posts)] };
    },
    removePost: (state, action) => {
      const copyPostArray = [...current(state.posts)];
      copyPostArray.splice(action.payload, 1);
      return { posts: [...copyPostArray] };
    },
  },
});

export const { removeAllPost, addPost, addNewPost, removePost } = post.actions;
export const postReducer = post.reducer;
