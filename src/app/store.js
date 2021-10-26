import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import pictureReducer from '../components/pictureSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    picture: pictureReducer,
  },
});
