import {createAsyncThunk} from '@reduxjs/toolkit';
import postsApi from '../../apis/posts';

export const updatePosts = createAsyncThunk<any, UpdatePosts>(
  'posts/updatePosts',
  async data => {
    try {
      const res = await postsApi.HandleUpdatePosts(data, 'POST');

      const {body} = res.data;

      if (body?.status === 'OK') {
        return body;
      }
    } catch (error) {
      throw String(error);
    }
  },
);
