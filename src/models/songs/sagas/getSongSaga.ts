import { put, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { getSongApi } from 'API/songs';
import { GET_SONG, getSongSuccess } from 'models/songs/slices/songsSlice';

function* getSongSaga(action: PayloadAction<number>) {
  try {
    const id = action.payload;
    const response = yield getSongApi(id);
    if (!response.ok) {
      throw new Error(`Ошибка при открытии записи, статус: ${response.status}`);
    }

    const getSong = yield response.json();
    yield put(getSongSuccess(getSong));
  } catch (error) {
    console.error('Ошибка при открытии записи:', error);
  }
}

export function* watchGetSong() {
  yield takeEvery(GET_SONG, getSongSaga);
}
