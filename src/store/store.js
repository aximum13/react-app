import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { save } from 'redux-localstorage-simple';

import songReducer from 'models/songs/slices/songsSlice';
import filterReducer from 'models/filters/slices/filtersSlice';

const saveSong = save({
  namespace: 'musicList',
});

const reducers = combineReducers({
  songs: songReducer,
  filters: filterReducer,
});

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saveSong),
});

export default store;
