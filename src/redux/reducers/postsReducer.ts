import {createSlice} from '@reduxjs/toolkit';
import {updatePosts} from '../actions/posts';

interface PostsState {
  listPosts: Array<Posts>;
}

const initialState: PostsState = {
  listPosts: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {
    setListPosts: (state, action) => {
      state.listPosts = action.payload;
    },
    updateListPosts: (state, action) => {
      const index = state.listPosts.findIndex(
        value => value.id === action.payload?.id,
      );
      if (index > -1) {
        state.listPosts[index] = action.payload;
      }
    },
    createPosts: (state, action) => {
      if (action.payload) {
        state.listPosts.unshift(action.payload);
      }
    },
    deletePosts: (state, action) => {
      const index = state.listPosts.findIndex(val => val.id === action.payload);

      if (index > -1) {
        state.listPosts.splice(index, 1);
      }
    },
  },
  // extraReducers(builder) {
  //   builder.addCase(updatePosts.fulfilled, (state, action) => {
  //     console.log('action payload:: ', action.payload);
  //     const index = state.listPosts.findIndex(
  //       value => value.id === action.payload?.data?.id,
  //     );
  //     if (index > -1) {
  //       state.listPosts[index] = action.payload;
  //     }
  //   });
  // },
});

export const postsReducer = postsSlice.reducer;
export const {setListPosts, updateListPosts, createPosts, deletePosts} =
  postsSlice.actions;
export const postsSelector = (state: any) => state.postsReducer.listPosts;
