import { configureStore } from '@reduxjs/toolkit';
import { save } from 'redux-localstorage-simple';

import songReducer from 'models/songs/slices/songsSlice';

const saveSong = save({
  namespace: 'musicList',
});

const store = configureStore({
  reducer: songReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saveSong),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
