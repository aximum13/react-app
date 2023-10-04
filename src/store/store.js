import { configureStore } from '@reduxjs/toolkit';
import { save } from 'redux-localstorage-simple';

import reducer from './slices/songsSlice/songsSlice';

const saveSong = save({
  namespace: 'musicList',
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saveSong),
});

export default store;
