import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import songReducer from 'models/songs/slices/songsSlice';
import rootSaga from 'models/songs/sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: songReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
