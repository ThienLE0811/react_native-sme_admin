import {configureStore} from '@reduxjs/toolkit';
import {authReducer} from './reducers/authReducer';
import {postsReducer} from './reducers/postsReducer';

const store = configureStore({
  reducer: {
    authReducer,
    postsReducer,
  },
});

export default store;
