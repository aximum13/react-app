import { put, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { editSongApi } from 'API/songs';
import { EDIT_SONG, editSongSuccess } from 'models/songs/slices/songsSlice';
import { SongState } from 'models/songs/types';

function* editSongSaga(action: PayloadAction<SongState>) {
  try {
    const response = yield editSongApi(action.payload.id, action.payload);
    if (!response.ok) {
      throw new Error(
        `Ошибка при редактировании записи, статус: ${response.status}`
      );
    }

    const editSong = yield response.json();
    yield put(editSongSuccess(editSong));
  } catch (error) {
    console.error('Ошибка при редактировании записи:', error);
  }
}

export function* watchEditSong() {
  yield takeEvery(EDIT_SONG, editSongSaga);
}
