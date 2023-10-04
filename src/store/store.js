import { configureStore } from '@reduxjs/toolkit';
import { save } from 'redux-localstorage-simple';

import reducer from '../models/song/slices/songsSlice';

const saveSong = save({
  namespace: 'musicList',
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saveSong),
});

export default store;
