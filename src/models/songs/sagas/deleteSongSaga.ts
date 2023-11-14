import { PayloadAction } from '@reduxjs/toolkit';
import { put, takeEvery } from 'redux-saga/effects';

import { deleteSongApi } from 'API/songs';
import { DELETE_SONG, deleteSongSuccess } from 'models/songs/slices/songsSlice';

function* deleteSongSaga(action: PayloadAction<number>) {
  try {
    const id = action.payload;

    const response = yield deleteSongApi(id);

    if (!response.ok) {
      throw new Error(`Ошибка при удалении записи, статус: ${response.status}`);
    }

    yield put(deleteSongSuccess(id));
  } catch (error) {
    console.error('Ошибка при удалении записи:', error);
  }
}

export function* watchDeleteSong() {
  yield takeEvery(DELETE_SONG, deleteSongSaga);
}
