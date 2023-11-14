import { put, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { addSongApi } from 'API/songs';
import { ADD_SONG, addSongSuccess } from 'models/songs/slices/songsSlice';
import { SongState } from 'models/songs/types';

function* addSongSaga(action: PayloadAction<SongState>) {
  try {
    const response = yield addSongApi(action.payload);
    if (!response.ok) {
      throw new Error(
        `Ошибка при создании новой записи, статус: ${response.status}`
      );
    }

    const addSong = yield response.json();
    yield put(addSongSuccess(addSong));
  } catch (error) {
    console.error('Ошибка при создании новой записи:', error);
  }
}

export function* watchAddSong() {
  yield takeEvery(ADD_SONG, addSongSaga);
}
