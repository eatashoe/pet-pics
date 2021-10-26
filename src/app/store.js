import { configureStore } from '@reduxjs/toolkit';
import pictureReducer from '../components/pictureSlice';

export const store = configureStore({
  reducer: {
    picture: pictureReducer,
  },
});
